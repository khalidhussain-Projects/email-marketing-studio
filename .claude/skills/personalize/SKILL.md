---
name: personalize
description: Write a version of each campaign email for every lead group in leads/leads.csv. Use when a campaign's emails are final and you want one copy per group.
argument-hint: "[campaign folder]"
context: fork
allowed-tools: Read, Glob, Grep, Write
---

# Personalize campaign emails by lead group

Campaign folder: $ARGUMENTS

## Step 1. Check the campaign folder

- If no campaign folder was given, **stop**. List the folders that exist in `campaigns/` (use Glob on `campaigns/*/`) and reply only with that list and this line: "Run /personalize again with one of these folders."
- Accept either `globewell-launch` or `campaigns/globewell-launch`.
- If the folder doesn't exist, or has no `emails/*.md` files, stop and say so, and list the folders that do exist.

## Step 2. Find the lead groups

- Read `leads/leads.csv`. The groups are the distinct values in the `group` column. Use the groups that are in the file. Don't use a fixed list.
- Don't copy any lead's name, email or other details into an email. Groups are the only thing you take from this file.

## Step 3. Read the rules before writing

Read these first, and follow them in every version:

- `brand/voice.md`: voice, words to avoid, claims rules and the sign-off.
- `.claude/rules/emails.md`: subject and preview limits, the `{{first_name}}` greeting, one main link, disclaimers, the sign-off and footer, and plain-text copies.
- The campaign's `plan.md`, if there is one, especially its audience table and "Things we won't say".

## Step 4. Write one version per group

For each email file in `<campaign folder>/emails/*.md`, and for each group:

**Keep exactly the same:**
- The `Subject:` and `Preview:` lines
- The structure: the same sections, in the same order
- The main link: the same URL and the same button text
- Every product fact, quote, disclaimer, risk warning and compliance note
- The sign-off and the footer, character for character

**Change only two things:**
1. **The opening line** after the greeting, so it speaks to that group's situation.
2. **One example** in the body, so it fits that group. For instance, a trip, a study year or a pilgrimage.

**Stay safe while you change them:**
- Don't add any new claim, number, benefit or plan detail. The new opening line and example can only use facts already in the email or in the plan.
- Use the plan's audience table to understand each group. If the plan says which plans fit a group, don't name a plan the plan rules out.
- Follow every rule in `brand/voice.md`. No pressure words, no fear lines, no exclamation marks, no emojis, and never "customer".
- If the plan has extra rules for a group, follow them. For example, for pilgrims: don't link the product to religious duty, and never call a conventional product Shariah-compliant.

**Emails that are already for one group:** if a file name ends with a group's name (for example `02-plans-pilgrims-abroad.md`), it's already written for that group. Copy it unchanged into that group's folder only, and don't write versions of it for other groups.

## Step 5. Save the files

- Save each version to `<campaign folder>/groups/<group>/emails/<same file name>.md`.
- `.claude/rules/emails.md` asks for a plain-text copy of every email. Write one for each version to `<campaign folder>/groups/<group>/emails/plain-text/<same name>.txt`, following that rule's plain-text format.
- **Never overwrite a file that already exists.** Use Glob to check first. If a file is already there, skip it and list it in your reply as "skipped, already exists". Replacing it would delete someone's draft, and the studio rules say to ask before deleting anything.
- Only write files. Never send email.

## Step 6. Check before you reply

For every file you wrote, check that:

- the subject is 50 characters or fewer, and the preview is 90 or fewer
- it has `{{first_name}}`, and exactly one main link
- the sign-off and the footer match the original email exactly
- nothing apart from the opening line and one example differs from the original

Fix anything that fails before replying.

## Step 7. Reply with a short summary only

Reply with only these lines:

- **Files written:** the number of `.md` files and `.txt` files, and how many were skipped. List any skipped files.
- **Example opening line per group:** one line for each group, written as `<group>: "<opening line>"`.

Don't paste the full emails.
