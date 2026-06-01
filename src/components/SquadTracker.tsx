type EventType = {
  user_id: string
}

type Props = {
  events: EventType[]
}

export default function SquadTracker({
  events,
}: Props) {
  const players = Array.from(
    new Set(events.map((e) => e.user_id))
  )

  return (
    <div className="absolute bottom-[120px] right-4 z-[1200] bg-black/90 p-4 rounded-xl text-white w-72">
      <h3 className="font-bold mb-2">
        Active Players
      </h3>

      {players.map((player) => (
        <div key={player}>
          🟢 {player}
        </div>
      ))}
    </div>
  )
}