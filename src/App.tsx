import { useEffect, useMemo, useState } from "react"
import MapViewer from "./components/MapViewer"
import ControlPanel from "./components/ControlPanel"
import KillFeed from "./components/KillFeed"
import PlayerCard from "./components/PlayerCard"
import Scoreboard from "./components/Scoreboard"
import SquadTracker from "./components/SquadTracker"
import TournamentHeader from "./components/TournamentHeader"
import TeamLeaderboard from "./components/TeamLeaderboard"
import ReplayControls from "./components/ReplayControls"

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

const MAPS = [
  {
    id: "AmbroseValley",
    name: "Ambrose Valley",
    image:
      "/minimaps/AmbroseValley_Minimap.png",
  },
  {
    id: "GrandRift",
    name: "Grand Rift",
    image:
      "/minimaps/GrandRift_Minimap.png",
  },
  {
    id: "Lockdown",
    name: "Lockdown",
    image:
      "/minimaps/Lockdown_Minimap.jpg",
  },
]

export default function App() {
  const [events, setEvents] =
    useState<EventType[]>([])

  const [
    selectedMapId,
    setSelectedMapId,
  ] = useState(MAPS[0].id)

  const [timeline, setTimeline] =
    useState(100)

  const [isPlaying, setIsPlaying] =
    useState(false)

  const [speed, setSpeed] =
    useState(1)

  const [showTrails, setShowTrails] =
    useState(true)

  const [showKills, setShowKills] =
    useState(true)

  const [showLoot, setShowLoot] =
    useState(true)

  const [showStorms, setShowStorms] =
    useState(true)

  const [
    selectedPlayer,
    setSelectedPlayer,
  ] = useState("ALL")

  const selectedMap =
    MAPS.find(
      (map) =>
        map.id === selectedMapId
    ) ?? MAPS[0]

  useEffect(() => {
    fetch("/data/events.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(
          "Loaded Events:",
          data.length
        )

        setEvents(data)
      })
  }, [])

  const players =
    useMemo(
      () => [
        "ALL",
        ...Array.from(
          new Set(
            events.map(
              (e) =>
                e.user_id
            )
          )
        ),
      ],
      [events]
    )

  const mapEvents =
    useMemo(() => {
      return events.filter(
        (e) =>
          e.map_id ===
          selectedMap.id
      )
    }, [
      events,
      selectedMap.id,
    ])

  const sortedEvents =
    useMemo(() => {
      return [...mapEvents].sort(
        (a, b) =>
          a.ts - b.ts
      )
    }, [mapEvents])

  const minTime =
    sortedEvents[0]?.ts ?? 0

  const maxTime =
    sortedEvents[
      sortedEvents.length - 1
    ]?.ts ?? 0

  const currentTime =
    minTime +
    ((maxTime - minTime) *
      timeline) /
      100

  const visibleEvents =
    sortedEvents.filter(
      (e) =>
        e.ts <= currentTime
    )

  const killCount =
    visibleEvents.filter(
      (e) =>
        e.event === "Kill" ||
        e.event === "BotKill"
    ).length

  const lootCount =
    visibleEvents.filter(
      (e) =>
        e.event === "Loot"
    ).length

  const stormDeaths =
    visibleEvents.filter(
      (e) =>
        e.event ===
        "KilledByStorm"
    ).length

  const uniquePlayers =
    new Set(
      visibleEvents.map(
        (e) => e.user_id
      )
    )

  useEffect(() => {
    if (!isPlaying) return

    const timer =
      setInterval(() => {
        setTimeline(
          (prev) => {
            if (
              prev >= 100
            ) {
              setIsPlaying(
                false
              )

              return 100
            }

            return Math.min(
              prev + 1,
              100
            )
          }
        )
      }, 100 / speed)

    return () =>
      clearInterval(timer)
  }, [
    isPlaying,
    speed,
  ])

  const elapsedSeconds =
    Math.floor(
      (currentTime -
        minTime) /
        1000
    )

    

 return (
  <div className="relative w-screen h-screen bg-black overflow-hidden">

    {/* Tournament Header */}
    <div className="absolute top-0 left-0 right-0 z-[1100] flex justify-center">
      <div className="bg-black/90 border border-slate-700 rounded-b-xl px-8 py-3 text-white flex gap-8">

        <div>
          Players: {uniquePlayers.size}
        </div>

        <div>
          Kills: {killCount}
        </div>

        <div>
          Loot: {lootCount}
        </div>

        <div>
          Storm: {stormDeaths}
        </div>

      </div>
    </div>

    {/* LEFT CONTROL PANEL */}
    <ControlPanel
      selectedMap={selectedMapId}
      onMapChange={setSelectedMapId}
      showTrails={showTrails}
      setShowTrails={setShowTrails}
      showKills={showKills}
      setShowKills={setShowKills}
      showLoot={showLoot}
      setShowLoot={setShowLoot}
      showStorms={showStorms}
      setShowStorms={setShowStorms}
      speed={speed}
      setSpeed={setSpeed}
      selectedPlayer={selectedPlayer}
      setSelectedPlayer={setSelectedPlayer}
      players={players}
    />

    {/* RIGHT OBSERVER PANEL */}
    <div className="absolute top-16 right-4 z-[1100] bg-black/90 border border-slate-700 rounded-xl p-4 text-white min-w-[260px]">

      <h2 className="text-xl font-bold mb-3">
        Observer Panel
      </h2>

      <div>Map: {selectedMap.name}</div>

      <div>
        Events: {visibleEvents.length}
      </div>

      <div>
        Players: {uniquePlayers.size}
      </div>

      <div>
        Kills: {killCount}
      </div>

      <div>
        Loot: {lootCount}
      </div>

      <div>
        Storm Deaths: {stormDeaths}
      </div>

      <div>
        Match Time: {elapsedSeconds}s
      </div>

      <div>
        Playback: {speed}x
      </div>

      <div>
        Timeline: {timeline}%
      </div>

      <div>
        Focus Player: {selectedPlayer}
      </div>

    </div>

    {/* KILL FEED */}
    <KillFeed
      events={visibleEvents}
    />

    {/* PLAYER CARD */}
    <PlayerCard
      selectedPlayer={selectedPlayer}
      events={visibleEvents}
    />

    {/* PLAYBACK BAR */}
    <div className="absolute bottom-0 left-0 right-0 z-[1100] bg-black/90 border-t border-slate-700 p-4">

      <div className="flex items-center gap-4">

        <button
          onClick={() =>
            setIsPlaying(!isPlaying)
          }
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>

        <button
          onClick={() =>
            setTimeline(0)
          }
          className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg"
        >
          Reset
        </button>

        <input
          type="range"
          min={0}
          max={100}
          value={timeline}
          onChange={(e) =>
            setTimeline(
              Number(e.target.value)
            )
          }
          className="w-full"
        />

      </div>

    </div>

    {/* MAP LAST */}
    <MapViewer
      mapImage={selectedMap.image}
      events={visibleEvents}
      selectedPlayer={selectedPlayer}
      showTrails={showTrails}
      showKills={showKills}
      showLoot={showLoot}
      showStorms={showStorms}
    />

    <TournamentHeader
  players={uniquePlayers.size}
  kills={killCount}
  loot={lootCount}
  storm={stormDeaths}
/>

<Scoreboard
  events={visibleEvents}
/>

<SquadTracker
  events={visibleEvents}
/>
<TeamLeaderboard
  events={visibleEvents}
/>

<ReplayControls
  speed={speed}
  setSpeed={setSpeed}
/>

  </div>
  )
}