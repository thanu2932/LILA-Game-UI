type Props = {
  speed: number
  setSpeed: (
    value: number
  ) => void
}
export default function ReplayControls({
  speed,
  setSpeed,
}: Props) {
  return (
    <div className="absolute bottom-[90px] left-1/2 -translate-x-1/2 z-[1200] bg-black/90 rounded-xl px-4 py-2 text-white">
      <div className="flex gap-2">
        {[1, 2, 5, 10, 20].map(
          (s) => (
            <button
              key={s}
              onClick={() =>
                setSpeed(s)
              }
              className={
                speed === s
                  ? "bg-green-600 px-3 py-1 rounded"
                  : "bg-slate-700 px-3 py-1 rounded"
              }
            >
              {s}x
            </button>
          )
        )}
      </div>
    </div>
  )
}