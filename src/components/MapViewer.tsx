import L from "leaflet"
import {
  MapContainer,
  ImageOverlay,
  Polyline,
  CircleMarker,
  Popup,
  Tooltip,
} from "react-leaflet"

import "leaflet/dist/leaflet.css"

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
  mapImage: string
  events: EventType[]

  showTrails: boolean
  showKills: boolean
  showLoot: boolean
  showStorms: boolean

  selectedPlayer: string
}

const MAP_SIZE = 1024

export const getPlayerColor =
  (
    playerId: string
  ) => {

    let hash = 0

    for (
      let i = 0;
      i < playerId.length;
      i++
    ) {
      hash +=
        playerId.charCodeAt(
          i
        )
    }

    return COLORS[
      hash %
        COLORS.length
    ]
  }
const COLORS = [
  "#ff4d4d",
  "#4da6ff",
  "#00cc88",
  "#ffd633",
  "#cc66ff",
  "#ff884d",
]

const imageBounds = [
  [0, 0],
  [MAP_SIZE, MAP_SIZE],
] as L.LatLngBoundsExpression

export default function MapViewer({
  mapImage,
  events,

  showTrails,
  showKills,
  showLoot,
  showStorms,

  selectedPlayer,
}: Props) {
  const MIN_X = -406.6295
  const MAX_X = 348.3561

  const MIN_Z = -380.0071
  const MAX_Z = 360.7577

  const normalizeX = (
    x: number
  ) => {
    return (
      ((x - MIN_X) /
        (MAX_X - MIN_X)) *
      MAP_SIZE
    )
  }

  const normalizeZ = (
    z: number
  ) => {
    return (
      ((z - MIN_Z) /
        (MAX_Z - MIN_Z)) *
      MAP_SIZE
    )
  }

  const getRadius = (
    eventType: string
  ) => {
    switch (eventType) {
      case "Kill":
      case "BotKill":
        return 5

      case "Killed":
      case "BotKilled":
        return 4

      case "Loot":
        return 3

      default:
        return 2
    }
  }

  const getColor = (
    eventType: string
  ) => {
    switch (eventType) {
      case "Kill":
      case "BotKill":
        return "#ff3b3b"

      case "Killed":
      case "BotKilled":
        return "#ffd600"

      case "Loot":
        return "#00ff88"

      case "KilledByStorm":
        return "#b455ff"

      default:
        return "#ffffff"
    }
  }

  /*
   * POSITION EVENTS
   */

  const positionEvents = events
    .filter(
      (e) =>
        e.event ===
          "Position" ||
        e.event ===
          "BotPosition"
    )
    .slice(-5000)

  /*
   * PLAYER TRAILS
   */

  const playerTrails: Record<
    string,
    [number, number][]
  > = {}

  positionEvents.forEach(
    (e) => {
      if (
        !playerTrails[
          e.user_id
        ]
      ) {
        playerTrails[
          e.user_id
        ] = []
      }

      const mapX =
        normalizeX(e.x)

      const mapZ =
        normalizeZ(e.z)

      playerTrails[
        e.user_id
      ].push([
        mapZ,
        mapX,
      ])
    }
  )

  /*
   * FILTERED EVENTS
   */

  const renderEvents =
    events.filter((e) => {

      if (
        selectedPlayer !==
          "ALL" &&
        e.user_id !==
          selectedPlayer
      ) {
        return false
      }

      if (
        e.event ===
          "Position" ||
        e.event ===
          "BotPosition"
      ) {
        return false
      }

      if (
        !showKills &&
        (
          e.event ===
            "Kill" ||
          e.event ===
            "BotKill" ||
          e.event ===
            "Killed" ||
          e.event ===
            "BotKilled"
        )
      ) {
        return false
      }

      if (
        !showLoot &&
        e.event ===
          "Loot"
      ) {
        return false
      }

      if (
        !showStorms &&
        e.event ===
          "KilledByStorm"
      ) {
        return false
      }

      return true
    })

  return (
    <MapContainer
      crs={L.CRS.Simple}
      bounds={imageBounds}
      maxBounds={imageBounds}
      zoomSnap={0.25}
      minZoom={-1}
      style={{
        width: "100%",
        height: "100vh",
        background: "#000",
      }}
    >
      <ImageOverlay
        url={mapImage}
        bounds={
          imageBounds
        }
      />

      {/* PLAYER TRAILS */}

      {showTrails &&
        Object.entries(
          playerTrails
        ).map(
          ([
            playerId,
            positions,
          ]) => {

            if (
              positions.length <
              2
            ) {
              return null
            }

            const isFocused =
              selectedPlayer ===
              playerId

            const showAll =
              selectedPlayer ===
              "ALL"

            return (
              <Polyline
                key={playerId}
                positions={
                  positions
                }
                pathOptions={{
                  color:
                    showAll
                      ? "#00e5ff"
                      : isFocused
                      ? "#ffea00"
                      : "#00e5ff",

                  weight:
                    isFocused
                      ? 4
                      : 1,

                  opacity:
                    showAll
                      ? 0.15
                      : isFocused
                      ? 1
                      : 0.03,
                }}
              />
            )
          }
        )}

      {/* EVENTS */}

      {renderEvents.map(
        (e, i) => {

          const mapX =
            normalizeX(e.x)

          const mapZ =
            normalizeZ(e.z)

          return (
            <CircleMarker
              key={i}
              center={[
                mapZ,
                mapX,
              ]}
              radius={getRadius(
                e.event
              )}
              pathOptions={{
                color:
                  getColor(
                    e.event
                  ),
                fillColor:
                  getColor(
                    e.event
                  ),
                fillOpacity: 0.9,
              }}
            >
              <Tooltip
  permanent
  direction="right"
>
  {e.user_id}
</Tooltip>
              <Popup>
                <div className="text-black">

                  <div>
                    <strong>
                      {
                        e.event
                      }
                    </strong>
                  </div>

                  <div>
                    Player:
                    {" "}
                    {
                      e.user_id
                    }
                  </div>

                  <div>
                    X:
                    {" "}
                    {e.x.toFixed(
                      2
                    )}
                  </div>

                  <div>
                    Z:
                    {" "}
                    {e.z.toFixed(
                      2
                    )}
                  </div>

                </div>
              </Popup>
            </CircleMarker>
          )
        }
      )}
    </MapContainer>
  )
}