type EventType = {
  user_id: string
  event: string
  ts: number
}

type Props = {
  selectedPlayer: string
  events: EventType[]
}

export default function PlayerCard({
  selectedPlayer,
  events,
}: Props) {
  if (selectedPlayer === "ALL")
    return null

  const playerEvents = events.filter(
    (e) => e.user_id === selectedPlayer
  )

  const kills = playerEvents.filter(
    (e) =>
      e.event === "Kill" ||
      e.event === "BotKill"
  ).length

  return (
    <div className="absolute right-4 bottom-28 z-[1000] bg-black/90 border border-yellow-600 rounded-xl p-4 w-72 text-white">
      <h2 className="font-bold text-yellow-400 mb-3">
        Player Card
      </h2>

      <div>Player: {selectedPlayer}</div>
      <div>Kills: {kills}</div>
      <div>Events: {playerEvents.length}</div>
    </div>
  )
}