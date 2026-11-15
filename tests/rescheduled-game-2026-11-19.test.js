import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const games = JSON.parse(
  await readFile(new URL("../src/data/games.json", import.meta.url), "utf8")
);
const gameRevisions = JSON.parse(
  await readFile(new URL("../src/data/gameRevisions.json", import.meta.url), "utf8")
);

test("Nov 13 rainout is cancelled and rescheduled to Nov 19", () => {
  const original = games.find((game) => game.id === "d66-2026-11-13-01");
  assert.equal(original.status, "cancelled");
  assert.equal(
    original.notes,
    "Friday Minor B; cancelled due to rain; rescheduled to November 19"
  );

  const replacement = games.find((game) => game.id === "d66-2026-11-19-01");
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
      date: "2026-11-19",
      day: "Thursday",
      start: "6:00 PM",
      end: "7:30 PM",
      division: "Baseball - Minors B",
      away: "LP Strikers - Salas",
      home: "LP Heavy Hitters - Covarrubias",
      location: "Las Palmas",
      field: "West Field",
      notes: "Rescheduled from November 13",
    }
  );

  assert.equal(gameRevisions[original.id], "2026-11-15T02:38:59Z");
  assert.equal(gameRevisions[replacement.id], "2026-11-15T02:38:59Z");
});
