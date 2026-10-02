// All the facts the app shows: issues, routes, rights, officer emails and their sources.
// When a route or an email changes, this is the only file to edit.

function PCA(kind, why) {
  return {
    kind,
    name: "Police Complaints Authority, Delhi",
    why,
    how: [
      "Email: pca.delhi@delhi.gov.in",
      "Office: 10th Floor, Chanderlok Building, Janpath, New Delhi",
    ],
    link: ["pca.delhi.gov.in", "https://pca.delhi.gov.in"],
    src: [
      [
        "PCA Delhi: what counts as serious misconduct",
        "https://pca.delhi.gov.in/pca/welcome-police-complaints-authority",
      ],
      ["PCA Delhi: contact", "https://pca.delhi.gov.in/pca/contact-us"],
      [
        "National Herald: no anonymous complaints",
        "https://www.nationalheraldindia.com/national/former-delhi-hc-judge-appointed-police-complaints-authority-chairperson",
      ],
    ],
  };
}
const ISSUES = {
  bribe: {
    label: "Asked for money or a bribe",
    hint: "Money demanded to let you go, to register a case, for verification, etc.",
    proof: [
      [
        "Audio or video of the demand",
        "The clearest proof. Keep the original file, do not edit or trim it.",
      ],
      ["Date, time and exact place", "Write it down as soon as you can."],
      [
        "Officer name, badge or vehicle number",
        "Only if you saw it. Do not guess.",
      ],
      ["UPI or payment record", "If money was paid digitally."],
      [
        "Names of witnesses",
        "People who were with you, if they agree to help.",
      ],
    ],
    main: {
      kind: "Best place to file",
      name: "Delhi Police Vigilance Branch",
      why: "Handles corruption complaints against Delhi Police staff. A bribe demand is an offence under the Prevention of Corruption Act.",
      how: [
        "You can approach the Vigilance Branch directly, even on the same day",
        "Delhi Traffic Police lists how to report corruption by its staff",
        "Attach your audio or video and the written statement from this app",
      ],
      link: [
        "Report corruption (Delhi Traffic Police)",
        "https://traffic.delhipolice.gov.in/complaints-against-corruption",
      ],
      src: [
        [
          "Tribune, Sep 2025: complainant went to Vigilance Branch",
          "https://www.tribuneindia.com/news/delhi/delhi-police-officer-arrested-for-accepting-rs-15000-bribe",
        ],
      ],
    },
    extra: PCA(
      "If it was extortion or threats",
      "Looks into serious misconduct by police, including extortion. Needs a sworn affidavit. Anonymous complaints are not accepted.",
    ),
  },
  fir: {
    label: "Refused to register my FIR",
    hint: "Police did not write down your complaint about a crime.",
    proof: [
      [
        "A copy of your written complaint",
        "Always give it in writing and keep a copy.",
      ],
      [
        "Receipt or proof you visited",
        "Stamped copy, diary number, or a photo of the complaint handed over.",
      ],
      [
        "Date, time and police station name",
        "For Janakpuri this is Janakpuri police station.",
      ],
      ["Name of the officer who refused", "Only if you know it."],
    ],
    main: {
      kind: "Best next step",
      name: "Write to the DCP of your district",
      why: "If the police station refuses an FIR, you can send the substance of your complaint in writing, by post, to the district's senior officer. In Delhi that is the DCP.",
      how: [
        "Janakpuri police station falls under the West District of Delhi Police",
        "Send it by post and keep the postal receipt",
        "The law for this is BNSS section 173(4)",
      ],
      link: [
        "BNSS 2023 on India Code",
        "https://www.indiacode.nic.in/handle/123456789/21419",
      ],
      src: [
        [
          "BNSS 173(4) and 175(3) explained (Drishti Judiciary)",
          "https://drishtijudiciary.com/current-affairs/section-173-4-section-175-3-of-bnss",
        ],
        [
          "Districts of Delhi Police (Wikipedia)",
          "https://en.wikipedia.org/wiki/Districts_of_Delhi_Police",
        ],
      ],
    },
    extra: {
      kind: "If the DCP also does not act",
      name: "Magistrate court",
      why: "You can apply to the local Magistrate to order an investigation. The application must be backed by an affidavit, so a lawyer or legal aid helps.",
      how: [
        "The law for this is BNSS section 175(3)",
        "Free legal aid is available through Delhi State Legal Services Authority",
      ],
      link: ["Delhi Legal Services", "https://dslsa.org"],
      src: [
        [
          "BNSS 173(4) and 175(3) explained (Drishti Judiciary)",
          "https://drishtijudiciary.com/current-affairs/section-173-4-section-175-3-of-bnss",
        ],
        ["DSLSA free legal aid", "https://dslsa.org/free-legal-aid/"],
      ],
    },
  },
  rude: {
    label: "Rude or abusive behaviour",
    hint: "Shouting, insults, threats, or refusing to listen.",
    proof: [
      [
        "Audio or video, if safe to record",
        "Never put yourself at risk to record.",
      ],
      ["Date, time and place", "Which police station, checkpoint or area."],
      ["What was said, in your own words", "Write it down the same day."],
      ["Names of witnesses", "If anyone else was there."],
    ],
    main: {
      kind: "Best place to file",
      name: "Write to the DCP of your district",
      why: "The DCP supervises every police station in the district. A written complaint about staff behaviour goes on record there.",
      how: [
        "Janakpuri police station falls under the West District of Delhi Police",
        "Send it in writing and keep a copy or receipt",
      ],
      link: [
        "Districts of Delhi Police",
        "https://en.wikipedia.org/wiki/Districts_of_Delhi_Police",
      ],
      src: [
        [
          "Districts of Delhi Police (Wikipedia)",
          "https://en.wikipedia.org/wiki/Districts_of_Delhi_Police",
        ],
      ],
    },
    extra: {
      kind: "If there is no reply",
      name: "CPGRAMS (central grievance portal)",
      why: "Government of India grievance portal. Delhi Police comes under the Ministry of Home Affairs, so a complaint can be filed to that ministry here.",
      how: ["Mention your earlier complaint and when you sent it"],
      link: ["pgportal.gov.in", "https://pgportal.gov.in"],
      src: [
        ["CPGRAMS", "https://pgportal.gov.in"],
        [
          "Delhi govt vigilance portal: non-corruption complaints go to CPGRAMS or PGMS",
          "https://vcims.delhi.gov.in/",
        ],
      ],
    },
  },
  detain: {
    label: "Held or arrested without reason",
    hint: "Detained without being told why, or kept without following the law.",
    proof: [
      [
        "Date, time and where you were taken",
        "Police station name if you know it.",
      ],
      ["How long you were held", "Start and end time."],
      [
        "Any medical report",
        "If you were hurt, get checked and keep the report.",
      ],
      [
        "Names of witnesses or family who came",
        "People who saw or can confirm it.",
      ],
    ],
    main: PCA(
      "Best place to file",
      "Arrest or detention without due process is listed as serious misconduct. Needs a sworn affidavit. Anonymous complaints are not accepted.",
    ),
    extra: {
      kind: "Get legal help",
      name: "Delhi State Legal Services Authority",
      why: "Free legal aid. Useful before you sign an affidavit.",
      how: [],
      link: ["dslsa.org", "https://dslsa.org"],
      src: [["DSLSA free legal aid", "https://dslsa.org/free-legal-aid/"]],
    },
  },
};

const DRISHTI_FIR = [
  "Drishti Judiciary: Zero FIR and e-FIR",
  "https://www.drishtijudiciary.com/to-the-point/bharatiya-nagarik-suraksha-sanhita-&-code-of-criminal-procedure/zero-fir-under-bharatiya-nagarik-suraksha-sanhita-2023-bnss",
];
const RIGHTS = {
  fir: {
    title: "If police refuse your FIR",
    items: [
      [
        "BNSS 173(1)",
        "You can file at any police station, even outside your area (Zero FIR), or online. An online FIR must be signed within 3 days.",
      ],
      ["BNSS 173(2)", "You get a free copy of the FIR right away."],
      [
        "BNSS 173(4)",
        "If refused, post your complaint to the DCP of the district.",
      ],
      [
        "BNSS 175(3)",
        "If the DCP also does not act, apply to a Magistrate with an affidavit.",
      ],
      [
        "BNS 199(c)",
        "For some serious offences, like sexual offences and acid attacks, refusing to record the FIR is itself a crime: 6 months to 2 years in jail.",
      ],
    ],
    src: [
      DRISHTI_FIR,
      [
        "Drishti Judiciary: BNSS 173(4) and 175(3)",
        "https://drishtijudiciary.com/current-affairs/section-173-4-section-175-3-of-bnss",
      ],
      [
        "ApniLaw: BNS 199",
        "https://www.apnilaw.com/bare-act/bns/section-199-bharatiya-nyaya-sanhita-bns-public-servant-disobeying-direction-under-law/",
      ],
      [
        "BNSS on India Code",
        "https://www.indiacode.nic.in/handle/123456789/21419",
      ],
    ],
  },
  bribe: {
    title: "If you were asked for a bribe",
    items: [
      [
        "PC Act s.7",
        "A public servant who demands or takes a bribe commits an offence.",
      ],
      [
        "PC Act s.8",
        "Giving a bribe is also an offence. If you were forced to pay, report it within 7 days of paying.",
      ],
    ],
    src: [
      [
        "Mondaq: compelled bribe givers and the 7-day rule",
        "https://www.mondaq.com/india/white-collar-crime-anti-corruption-fraud/1468888/forced-corruption-unveiling-legal-defences-for-those-compelled-to-bribe",
      ],
      [
        "ApniLaw: section 8, the bribe giver",
        "https://www.apnilaw.com/legal-articles/acts/bribing-a-public-servant-what-the-law-says-about-the-bribe-giver-section-8/",
      ],
    ],
  },
  detain: {
    title: "If you or someone you know is arrested",
    items: [
      [
        "BNSS 47",
        "You must be told why you are arrested. In bailable offences, bail is your right.",
      ],
      [
        "BNSS 48",
        "Police must inform a relative or friend about the arrest and where you are held.",
      ],
      [
        "BNSS 58",
        "You must be produced before a Magistrate within 24 hours, not counting travel time.",
      ],
      [
        "Article 22",
        "You have the right to consult and be defended by a lawyer.",
      ],
      [
        "BSA s.23",
        "A confession made to police cannot be used as evidence against you.",
      ],
    ],
    src: [
      [
        "Sansa Legal: rights when arrested under BNSS",
        "https://www.sansalegal.com/post/what-are-your-rights-if-you-are-arrested-in-india-under-bnss-2023-complete-guide",
      ],
    ],
  },
  rude: {
    title: "If police were rude or abusive",
    items: [
      [
        "Departmental",
        "Rudeness alone is usually handled as a departmental complaint, not a criminal case. A written complaint puts it on record.",
      ],
      [
        "PCA Delhi",
        "If it involved threats, extortion or detention without due process, it counts as serious misconduct and can go to the Police Complaints Authority.",
      ],
    ],
    src: [
      [
        "PCA Delhi: what counts as serious misconduct",
        "https://pca.delhi.gov.in/pca/welcome-police-complaints-authority",
      ],
    ],
  },
};
const LEGAL_HELP_SRC = "https://dslsa.org/free-legal-aid-faqs/";

// Official email chain for West District (covers Janakpuri). Each address has its source.
const SRC_CONTACTS = [
  "Delhi Police: important contacts",
  "https://delhipolice.gov.in/ImportantContact",
];
const SRC_TRAFFIC = [
  "Delhi Traffic Police: West District DCP/ACP",
  "https://traffic.delhipolice.gov.in/en/details-dcp-acp-traffic-west-district",
];
const SRC_ORG2021 = [
  "Delhi Police HQ directory (2021)",
  "https://delhipolice.gov.in/doc/Organization-Structure-1-10-2021.pdf",
];
const SRC_DCPWEST = [
  "Delhi Police on X (2017)",
  "https://x.com/DelhiPolice/status/858655447972052992",
];
const SRC_PCA = [
  "PCA Delhi: contact",
  "https://pca.delhi.gov.in/pca/contact-us",
];
const OFFICERS = {
  dcpWest: {
    role: "DCP, West District",
    email: "dcp-west-dl@nic.in",
    src: SRC_DCPWEST,
  },
  jcpWestern: {
    role: "Joint CP, Western Range",
    email: "jtcp.wr@delhipolice.gov.in",
    src: SRC_CONTACTS,
  },
  scpZone2: {
    role: "Special CP, Law and Order Zone 2",
    email: "splcp.losouth@delhipolice.gov.in",
    src: SRC_CONTACTS,
  },
  dcpTraffic: {
    role: "DCP Traffic, West District",
    email: "padcptwr@gmail.com",
    src: SRC_TRAFFIC,
  },
  jcpTraffic: {
    role: "Joint CP, Traffic",
    email: "jtcp-dtp@nic.in",
    src: SRC_CONTACTS,
  },
  scpTraffic: {
    role: "Special CP, Traffic",
    email: "splcp-traficdl@nic.in",
    src: SRC_ORG2021,
  },
  scpVig: {
    role: "Special CP, Vigilance",
    email: "splcp.vig@delhipolice.gov.in",
    src: SRC_CONTACTS,
  },
  cp: {
    role: "Commissioner of Police, Delhi",
    email: "cpdelhi@delhipolice.gov.in",
    src: SRC_CONTACTS,
  },
  pca: {
    role: "Police Complaints Authority, Delhi",
    email: "pca.delhi@delhi.gov.in",
    src: SRC_PCA,
  },
};
const FORCES = {
  local: "Local police station",
  traffic: "Traffic police",
};

export { ISSUES, RIGHTS, LEGAL_HELP_SRC, OFFICERS, FORCES };
