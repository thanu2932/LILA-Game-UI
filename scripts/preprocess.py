import os
import json
import pandas as pd  # type: ignore[import]

INPUT_DIR = "player_data"
OUTPUT_FILE = "public/data/events.json"

all_events = []

for root, dirs, files in os.walk(INPUT_DIR):
    for file in files:
        print("FOUND FILE:", file)

        if file.endswith(".nakama-0"):
            path = os.path.join(root, file)

            try:
                print(f"Reading: {path}")

                df = pd.read_parquet(path)

                print("Columns:", list(df.columns))
                print(df.head(3))

                required_columns = [
                    "user_id",
                    "match_id",
                    "map_id",
                    "x",
                    "y",
                    "z",
                    "ts",
                    "event",
                ]

                missing = [
                    col
                    for col in required_columns
                    if col not in df.columns
                ]

                if missing:
                    print(
                        f"Skipping {file} - Missing columns: {missing}"
                    )
                    continue

                df = df[required_columns].copy()

                # Convert timestamp to unix milliseconds
                if "ts" in df.columns:
                    df["ts"] = (
                        pd.to_datetime(df["ts"])
                        .astype("int64")
                        // 10**6
                    )

                # Convert byte strings like b'Position'
                if "event" in df.columns:
                    df["event"] = df["event"].apply(
                        lambda x: x.decode("utf-8")
                        if isinstance(x, bytes)
                        else str(x)
                    )

                records = (
                    df.fillna("")
                      .to_dict(orient="records")
                )

                all_events.extend(records)

            except Exception as e:
                print(
                    f"Error reading {path}: {e}"
                )

os.makedirs(
    os.path.dirname(OUTPUT_FILE),
    exist_ok=True,
)

with open(
    OUTPUT_FILE,
    "w",
    encoding="utf-8",
) as f:
    json.dump(
        all_events,
        f,
        ensure_ascii=False,
    )

print(
    f"\nExported {len(all_events)} events"
)

if len(all_events):
    xs = [
        float(e["x"])
        for e in all_events
        if e["x"] != ""
    ]

    ys = [
        float(e["y"])
        for e in all_events
        if e["y"] != ""
    ]

    print(
        f"X Range: {min(xs)} -> {max(xs)}"
    )
    print(
        f"Y Range: {min(ys)} -> {max(ys)}"
    )
    zs = [
    float(e["z"])
    for e in all_events
    if e["z"] != ""
]

print(
    f"Z Range: {min(zs)} -> {max(zs)}"
)