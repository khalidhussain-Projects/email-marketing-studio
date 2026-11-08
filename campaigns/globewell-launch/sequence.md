# Globewell email sequence: "Covered Abroad"

- **Status:** Draft. Not approved. Compliance must sign off every email before anything is sent. This studio does not send email.
- **Plan:** `plan.md` in this folder.
- **Email files:** `emails/`
- **Written:** 2026-11-08

## Overview

| # | File | Subject | Purpose | Send | Who gets it |
|---|---|---|---|---|---|
| E1 | `01-health-cover-in-dollars.md` | Health cover in dollars, wherever you go | Introduce the core message | Mon 7 Dec | All leads |
| E2 | `02-plans-frequent-travellers.md` | Choose the plan that fits where you go | Help pick a plan by where they travel | Thu 10 Dec | `frequent-travellers` |
| E2 | `02-plans-students-abroad.md` | Choose the plan that fits where you study | Help check the study country is covered | Thu 10 Dec | `students-abroad` |
| E2 | `02-plans-pilgrims-abroad.md` | Choose a plan that covers Saudi Arabia | Show which plans cover Saudi Arabia | Thu 10 Dec | `pilgrims-abroad` |
| E3 | `03-family-on-one-plan.md` | Your family on one plan | Family cover features | Tue 15 Dec | `students-abroad`, `pilgrims-abroad` |
| E4 | `04-questions-answered.md` | Your questions about our plan, answered | Answer common questions | Mon 21 Dec | No quote request yet |
| — | — | — | Quiet week | 22 to 27 Dec | — |
| E5 | `05-trips-and-study-2027.md` | Planning trips or study in 2027? | Calm reminder before 2027 | Tue 29 Dec | No quote request yet |

Every email has one button: "Get a quote", linking to `https://tpllife.com/international-health-insurance-plan-globewell/#GetQuote`. Add tracking tags per email and group.

## Flow

```
[Lead on final send list] --> E1 (Mon 7 Dec)
                               |
                         Asked for quote? --Yes--> [EXIT: converted]
                               | No
                               v
                     E2 by group (Thu 10 Dec)
                               |
                         Asked for quote? --Yes--> [EXIT]
                               | No
                               v
       students / pilgrims --> E3 (Tue 15 Dec)    frequent travellers skip E3
                               |
                         Asked for quote? --Yes--> [EXIT]
                               | No
                               v
                         E4 (Mon 21 Dec)
                               |
                     [Quiet week 22 to 27 Dec]
                               |
                         Asked for quote? --Yes--> [EXIT]
                               | No
                               v
                         E5 (Tue 29 Dec)
                               |
                     [EXIT: sequence complete, 3 Jan]
```

## Rules

- **Exit:** anyone who sends the Get a Quote form or calls the UAN about the plan leaves the sequence at once.
- **Suppress:** unsubscribed leads, leads without marketing consent, and anyone already in another TPL Life campaign that week.
- **No re-entry** during this campaign.
- **Pause the whole sequence** if the Globewell page changes. Check it before every send.

## Changes from the plan, for you to confirm

1. **E2 has 3 versions, not 5.** `leads/leads.csv` only has three groups: `frequent-travellers`, `students-abroad` and `pilgrims-abroad`. There are no "families planning treatment abroad" or "Gulf and regional visitors" leads, so those versions weren't written.
2. **E1 has no "Where do you travel most?" links.** Leads are already tagged by group, and the email rules allow exactly one main link.
3. **E3 goes to students and pilgrims only.** The plan says families and parents of students. Pilgrims often travel with family, so they get it too. Frequent travellers skip it.

## Open items before sending

- **SECP disclaimer and risk wording:** none on the Globewell page. Each email has a `[COMPLIANCE: ...]` placeholder above the sign-off.
- **Hand check of the page:** quotes were checked against the page by automated fetch on 2026-11-08. They all matched. voice.md says a person must open the page and see the words, so this still needs doing.
- **Saudi Arabia (E2 pilgrims):** the email says the "Worldwide" and "Worldwide excluding US" plans include Saudi Arabia. The page doesn't name Saudi Arabia. Compliance to confirm.
- **Bronze asterisks:** the page shows "Thailand\* & Malaysia\*" for Bronze with no footnote. Copied as shown. Ask the product team what they mean.
- **"Cashless" and "companion hospital stays":** quoted only, with no explanation. Add one only if the brochure or product team confirms it.
- **Not used:** "PAKISTAN'S FIRST-EVER..." and "Fast access to medical assistance worldwide" need compliance approval first.
- **Who signs for leads:** they may not have a Relationship Manager yet (plan step 5).
- **Footer line:** it says "you made a quote enquiry". That matches the `consent` column in `leads.csv`. Check it's true for the final list.

## A/B tests

1. **E1 subject:** "Health cover in dollars, wherever you go" against "Health cover of up to US$500,000". Split 50/50 on 20% of the list, send the winner (by quote clicks, not opens) to the rest after 24 hours.
2. **E5 subject:** "Planning trips or study in 2027?" against "Health cover for your 2027 trips". Measure by quote clicks.
3. **Button text:** "Get a quote" against "Ask for a quote" in E4. Measure click rate.

## Measures

| Measure | Target | Notes |
|---|---|---|
| Quote requests | 5% of the final send list by 3 Jan | Main goal, from the plan |
| Click rate per email | 4% or more | From the plan. Typical lead nurture: 3 to 7%. |
| Open rate | Track | Typical lead nurture: 20 to 30% |
| Unsubscribes | Under 2% in total | From the plan |
| Quote requests by group | Compare the 3 groups | From group tags |

Review every Monday during the campaign.

## Setup checklist (any email tool)

1. Import the final send list with the `group` column as a tag.
2. Create one flow with the send dates above.
3. Add a split on `group` for E2 and E3.
4. Set the exit trigger: Get a Quote form submitted.
5. Add tracking tags to each "Get a quote" link.
6. Remove the `[COMPLIANCE ...]` and `[SOURCE NOTE ...]` lines only after compliance signs off.
