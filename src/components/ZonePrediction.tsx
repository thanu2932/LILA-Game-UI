import { Circle } from "react-leaflet"

type Props = {
  center:[number,number]
}

export default function ZonePrediction({
  center,
}:Props){

  return (
    <Circle
      center={center}
      radius={120}
      pathOptions={{
        color:"#00ff88",
        dashArray:"8 8",
        fillOpacity:0.02,
      }}
    />
  )
}