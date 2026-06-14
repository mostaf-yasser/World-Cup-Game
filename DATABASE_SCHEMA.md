# World Cup Fantasy - Database Schema

## Overview
This application uses **Supabase** (PostgreSQL with Row Level Security) for data persistence.

---

## Database Tables

### users
Mirror of Supabase auth.users with extended profile data.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key, references auth.users |
| email | TEXT | User email |
| display_name | TEXT | Optional display name |
| is_admin | BOOLEAN | Admin flag (default: false) |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Update timestamp |

**RLS Policies:**
- Users can read/update only their own profile
- Users can insert their own profile on signup

---

### players
Player database for fantasy selection.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | TEXT | Player name |
| national_team | TEXT | National team name |
| position | TEXT | GK, DEF, MID, or FWD |
| photo_url | TEXT | Optional photo URL |
| status | TEXT | available, injured, suspended, eliminated |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Update timestamp |

**RLS Policies:**
- All authenticated users can read
- Only admins can create/update/delete

---

### rounds
Tournament rounds management.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | TEXT | Round name (e.g., "Matchday 1") |
| round_number | INTEGER | Sequential number |
| stage | TEXT | group, round_of_16, quarter_final, semi_final, third_place, final |
| transfers_open | BOOLEAN | Whether transfers are allowed |
| is_locked | BOOLEAN | Whether round is locked |
| is_finished | BOOLEAN | Whether round is completed |
| start_date | TIMESTAMPTZ | Optional start date |
| end_date | TIMESTAMPTZ | Optional end date |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Update timestamp |

**RLS Policies:**
- All authenticated users can read
- Only admins can create/update/delete

---

### fantasy_teams
User fantasy teams.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Owner user (unique) |
| name | TEXT | Team name (unique) |
| logo_url | TEXT | Optional team logo |
| description | TEXT | Optional description |
| manager_name | TEXT | Manager display name |
| total_points | INTEGER | Total accumulated points |
| current_round_points | INTEGER | Points for current round |
| barakawy_used | BOOLEAN | Whether Barakawy card used |
| barakawy_round | UUID | Round when Barakawy was used |
| shala7_used | BOOLEAN | Whether Shala7 card used |
| captain_id | UUID | Captain player reference |
| vice_captain_id | UUID | Vice captain player reference |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Update timestamp |

**RLS Policies:**
- All authenticated users can read all teams
- Users can create/update/delete only their own team

---

### team_players
Players in each fantasy team.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| team_id | UUID | Fantasy team reference |
| player_id | UUID | Player reference |
| is_starter | BOOLEAN | Starter or bench player |
| position_order | INTEGER | Position in formation |
| created_at | TIMESTAMPTZ | Creation timestamp |

**Unique constraint:** (team_id, player_id)

**RLS Policies:**
- All authenticated users can read
- Users can manage only their own team's players

---

### player_stats
Player statistics per round.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| player_id | UUID | Player reference |
| round_id | UUID | Round reference |
| win_match | BOOLEAN | Team won the match |
| goals | INTEGER | Goals scored |
| assists | INTEGER | Assists made |
| man_of_the_match | BOOLEAN | MOTM award |
| penalty_save | BOOLEAN | Penalty saved |
| clean_sheet | BOOLEAN | Clean sheet kept |
| red_card | BOOLEAN | Red card received |
| played_minutes | INTEGER | Minutes played |
| fantasy_points | INTEGER | Calculated fantasy points |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Update timestamp |

**Unique constraint:** (player_id, round_id)

**RLS Policies:**
- All authenticated users can read
- Only admins can create/update/delete

---

### transfers
Transfer history.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| team_id | UUID | Fantasy team reference |
| round_id | UUID | Round reference |
| player_out_id | UUID | Player removed (nullable) |
| player_in_id | UUID | Player added |
| created_at | TIMESTAMPTZ | Creation timestamp |

**RLS Policies:**
- All authenticated users can read
- Users can create transfers only for their own team

---

### substitutions
Automatic substitution tracking.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| team_id | UUID | Fantasy team reference |
| round_id | UUID | Round reference |
| starter_player_id | UUID | Starter who didn't play |
| bench_player_id | UUID | Bench replacement |
| created_at | TIMESTAMPTZ | Creation timestamp |

**Unique constraint:** (team_id, round_id)

---

## Indexes

```sql
CREATE INDEX idx_team_players_team ON team_players(team_id);
CREATE INDEX idx_team_players_player ON team_players(player_id);
CREATE INDEX idx_player_stats_player ON player_stats(player_id);
CREATE INDEX idx_player_stats_round ON player_stats(round_id);
CREATE INDEX idx_transfers_team ON transfers(team_id);
CREATE INDEX idx_transfers_round ON transfers(round_id);
CREATE INDEX idx_fantasy_teams_user ON fantasy_teams(user_id);
```

---

## Triggers

### Auto-create user profile
```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, display_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### Auto-assign admin to first user
```sql
CREATE OR REPLACE FUNCTION public.auto_assign_admin()
RETURNS TRIGGER AS $$
DECLARE
  user_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO user_count FROM public.users;
  IF user_count = 0 THEN
    NEW.is_admin := TRUE;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trigger_auto_admin
  BEFORE INSERT ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.auto_assign_admin();
```

---

## Points Calculation Logic

```typescript
function calculateFantasyPoints(stats, position): number {
  // Red card = 0 points for the round
  if (stats.red_card) return 0;

  let points = 0;
  points += stats.win_match ? 1 : 0;        // Win: +1
  points += stats.goals;                     // Goal: +1 each
  points += stats.assists;                   // Assist: +1 each
  points += stats.man_of_the_match ? 1 : 0; // MOTM: +1
  points += stats.penalty_save ? 1 : 0;      // Penalty save: +1
  
  // Clean sheet: +1 (GK, DEF, MID only)
  if (position !== 'FWD' && stats.clean_sheet) {
    points += 1;
  }

  return points;
}

// Captain doubles points if played
// Vice Captain takes over if Captain didn't play
```

---

## Squad Structure

### Starters (5 players)
- 2 Forwards (FWD)
- 1 Midfielder (MID)
- 1 Defender (DEF)
- 1 Goalkeeper (GK)

### Bench (4 players)
- 1 Forward (FWD)
- 1 Midfielder (MID)
- 1 Defender (DEF)
- 1 Goalkeeper (GK)

### Optional
- Captain (doubles points)
- Vice Captain (backup if captain doesn't play)

---

## Group Stage Rules
- Maximum 2 players from the same national team
- 1 transfer allowed per round
- 1 automatic substitution per round (bench → starter if starter didn't play)
