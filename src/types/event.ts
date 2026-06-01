export interface GameEvent {
  user_id: string
  match_id: string
  map_id: string
  x: number
  y: number
  z: number
  ts_ms: number
  event: string
  is_bot: boolean
}