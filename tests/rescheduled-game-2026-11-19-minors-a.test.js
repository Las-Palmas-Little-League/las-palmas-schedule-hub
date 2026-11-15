import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const games = JSON.parse(
  await readFile(new URL("../src/data/games.json", import.meta.url), "utf8")
);
const gameRevisions = JSON.parse(
  await readFile(new URL("../src/data/gameRevisions.json", import.meta.url), "utf8")
);

test("Nov 14 Minors A rainout is cancelled and rescheduled to Nov 19", () => {
  const original = games.find((game) => game.id === "d66-2026-11-14-04");
  assert.equal(original.status, "cancelled");
  assert.equal(
    original.notes,
    "Cancelled due to rain; rescheduled to November 19"
  );
  assert.equal(original.date, "2026-11-14");

  const replacement = games.find((game) => game.id === "d66-2026-11-19-02");
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
      start: "5:30 PM",
      end: "7:00 PM",
      division: "Baseball - Minors A",
      away: "LP Titans - Svehla",
      home: "LP Red Tails Minors A - Gomez",
      location: "Las Palmas",
      field: "East Field",
      notes: "Rescheduled from November 14",
    }
  );

  assert.equal(gameRevisions[original.id], "2026-11-15T02:52:54Z");
  assert.equal(gameRevisions[replacement.id], "2026-11-15T02:52:54Z");
});
