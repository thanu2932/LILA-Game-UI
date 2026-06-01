type Props = {
  players: number
  kills: number
  loot: number
  storm: number
}

export default function TournamentHeader({
  players,
  kills,
  loot,
  storm,
}: Props) {
  return (
    <div className="absolute top-0 left-0 right-0 z-[1200] flex justify-center">
      <div className="bg-black/95 border border-slate-700 rounded-b-xl px-10 py-3 flex gap-10 text-white">
        <div>👥 {players}</div>
        <div>💀 {kills}</div>
        <div>🎒 {loot}</div>
        <div>⚡ {storm}</div>
      </div>
    </div>
  )
}