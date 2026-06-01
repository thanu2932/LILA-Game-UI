type EventType = {
  user_id: string
  event: string
}

type Props = {
  events: EventType[]
}

export default function TeamLeaderboard({
  events,
}: Props) {
  const teams: Record<
    string,
    number
  > = {}

  events.forEach((e) => {
    const team =
      e.user_id.split("_")[0]

    if (
      e.event === "Kill" ||
      e.event === "BotKill"
    ) {
      teams[team] =
        (teams[team] || 0) + 1
    }
  })

  return (
    <div className="absolute right-4 top-[650px] z-[1200] bg-black/90 p-4 rounded-xl text-white w-72">
      <h3 className="font-bold mb-2">
        Team Ranking
      </h3>

      {Object.entries(teams).map(
        ([team, kills]) => (
          <div
            key={team}
            className="flex justify-between"
          >
            <span>{team}</span>
            <span>{kills}</span>
          </div>
        )
      )}
    </div>
  )
}