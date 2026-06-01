import { Polyline } from "react-leaflet"

type Arrow = {
  from:[number,number]
  to:[number,number]
}

type Props = {
  arrows: Arrow[]
}

export default function KillArrows({
  arrows,
}:Props){

  return (
    <>
      {arrows.map(
        (a,i)=>(
          <Polyline
            key={i}
            positions={[
              a.from,
              a.to,
            ]}
            pathOptions={{
              color:"#ff3333",
              weight:2,
            }}
          />
        )
      )}
    </>
  )
}