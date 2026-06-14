import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type PlayerPosition = 'GK' | 'DEF' | 'MID' | 'FWD';
export type RoundStage = 'group' | 'round_of_32' | 'round_of_16' | 'quarter_final' | 'semi_final' | 'third_place' | 'final';
export type PlayerStatus = 'available' | 'injured' | 'suspended' | 'eliminated';

export interface Player {
  id: string;
  name: string;
  national_team: string;
  position: PlayerPosition;
  photo_url: string | null;
  status: PlayerStatus;
  created_at: string;
  updated_at: string;
}

export interface Round {
  id: string;
  name: string;
  round_number: number;
  stage: RoundStage;
  transfers_open: boolean;
  is_locked: boolean;
  is_finished: boolean;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface FantasyTeam {
  id: string;
  user_id: string;
  name: string;
  logo_url: string | null;
  description: string | null;
  manager_name: string;
  total_points: number;
  current_round_points: number;
  barakawy_used: boolean;
  barakawy_round: string | null;
  shala7_used: boolean;
  captain_id: string | null;
  vice_captain_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface TeamPlayer {
  id: string;
  team_id: string;
  player_id: string;
  is_starter: boolean;
  position_order: number | null;
  created_at: string;
  player?: Player;
}

export interface PlayerStats {
  id: string;
  player_id: string;
  round_id: string;
  win_match: boolean;
  goals: number;
  assists: number;
  man_of_the_match: boolean;
  penalty_save: boolean;
  clean_sheet: boolean;
  red_card: boolean;
  played_minutes: number;
  fantasy_points: number;
  created_at: string;
  updated_at: string;
  player?: Player;
  round?: Round;
}

export interface Transfer {
  id: string;
  team_id: string;
  round_id: string;
  player_out_id: string | null;
  player_in_id: string;
  created_at: string;
  round?: Round;
}

export interface Substitution {
  id: string;
  team_id: string;
  round_id: string;
  starter_player_id: string;
  bench_player_id: string;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  display_name: string | null;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}
