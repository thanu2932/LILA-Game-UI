import { Circle } from "react-leaflet"

type Props = {
  center:[number,number]
  radius:number
}

export default function SafeZoneOverlay({
  center,
  radius,
}:Props){

  return (
    <Circle
      center={center}
      radius={radius}
      pathOptions={{
        color:"#00e5ff",
        weight:2,
        fillOpacity:0.05,
      }}
    />
  )
}