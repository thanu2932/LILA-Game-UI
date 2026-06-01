type EventType = {
  user_id: string
  match_id: string
  map_id: string
  x: number
  y: number
  z: number
  ts: number
  event: string
}

type Props = {
  events: EventType[]
}

export default function KillFeed({
  events,
}: Props) {
  const killEvents = events
    .filter(
      (e) =>
        e.event === "Kill" ||
        e.event === "BotKill"
    )
    .sort((a, b) => b.ts - a.ts)
    .slice(0, 12)

  return (
    <div className="absolute top-[380px] left-4 z-[1000] w-80 bg-black/90 border border-red-700 rounded-xl p-4 text-white">
      <h2 className="font-bold text-red-400 mb-3">
        Kill Feed
      </h2>

      {killEvents.map((kill, index) => (
        <div
          key={index}
          className="border-b border-slate-700 py-2"
        >
          <div>{kill.user_id}</div>
          <div className="text-red-400">
            {kill.event}
          </div>
        </div>
      ))}
    </div>
  )
}