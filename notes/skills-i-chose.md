# Skills I chose

Searched skills.sh on 2026-11-03 for "email marketing", "email sequence", "campaign plan" and "resend". Nothing is installed yet.

## Use these

**1. Writing campaigns: Anthropic's `knowledge-work-plugins`**
- Skills: `campaign-plan` (3.3K installs) and `email-sequence` (3K installs).
- Publisher: anthropics, the company that makes Claude. Official.
- Repo: github.com/anthropics/knowledge-work-plugins, 34.5K stars, Apache-2.0 license, updated 2026-11-02.
- Why: it covers both planning a campaign and writing the emails in it, from a source that is maintained and accountable.
- Runner-up: `coreyhaines31/marketingskills` (58K stars, MIT, very popular `email-sequence` and `copywriting` skills). It's good, but it's one person's repo, not an official publisher.

**2. Sending email: Resend's `resend-skills`**
- Skills: `resend` (24.1K installs), plus `resend-cli` and `send-email` from the same repo.
- Publisher: resend, the company that runs the email sending service. Official.
- Repo: github.com/resend/resend-skills, 209 stars, MIT license, updated 2026-10-28.
- Why: the people who build the sending API wrote it, so it should match how Resend actually works. The star count is low only because the repo is new (January 2026). Resend's `react-email` repo (19.9K stars) is also worth adding later for building email templates.

## Avoid these

**1. `caffeinelabs/skills@extension-email-marketing`**
- It shows the most installs in the email marketing search (29.6K), but its GitHub repo has only 2 stars.
- That gap is a warning sign: install counts can be inflated, while stars are harder to fake. I couldn't find a reason to trust it over the official options.

**2. `gocallum/nextjs16-agent-skills@resend-integration-skills`**
- An unofficial Resend skill from one person: 23 stars, no license, last updated January 2026.
- No license means you have no clear right to use it. Resend's own skill does the same job and is maintained.

## How I decided

Check these three things before installing any skill:

1. **Who publishes it.** Prefer the company behind the tool (anthropics, resend) over a random account. Click through to the GitHub repo and check the owner is who they claim to be.
2. **Whether the numbers agree.** Compare installs on skills.sh with stars, recent updates and a license on GitHub. Lots of installs but almost no stars, no license, or no updates for months are all red flags.
3. **What the skill actually does.** Read its `SKILL.md` and any scripts before installing. A skill can tell Claude to run commands or send data somewhere, so make sure nothing asks for API keys, uploads files or runs code you don't understand.
