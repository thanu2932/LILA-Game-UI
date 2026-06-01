// Use a weakly typed import for the heatmap layer package when type declarations are unavailable.
// @ts-ignore
import HeatmapLayer from "react-leaflet-heatmap-layer-v3"

type EventType = {
  x:number
  z:number
}

type Props = {
  points: EventType[]
  normalizeX:(x:number)=>number
  normalizeZ:(z:number)=>number
}

export default function Heatmap({
  points,
  normalizeX,
  normalizeZ,
}:Props){

  const data = points.map(p => ({
    lat: normalizeZ(p.z),
    lng: normalizeX(p.x),
    intensity: 1,
  }))

  type DataPoint = typeof data[number]

  return (
    <HeatmapLayer
      fitBoundsOnLoad={false}
      fitBoundsOnUpdate={false}
      points={data}
      longitudeExtractor={(m: DataPoint)=>m.lng}
      latitudeExtractor={(m: DataPoint)=>m.lat}
      intensityExtractor={(m: DataPoint)=>m.intensity}
    />
  )
}