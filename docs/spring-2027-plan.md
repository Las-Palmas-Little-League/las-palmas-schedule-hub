# Las Palmas Schedule Hub – Spring 2027 Plan

Repo: bluke02/las-palmas-schedule-hub (Vite/React, Netlify)
Spring season start: 2027-03-06 | Fall 2026 ends: 2026-11-21

## Current state (baseline)
- Data: src/data/games.json, gameRevisions.json, schedule.json
- "Fall 2026" hardcoded in Home.jsx, GameSchedule.jsx, FieldSchedule.jsx
- ~25 date-specific tests in tests/ assert against Fall data
- Change request: GameChangeRequest.jsx -> netlify/functions/create-change-request.mjs
  -> public GitHub issue (assigned to bluke02); schedule is changed manually via PR
- PR CI: npm test + scripts/validate-game-revisions.mjs

## Phase 0 – Fall close-out (after 11/21/26)
- [ ] Confirm final games, makeups, and revisions are merged
- [ ] Tag repo `fall-2026-final`

## Phase 1 – Archive Fall 2026 (PR 1, Dec–Jan)
- [ ] Create src/data/archive/2026-fall/ (games, gameRevisions, schedule JSON)
- [ ] Move Fall date-specific tests to tests/archive/2026-fall/ and fix imports
- [ ] Add src/data/season.js ({ id, name, start, end }) and replace the 3 hardcoded "Fall 2026" strings
- [ ] Add a Past Seasons page/route (/seasons, /seasons/2026-fall) reading archived JSON, read-only
- [ ] Reset active games.json / gameRevisions.json / schedule.json for Spring
- [ ] Make validator and tests work with archive (validator only watches active season files)
- [ ] Add a "dates within season" test
- Done when: npm test + build pass; Netlify preview shows archive and empty Spring

## Phase 2 – Spring data load (PR 2, Feb)
- [ ] Add team IDs (stable slug per team) to games/schedule data; keep display names
- [ ] Load Spring games (IDs like d66-2027-03-06-01) + revision timestamps
- [ ] Build practice schedule.json
- [ ] Optional: script to turn a SportsConnect roster CSV export into team list/coach names
      (no personal data in the public repo)
- [ ] Check times around DST change on 3/14/2027
- Done when: coaches confirm their team pages are accurate

## Phase 3 – Request-a-change enhancements (PR 3)
Today: changes only edit an existing game. Add request types:
1. Add new game (e.g. double header): date, start/end, home/away, division, field, location,
   optional link to an existing game ("second game of double header")
2. Reschedule a cancelled game (same season): pick from games marked cancelled in Notes;
   new date/time/field; keeps link note to the original date
3. Keep existing field-edit type
- [ ] Form: request-type selector that swaps the fields shown (GameChangeRequest.jsx)
- [ ] Function: validate each type server-side; issue title/body per type
      (create-change-request.mjs); still creates an issue, never edits the schedule
- [ ] Cancelled-game picker derived from notes/status; limit to current season
- [ ] Conflict hints: warn if field/time overlaps an existing game or a team plays twice at once
- [ ] Tests for validation of each request type
- [ ] Follow README rules: rescheduled games are new rows with a note; originals stay marked cancelled

## Phase 4 – Team calendar export (PR 4)
- [ ] Generate per-team .ics at build time: /calendar/<team-id>.ics (games + practices)
- [ ] "Subscribe / Add to calendar" button on team pages (Team Finder)
- [ ] Stable event UIDs (game id) so updates replace old events; bump SEQUENCE using revision timestamp
- [ ] Timezone: America/Los_Angeles (verify league timezone)
- [ ] Test .ics output; verify in Google/Apple/Outlook

## Phase 5 – Email notifications (PR 5)
- [ ] Choose provider (e.g. Resend, Postmark, or Mailgun)
- [ ] Subscribe form: email + team(s); double opt-in; unsubscribe link in each email
- [ ] Store subscribers privately (Netlify Blobs/DB or provider audience); NEVER in the public repo
- [ ] GitHub Action on merge to main: diff games.json vs previous commit ->
      list of added/changed/cancelled games -> notify subscribers of affected teams
      (call a Netlify function with a secret)
- [ ] Email content: what changed (old -> new), link to team page, .ics link
- [ ] Secrets in Netlify/GitHub secrets only
- [ ] Test with a test list before enabling for everyone; announce to coaches/parents

## Phase 6 – Launch (late Feb – early Mar)
- [ ] Publish Spring schedule 1–2 weeks before 3/6/2027
- [ ] Announce new features (archive, calendar, notifications, change request)
- [ ] Monitor first weekends; fix issues

## Open questions / decisions
- SportsConnect: ask league admin/Stack Sports if any API access exists; otherwise CSV export
- Who approves change requests and merges PRs (CODEOWNERS = bluke02)?
- Is the repo staying public? (affects any data/privacy choices)
- Notification scope: all stakeholders = coaches, parents, board? Per-team or league-wide options?
- Archive: use the same data format so past seasons can feed schedule forecasting later
