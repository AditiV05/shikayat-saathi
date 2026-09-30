# Shikayat Saathi

A prototype that helps people in Delhi file a complaint about police conduct through the right official channel.

Most people who face a bribe demand, a refused FIR, or rude behaviour from police don't know where to complain or what proof to collect. This app walks them through it in 5 steps.

## How it works

1. **What happened:** pick local police or traffic police, then the issue (bribe, FIR refused, rude behaviour, detained without reason)
2. **Your proof:** a checklist of evidence for that issue
3. **Where to file:** the right official body, with a source link for every route, plus a "Know your rights" box with the relevant law sections and free legal aid helplines
4. **Your statement:** write what happened in Hindi, English or Hinglish
5. **Ready to file:** get a clean, formal complaint letter, and send it by email to the officer in charge and their seniors (West District / Janakpuri for now). The email opens in the user's own email app, so it comes from them.

## What it does not do

- No officer profiles or ratings
- Nothing is posted publicly
- No uploads. Proof files are only read in the browser to show their date.
- Only the text from step 4 is sent to OpenAI to write the letter. The app does not save it.
- It does not file the complaint. The user files it on the official channel, so it has legal weight.

## Status

- Prototype, Delhi only
- Complaint routes last checked on 30 Sep 2026. Each route shows its source in the app.
- The statement is written by OpenAI through a Vercel serverless function (`api/draft.js`). If the AI is unavailable, the app falls back to a template.

## How the AI part works

- The browser sends the issue type, date, place, proof list and the user's own words to `/api/draft`
- The server builds the prompt and calls OpenAI. The API key never reaches the browser.
- The browser can only send one of 4 issue types, so the endpoint can't be used as a general chatbot
- The user's text is capped at 2,000 characters

## Disclaimer

This is not legal advice. Always confirm the route with the official website before filing.
