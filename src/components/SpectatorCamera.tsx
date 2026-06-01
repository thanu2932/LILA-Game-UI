import { Marker } from "react-leaflet"

type Props = {
  position:[number,number]
}

export default function SpectatorCamera({
  position,
}:Props){

  return (
    <Marker position={position}/>
  )
}