# Version History

## 1.0.0 — Initial release
First curated build of the Closing Client System, replacing the general-purpose Claude Toolkit distribution for cold email work.

Included:
- Onboarding (agency profile + deal terms)
- Core workflow: list building, AI Ark CSV cleaning, optional Jina enrichment scraping, enrichment prompts, cold email copy + frameworks, campaign upload to PlusVibe, SmartLead, or Email Bison (pick one during onboarding)
- Sales process (pre-call prep, proposal, pre-call 2, agreement) — vertical-agnostic
- Sneak Peek lead magnet builder — AI-generated mockup/preview lead magnets, plugs into the cold email follow-up sequence
- On-demand utilities: research, market research, competitive landscape, competitor alternatives, sales enablement, slides, UI/UX design intelligence, email sequences, lead magnet strategy

---

**Updating from a previous version:** unzip the new version into a **new** folder — don't unzip on top of an old install. Then copy these three items over from your old folder into the new one:
- `config/.env`
- `agency-profile.md`
- `clients/` (your actual client folders, not `_template`)

Then start running `claude` from the new folder. See [SETUP.md](SETUP.md) for details.
