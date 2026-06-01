interface Props {
  selectedMap: string
  onMapChange: (map: string) => void

  showTrails: boolean
  setShowTrails: (value: boolean) => void

  showKills: boolean
  setShowKills: (value: boolean) => void

  showLoot: boolean
  setShowLoot: (value: boolean) => void

  showStorms: boolean
  setShowStorms: (value: boolean) => void

  speed: number
  setSpeed: (value: number) => void

  selectedPlayer: string
  setSelectedPlayer: (value: string) => void

  players: string[]
}
export default function ControlPanel({
  selectedMap,
  onMapChange,

  showTrails,
  setShowTrails,

  showKills,
  setShowKills,

  showLoot,
  setShowLoot,

  showStorms,
  setShowStorms,

  speed,
  setSpeed,

  selectedPlayer,
  setSelectedPlayer,

  players,
}: Props) {
  return (
    <div className="absolute top-4 left-4 z-[1000] w-80 bg-slate-900/95 border border-slate-700 rounded-xl p-4 shadow-xl text-white">

      <h2 className="text-xl font-bold mb-4">
        LILA Observer Controls
      </h2>

      {/* MAP */}

      <div className="mb-4">
        <label className="block text-sm text-slate-300 mb-1">
          Select Map
        </label>

        <select
          value={selectedMap}
          onChange={(e) =>
            onMapChange(
              e.target.value
            )
          }
          className="w-full bg-slate-800 border border-slate-600 rounded-lg p-2"
        >
          <option value="AmbroseValley">
            Ambrose Valley
          </option>

          <option value="GrandRift">
            Grand Rift
          </option>

          <option value="Lockdown">
            Lockdown
          </option>
        </select>
      </div>

      {/* PLAYER FOCUS */}

      <div className="mb-4">
        <label className="block text-sm text-slate-300 mb-1">
          Focus Player
        </label>

        <select
          value={selectedPlayer}
          onChange={(e) =>
            setSelectedPlayer(
              e.target.value
            )
          }
          className="w-full bg-slate-800 border border-slate-600 rounded-lg p-2"
        >
          {players.map(
            (player) => (
              <option
                key={player}
                value={player}
              >
                {player}
              </option>
            )
          )}
        </select>
      </div>

      {/* VISIBILITY */}

      <div className="mb-4">

        <div className="text-sm text-slate-300 mb-2">
          Visibility
        </div>

        <div className="space-y-2">

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showTrails}
              onChange={() =>
                setShowTrails(
                  !showTrails
                )
              }
            />
            Trails
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showKills}
              onChange={() =>
                setShowKills(
                  !showKills
                )
              }
            />
            Kill Events
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showLoot}
              onChange={() =>
                setShowLoot(
                  !showLoot
                )
              }
            />
            Loot Events
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showStorms}
              onChange={() =>
                setShowStorms(
                  !showStorms
                )
              }
            />
            Storm Deaths
          </label>

        </div>
      </div>

      {/* SPEED */}

      <div className="mb-4">

        <label className="block text-sm text-slate-300 mb-1">
          Playback Speed
        </label>

        <select
          value={speed}
          onChange={(e) =>
            setSpeed(
              Number(
                e.target.value
              )
            )
          }
          className="w-full bg-slate-800 border border-slate-600 rounded-lg p-2"
        >
          <option value={1}>
            1x
          </option>

          <option value={2}>
            2x
          </option>

          <option value={5}>
            5x
          </option>

          <option value={10}>
            10x
          </option>

          <option value={20}>
            20x
          </option>
        </select>

      </div>

      <div className="border-t border-slate-700 pt-3 text-xs text-slate-400">

        LILA Telemetry Observer

        <br />

        BGMI / Free Fire Analytics

      </div>

    </div>
  )
}