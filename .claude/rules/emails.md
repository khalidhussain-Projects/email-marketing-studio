---
paths:
  - "campaigns/**/emails/*.md"
  - "campaigns/**/emails/plain-text/*.txt"
---

# Rules for email files

These rules apply to every email file in every campaign, and only to email files. Every email file must follow all of them.

## 1. Subject and preview come first

- **Line 1:** `Subject: ...`, 50 characters or fewer, counting the word "Subject:".
- **Line 2:** `Preview: ...`, 90 characters or fewer, counting the word "Preview:".
- Nothing goes above these two lines.

## 2. Greet the reader by first name

- The greeting uses `{{first_name}}`, for example: `Dear {{first_name}},`
- Don't write a real name in its place.

## 3. Exactly one main link

- Each email has one main link, and only one. It's written as a button:
  `[Button text](https://tpllife.com/...)`
- The link goes to a page on tpllife.com that fits the email. For Globewell emails, that's the "Get a Quote" section:
  `https://tpllife.com/international-health-insurance-plan-globewell/#GetQuote`
- The button text says what happens next, in plain words, such as "Get a quote". No pressure words.
- The "tpllife.com" in the sign-off and the `{{unsubscribe_url}}` in the footer don't count as main links.

## 4. Disclaimers go above the sign-off

- Any disclaimers or risk warnings that compliance asks for go after the main message and before the sign-off.
- Notes for compliance go straight after the disclaimers, in square brackets, and say "Remove before sending". This includes the source note: the page link, the date it was checked and whether the quote reviewer has confirmed it.

## 5. End with the sign-off, then the footer

The email ends with the sign-off from `brand/voice.md`, followed by this two-line footer. Write both as plain text, not inside a code block:

Stay protected,

Your Relationship Manager
TPL Life Insurance Limited
UAN: (021) 111 000 330 | tpllife.com

You're getting this because you made a quote enquiry with TPL Life.
TPL Life Insurance Limited, 20th Floor, Sky Tower – East Wing, Dolmen City, Block 4, Clifton, Karachi · Unsubscribe: {{unsubscribe_url}}

- Nothing goes after the footer.
- The address is the one on tpllife.com (footer and Contact Us page, checked 2026-11-08). If the website changes it, update it here and in every email.
- Keep `{{unsubscribe_url}}` as a placeholder. The email tool makes a separate unsubscribe link for each reader, so it can't be filled in by hand.

## 6. Every email has a plain-text version

- Each email file has a matching `.txt` file in `emails/plain-text/` with the same name and the same words.
- In the plain-text file, tables become lists, the button becomes `Button text: https://...`, and there is no bold or other formatting.
- Rules 1 to 5 apply to it too.
- Whenever an email file changes, update its plain-text file to match.
