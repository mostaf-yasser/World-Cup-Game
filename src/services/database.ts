import { supabase } from '../lib/supabase';
import type { Player, Round, FantasyTeam, TeamPlayer, PlayerStats, Transfer, Substitution, PlayerPosition } from '../lib/supabase';

// ============ PLAYERS ============

export async function getPlayers(): Promise<Player[]> {
  const { data, error } = await supabase.from('players').select('*').order('name');
  if (error) throw error;
  return data;
}

export async function createPlayer(player: Omit<Player, 'id' | 'created_at' | 'updated_at'>): Promise<Player> {
  const { data, error } = await supabase.from('players').insert(player).select().single();
  if (error) throw error;
  return data;
}

export async function updatePlayer(id: string, updates: Partial<Player>): Promise<Player> {
  const { data, error } = await supabase
    .from('players')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deletePlayer(id: string): Promise<void> {
  const { error } = await supabase.from('players').delete().eq('id', id);
  if (error) throw error;
}

// ============ ROUNDS ============

export async function getRounds(): Promise<Round[]> {
  const { data, error } = await supabase.from('rounds').select('*').order('round_number');
  if (error) throw error;
  return data;
}

export async function getCurrentRound(): Promise<Round | null> {
  const { data, error } = await supabase
    .from('rounds')
    .select('*')
    .eq('is_finished', false)
    .order('round_number')
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function createRound(round: Omit<Round, 'id' | 'created_at' | 'updated_at'>): Promise<Round> {
  const { data, error } = await supabase.from('rounds').insert(round).select().single();
  if (error) throw error;
  return data;
}

export async function updateRound(id: string, updates: Partial<Round>): Promise<Round> {
  const { data, error } = await supabase
    .from('rounds')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ============ FANTASY TEAMS ============

export async function getFantasyTeamByUserId(userId: string): Promise<FantasyTeam | null> {
  const { data, error } = await supabase
    .from('fantasy_teams')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function getAllFantasyTeams(): Promise<FantasyTeam[]> {
  const { data, error } = await supabase
    .from('fantasy_teams')
    .select('*')
    .order('total_points', { ascending: false });
  if (error) throw error;
  return data;
}

export async function createFantasyTeam(team: Omit<FantasyTeam, 'id' | 'created_at' | 'updated_at' | 'total_points' | 'current_round_points'>): Promise<FantasyTeam> {
  const { data, error } = await supabase.from('fantasy_teams').insert(team).select().single();
  if (error) throw error;
  return data;
}

export async function updateFantasyTeam(id: string, updates: Partial<FantasyTeam>): Promise<FantasyTeam> {
  const { data, error } = await supabase
    .from('fantasy_teams')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function checkTeamNameExists(name: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('fantasy_teams')
    .select('id')
    .eq('name', name)
    .maybeSingle();
  if (error) throw error;
  return data !== null;
}

// ============ TEAM PLAYERS ============

export async function getTeamPlayers(teamId: string): Promise<(TeamPlayer & { player: Player })[]> {
  const { data, error } = await supabase
    .from('team_players')
    .select('*, player:players(*)')
    .eq('team_id', teamId);
  if (error) throw error;
  return data;
}

export async function addPlayerToTeam(teamId: string, playerId: string, isStarter: boolean): Promise<TeamPlayer> {
  const { data, error } = await supabase
    .from('team_players')
    .insert({ team_id: teamId, player_id: playerId, is_starter: isStarter })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function removePlayerFromTeam(teamId: string, playerId: string): Promise<void> {
  const { error } = await supabase
    .from('team_players')
    .delete()
    .eq('team_id', teamId)
    .eq('player_id', playerId);
  if (error) throw error;
}

export async function clearTeamPlayers(teamId: string): Promise<void> {
  const { error } = await supabase.from('team_players').delete().eq('team_id', teamId);
  if (error) throw error;
}

// ============ PLAYER STATS ============

export async function getPlayerStats(roundId: string): Promise<(PlayerStats & { player: Player })[]> {
  const { data, error } = await supabase
    .from('player_stats')
    .select('*, player:players(*)')
    .eq('round_id', roundId);
  if (error) throw error;
  return data;
}

export async function createOrUpdatePlayerStats(stats: Omit<PlayerStats, 'id' | 'created_at' | 'updated_at'>): Promise<PlayerStats> {
  const { data, error } = await supabase
    .from('player_stats')
    .upsert(stats, { onConflict: 'player_id,round_id' })
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ============ TRANSFERS ============

export async function getTeamTransfers(teamId: string): Promise<(Transfer & { round: Round })[]> {
  const { data, error } = await supabase
    .from('transfers')
    .select('*, round:rounds(*)')
    .eq('team_id', teamId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function getTeamTransfersForRound(teamId: string, roundId: string): Promise<Transfer[]> {
  const { data, error } = await supabase
    .from('transfers')
    .select('*')
    .eq('team_id', teamId)
    .eq('round_id', roundId);
  if (error) throw error;
  return data;
}

export async function createTransfer(transfer: Omit<Transfer, 'id' | 'created_at'>): Promise<Transfer> {
  const { data, error } = await supabase.from('transfers').insert(transfer).select().single();
  if (error) throw error;
  return data;
}

// ============ SUBSTITUTIONS ============

export async function getTeamSubstitutionForRound(teamId: string, roundId: string): Promise<Substitution | null> {
  const { data, error } = await supabase
    .from('substitutions')
    .select('*')
    .eq('team_id', teamId)
    .eq('round_id', roundId)
    .maybeSingle();
  if (error) throw error;
  return data;
}

// ============ LEADERBOARD ============

export async function getLeaderboard(): Promise<(FantasyTeam & { user: { display_name: string | null; email: string } })[]> {
  const { data, error } = await supabase
    .from('fantasy_teams')
    .select('*, user:users(display_name, email)')
    .order('total_points', { ascending: false });
  if (error) throw error;
  return data;
}

// ============ POINTS CALCULATION ============

export function calculateFantasyPoints(stats: Partial<PlayerStats>, position: PlayerPosition): number {
  if (stats.red_card) return 0;
  let points = 0;
  points += stats.win_match ? 1 : 0;
  points += (stats.goals ?? 0) * 1;
  points += (stats.assists ?? 0) * 1;
  points += stats.man_of_the_match ? 1 : 0;
  points += stats.penalty_save ? 1 : 0;
  if (position !== 'FWD' && stats.clean_sheet) points += 1;
  return points;
}

export async function recalculateAllTeamPoints(): Promise<void> {
  const teams = await getAllFantasyTeams();
  const rounds = await getRounds();
  const finishedRounds = rounds.filter(r => r.is_finished);

  for (const team of teams) {
    let totalPoints = 0;
    const teamPlayers = await getTeamPlayers(team.id);

    for (const round of finishedRounds) {
      let roundPoints = 0;
      const roundStats = await getPlayerStats(round.id);
      const statsMap = new Map(roundStats.map(s => [s.player_id, s]));
      const substitution = await getTeamSubstitutionForRound(team.id, round.id);
      const starters = teamPlayers.filter(tp => tp.is_starter);
      const bench = teamPlayers.filter(tp => !tp.is_starter);

      for (const starter of starters) {
        const stats = statsMap.get(starter.player_id);
        if (!stats) continue;
        const played = stats.played_minutes > 0 || stats.goals > 0 || stats.assists > 0;

        if (!played && substitution?.starter_player_id === starter.player_id) {
          const benchPlayer = bench.find(b => b.player_id === substitution.bench_player_id);
          if (benchPlayer) {
            const benchStats = statsMap.get(benchPlayer.player_id);
            if (benchStats) {
              roundPoints += calculateFantasyPoints(benchStats, benchPlayer.player.position);
            }
          }
        } else {
          let playerPoints = calculateFantasyPoints(stats, starter.player.position);
          if (team.captain_id === starter.player_id && played) {
            playerPoints *= 2;
          } else if (!played && team.vice_captain_id === starter.player_id) {
            const captainStats = statsMap.get(team.captain_id || '');
            if (!captainStats || captainStats.played_minutes === 0) {
              playerPoints *= 2;
            }
          }
          roundPoints += playerPoints;
        }
      }

      if (team.barakawy_round === round.id) {
        roundPoints *= 2;
      }
      totalPoints += roundPoints;
    }

    if (team.shala7_used) {
      totalPoints -= 5;
    }

    await updateFantasyTeam(team.id, { total_points: totalPoints });
  }
}
