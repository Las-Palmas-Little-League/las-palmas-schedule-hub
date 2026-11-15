import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const games = JSON.parse(
  await readFile(new URL("../src/data/games.json", import.meta.url), "utf8")
);
const gameRevisions = JSON.parse(
  await readFile(new URL("../src/data/gameRevisions.json", import.meta.url), "utf8")
);

test("Nov 14 PocoLocas game is cancelled and corrected for Nov 18", () => {
  const original = games.find((game) => game.id === "sb-2026-11-14-04");
  assert.equal(original.status, "cancelled");
  assert.equal(
    original.notes,
    "Cancelled; rescheduled to November 18 with opponent corrected to LP Diamond Girls - Lugo"
  );
  assert.equal(original.date, "2026-11-14");
  assert.equal(original.home, "LP - ChiquiTrinas - Munoz/Becerra");

  const replacement = games.find((game) => game.id === "sb-2026-11-18-01");
  assert.deepEqual(
    {
      date: replacement.date,
      day: replacement.day,
      start: replacement.start,
      end: replacement.end,
      division: replacement.division,
      away: replacement.away,
      home: replacement.home,
      location: replacement.location,
      field: replacement.field,
      notes: replacement.notes,
    },
    {
      date: "2026-11-18",
      day: "Wednesday",
      start: "5:30 PM",
      end: "7:00 PM",
      division: "Softball - Minors",
      away: "LP PocoLocas - Cortez",
      home: "LP Diamond Girls - Lugo",
      location: "Las Palmas",
      field: "West Field",
      notes:
        "Rescheduled from November 14; opponent corrected from LP - ChiquiTrinas - Munoz/Becerra",
    }
  );

  assert.equal(gameRevisions[original.id], "2026-11-15T02:46:16Z");
  assert.equal(gameRevisions[replacement.id], "2026-11-15T02:46:16Z");
});
