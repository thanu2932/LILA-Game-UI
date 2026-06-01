type EventType = {
  user_id: string
  event: string
}

type Props = {
  events: EventType[]
}

export default function Scoreboard({
  events,
}: Props) {
  const scores: Record<
    string,
    number
  > = {}

  events.forEach((e) => {
    if (
      e.event === "Kill" ||
      e.event === "BotKill"
    ) {
      scores[e.user_id] =
        (scores[e.user_id] || 0) + 1
    }
  })

  const rows = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)

  return (
    <div className="absolute right-4 top-[350px] z-[1200] bg-black/90 p-4 rounded-xl text-white w-72">
      <h3 className="font-bold mb-2">
        Scoreboard
      </h3>

      {rows.map(([player, kills]) => (
        <div
          key={player}
          className="flex justify-between"
        >
          <span>{player}</span>
          <span>{kills}</span>
        </div>
      ))}
    </div>
  )
}