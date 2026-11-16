import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const games = JSON.parse(
  await readFile(new URL("../src/data/games.json", import.meta.url), "utf8")
);
const gameRevisions = JSON.parse(
  await readFile(new URL("../src/data/gameRevisions.json", import.meta.url), "utf8")
);

test("Nov 13 Thunderbolts rainout is cancelled and rescheduled to Nov 17", () => {
  const original = games.find((game) => game.id === "d66-2026-11-13-02");
  assert.equal(original.status, "cancelled");
  assert.equal(
    original.notes,
    "Friday Minor B; cancelled due to rain; rescheduled to November 17"
  );
  assert.equal(original.date, "2026-11-13");

  const replacement = games.find((game) => game.id === "d66-2026-11-17-01");
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
      date: "2026-11-17",
      day: "Tuesday",
      start: "5:30 PM",
      end: "7:00 PM",
      division: "Baseball - Minors B",
      away: "LP Thunderbolts - Silva/Dager",
      home: "LP The Mighty A's - Beltran",
      location: "Las Palmas",
      field: "East Field",
      notes: "Rescheduled from November 13",
    }
  );

  assert.equal(gameRevisions[original.id], "2026-11-15T03:17:27Z");
  assert.equal(gameRevisions[replacement.id], "2026-11-15T03:17:27Z");
});
