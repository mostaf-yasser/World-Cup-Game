import { User, Circle } from 'lucide-react';
import type { Player } from '../lib/supabase';

interface PlayerCardProps {
  player: Player;
  onClick?: () => void;
  selected?: boolean;
  showStatus?: boolean;
  compact?: boolean;
}

const positionColors = { GK: 'bg-yellow-500', DEF: 'bg-blue-500', MID: 'bg-green-500', FWD: 'bg-red-500' };
const statusColors = { available: 'text-green-400', injured: 'text-red-400', suspended: 'text-yellow-400', eliminated: 'text-gray-400' };
const statusLabels = { available: 'Available', injured: 'Injured', suspended: 'Suspended', eliminated: 'Eliminated' };

export function PlayerCard({ player, onClick, selected, showStatus = true, compact = false }: PlayerCardProps) {
  return (
    <div
      onClick={onClick}
      className={`relative bg-dark-800/80 rounded-xl border transition-all duration-200 ${compact ? 'p-2' : 'p-4'} ${
        selected ? 'border-primary-500 shadow-glow cursor-pointer' : onClick ? 'border-dark-600 hover:border-dark-400 cursor-pointer' : 'border-dark-700'
      }`}
    >
      <div className={`flex items-center gap-${compact ? '2' : '4'}`}>
        <div className={`relative ${compact ? 'w-10 h-10' : 'w-12 h-12'} rounded-full overflow-hidden bg-dark-700 flex items-center justify-center shrink-0`}>
          {player.photo_url ? <img src={player.photo_url} alt={player.name} className="w-full h-full object-cover" /> : <User className="w-5 h-5 text-dark-400" />}
          <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 ${positionColors[player.position]} rounded-full flex items-center justify-center border-2 border-dark-800`}>
            <span className="text-[7px] font-bold text-white">{player.position}</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className={`font-semibold text-white truncate ${compact ? 'text-sm' : ''}`}>{player.name}</p>
          <p className="text-dark-300 truncate text-xs">{player.national_team}</p>
        </div>
        {showStatus && (
          <div className="flex items-center gap-1 shrink-0">
            <Circle className={`w-2 h-2 fill-current ${statusColors[player.status]}`} />
            <span className={`text-xs ${statusColors[player.status]}`}>{statusLabels[player.status]}</span>
          </div>
        )}
      </div>
      {selected && (
        <div className="absolute top-2 right-2 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
      )}
    </div>
  );
}
