// The 5 steps, the email button and the call to the AI letter endpoint.

import { ISSUES, RIGHTS, LEGAL_HELP_SRC, OFFICERS, FORCES } from "./data.js";
import { fmtDate, captureDate } from "./evidence.js";

function rightsCard(key) {
  const r = RIGHTS[key];
  if (!r) return "";
  return `<section class="rights" aria-label="Know your rights">
    <span class="kind">Know your rights</span>
    <h3>${r.title}</h3>
    <ul>${r.items.map((i) => `<li><span class="rlaw">${i[0]}</span><span>${i[1]}</span></li>`).join("")}</ul>
    <p class="src"><span class="disc">General information, not legal advice</span> Source: ${r.src.map((s) => `<a href="${s[1]}" target="_blank" rel="noopener">${s[0]}</a>`).join(" · ")}</p>
  </section>
  <section class="legalhelp" aria-label="Free legal help">
    <h3>Free legal help</h3>
    <p>Call <strong class="num">15100</strong> or <strong class="num">1516</strong> (24×7). Free lawyer for all women, anyone earning under ₹3 lakh a year, people in custody, SC/ST and more.</p>
    <p class="src">Source: <a href="${LEGAL_HELP_SRC}" target="_blank" rel="noopener">Delhi State Legal Services Authority</a></p>
  </section>`;
}

// Who gets the email: the first person is "To", everyone else is CC.
function recipients() {
  const chain =
    state.force === "traffic"
      ? [
          OFFICERS.dcpTraffic,
          OFFICERS.jcpTraffic,
          OFFICERS.scpTraffic,
          OFFICERS.cp,
        ]
      : [OFFICERS.dcpWest, OFFICERS.jcpWestern, OFFICERS.scpZone2, OFFICERS.cp];
  if (state.issue === "bribe") return [OFFICERS.scpVig, ...chain];
  if (state.issue === "detain") return [OFFICERS.pca, ...chain];
  return chain;
}
function addressee() {
  const to = recipients()[0];
  return to === OFFICERS.pca ? to.role : `The ${to.role}, Delhi Police`;
}

const state = {
  step: 0,
  issue: "bribe",
  force: "traffic",
  area: "Janakpuri, New Delhi",
  when: "2026-09-12T21:40",
  proof: { 0: true, 1: true },
  demo: true, // the form opens with an example so visitors can see how it works
  file: {
    name: "checkpoint_video.mp4",
    taken: "2026-09-12T21:41",
    sample: true,
  },
  story:
    "Main Janakpuri ke paas traffic checkpoint pe tha. Ek officer ne gaadi roki aur bola 500 do warna challan banega. Maine poocha kis cheez ka challan toh bola bas de do. Maine video bana liya. Koi receipt nahi di.",
  draft: "",
};

const LABELS = [
  "What happened",
  "Your proof",
  "Where to file",
  "Your statement",
  "Ready to file",
];
const $ = (s) => document.querySelector(s);
const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c],
  );

function render() {
  document
    .querySelectorAll("#rail div")
    .forEach((d, i) => d.classList.toggle("on", i <= state.step));
  document
    .querySelectorAll(".steps-list li")
    .forEach((li, i) => li.classList.toggle("current", i === state.step));
  $("#steplabel").textContent =
    `Step ${state.step + 1} of 5 · ${LABELS[state.step]}`;
  const el = $("#screen");
  el.innerHTML = [s1, s2, s3, s4, s5][state.step]();
  wire[state.step]?.();
  $("#clearDemo") && ($("#clearDemo").onclick = clearDemo);
}

function nav(back, next, nextLabel) {
  return `<div class="nav">${back ? `<button class="btn" id="back">Back</button>` : "<span></span>"}<button class="btn primary" id="next">${nextLabel || "Next"}</button></div>`;
}
function bindNav() {
  $("#back") &&
    ($("#back").onclick = () => {
      state.step--;
      render();
    });
  $("#next") &&
    ($("#next").onclick = () => {
      if (validate()) {
        state.step++;
        render();
      }
    });
}
function validate() {
  if (state.step === 3 && !state.story.trim()) {
    $("#storyErr").textContent = "Write a few lines about what happened first.";
    return false;
  }
  return true;
}

function demoNote() {
  if (!state.demo) return "";
  return `<div class="demo" role="note"><p><strong>Example filled in.</strong> This shows how the app works. Replace it with what happened to you.</p>
  <button class="btn" id="clearDemo">Start my own complaint</button></div>`;
}
function clearDemo() {
  Object.assign(state, {
    demo: false,
    proof: {},
    file: null,
    story: "",
    draft: "",
  });
  render();
}
function s1() {
  return `<h2>What happened?</h2>
  ${demoNote()}
  <div class="field"><span class="flabel" id="forceLbl">Which police?</span>
  <div class="forces" role="group" aria-labelledby="forceLbl">${Object.entries(
    FORCES,
  )
    .map(
      ([k, v]) =>
        `<button class="force" data-f="${k}" aria-pressed="${state.force === k}">${v}</button>`,
    )
    .join("")}</div></div>
  <p class="help">Pick the closest one. It decides where your complaint should go.</p>
  <div class="opts">${Object.entries(ISSUES)
    .map(
      ([k, v]) => `
    <button class="opt" data-k="${k}" aria-pressed="${state.issue === k}"><span class="dot"></span><span><b>${v.label}</b><small>${v.hint}</small></span></button>`,
    )
    .join("")}
  </div>
  <div class="row">
    <div class="field"><label for="area">Area</label><input type="text" id="area" value="${esc(state.area)}"></div>
    <div class="field"><label for="when">When</label><input type="datetime-local" id="when" value="${state.when}"></div>
  </div>
  ${nav(false)}`;
}
function s2() {
  const it = ISSUES[state.issue];
  const done = it.proof.filter((_, i) => state.proof[i]).length;
  return `<h2>Collect your proof</h2>
  ${demoNote()}
  <p class="help">Tick what you have. More proof means your complaint is harder to ignore.</p>
  <div>${it.proof
    .map(
      (p, i) => `
    <label class="check"><input type="checkbox" data-i="${i}" ${state.proof[i] ? "checked" : ""}><span>${p[0]}<small>${p[1]}</small></span></label>`,
    )
    .join("")}</div>
  <p class="meter"><strong>${done} of ${it.proof.length}</strong> ready</p>
  <div class="file">
    <label for="fileIn">Add a photo, audio or video (optional)</label>
    <input type="file" id="fileIn" accept="image/*,audio/*,video/*">
    ${fileLine()}
    <small class="help">The file is only read on your device to find when it was taken. It is not uploaded.</small>
  </div>
  ${nav(true)}`;
}
function routeCard(r, main) {
  return `<div class="route ${main ? "main" : ""}"><span class="kind">${r.kind}</span><h3>${r.name}</h3><p>${r.why}</p>
  ${r.how.length ? `<ul>${r.how.map((h) => `<li>${h.replace(/BNSS section [\d()]+/, (m) => `<span class="law">${m}</span>`)}</li>`).join("")}</ul>` : ""}
  <p><a href="${r.link[1]}" target="_blank" rel="noopener">${r.link[0]} ↗</a></p>
  ${r.src?.length ? `<p class="src">Source: ${r.src.map((s) => `<a href="${s[1]}" target="_blank" rel="noopener">${s[0]}</a>`).join(" · ")}</p>` : ""}</div>`;
}
function s3() {
  const it = ISSUES[state.issue];
  return `<h2>Where to file</h2>
  <p class="help">Based on: <strong>${it.label.toLowerCase()}</strong> by <strong>${FORCES[state.force].toLowerCase()}</strong> in ${esc(state.area)}.</p>
  ${routeCard(it.main, true)}${routeCard(it.extra, false)}
  ${rightsCard(state.issue)}
  <p class="help">This app does not file for you. You submit on the official channel, so the complaint has legal weight.</p>
  ${nav(true)}`;
}
function s4() {
  return `<h2>Tell us what happened</h2>
  ${demoNote()}
  <p class="help">Write in your own words. Hindi, English or Hinglish is fine. We will turn it into a clear, formal statement.</p>
  <div class="field"><label for="story">What happened</label><textarea id="story">${esc(state.story)}</textarea></div>
  <p class="err" id="storyErr"></p>
  ${nav(true, true, "Write my statement")}`;
}
function s5() {
  return `<h2>Your statement is ready</h2>
  ${demoNote()}
  <p class="help">Read it once, fix anything that is wrong, then copy it into the official form.</p>
  <div class="field"><label for="draft">Statement</label><textarea id="draft" class="draft"></textarea></div>
  <p class="status" id="status"></p>
  <div class="nav"><button class="btn" id="back">Back</button><span style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn" id="regen">Rewrite</button><button class="btn primary" id="copy">Copy statement</button></span></div>
  <div class="route main"><span class="kind">Send by email</span><h3>Email it to the officers in charge</h3>
  <p>Opens your own email app with the letter filled in. It goes from your email, so it comes from you.</p>
  <ul class="recips">${recipients()
    .map(
      (o, i) =>
        `<li><span class="rtag">${i === 0 ? "To" : "CC"}</span><span><b>${o.role}</b><span class="addr">${o.email}</span></span></li>`,
    )
    .join("")}</ul>
  <label class="check confirm"><input type="checkbox" id="confirmReal"><span>This really happened to me, and the details in the letter are true.<small>This sends a real complaint to real police officers. A false complaint can be an offence.</small></span></label>
  <p class="err" id="confirmErr"></p>
  <div class="mailbtns"><a class="btn primary" id="mail" href="#">Open in email app</a><button class="btn" id="copyAddr">Copy addresses</button></div>
  <p class="status" id="mailStatus"></p>
  ${state.issue === "fir" ? `<p class="help"><strong>Also post a copy.</strong> For a refused FIR, the law (BNSS 173(4)) says to send it by post. Email it now, and post a printed copy too.</p>` : ""}
  <p class="help">These addresses are for West District, which covers Janakpuri. If you are in another area, the officers will be different.</p>
  <p class="src">Source: ${[...new Map(recipients().map((o) => [o.src[1], o.src])).values()].map((x) => `<a href="${x[1]}" target="_blank" rel="noopener">${x[0]}</a>`).join(" · ")}</p></div>
  <div class="route"><span class="kind">Or file online</span><h3>${ISSUES[state.issue].main.name}</h3>
  <p><a href="${ISSUES[state.issue].main.link[1]}" target="_blank" rel="noopener">Open ${ISSUES[state.issue].main.link[0]} ↗</a></p>
  <p class="help">Save any complaint number you get. <span class="pill">Tracking comes in the next version</span></p></div>
  <button class="btn" id="restart">Start a new complaint</button>`;
}

function whenText() {
  try {
    const d = new Date(state.when);
    return d.toLocaleString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch (e) {
    return state.when;
  }
}

// Warn if the file was taken on a different day than the incident
function dateMismatch() {
  if (!state.file?.taken || !state.when) return false;
  const a = new Date(state.file.taken),
    b = new Date(state.when);
  if (isNaN(a) || isNaN(b)) return false;
  return Math.abs(a - b) > 24 * 60 * 60 * 1000;
}

function fileLine() {
  const f = state.file;
  if (!f) return "";
  if (f.reading) return `<span class="meta">Reading ${esc(f.name)}…</span>`;
  const date = f.taken
    ? `taken ${fmtDate(f.taken)}${f.sample ? " · example" : ""}`
    : `capture date not found in this file`;
  const warn = dateMismatch()
    ? `<span class="fwarn">This file was taken on ${fmtDate(f.taken)}, but the incident was on ${whenText()}. Check it is the right file.</span>`
    : "";
  const none = !f.taken
    ? `<small class="help">Photos sent on WhatsApp, screenshots and edited files usually lose this date. The original from your camera is best.</small>`
    : "";
  return `<span class="meta${f.taken ? "" : " nodate"}">✓ ${esc(f.name)} · ${date}</span>${warn}${none}`;
}

function proofText() {
  const it = ISSUES[state.issue];
  const have = it.proof.filter((_, i) => state.proof[i]).map((p) => p[0]);
  if (state.file && !state.file.reading && !state.file.sample)
    have.push(
      state.file.taken
        ? `File: ${state.file.name} (taken ${fmtDate(state.file.taken)})`
        : `File: ${state.file.name}`,
    );
  return have;
}
function templateDraft() {
  const it = ISSUES[state.issue];
  return `To,
${addressee()}

Subject: Complaint regarding ${it.label.toLowerCase()} by ${FORCES[state.force].toLowerCase()}

On ${whenText()}, at ${state.area}, the following incident took place:

${state.story.trim()}

Evidence available:
${proofText()
  .map((p) => "- " + p)
  .join("\n")}

I request that this complaint be looked into and appropriate action be taken. I am ready to share the original evidence and cooperate with any inquiry.

Name:
Phone:
Address:
Date:`;
}

let ctl = null;

// Calls our own serverless function (api/draft.js). The OpenAI key stays on the server.
async function writeDraft() {
  const box = $("#draft"),
    st = $("#status"),
    regen = $("#regen");
  if (!box) return;
  const it = ISSUES[state.issue];
  ctl?.abort();
  ctl = new AbortController();
  box.value = "";
  st.textContent = "Writing your statement… this takes a few seconds.";
  if (regen) regen.disabled = true;
  try {
    const r = await fetch("/api/draft", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: ctl.signal,
      body: JSON.stringify({
        issue: state.issue,
        authority: addressee(),
        force: state.force,
        when: whenText(),
        area: state.area,
        story: state.story,
        evidence: proofText(),
      }),
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok || !data.draft)
      throw new Error(data.error || "AI writing failed");
    state.draft = box.value = data.draft;
    st.textContent =
      "Written by AI from your words. Check every fact before filing.";
  } catch (e) {
    if (e.name === "AbortError") return;
    box.value = state.draft = templateDraft();
    st.textContent =
      "AI writing is not available right now, so here is a template you can edit.";
  } finally {
    if (regen) regen.disabled = false;
  }
}

const wire = [
  () => {
    document.querySelectorAll(".force").forEach(
      (b) =>
        (b.onclick = () => {
          state.force = b.dataset.f;
          document
            .querySelectorAll(".force")
            .forEach((x) => x.setAttribute("aria-pressed", x === b));
        }),
    );
    document.querySelectorAll(".opt").forEach(
      (b) =>
        (b.onclick = () => {
          if (state.issue !== b.dataset.k) {
            state.issue = b.dataset.k;
            state.proof = {};
          }
          document
            .querySelectorAll(".opt")
            .forEach((x) => x.setAttribute("aria-pressed", x === b));
        }),
    );
    $("#area").oninput = (e) => (state.area = e.target.value);
    $("#when").oninput = (e) => (state.when = e.target.value);
    bindNav();
  },
  () => {
    document.querySelectorAll(".check input").forEach(
      (c) =>
        (c.onchange = () => {
          state.proof[c.dataset.i] = c.checked;
          const it = ISSUES[state.issue];
          $(".meter").innerHTML =
            `<strong>${it.proof.filter((_, i) => state.proof[i]).length} of ${it.proof.length}</strong> ready`;
        }),
    );
    $("#fileIn").onchange = async (e) => {
      const f = e.target.files[0];
      if (!f) return;
      state.file = { name: f.name, reading: true };
      render();
      const d = await captureDate(f);
      state.file = { name: f.name, taken: d ? d.toISOString() : null };
      if (state.step === 1) render();
    };
    bindNav();
  },
  bindNav,
  () => {
    $("#story").oninput = (e) => {
      state.story = e.target.value;
      $("#storyErr").textContent = "";
      if (state.demo) {
        state.demo = false;
        if (state.file?.sample) state.file = null;
        const n = document.querySelector(".demo");
        if (n) n.remove();
      }
    };
    bindNav();
  },
  () => {
    $("#back").onclick = () => {
      ctl?.abort();
      state.step--;
      render();
    };
    $("#draft").oninput = (e) => (state.draft = e.target.value);
    $("#regen").onclick = () => writeDraft();
    $("#copy").onclick = async () => {
      const t = $("#draft").value;
      try {
        await navigator.clipboard.writeText(t);
        $("#status").textContent =
          "Copied. Paste it into the official complaint form.";
      } catch (e) {
        $("#draft").select();
        $("#status").textContent =
          "Selected. Press Ctrl+C or long-press to copy.";
      }
    };
    $("#restart").onclick = () => {
      ctl?.abort();
      Object.assign(state, {
        step: 0,
        issue: "bribe",
        force: "traffic",
        proof: {},
        file: null,
        story: "",
        draft: "",
        demo: false,
      });
      render();
    };
    $("#confirmReal").onchange = () => {
      $("#confirmErr").textContent = "";
    };
    $("#mail").onclick = (e) => {
      if (state.demo) {
        e.preventDefault();
        $("#confirmErr").textContent =
          'This is still the example. Tap "Start my own complaint" and write what happened to you first.';
        return;
      }
      if (!$("#confirmReal").checked) {
        e.preventDefault();
        $("#confirmErr").textContent =
          "Tick the box first to confirm this really happened.";
        return;
      }
      const list = recipients();
      const subject = `Complaint: ${ISSUES[state.issue].label} by ${FORCES[state.force].toLowerCase()}, ${state.area}, ${whenText()}`;
      e.currentTarget.href =
        "mailto:" +
        list[0].email +
        "?cc=" +
        encodeURIComponent(
          list
            .slice(1)
            .map((o) => o.email)
            .join(","),
        ) +
        "&subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent($("#draft").value);
      $("#mailStatus").textContent =
        "If nothing opened, use Copy addresses and Copy statement, then paste them into your email.";
    };
    $("#copyAddr").onclick = async () => {
      const list = recipients();
      const t =
        "To: " +
        list[0].email +
        "\nCC: " +
        list
          .slice(1)
          .map((o) => o.email)
          .join(", ");
      try {
        await navigator.clipboard.writeText(t);
        $("#mailStatus").textContent = "Addresses copied.";
      } catch (err) {
        $("#mailStatus").textContent = t;
      }
    };
    if (state.draft) {
      $("#draft").value = state.draft;
    } else writeDraft();
  },
];

render();
