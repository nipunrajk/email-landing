(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [122],
  {
    2251: (e, t, s) => {
      "use strict";
      s.d(t, { default: () => h });
      var a = s(5155);
      s(2115);
      var n = s(5239),
        i = s(6769),
        l = s(8661),
        r = s.n(l),
        o = s(5225);
      let d = { fastest: "15s", fast: "20s", normal: "40s", slow: "80s" },
        c = (e) => {
          let {
              items: t,
              direction: s = "left",
              speed: i = "fast",
              pauseOnHover: l = !0,
              className: c,
            } = e,
            x = [...t, ...t, ...t];
          return (0, a.jsxs)("div", {
            style: {
              "--carousel-duration": d[i],
              "--carousel-direction": "left" === s ? "normal" : "reverse",
            },
            className:
              "jsx-1b98b13ec66cfc32 " +
              ((0, o.cn)(
                "scroller relative z-20 max-w-7xl 2xl:max-w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
                c,
              ) || ""),
            children: [
              (0, a.jsx)("ul", {
                className:
                  "jsx-1b98b13ec66cfc32 " +
                  ((0, o.cn)(
                    "carousel-track flex w-max min-w-full shrink-0 flex-nowrap gap-8 py-4 items-center",
                    l && "hover:[animation-play-state:paused]",
                  ) || ""),
                children: x.map((e, t) =>
                  (0, a.jsx)(
                    "li",
                    {
                      className:
                        "jsx-1b98b13ec66cfc32 relative w-auto shrink-0 px-12",
                      children: (0, a.jsx)(n.default, {
                        src: e.logoSrc,
                        alt: e.name,
                        width: 100,
                        height: 40,
                        className: "object-contain ".concat(
                          null == e ? void 0 : e.class,
                        ),
                      }),
                    },
                    "".concat(e.id, "-").concat(t),
                  ),
                ),
              }),
              (0, a.jsx)(r(), {
                id: "1b98b13ec66cfc32",
                children:
                  ".carousel-track.jsx-1b98b13ec66cfc32{animation:carousel-scroll var(--carousel-duration,40s)linear infinite;animation-direction:var(--carousel-direction,normal)}@keyframes carousel-scroll{0%{transform:translatex(0)}100%{transform:translatex(-33%)}}",
              }),
            ],
          });
        };
      var x = s(9804),
        m = s(356);
      let p = [
          "Hi, I'm Zamp, an AI employee.",
          "I'm built to take work off your plate, not just answer questions.",
          "Give me context once and I'll learn your processes, remember what matters, and run it end-to-end.",
        ],
        h = () =>
          (0, a.jsxs)("section", {
            className:
              "relative w-full max-w-[2500px] mx-auto overflow-hidden bg-[#EFEFEF]",
            children: [
              (0, a.jsxs)("div", {
                className:
                  "relative flex flex-col h-svh pt-[100px] md:pt-[180px] min-[2500px]:h-[1000px]",
                children: [
                  (0, a.jsx)(i.P.div, {
                    "aria-hidden": !0,
                    className:
                      "pointer-events-none absolute -right-[70%] md:right-0 top-[220px] md:top-[200px] w-[240%] md:w-[74vw] max-w-none md:max-w-[1500px] z-30",
                    animate: { y: [0, -25, 0] },
                    transition: {
                      duration: 5,
                      ease: "easeInOut",
                      repeat: 1 / 0,
                    },
                    children: (0, a.jsx)(n.default, {
                      src: m.IWO,
                      alt: "",
                      width: 1200,
                      height: 760,
                      priority: !0,
                      fetchPriority: "high",
                      sizes: "(max-width: 768px) 240vw, 74vw",
                      className: "h-auto w-full object-contain",
                    }),
                  }),
                  (0, a.jsx)("div", {
                    className:
                      "relative mx-auto w-full max-w-[1280px] px-5 md:px-10 md:-mt-[70px] md:ml-[70px] 2xl:ml-[350px]",
                    children: (0, a.jsx)("div", {
                      className: "relative flex justify-end",
                      children: (0, a.jsx)("div", {
                        className: "w-[170px] md:w-full md:max-w-[380px] z-20",
                        children: (0, a.jsx)("div", {
                          className:
                            "rounded-[10px] md:rounded-[12px] bg-[#E4E4E4] px-3.5 py-3 md:px-5 md:py-4 border border-[#D2D2D2]",
                          children: (0, a.jsx)("div", {
                            className:
                              "flex flex-col gap-2.5 md:gap-4 font-mono text-[13px] leading-[18px] tracking-[-0.48px] text-black/80 md:text-base md:leading-[22px] md:tracking-[-2%] md:text-black",
                            children: p.map((e) =>
                              (0, a.jsx)("p", { children: e }, e),
                            ),
                          }),
                        }),
                      }),
                    }),
                  }),
                  (0, a.jsx)("div", {
                    className: "relative mt-auto px-5 md:px-10 pb-2 md:pb-4",
                    children: (0, a.jsxs)("h1", {
                      className:
                        "font-sans font-semibold text-[120px] md:text-[370px] 2xl:text-[460px] leading-[0.9] tracking-[-0.04em] text-black flex",
                      children: [
                        (0, a.jsx)("span", {
                          className: "sr-only",
                          children:
                            "Zamp | The AI employee you delegate jobs to",
                        }),
                        (0, a.jsx)("span", {
                          "aria-hidden": "true",
                          className: "relative z-40",
                          children: "z",
                        }),
                        (0, a.jsx)("span", {
                          "aria-hidden": "true",
                          className: "relative z-40 mr-1.5 md:mr-3",
                          children: "a",
                        }),
                        (0, a.jsx)("span", {
                          "aria-hidden": "true",
                          className: "relative z-20",
                          children: "m",
                        }),
                        (0, a.jsx)("span", {
                          "aria-hidden": "true",
                          className: "relative z-40",
                          children: "p",
                        }),
                      ],
                    }),
                  }),
                ],
              }),
              (0, a.jsx)("div", {
                className: "relative px-5 md:px-10 mt-1 md:mt-2",
                children: (0, a.jsxs)("p", {
                  className:
                    "font-sans text-[23px] md:text-[35px] 2xl:text-[40px] font-semibold tracking-[-0.47px] md:tracking-tight leading-[20px] md:leading-[28px] text-black relative z-40 pl-1 md:pl-3",
                  children: [
                    "Work on what",
                    (0, a.jsx)("br", { className: "md:hidden" }),
                    " matters the most",
                  ],
                }),
              }),
              (0, a.jsx)("div", {
                className:
                  "relative mt-10 md:mt-[50px] w-full border-black/5 bg-[#EFEFEF] opacity-50 py-6",
                children: (0, a.jsx)("div", {
                  className: "mx-auto max-w-[1280px] 2xl:max-w-[1600px]",
                  children: (0, a.jsx)(c, { items: x.KA, speed: "normal" }),
                }),
              }),
            ],
          });
    },
    2949: (e, t, s) => {
      (Promise.resolve().then(s.bind(s, 8486)),
        Promise.resolve().then(s.bind(s, 4372)),
        Promise.resolve().then(s.bind(s, 9115)),
        Promise.resolve().then(s.bind(s, 7908)),
        Promise.resolve().then(s.bind(s, 2251)),
        Promise.resolve().then(s.bind(s, 9574)),
        Promise.resolve().then(s.bind(s, 9104)),
        Promise.resolve().then(s.bind(s, 1637)),
        Promise.resolve().then(s.t.bind(s, 1356, 23)));
    },
    7908: (e, t, s) => {
      "use strict";
      s.d(t, { default: () => r });
      var a = s(5155),
        n = s(5239),
        i = s(356);
      let l = [
          { name: "Sequoia", logo: i.hcf, height: 20, mobileHeight: 12 },
          { name: "Noon", logo: i.S97, height: 40, mobileHeight: 20 },
          { name: "DoorDash", logo: i.C2c, height: 20, mobileHeight: 12 },
          { name: "Mindbody", logo: i._c4, height: 52, mobileHeight: 24 },
          { name: "Uber", logo: i.MNN, height: 26, mobileHeight: 16 },
          {
            name: "Wio",
            logo: i.dU$,
            height: 26,
            mobileHeight: 16,
            className: "invert",
          },
        ],
        r = () => {
          let e = l.slice(0, 6);
          return (0, a.jsxs)("section", {
            className: "relative w-full",
            children: [
              (0, a.jsx)("div", {
                className: "md:hidden px-5 pt-10 pb-10",
                children: (0, a.jsxs)("div", {
                  className: "overflow-hidden",
                  children: [
                    (0, a.jsxs)("div", {
                      className: "flex items-start gap-4 pt-9 pb-14",
                      children: [
                        (0, a.jsx)("span", {
                          className:
                            "h-11 w-[4px] rounded-full bg-[#302f37] shrink-0 mt-1",
                        }),
                        (0, a.jsx)("h2", {
                          className:
                            "font-sans text-[25px] font-normal leading-[26px] tracking-[-1px] text-[#302f37]",
                          children:
                            "I'm already working with some of the best companies",
                        }),
                      ],
                    }),
                    (0, a.jsxs)("div", {
                      className: "relative flex flex-col",
                      children: [
                        (0, a.jsx)("div", {
                          className:
                            "pointer-events-none absolute inset-y-0 left-1/2 w-px bg-[#e7e2df]",
                        }),
                        Array.from({ length: Math.ceil(e.length / 2) }).map(
                          (t, s) =>
                            (0, a.jsxs)(
                              "div",
                              {
                                children: [
                                  (0, a.jsx)("div", {
                                    className: "grid grid-cols-2",
                                    children: e
                                      .slice(2 * s, 2 * s + 2)
                                      .map((e, t) => {
                                        var s;
                                        return (0, a.jsx)(
                                          "div",
                                          {
                                            className:
                                              "flex h-[110px] items-center justify-center",
                                            children: (0, a.jsx)(n.default, {
                                              src: e.logo,
                                              alt: e.name,
                                              width: 140,
                                              height: e.height,
                                              style: {
                                                height: "".concat(
                                                  Math.round(0.7 * e.height),
                                                  "px",
                                                ),
                                              },
                                              className:
                                                "w-auto object-contain ".concat(
                                                  null != (s = e.className)
                                                    ? s
                                                    : "",
                                                ),
                                            }),
                                          },
                                          t,
                                        );
                                      }),
                                  }),
                                  (0, a.jsxs)("div", {
                                    className: "flex gap-3",
                                    children: [
                                      (0, a.jsx)("div", {
                                        className: "h-px flex-1 bg-[#e7e2df]",
                                      }),
                                      (0, a.jsx)("div", {
                                        className: "w-2 shrink-0",
                                      }),
                                      (0, a.jsx)("div", {
                                        className: "h-px flex-1 bg-[#e7e2df]",
                                      }),
                                    ],
                                  }),
                                ],
                              },
                              s,
                            ),
                        ),
                      ],
                    }),
                  ],
                }),
              }),
              (0, a.jsxs)("div", {
                className:
                  "hidden md:block relative mx-auto w-full max-w-[1440px] 2xl:max-w-[1600px]",
                children: [
                  (0, a.jsx)("div", { className: "border-t border-[#e7e2df]" }),
                  (0, a.jsx)("div", {
                    className: "px-[122px]",
                    children: (0, a.jsxs)("div", {
                      className:
                        "grid grid-cols-2 divide-x divide-[#e7e2df] items-center",
                      children: [
                        (0, a.jsxs)("div", {
                          className: "flex items-center pr-10 py-9",
                          children: [
                            (0, a.jsx)("span", {
                              className:
                                "h-17 w-[7px] rounded-full bg-[#302f37] shrink-0 mr-5",
                            }),
                            (0, a.jsx)("h2", {
                              className:
                                "font-sans text-[40px] font-medium leading-10 tracking-[-4%] text-[#302f37] max-w-[520px]",
                              children:
                                "I'm already working with some of the best companies",
                            }),
                          ],
                        }),
                        (0, a.jsx)("p", {
                          className:
                            "pl-10 font-sans text-[20px] leading-6 text-[#302f37] tracking-[-2%] py-9 pr-10",
                          children:
                            "I am the world's first AI employee, I don't wait for you to prompt me, I learn, remember, and build autonomously once you set context.",
                        }),
                      ],
                    }),
                  }),
                  (0, a.jsx)("div", { className: "border-t border-[#e7e2df]" }),
                  (0, a.jsxs)("div", {
                    className: "relative px-[122px]",
                    children: [
                      (0, a.jsx)("div", {
                        className: "grid grid-cols-3 border-l border-[#e7e2df]",
                        children: l.map((e, t) => {
                          var s;
                          let i = t >= l.length - 3;
                          return (0, a.jsx)(
                            "div",
                            {
                              className:
                                "flex h-[224px] items-center justify-center border-r border-[#e7e2df] ".concat(
                                  i ? "" : "border-b",
                                ),
                              children: (0, a.jsx)(n.default, {
                                src: e.logo,
                                alt: e.name,
                                width: 220,
                                height: e.height,
                                style: { height: "".concat(e.height, "px") },
                                className: "w-auto object-contain ".concat(
                                  null != (s = e.className) ? s : "",
                                ),
                              }),
                            },
                            t,
                          );
                        }),
                      }),
                      (0, a.jsx)("div", {
                        "aria-hidden": !0,
                        className:
                          "pointer-events-none absolute left-[122px] right-[122px] top-full h-[160px]",
                        children: (0, a.jsxs)("div", {
                          className: "relative h-full w-full",
                          children: [
                            (0, a.jsx)("span", {
                              className:
                                "absolute top-0 left-1/3 h-full w-px bg-[#e7e2df]",
                            }),
                            (0, a.jsx)("span", {
                              className:
                                "absolute top-0 left-2/3 h-full w-px bg-[#e7e2df]",
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          });
        };
    },
    8486: (e, t, s) => {
      "use strict";
      s.d(t, { default: () => i });
      var a = s(5155),
        n = s(6769);
      let i = (e) => {
        let { children: t, className: s, delay: i = 0, duration: l = 0.8 } = e;
        return (0, a.jsx)(n.P.div, {
          className: s,
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: !0, margin: "0px 0px -10% 0px" },
          transition: { duration: l, delay: i, ease: "easeOut" },
          children: t,
        });
      };
    },
    9115: (e, t, s) => {
      "use strict";
      s.d(t, { default: () => P });
      var a = s(5155),
        n = s(2115),
        i = s(5239),
        l = s(6769),
        r = s(1408),
        o = s(5225),
        d = s(7601),
        c = s(356);
      let x = [
          { key: "roles", label: "Roles", dot: "bg-fuchsia-300" },
          { key: "testimonials", label: "Testimonials", dot: "bg-emerald-400" },
          { key: "how", label: "How I work", dot: "bg-sky-400" },
          { key: "faq", label: "FAQs", dot: "bg-rose-300" },
        ],
        m = [
          {
            title: "Accountant",
            icon: c.YY0,
            strengths:
              "Invoice processing, three-way matching, journal entries, reconciliations, and month-end close support. Works inside your ERP — Oracle, NetSuite, SAP, Coupa — not in a separate window. Reads PDFs, emails, and spreadsheets the way an AP clerk would, then posts clean entries with proper coding and approvals.",
            bestUsed:
              "Finance teams buried in volume. The recurring, rules-heavy work that has to be right every time — where one typo means a reconciliation nightmare two weeks later.",
            output:
              "Processed invoices with full audit trail, GL-coded journal entries, reconciliation reports, flagged exceptions with supporting context, month-end close packages.",
          },
          {
            title: "Developer",
            icon: c.nLS,
            strengths:
              "Writing, reviewing, and debugging code across your stack. Reads the whole codebase before making a change — doesn't just generate snippets in isolation. Follows your conventions, your linting rules, and your team's style without being told.",
            bestUsed:
              "Engineering teams that want an extra set of capable hands for the work that never gets prioritized: bug triage, PR reviews, documentation, internal tooling, test coverage.",
            output:
              "Reviewed PRs with actual feedback, debugged code with clear explanations, documented APIs, internal scripts, refactored legacy code.",
          },
          {
            title: "GTM Associate",
            icon: c.zWQ,
            strengths:
              "Prospect sourcing, outreach drafting, follow-up sequencing, meeting prep, and CRM hygiene. Finds the right people, writes the right message, and keeps the pipeline moving. Doesn't spam. Knows the difference between personalization and fake personalization.",
            bestUsed:
              "Sales teams that need the grunt work done well so humans can focus on the conversations that matter. Top-of-funnel that stays consistent whether your AEs are having a good week or a bad one.",
            output:
              "Researched prospect lists, personalized outreach drafts, follow-up sequences, meeting prep briefs, cleaned-up CRM records.",
          },
          {
            title: "Recruiter",
            icon: c.GjW,
            strengths:
              "Sourcing, resume screening, candidate outreach, interview scheduling, and pipeline tracking. Reads every resume in full. Doesn't skim. Knows the difference between a Diamond candidate and a Gold one — and doesn't confuse them.",
            bestUsed:
              "TA teams running multiple open roles at once. The sourcing and screening work that always becomes a bottleneck when hiring ramps up.",
            output:
              "Qualified candidate shortlists with notes, personalized outreach, screening summaries, pipeline reports, rejection letters that don't sound like rejection letters.",
          },
          {
            title: "Financial Analyst",
            icon: c.GNd,
            strengths:
              "Variance analysis, forecasting, management reporting, and ad-hoc modeling. Pulls from ERPs, data warehouses, and spreadsheets. Builds clean models that a CFO can actually read. Flags the story in the numbers, not just the numbers.",
            bestUsed:
              "FP&A teams that spend too much of the month pulling data and not enough analyzing it. Monthly reporting packages, budget reviews, board prep.",
            output:
              "Variance commentary, forecast models, board-ready reports, flux analysis, scenario planning.",
          },
          {
            title: "Legal Associate",
            icon: c.fJ4,
            strengths:
              "Contract review, clause extraction, redlining against playbooks, and compliance checks. Reads every page. Catches the thing buried on page 34 that the other side hoped you wouldn't notice.",
            bestUsed:
              "In-house legal teams buried in NDAs, MSAs, DPAs, and vendor agreements. The high-volume, pattern-heavy review work that doesn't need a partner but still has to be done right.",
            output:
              "Redlined contracts, issue lists with recommendations, playbook compliance reports, contract summaries, renewal tracking.",
          },
          {
            title: "Customer Success Manager",
            icon: c.lld,
            strengths:
              "Account health tracking, meeting prep, follow-up drafting, and usage analysis. Remembers every conversation with every customer. Doesn't ask the same question twice. Notices when an account goes quiet before it becomes a problem.",
            bestUsed:
              "CS teams managing large books of business where things slip through the cracks. Pre-meeting briefs, QBR prep, churn risk flagging, expansion opportunity spotting.",
            output:
              "Account health reports, meeting briefs, follow-up emails, QBR decks, churn risk alerts.",
          },
          {
            title: "Support Specialist",
            icon: c.bwz,
            strengths:
              "Ticket triage, first-response drafting, knowledge base lookups, and escalation routing. Handles Tier 1 completely. Escalates Tier 2 with full context attached — so the human picking it up doesn't have to re-do the discovery.",
            bestUsed:
              "Support teams getting buried in volume or working across timezones. The repetitive tickets that drain morale and the well-structured ones that just need a fast, accurate response.",
            output:
              "Resolved tickets, drafted responses, updated knowledge base articles, escalation summaries with full context.",
          },
          {
            title: "Data Analyst",
            icon: c.zNM,
            strengths:
              "SQL queries, dashboard building, cohort analysis, and data storytelling. Explores the data before answering the question. Knows when the answer the business wants isn't the answer the data supports — and says so.",
            bestUsed:
              "Data teams with too many ad-hoc requests and not enough time for the real work. Ad-hoc analysis, recurring reports, investigation work.",
            output:
              "SQL queries, dashboards, written analyses with interpretation, cohort reports, data quality flags.",
          },
          {
            title: "Procurement Analyst",
            icon: c.B5U,
            strengths:
              "Vendor onboarding, PR-to-PO processing, three-way matching, and policy enforcement. Knows which purchase requests need scrutiny and which can flow. Reads contracts, catalogs, and vendor master data fluently.",
            bestUsed:
              "Procurement teams drowning in requisitions and vendor paperwork. The policy-heavy review work that slows everything down but can't be skipped.",
            output:
              "Validated PRs, approved POs, vendor onboarding packages, policy compliance flags, spend analysis reports.",
          },
          {
            title: "Compliance Analyst",
            icon: c.nLS,
            strengths:
              "Sanctions screening, KYC review, adverse media checks, and audit trail documentation. Does the full investigation — OSINT, registry checks, ownership tracing — not just the first match. Writes disposition notes that hold up in an audit.",
            bestUsed:
              "Risk and compliance teams doing L1 and L2 review work at volume. Payment screening, onboarding checks, periodic reviews — the work where missing one true match is a regulatory problem.",
            output:
              "Screening dispositions with full reasoning, KYC review packages, adverse media summaries, SAR drafts, audit-ready investigation files.",
          },
          {
            title: "Marketing Manager",
            icon: c.GNd,
            strengths:
              "Campaign planning, cross-channel execution, budget tracking, and team coordination. Holds the calendar, owns the briefs, and keeps every moving piece connected. Doesn't lose track of what's live, what's in review, and what's two weeks late. Thinks in quarters but executes week by week.",
            bestUsed:
              "Marketing teams that need someone keeping the machine running while senior people focus on strategy. The coordination layer — between agencies, contractors, designers, and writers — that usually falls to whoever is least busy.",
            output:
              "Campaign calendars, creative briefs, launch checklists, budget trackers, weekly status reports, post-campaign reviews.",
          },
          {
            title: "Revenue Operations Analyst",
            icon: c.GjW,
            strengths:
              "CRM hygiene, pipeline reporting, attribution analysis, and sales process optimization. Lives in Salesforce or HubSpot but thinks beyond it. Spots where deals are stalling, where data is dirty, and where the funnel math doesn't add up. Asks the uncomfortable question: is the pipeline real?",
            bestUsed:
              "RevOps and sales leadership teams that need clean data and honest reporting. The weekly, monthly, and quarterly work that underpins every forecast conversation.",
            output:
              "Pipeline health reports, CRM audit logs, attribution dashboards, lead routing rules, forecast decks, territory models.",
          },
          {
            title: "Supply Chain Analyst",
            icon: c.bwz,
            strengths:
              "Demand forecasting, inventory analysis, supplier performance tracking, and logistics coordination. Reads purchase orders, shipment data, and lead time reports the way a seasoned planner would — and flags the problem before it becomes a stockout or an overage. Connects the dots between procurement, warehousing, and fulfillment without needing to be asked.",
            bestUsed:
              "Supply chain and operations teams managing complex vendor networks and high SKU volumes. The monitoring and reporting work that has to happen continuously — safety stock reviews, supplier scorecards, inbound tracking — but rarely gets enough attention because everyone is too busy fighting fires.",
            output:
              "Demand forecasts, inventory health reports, supplier scorecards, inbound shipment trackers, lead time analyses, reorder point recommendations.",
          },
          {
            title: "Risk Analyst",
            icon: c.kEj,
            strengths:
              "Risk identification, control testing, incident documentation, and regulatory monitoring. Reads policy frameworks, audit findings, and regulatory guidance without glazing over. Tracks open issues to closure, flags what's past due, and builds the kind of audit trail that holds up under scrutiny. Knows the difference between a risk that needs escalating and one that needs documenting.",
            bestUsed:
              "Risk, compliance, and internal audit teams that need consistent coverage across a large control environment. The monitoring, testing, and reporting work that has to be done every cycle — and that usually falls to the most junior person in the room.",
            output:
              "Risk registers, control test results, incident reports, regulatory change summaries, issue tracking logs, audit committee packs.",
          },
        ],
        p = [
          {
            kind: "yatin",
            image: c.VMw,
            quote:
              "Zamp enables us to securely automate complex operations with precision, scale, and full compliance, allowing our teams to focus on what matters most",
            author: "Yatin Parab",
            role: "CPO at Wio Bank PJSC",
            bg: "#1E58D8",
          },
          {
            kind: "gartner",
            headline: "Cool vendor for Agentic AI",
            brand: "Gartner",
            bg: "#5C6A4A",
            maskImage: c.vJD,
          },
          {
            kind: "quote-with-image",
            quote:
              "Zamp now handles most of our invoice processing end-to-end. We just have to chime in, when it asks us a question",
            author: "Kristin Tumulak",
            role: "Finance, Mindbody",
            image: c.Hq3,
            bg: "#302F37",
          },
          {
            kind: "zinnov",
            headline: "Zamp CEO speaks on Enterprise AI adoption",
            brand: "Zinnov Confluence 2025 ",
            bg: "#C8D4A6",
            textColor: "#302F37",
          },
          {
            kind: "raghav",
            image: c.Hah,
            quote: 'AWS "AI/ML Disruptor of the Year 2025"',
            author: "Raghav",
            role: "",
            bg: "#4A2D7A",
          },
          {
            kind: "brand",
            brand: "IDC",
            quote: "Zamp is redefining finance operations",
            bg: "#FCFCFC",
            textColor: "#000000",
          },
        ],
        h = [
          {
            title: "Connect Your Systems",
            body: "Give me access to the tools where the work actually lives — your ERP, your inbox, your spreadsheets. I don't need a custom integration or a six month IT project. If your team uses it, I can work with it.",
          },
          {
            title: "Share Your Process",
            body: "Walk me through how things get done today. Show me the steps, share some examples, tell me about the exceptions. I'll ask questions. The more context you give me now, the less hand-holding I'll need later.",
          },
          {
            title: "Train Your AI Employee",
            body: "I start running the work. You watch, review, and correct. Every piece of feedback makes me sharper — not just for that task, but for every one like it after. This is the day I go from capable to confident.",
          },
          {
            title: "Scale with Confidence",
            body: "I'm running at 99%+ accuracy and I don't stop at 5pm. Hand off as much as you want — I'll handle the volume, flag what needs a human, and get better with every cycle. Your team gets their time back. You start thinking about what's next.",
          },
        ],
        u = [
          {
            question: "Is this just a chatbot with extra steps?",
            answer:
              "No. A chatbot waits for you to ask it something. Zamp doesn't wait — it monitors, acts, and escalates on its own. You brief it once on a process and it runs that process end-to-end, without needing a prompt every time. The experience is closer to managing an employee than using a tool.",
          },
          {
            question:
              "How is this different from automation tools like Zapier or UiPath?",
            answer:
              "Automation tools follow rigid rules — they break the moment something unexpected happens. Zamp handles the unexpected. It reads context, makes judgment calls, asks when it's genuinely unsure, and learns from every correction. It's the difference between a script and someone who actually understands the work.",
          },
          {
            question: "What happens when Zamp gets something wrong?",
            answer:
              "It flags it rather than guessing. When Zamp hits something outside its confidence threshold, it escalates to a human with full context — what it saw, what it tried, and what it needs to proceed. Over time, those escalations get fewer. But they never go to zero, and they shouldn't — some things should always have a human in the loop.",
          },
          {
            question: "How long does it take before Zamp is actually useful?",
            answer:
              "Most teams are seeing real output within the first week and running at high accuracy by week three or four. The timeline depends on how complex the process is and how quickly your team can give feedback in the early days. We're not promising a six-month onboarding. We're promising something that ramps like a fast hire.",
          },
          {
            question: "Do I need to involve IT or change my existing systems?",
            answer:
              "Usually not. Zamp works with the tools your team already uses — your ERP, your inbox, your spreadsheets, your browser-based portals. It doesn't require a custom integration or a data migration project. If a human on your team can access it, Zamp can work with it.",
          },
          {
            question: "Who stays in control?",
            answer:
              "You do. You decide which processes Zamp runs, which decisions it can make independently, and where a human has to sign off. Nothing posts, sends, or files without the approval gates you set. The goal isn't to remove humans from the loop — it's to make sure humans are only in the loops that actually need them.",
          },
          {
            question:
              "What does it cost? Is it like hiring a full-time employee?",
            answer:
              "It's structured like hiring — you bring Zamp on for a specific role or process, and the cost scales with the work it's doing. It's significantly less than a full-time hire with benefits, and it doesn't call in sick or leave for a better offer. Pricing is straightforward — talk to us and we'll scope it against your specific process.",
          },
        ],
        g = (e) => {
          let { title: t } = e;
          return (0, a.jsxs)("div", {
            className: "flex items-center gap-4",
            children: [
              (0, a.jsx)("span", {
                className: "h-10.5 w-[7px] bg-[#302F37] rounded shrink-0",
              }),
              (0, a.jsx)("h3", {
                className:
                  "font-sans text-[20px] md:text-[20px] font-normal text-black leading-tight tracking-tight",
                children: t,
              }),
            ],
          });
        },
        f = (e) => {
          let { label: t, body: s } = e;
          return (0, a.jsxs)("div", {
            className: "mt-6",
            children: [
              (0, a.jsx)("div", {
                className:
                  "font-sans text-[16px] font-normal leading-tight text-black/70 tracking-[-0.04em]",
                children: t,
              }),
              (0, a.jsx)("p", {
                className:
                  "mt-1 font-mono font-normal text-[13px] leading-[15px] text-[#3e3e3e] tracking-[-0.06em] whitespace-pre-wrap",
                children: s,
              }),
            ],
          });
        },
        b = (e) => {
          let { roles: t, onRoleMouseMove: s, onRoleMouseLeave: d } = e,
            [c, x] = (0, n.useState)(null),
            m = null !== c ? t[c] : null,
            p = (0, n.useRef)(null);
          return (
            (0, n.useEffect)(() => {
              if (null === c) return;
              let e = (e) => {
                p.current && !p.current.contains(e.target) && x(null);
              };
              return (
                document.addEventListener("pointerdown", e),
                () => document.removeEventListener("pointerdown", e)
              );
            }, [c]),
            (0, a.jsxs)("div", {
              className: "relative",
              children: [
                (0, a.jsxs)("div", {
                  className:
                    "relative grid grid-cols-3 md:grid-cols-5 gap-y-8 md:gap-y-10 2xl:gap-y-24 md:-mx-[72px] 2xl:-mx-[100px]",
                  children: [
                    (0, a.jsx)("div", {
                      className:
                        "pointer-events-none absolute inset-y-0 left-0 w-full",
                      children: [1, 2, 3, 4].map((e) =>
                        (0, a.jsx)(
                          "span",
                          {
                            className:
                              "hidden md:block absolute top-0 bottom-0 w-px bg-black/10",
                            style: { left: "".concat((e / 5) * 100, "%") },
                          },
                          e,
                        ),
                      ),
                    }),
                    t.map((e, t) => {
                      let n = t % 3;
                      return (0, a.jsxs)(
                        "button",
                        {
                          onMouseMove: (e) => s(e, t),
                          onMouseLeave: d,
                          onClick: () => x(t),
                          className: (0, o.cn)(
                            "relative flex flex-col gap-2 md:gap-3 cursor-pointer w-full",
                            0 === n
                              ? "items-start md:items-center"
                              : 2 === n
                                ? "items-end md:items-center"
                                : "items-center",
                          ),
                          children: [
                            (0, a.jsx)("div", {
                              className:
                                "relative h-[55px] w-[55px] md:h-[60px] md:w-[60px] shrink-0",
                              children: (0, a.jsx)(i.default, {
                                src: e.icon,
                                alt: "",
                                fill: !0,
                                className: "object-contain",
                              }),
                            }),
                            (0, a.jsx)("span", {
                              className: (0, o.cn)(
                                "font-sans text-[12px] text-[#302F37] tracking-tight leading-tight w-[55px] md:w-auto md:max-w-full text-center",
                              ),
                              children: e.title,
                            }),
                          ],
                        },
                        t,
                      );
                    }),
                  ],
                }),
                (0, a.jsx)(r.N, {
                  children:
                    m &&
                    (0, a.jsxs)(
                      l.P.div,
                      {
                        ref: p,
                        initial: { opacity: 0, y: 8 },
                        animate: { opacity: 1, y: 0 },
                        exit: { opacity: 0, y: 8 },
                        transition: { duration: 0.18, ease: "easeOut" },
                        className:
                          "md:hidden absolute inset-0 -m-4 z-30 rounded-[9px] border border-[#d6d6d6] bg-[#3e3e3e33] backdrop-blur-md overflow-hidden",
                        children: [
                          (0, a.jsx)("div", {
                            className:
                              "absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat",
                            style: {
                              backgroundImage:
                                "url(/images/Home/v2/agents/texture.svg)",
                            },
                          }),
                          (0, a.jsxs)("div", {
                            className: "p-4 h-full overflow-y-auto",
                            children: [
                              (0, a.jsxs)("div", {
                                className:
                                  "flex items-center gap-4 mb-4 min-w-0",
                                children: [
                                  (0, a.jsx)("button", {
                                    type: "button",
                                    "aria-label": "Close",
                                    onClick: () => x(null),
                                    className:
                                      "shrink-0 text-black/60 hover:text-black cursor-pointer",
                                    children: (0, a.jsxs)("svg", {
                                      xmlns: "http://www.w3.org/2000/svg",
                                      width: "17",
                                      height: "17",
                                      viewBox: "0 0 17 17",
                                      fill: "none",
                                      children: [
                                        (0, a.jsx)("line", {
                                          x1: "0.924678",
                                          y1: "0.926884",
                                          x2: "16.0358",
                                          y2: "16.038",
                                          stroke: "#3E3E3E",
                                          strokeWidth: "2.61538",
                                        }),
                                        (0, a.jsx)("line", {
                                          y1: "-1.30769",
                                          x2: "21.3703",
                                          y2: "-1.30769",
                                          transform:
                                            "matrix(-0.707107 0.707107 0.707107 0.707107 17 1.85156)",
                                          stroke: "#3E3E3E",
                                          strokeWidth: "2.61538",
                                        }),
                                      ],
                                    }),
                                  }),
                                  (0, a.jsxs)("div", {
                                    className:
                                      "flex items-center gap-2 min-w-0 flex-1 justify-end",
                                    children: [
                                      (0, a.jsx)("div", {
                                        className: "relative h-7 w-7 shrink-0",
                                        children: (0, a.jsx)(i.default, {
                                          src: m.icon,
                                          alt: "",
                                          fill: !0,
                                          className: "object-contain",
                                        }),
                                      }),
                                      (0, a.jsx)("h5", {
                                        className:
                                          "font-sans text-[22px] font-normal text-black/70 tracking-[-0.04em] leading-[26px] truncate",
                                        children: m.title,
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              (0, a.jsx)(f, {
                                label: "Strengths:",
                                body: m.strengths,
                              }),
                              (0, a.jsx)(f, {
                                label: "Best used:",
                                body: m.bestUsed,
                              }),
                              (0, a.jsx)(f, {
                                label: "Output:",
                                body: m.output,
                              }),
                            ],
                          }),
                        ],
                      },
                      "mobile-role-detail",
                    ),
                }),
              ],
            })
          );
        },
        v = (e) => {
          let { card: t } = e;
          return (0, a.jsxs)("div", {
            className:
              "relative rounded-[12px] md:rounded-[16px] overflow-hidden flex flex-col justify-end p-3 md:p-4 text-white min-h-[195px] md:min-h-[315px] 2xl:min-h-[380px] border border-white",
            style: { backgroundColor: t.bg },
            children: [
              (0, a.jsx)(i.default, {
                src: t.image,
                alt: t.author,
                fill: !0,
                sizes: "(max-width: 768px) 50vw, 33vw",
                className:
                  "object-cover object-center pointer-events-none select-none scale-105",
              }),
              (0, a.jsxs)("div", {
                className: "relative z-10 flex flex-col gap-2 md:gap-3",
                children: [
                  (0, a.jsxs)("p", {
                    className:
                      "font-sans text-[10px] md:text-[14px] leading-[11px] md:leading-[15px] tracking-normal",
                    children: ["“", t.quote, "”"],
                  }),
                  (0, a.jsxs)("div", {
                    className:
                      "font-mono text-[8px] md:text-[11px] uppercase tracking-[-0.06em] leading-[9px] md:leading-[14px]",
                    children: [
                      (0, a.jsx)("div", { children: t.author }),
                      t.role &&
                        (0, a.jsx)("div", {
                          className: "opacity-80",
                          children: t.role,
                        }),
                    ],
                  }),
                ],
              }),
            ],
          });
        },
        w = (e) => {
          let { card: t } = e;
          return (0, a.jsxs)("div", {
            className:
              "relative rounded-[12px] md:rounded-[16px] overflow-hidden flex flex-col justify-end p-3 md:p-4.5 text-white min-h-[205px] md:min-h-[315px] 2xl:min-h-[380px]",
            style: { backgroundColor: t.bg },
            children: [
              (0, a.jsx)(i.default, {
                src: t.image,
                alt: t.author,
                fill: !0,
                sizes: "(max-width: 768px) 50vw, 33vw",
                className:
                  "object-cover object-top pointer-events-none select-none",
              }),
              (0, a.jsx)("div", {
                className:
                  "absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-black/85",
              }),
              (0, a.jsx)("div", {
                className: "relative z-10 flex flex-col gap-2 md:gap-3",
                children: (0, a.jsx)("p", {
                  className:
                    "font-sans text-[20px] md:text-[34px] leading-[20px] md:leading-[34px] tracking-normal",
                  children: t.quote,
                }),
              }),
            ],
          });
        },
        y = (e) => {
          let { card: t } = e;
          return (0, a.jsxs)("div", {
            className:
              "relative rounded-[12px] md:rounded-[16px] overflow-hidden px-3 md:px-4 py-2 md:py-3 flex flex-col justify-between min-h-[116px] md:min-h-[200px] 2xl:min-h-[240px] text-white",
            style: { backgroundColor: t.bg },
            children: [
              (0, a.jsx)(i.default, {
                src: t.maskImage,
                alt: "",
                "aria-hidden": !0,
                fill: !0,
                sizes: "(max-width: 768px) 50vw, 33vw",
                className:
                  "object-cover opacity-80 mix-blend-overlay pointer-events-none select-none",
              }),
              (0, a.jsx)("h4", {
                className:
                  "relative z-10 font-sans text-[20px] md:text-[34px] leading-[20px] md:leading-[34px] tracking-normal",
                children: t.headline,
              }),
              (0, a.jsx)("div", {
                className:
                  "relative z-10 font-mono text-[14px] md:text-[18px] leading-5 md:leading-8 tracking-[-0.02em] mt-2 md:mt-6 opacity-90",
                children: t.brand,
              }),
            ],
          });
        },
        j = (e) => {
          let { card: t } = e;
          return (0, a.jsxs)("div", {
            className:
              "rounded-[12px] md:rounded-[16px] px-3 md:px-4.5 py-2 md:py-6 flex flex-col justify-between min-h-[116px] md:min-h-[200px] 2xl:min-h-[240px]",
            style: { backgroundColor: t.bg, color: t.textColor },
            children: [
              (0, a.jsx)("h4", {
                className:
                  "font-sans text-[10px] md:text-base leading-[11px] md:leading-[18px] tracking-normal",
                children: t.headline,
              }),
              (0, a.jsx)("div", {
                className:
                  "font-sans text-[18px] md:text-[30px] leading-[18px] md:leading-[27px] tracking-normal mt-3 md:mt-10 opacity-80",
                children: t.brand,
              }),
            ],
          });
        },
        k = (e) => {
          let { card: t } = e;
          return (0, a.jsxs)("div", {
            className:
              "rounded-[12px] md:rounded-[16px] overflow-hidden flex flex-col text-white min-h-[162px] md:min-h-auto",
            style: { backgroundColor: t.bg },
            children: [
              (0, a.jsxs)("div", {
                className:
                  "px-3 md:px-5 py-2 md:py-3.5 flex flex-col gap-2 md:gap-6",
                children: [
                  (0, a.jsxs)("p", {
                    className:
                      "font-sans text-[10px] md:text-[14px] leading-[11px] md:leading-[15px] tracking-normal",
                    children: ["“", t.quote, "”"],
                  }),
                  (0, a.jsxs)("div", {
                    className:
                      "font-mono text-[8px] md:text-[11px] uppercase tracking-[0.01em] leading-[9px] md:leading-[14px]",
                    children: [
                      (0, a.jsx)("div", { children: t.author }),
                      (0, a.jsx)("div", {
                        className: "opacity-80",
                        children: t.role,
                      }),
                    ],
                  }),
                ],
              }),
              (0, a.jsx)("div", {
                className:
                  "relative w-full flex-1 min-h-[64px] md:min-h-[188px] 2xl:min-h-[310px] overflow-hidden",
                children: (0, a.jsx)(i.default, {
                  src: t.image,
                  alt: "",
                  fill: !0,
                  sizes: "(max-width: 768px) 50vw, 33vw",
                  className: "object-cover pointer-events-none select-none",
                }),
              }),
            ],
          });
        },
        N = (e) => {
          let { card: t } = e;
          return (0, a.jsxs)("div", {
            className:
              "rounded-[12px] md:rounded-[16px] p-3 md:p-5 flex flex-col justify-between min-h-[151px] md:min-h-0 border border-black/10",
            style: { backgroundColor: t.bg, color: t.textColor },
            children: [
              (0, a.jsx)("span", {
                className:
                  "font-sans text-[50px] md:text-[64px] leading-none tracking-[-0.04em] font-normal",
                children: t.brand,
              }),
              (0, a.jsxs)("p", {
                className:
                  "font-sans text-[14px] md:text-[25px] leading-[16px] md:leading-[28px] tracking-[-0.03em] mt-2 md:mt-6",
                children: ["“", t.quote, "”"],
              }),
            ],
          });
        },
        E = (e, t) => {
          switch (e.kind) {
            case "yatin":
              return (0, a.jsx)(v, { card: e }, t);
            case "raghav":
              return (0, a.jsx)(w, { card: e }, t);
            case "gartner":
              return (0, a.jsx)(y, { card: e }, t);
            case "zinnov":
              return (0, a.jsx)(j, { card: e }, t);
            case "quote-with-image":
              return (0, a.jsx)(k, { card: e }, t);
            case "brand":
              return (0, a.jsx)(N, { card: e }, t);
            default:
              return null;
          }
        },
        I = () => {
          let e = [p[0], p[3]],
            t = [p[1], p[4]],
            s = [p[2], p[5]],
            n = [p[0], p[3], p[2]],
            i = [p[1], p[4], p[5]];
          return (0, a.jsxs)(a.Fragment, {
            children: [
              (0, a.jsxs)("div", {
                className: "md:hidden grid grid-cols-2 gap-2.5",
                children: [
                  (0, a.jsx)("div", {
                    className: "flex flex-col gap-2.5",
                    children: n.map((e, t) => E(e, "mc1-".concat(t))),
                  }),
                  (0, a.jsx)("div", {
                    className: "flex flex-col gap-2.5",
                    children: i.map((e, t) => E(e, "mc2-".concat(t))),
                  }),
                ],
              }),
              (0, a.jsxs)("div", {
                className: "hidden md:grid grid-cols-3 gap-4",
                children: [
                  (0, a.jsx)("div", {
                    className: "flex flex-col gap-4",
                    children: e.map((e, t) => E(e, "c1-".concat(t))),
                  }),
                  (0, a.jsx)("div", {
                    className: "flex flex-col gap-4",
                    children: t.map((e, t) => E(e, "c2-".concat(t))),
                  }),
                  (0, a.jsx)("div", {
                    className: "flex flex-col gap-4",
                    children: s.map((e, t) => E(e, "c3-".concat(t))),
                  }),
                ],
              }),
            ],
          });
        },
        C = () =>
          (0, a.jsx)("div", {
            children: (0, a.jsx)("div", {
              className:
                "relative grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-8 md:gap-y-10",
              children: h.map((e, t) =>
                (0, a.jsxs)(
                  "div",
                  {
                    className: "relative md:px-3 md:first:pl-0 md:last:pr-0",
                    children: [
                      t > 0 &&
                        (0, a.jsxs)("div", {
                          "aria-hidden": !0,
                          className:
                            "hidden md:flex pointer-events-none absolute -left-3 top-[56px] bottom-0 flex-col items-center",
                          children: [
                            (0, a.jsx)("span", {
                              className:
                                "h-1 w-1 rounded-full bg-black/50 mb-1",
                            }),
                            (0, a.jsx)("span", {
                              className: "h-[76px] w-px bg-black/15",
                            }),
                            (0, a.jsx)("span", {
                              className:
                                "h-1 w-1 rounded-full bg-black/50 mt-4 mb-2",
                            }),
                            (0, a.jsx)("span", {
                              className: "flex-1 w-px bg-black/15",
                            }),
                          ],
                        }),
                      (0, a.jsxs)("span", {
                        className:
                          "inline-flex items-center rounded-full bg-white px-3 h-7 md:h-8 font-mono text-[13px] md:text-base leading-6 tracking-[-4%] text-[#474747] uppercase",
                        children: ["Day ", t + 1],
                      }),
                      (0, a.jsx)("h5", {
                        className:
                          "mt-3 md:mt-4 font-sans text-[15px] md:text-[18px] font-medium text-black leading-[18px] md:leading-[22px] tracking-[-3%] md:min-h-[66px]",
                        children: e.title,
                      }),
                      (0, a.jsx)("p", {
                        className:
                          "mt-3 md:mt-8 font-sans text-[12px] md:text-[18px] leading-[14px] md:leading-5.5 tracking-[-3%] text-[#777169]",
                        children: e.body,
                      }),
                    ],
                  },
                  e.title,
                ),
              ),
            }),
          }),
        F = () => {
          let [e, t] = (0, n.useState)(0);
          return (0, a.jsx)("div", {
            className:
              "relative divide-y divide-black/10 border-y border-black/10",
            children: u.map((s, n) => {
              let i = e === n;
              return (0, a.jsx)(
                "div",
                {
                  className: "relative",
                  children: (0, a.jsxs)("button", {
                    type: "button",
                    onClick: () => t(i ? null : n),
                    className:
                      "block w-full cursor-pointer text-left transition-colors hover:bg-black/[0.03]",
                    children: [
                      (0, a.jsx)("div", {
                        className: "px-2 py-3.5",
                        children: (0, a.jsx)("span", {
                          className:
                            "font-sans text-[15px] md:text-[16px] font-medium text-black leading-[18px] tracking-normal",
                          children: s.question,
                        }),
                      }),
                      (0, a.jsx)(r.N, {
                        initial: !1,
                        children:
                          i &&
                          (0, a.jsx)(
                            l.P.div,
                            {
                              initial: { height: 0, opacity: 0 },
                              animate: { height: "auto", opacity: 1 },
                              exit: { height: 0, opacity: 0 },
                              transition: {
                                height: {
                                  duration: 0.3,
                                  ease: [0.4, 0, 0.2, 1],
                                },
                                opacity: { duration: 0.2, ease: "easeOut" },
                              },
                              className: "overflow-hidden",
                              children: (0, a.jsxs)("div", {
                                className:
                                  "flex items-stretch gap-4 px-2 pb-5 md:pb-6",
                                children: [
                                  (0, a.jsx)("span", {
                                    className:
                                      "w-[7px] shrink-0 rounded-full bg-[#e3dfdc]",
                                  }),
                                  (0, a.jsx)("p", {
                                    className:
                                      "font-sans text-[13px] md:text-[15px] leading-[16px] md:leading-[20px] tracking-normal text-[#302f37]",
                                    children: s.answer,
                                  }),
                                ],
                              }),
                            },
                            "content",
                          ),
                      }),
                    ],
                  }),
                },
                s.question,
              );
            }),
          });
        },
        A = (e) => {
          let { activeTab: t, onRoleMouseMove: s, onRoleMouseLeave: n } = e;
          return (0, a.jsxs)(a.Fragment, {
            children: [
              (0, a.jsx)("div", {
                className: "roles" === t ? void 0 : "hidden",
                children: (0, a.jsx)(b, {
                  roles: m,
                  onRoleMouseMove: s,
                  onRoleMouseLeave: n,
                }),
              }),
              (0, a.jsx)("div", {
                className: "testimonials" === t ? void 0 : "hidden",
                children: (0, a.jsx)(I, {}),
              }),
              (0, a.jsx)("div", {
                className: "how" === t ? void 0 : "hidden",
                children: (0, a.jsx)(C, {}),
              }),
              (0, a.jsx)("div", {
                className: "faq" === t ? void 0 : "hidden",
                children: (0, a.jsx)(F, {}),
              }),
            ],
          });
        },
        z = {
          roles: "I play different roles across all the companies I work at",
          testimonials:
            "Some nice things that some of the folks I’ve worked with say about me",
          how: "In case you want to know what working with me could look like",
          faq: "Each action I take follows a system designed for consistency and efficency",
        },
        S = {
          roles: "About me",
          testimonials: "About me",
          how: "About me",
          faq: "About me",
        },
        R = (e) => {
          let { label: t, body: s } = e;
          return (0, a.jsxs)("div", {
            className: "mt-6",
            children: [
              (0, a.jsx)("div", {
                className:
                  "font-sans text-[18px] leading-tight text-black/70 tracking-[-0.04em]",
                children: t,
              }),
              (0, a.jsx)("p", {
                className:
                  "mt-2 font-mono text-[14px] leading-[18px] text-[#3e3e3e] tracking-[-0.06em] whitespace-pre-wrap",
                children: s,
              }),
            ],
          });
        },
        P = () => {
          let [e, t] = (0, n.useState)("roles"),
            [s, p] = (0, n.useState)(null),
            [h, u] = (0, n.useState)({
              x: 0,
              y: 0,
              flipX: !1,
              flipY: !1,
              clampedLeft: 0,
            }),
            [f, b] = (0, n.useState)(!0),
            [v, w] = (0, n.useState)(!1),
            y = (0, n.useRef)(null),
            j = (0, n.useRef)(null);
          ((0, n.useEffect)(() => {
            if (v) return;
            let e = y.current;
            if (!e) return;
            let t = new IntersectionObserver(
              (e) => {
                let [s] = e;
                s.isIntersecting && (w(!0), t.disconnect());
              },
              { threshold: 0.2 },
            );
            return (t.observe(e), () => t.disconnect());
          }, [v]),
            (0, n.useEffect)(() => {
              if (f && v)
                return (
                  (j.current = setInterval(() => {
                    t((e) => {
                      let t = x.findIndex((t) => t.key === e);
                      return x[(t + 1) % x.length].key;
                    });
                  }, 8e3)),
                  () => {
                    j.current && clearInterval(j.current);
                  }
                );
            }, [f, v]),
            (0, n.useEffect)(() => {
              if (null === s) return;
              let e = () => p(null);
              return (
                window.addEventListener("scroll", e, { passive: !0 }),
                () => window.removeEventListener("scroll", e)
              );
            }, [s]));
          let k = (e) => {
              (b(!1), t(e));
            },
            N = (e, t) => {
              window.innerWidth < 768 ||
                (u(
                  ((e, t) => {
                    let s = window.innerWidth,
                      a = window.innerHeight,
                      n = e + 24 + 516 > s,
                      i = n ? e - 24 - 516 : e + 24;
                    return {
                      x: e,
                      y: t,
                      flipX: n,
                      flipY: t + 440 > a,
                      clampedLeft: (i = Math.max(
                        16,
                        Math.min(i, s - 516 - 16),
                      )),
                    };
                  })(e.clientX, e.clientY),
                ),
                p(t));
            },
            E = () => {
              window.innerWidth < 768 || p(null);
            },
            I = null !== s ? m[s] : null,
            C = x.findIndex((t) => t.key === e);
          return (
            x.length,
            (0, a.jsx)("section", {
              ref: y,
              className: "relative w-full bg-[#EFEFEF] py-10 md:py-24",
              children: (0, a.jsxs)("div", {
                className:
                  "relative mx-auto w-full max-w-[1280px] 2xl:max-w-[1600px] px-5 md:px-10",
                children: [
                  (0, a.jsx)("div", {
                    className: "md:hidden",
                    children: (0, a.jsxs)("div", {
                      className:
                        "rounded-[15px] bg-[#efefef] border border-[#cbcbcb] overflow-hidden",
                      children: [
                        (0, a.jsx)("div", {
                          className: "px-6 pt-3.5",
                          children: (0, a.jsx)("h2", {
                            className:
                              "font-sans text-[25px] font-normal text-black/75 leading-[28px] tracking-[-1px]",
                            children: "About me",
                          }),
                        }),
                        (0, a.jsx)("div", {
                          className:
                            "px-6 mt-7 grid grid-cols-4 divide-x divide-[#d2d2d2]",
                          children: x.map((t) => {
                            let s = e === t.key;
                            return (0, a.jsx)(
                              "button",
                              {
                                onClick: () => k(t.key),
                                className:
                                  "flex justify-center py-2 cursor-pointer",
                                "aria-label": t.label,
                                children: (0, a.jsxs)("span", {
                                  className: (0, o.cn)(
                                    "relative h-5 w-5 overflow-hidden rounded-full transition-opacity duration-200",
                                    s ? "opacity-100" : "opacity-30",
                                  ),
                                  children: [
                                    (0, a.jsx)("span", {
                                      className:
                                        "absolute inset-0 bg-center bg-cover",
                                      style: {
                                        backgroundImage: "url(".concat(
                                          c.wu5,
                                          ")",
                                        ),
                                      },
                                    }),
                                    (0, a.jsx)("span", {
                                      className: (0, o.cn)(
                                        "absolute inset-0 opacity-60",
                                        t.dot,
                                      ),
                                    }),
                                  ],
                                }),
                              },
                              t.key,
                            );
                          }),
                        }),
                        (0, a.jsx)("div", {
                          className: "px-[22px] mt-2.5",
                          children: (0, a.jsx)("div", {
                            className:
                              "relative h-[9px] w-full overflow-hidden rounded-full bg-[#d9d9d9]",
                            children: f
                              ? v &&
                                (0, a.jsx)(
                                  l.P.span,
                                  {
                                    initial: { width: "0%" },
                                    animate: { width: "100%" },
                                    transition: { duration: 8, ease: "linear" },
                                    className:
                                      "absolute inset-y-0 left-0 bg-white",
                                  },
                                  "mobile-progress-".concat(e),
                                )
                              : (0, a.jsx)("span", {
                                  className:
                                    "absolute inset-y-0 left-0 bg-white w-full",
                                }),
                          }),
                        }),
                        (0, a.jsxs)("div", {
                          className:
                            "px-6 mt-6 flex items-start justify-between gap-3 h-[60px]",
                          children: [
                            (0, a.jsx)("h3", {
                              className:
                                "font-sans text-[25px] font-normal text-black/75 leading-[28px] tracking-[-1px] shrink-0",
                              children: x[C].label,
                            }),
                            (0, a.jsx)("p", {
                              className:
                                "font-sans text-[14px] font-normal text-black leading-[15px] tracking-[-0.56px] max-w-[170px] text-left",
                              children: z[e],
                            }),
                          ],
                        }),
                        (0, a.jsx)("div", {
                          className: "px-6 pt-6 pb-6",
                          children: (0, a.jsx)(A, {
                            activeTab: e,
                            onRoleMouseMove: N,
                            onRoleMouseLeave: E,
                          }),
                        }),
                      ],
                    }),
                  }),
                  (0, a.jsxs)("div", {
                    className:
                      "hidden md:grid relative grid-cols-[260px_1fr] 2xl:grid-cols-[300px_1fr] rounded-[20px] bg-[#EFEFEF] border border-[#cbcbcb] overflow-hidden min-h-[572px] 2xl:min-h-[680px]",
                    children: [
                      (0, a.jsxs)("div", {
                        className:
                          "relative flex flex-col justify-between rounded-[15px] bg-[#efefef] p-8 2xl:p-10 min-h-[520px] 2xl:min-h-[640px]",
                        children: [
                          (0, a.jsx)("h2", {
                            className:
                              "font-sans text-[22px] font-normal text-black tracking-tight",
                            children: S[e],
                          }),
                          (0, a.jsx)("div", {
                            className: "flex flex-col gap-3",
                            children: x.map((t) => {
                              let s = e === t.key;
                              return (0, a.jsxs)(
                                "button",
                                {
                                  onClick: () => k(t.key),
                                  className:
                                    "relative flex items-center gap-3 self-start cursor-pointer font-sans hover:bg-white transition-opacity overflow-hidden rounded-full border border-[#fafafa] bg-[#f5f5f5] pl-4 pr-5 py-2 text-[20px] leading-5 tracking-[-4%] font-normal text-[#1e1e1e] w-[172px] shadow-sm",
                                  children: [
                                    s &&
                                      f &&
                                      v &&
                                      (0, a.jsx)(
                                        l.P.span,
                                        {
                                          initial: { scaleX: 0 },
                                          animate: { scaleX: 1 },
                                          transition: {
                                            duration: 8,
                                            ease: "linear",
                                          },
                                          className:
                                            "absolute inset-0 origin-left bg-white",
                                        },
                                        "".concat(t.key, "-fill"),
                                      ),
                                    s &&
                                      !f &&
                                      (0, a.jsx)("span", {
                                        className: "absolute inset-0 bg-white",
                                      }),
                                    (0, a.jsxs)("span", {
                                      className:
                                        "relative z-10 h-4 w-4 overflow-hidden rounded-full",
                                      children: [
                                        (0, a.jsx)("span", {
                                          className:
                                            "absolute inset-0 bg-center bg-cover",
                                          style: {
                                            backgroundImage: "url(".concat(
                                              c.wu5,
                                              ")",
                                            ),
                                          },
                                        }),
                                        (0, a.jsx)("span", {
                                          className: (0, o.cn)(
                                            "absolute inset-0 opacity-60",
                                            t.dot,
                                          ),
                                        }),
                                      ],
                                    }),
                                    (0, a.jsx)("span", {
                                      className: "relative z-10",
                                      children: t.label,
                                    }),
                                  ],
                                },
                                t.key,
                              );
                            }),
                          }),
                        ],
                      }),
                      (0, a.jsxs)("div", {
                        className:
                          "relative flex flex-col rounded-l-xl bg-[#efefef] h-[572px] 2xl:h-[680px] border-l-1 border-[#cbcbcb]",
                        children: [
                          (0, a.jsx)("div", {
                            className: "shrink-0 pt-8 px-[72px] 2xl:px-[100px]",
                            children: (0, a.jsx)(g, { title: z[e] }),
                          }),
                          (0, a.jsx)("div", {
                            className:
                              "flex-1 overflow-y-auto custom-scrollbar-thumb-only",
                            style: { direction: "rtl" },
                            children: (0, a.jsx)("div", {
                              className:
                                "pb-8 pt-[66px] px-[72px] 2xl:px-[100px]",
                              style: { direction: "ltr" },
                              children: (0, a.jsx)(A, {
                                activeTab: e,
                                onRoleMouseMove: N,
                                onRoleMouseLeave: E,
                              }),
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, a.jsx)(r.N, {
                    children:
                      "roles" === e &&
                      I &&
                      (0, a.jsxs)(l.P.div, {
                        initial: { scale: 0.96, opacity: 0, y: 8 },
                        animate: { scale: 1, opacity: 1, y: 0 },
                        exit: { scale: 0.96, opacity: 0, y: 8 },
                        transition: { duration: 0.15, ease: "easeOut" },
                        className:
                          "fixed pointer-events-none z-50 hidden md:block w-[516px] rounded-[15px] border bg-[#3e3e3e33] border-[#d6d6d6] backdrop-blur-md shadow-2xl p-6 -translate-y-1/2 overflow-hidden",
                        style: {
                          left: "".concat(h.clampedLeft, "px"),
                          top: "".concat(h.y, "px"),
                        },
                        children: [
                          (0, a.jsx)("div", {
                            "aria-hidden": !0,
                            className:
                              "absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat",
                            style: {
                              backgroundImage: "url(".concat(c.ERq, ")"),
                            },
                          }),
                          (0, a.jsxs)("div", {
                            className: "flex items-start justify-between gap-4",
                            children: [
                              (0, a.jsx)("div", {
                                className: "relative h-20 w-20 shrink-0",
                                children: (0, a.jsx)(i.default, {
                                  src: I.icon,
                                  alt: "",
                                  fill: !0,
                                  className: "object-contain",
                                }),
                              }),
                              (0, a.jsx)("h5", {
                                className:
                                  "font-sans text-[36px] font-normal text-black/70 tracking-[-0.04em] text-right leading-[40px]",
                                children: I.title,
                              }),
                            ],
                          }),
                          (0, a.jsx)(R, {
                            label: "Strengths:",
                            body: I.strengths,
                          }),
                          (0, a.jsx)(R, {
                            label: "Best used:",
                            body: I.bestUsed,
                          }),
                          (0, a.jsx)(R, { label: "Output:", body: I.output }),
                        ],
                      }),
                  }),
                  (0, a.jsx)("div", {
                    className: "flex justify-center mt-10 md:mt-15",
                    children: (0, a.jsx)("a", {
                      href: d.n.WAITLIST,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className:
                        "inline-flex items-center justify-center rounded-full cursor-pointer bg-black text-[#F5F5F5] px-8 h-[42px] font-mono text-[17px] leading-[15px] tracking-[-2%] font-medium hover:bg-[#302F37] hover:opacity-90 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 ease-out shadow-md",
                      children: "Hire Me",
                    }),
                  }),
                ],
              }),
            })
          );
        };
    },
    9574: (e, t, s) => {
      "use strict";
      s.d(t, { default: () => m });
      var a = s(5155),
        n = s(5239),
        i = s(2619),
        l = s.n(i);
      s(2115);
      var r = s(356),
        o = s(1173),
        d = s(7601);
      let c = [
          { label: "SOC 1 Type II Compliant", slug: "soc-1" },
          { label: "SOC 2 Type II Compliant", slug: "soc-2" },
          { label: "ISO 27001:2022 Certified", slug: "iso-27001" },
          { label: "GDPR Compliant", slug: "gdpr" },
          { label: "HIPAA Compliant", slug: "hipaa" },
        ],
        x = (e) => {
          let { position: t } = e;
          return (0, a.jsxs)("span", {
            "aria-hidden": !0,
            className: "absolute top-0 ".concat(
              "tl" === t ? "left-0" : "right-0",
              " block h-[18px] w-[18px]",
            ),
            children: [
              (0, a.jsx)("span", {
                className: "absolute top-0 ".concat(
                  "tl" === t ? "left-0" : "right-0",
                  " h-[1px] w-full bg-black",
                ),
              }),
              (0, a.jsx)("span", {
                className: "absolute top-0 ".concat(
                  "tl" === t ? "left-0" : "right-0",
                  " h-full w-[1px] bg-black",
                ),
              }),
            ],
          });
        },
        m = () =>
          (0, a.jsx)("section", {
            className: "relative w-full py-16 md:py-24 overflow-hidden",
            children: (0, a.jsxs)("div", {
              className:
                "relative mx-auto w-full max-w-[1280px] 2xl:max-w-[1600px] px-5 md:px-10",
              children: [
                (0, a.jsx)("div", {
                  className: "hidden md:flex relative justify-center pb-10",
                  children: (0, a.jsx)("h2", {
                    className:
                      "absolute -top-10 left-1/2 -translate-x-1/2 bg-[#EFEFEF] px-10 py-10 font-sans text-[40px] text-black whitespace-nowrap",
                    children: "Enterprise-grade security",
                  }),
                }),
                (0, a.jsx)("div", {
                  className: "md:hidden relative pt-4 pb-6",
                  children: (0, a.jsxs)("div", {
                    className: "relative mx-auto max-w-[353px] pt-4",
                    children: [
                      (0, a.jsx)(x, { position: "tl" }),
                      (0, a.jsx)(x, { position: "tr" }),
                      (0, a.jsx)("h2", {
                        className:
                          "text-center font-sans text-[25px] leading-[26px] tracking-[-1px] text-black",
                        children: "Enterprise-grade security",
                      }),
                    ],
                  }),
                }),
                (0, a.jsxs)("div", {
                  className: "md:hidden mt-6 flex flex-col gap-3",
                  children: [
                    (0, a.jsxs)("div", {
                      className:
                        "rounded-[10px] border border-[#cbcbcb] bg-[#EFEFEF] px-[18px] pt-[15px] pb-5 min-h-[170px] flex flex-col justify-between",
                      children: [
                        (0, a.jsxs)("h3", {
                          className:
                            "flex items-center gap-2 font-mono text-[17.5px] uppercase text-[#302F37] leading-[17.5px] tracking-[-0.7px]",
                          children: [
                            (0, a.jsx)("span", {
                              className: "h-1.5 w-1.5 bg-black inline-block",
                            }),
                            "Built Encrypted",
                          ],
                        }),
                        (0, a.jsx)("p", {
                          className:
                            "font-sans text-[20px] leading-[20.945px] tracking-[-0.8px] text-[#302F37]",
                          children:
                            "Zamp is built with enterprise grade security and is trusted by leading public companies and financial institutions.",
                        }),
                      ],
                    }),
                    (0, a.jsxs)("div", {
                      className: "grid grid-cols-2 gap-3",
                      children: [
                        (0, a.jsxs)("div", {
                          className: "flex flex-col gap-3",
                          children: [
                            (0, a.jsxs)("div", {
                              className:
                                "relative rounded-[10px] border border-[#cbcbcb] px-[18px] pt-[15px] pb-5 h-[216px] flex flex-col justify-between bg-[#ff98d9] overflow-hidden",
                              children: [
                                (0, a.jsx)(n.default, {
                                  src: r.QBg,
                                  alt: "",
                                  "aria-hidden": !0,
                                  fill: !0,
                                  sizes: "50vw",
                                  className:
                                    "pointer-events-none object-cover mix-blend-overlay opacity-90 select-none",
                                }),
                                (0, a.jsxs)("div", {
                                  className:
                                    "relative z-10 flex items-start gap-2 font-mono text-[12px] uppercase leading-[14px] tracking-[-0.5px] text-[#F0EDEA]",
                                  children: [
                                    (0, a.jsx)("span", {
                                      className:
                                        "h-1.5 w-1.5 bg-white inline-block mt-1",
                                    }),
                                    "Running on AWS & GCP",
                                  ],
                                }),
                                (0, a.jsxs)("h3", {
                                  className:
                                    "relative z-10 font-sans text-[26px] font-normal text-[#FCFCFC] leading-[26px] tracking-[-1px]",
                                  children: [
                                    "Cloud-native",
                                    (0, a.jsx)("br", {}),
                                    "by design",
                                  ],
                                }),
                              ],
                            }),
                            (0, a.jsx)("div", {
                              className:
                                "rounded-[10px] border border-[#cbcbcb] bg-[#EFEFEF] px-[14px] py-[18px] h-[103px] flex items-start",
                              children: (0, a.jsxs)("h3", {
                                className:
                                  "font-sans text-[28px] text-[#302F37] leading-[28.775px] tracking-[-1.3px]",
                                children: [
                                  "Fully SOX",
                                  (0, a.jsx)("br", {}),
                                  "compliant",
                                ],
                              }),
                            }),
                          ],
                        }),
                        (0, a.jsxs)("div", {
                          className: "flex flex-col gap-3",
                          children: [
                            (0, a.jsxs)("div", {
                              className:
                                "relative rounded-[10px] border border-[#cbcbcb] px-3 pt-[10px] pb-3 h-[123px] bg-[#5C6A4A] text-white overflow-hidden flex flex-col justify-between gap-2",
                              children: [
                                (0, a.jsx)(n.default, {
                                  src: r.vJD,
                                  alt: "",
                                  "aria-hidden": !0,
                                  fill: !0,
                                  sizes: "50vw",
                                  className:
                                    "pointer-events-none object-cover opacity-80 mix-blend-overlay select-none",
                                }),
                                (0, a.jsx)("div", {
                                  className: "relative z-10",
                                  children: (0, a.jsx)(n.default, {
                                    src: r.MSW,
                                    alt: "",
                                    "aria-hidden": !0,
                                    width: 20,
                                    height: 26,
                                    className: "object-contain h-[26px] w-auto",
                                  }),
                                }),
                                (0, a.jsx)("p", {
                                  className:
                                    "relative z-10 font-sans text-[10.6px] leading-[11px] tracking-[-0.42px] text-[#F0EDEA]",
                                  children:
                                    "It delivers end-to-end encryption, complete audit trails, and has been validated through rigorous independent security reviews.",
                                }),
                              ],
                            }),
                            (0, a.jsxs)("div", {
                              className:
                                "relative rounded-[10px] border border-[#cbcbcb] h-[196px] flex flex-col bg-blue-600 text-[#F0EDEA] overflow-hidden",
                              children: [
                                (0, a.jsx)("p", {
                                  className:
                                    "px-3 pt-[14px] pb-3 relative z-10 font-sans text-[20.25px] leading-[20.25px] tracking-[-0.81px]",
                                  children:
                                    "Ensures financial integrity and simplifying audits across your organization.",
                                }),
                                (0, a.jsx)("div", {
                                  className:
                                    "relative mt-auto h-[86px] w-full overflow-hidden",
                                  children: (0, a.jsx)(n.default, {
                                    src: r.am$,
                                    alt: "",
                                    "aria-hidden": !0,
                                    fill: !0,
                                    sizes: "50vw",
                                    className:
                                      "pointer-events-none object-cover select-none",
                                  }),
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, a.jsxs)("div", {
                  className: "hidden md:grid mt-30 grid-cols-2 gap-5",
                  children: [
                    (0, a.jsxs)("div", {
                      className:
                        "rounded-[16px] border border-black/10 bg-[#EFEFEF] px-8 pt-6 pb-8 flex flex-col justify-between min-h-[572px] 2xl:min-h-[660px]",
                      children: [
                        (0, a.jsxs)("h3", {
                          className:
                            "flex items-center gap-2 font-mono text-[17.5px] uppercase text-[#302F37] leading-4.5 tracking-[-4%]",
                          children: [
                            (0, a.jsx)("span", {
                              className: "h-2 w-2 bg-black inline-block",
                            }),
                            "Built Encrypted",
                          ],
                        }),
                        (0, a.jsx)("p", {
                          className:
                            "font-sans text-[40px] leading-10 tracking-[-4%] text-black",
                          children:
                            "Zamp is built with enterprise grade security and is trusted by leading public companies and financial institutions.",
                        }),
                      ],
                    }),
                    (0, a.jsxs)("div", {
                      className: "grid grid-cols-2 gap-5",
                      children: [
                        (0, a.jsxs)("div", {
                          className: "flex flex-col gap-5",
                          children: [
                            (0, a.jsxs)("div", {
                              className:
                                "relative rounded-[16px] px-5.5 py-6 min-h-[180px] 2xl:min-h-[210px] flex flex-col justify-between bg-[#ff98d9] overflow-hidden",
                              children: [
                                (0, a.jsx)(n.default, {
                                  src: r.QBg,
                                  alt: "",
                                  "aria-hidden": !0,
                                  fill: !0,
                                  sizes: "25vw",
                                  className:
                                    "pointer-events-none object-cover mix-blend-overlay opacity-90 select-none",
                                }),
                                (0, a.jsxs)("div", {
                                  className:
                                    "relative z-10 flex items-center gap-2 font-mono text-[18px] uppercase tracking-[-4%] text-[#F0EDEA]",
                                  children: [
                                    (0, a.jsx)("span", {
                                      className:
                                        "h-2 w-2 bg-white inline-block",
                                    }),
                                    "Running on AWS & GCP",
                                  ],
                                }),
                                (0, a.jsxs)("h3", {
                                  className:
                                    "relative z-10 font-sans text-[40px] font-medium text-[#FCFCFC] leading-10 tracking-[-4%]",
                                  children: [
                                    "Cloud-native",
                                    (0, a.jsx)("br", {}),
                                    "by design",
                                  ],
                                }),
                              ],
                            }),
                            (0, a.jsxs)("div", {
                              className:
                                "relative rounded-[16px] p-7 min-h-[375px] 2xl:min-h-[428px] flex flex-col justify-between bg-[#5C6A4A] text-white overflow-hidden",
                              children: [
                                (0, a.jsx)(n.default, {
                                  src: r.vJD,
                                  alt: "",
                                  "aria-hidden": !0,
                                  fill: !0,
                                  sizes: "25vw",
                                  className:
                                    "pointer-events-none object-cover opacity-80 mix-blend-overlay select-none",
                                }),
                                (0, a.jsx)("div", {
                                  className:
                                    "relative z-10 flex items-start justify-start",
                                  children: (0, a.jsx)(n.default, {
                                    src: r.MSW,
                                    alt: "",
                                    "aria-hidden": !0,
                                    width: 24,
                                    height: 70,
                                    className: "object-contain h-17.5 w-auto",
                                  }),
                                }),
                                (0, a.jsx)("p", {
                                  className:
                                    "relative z-10 font-sans text-[25px] leading-6.5 tracking-[-4%] text-[#F0EDEA]",
                                  children:
                                    "It delivers end-to-end encryption, complete audit trails, and has been validated through rigorous independent security reviews.",
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, a.jsxs)("div", {
                          className: "flex flex-col gap-5",
                          children: [
                            (0, a.jsxs)("div", {
                              className:
                                "relative rounded-[16px] min-h-[420px] 2xl:min-h-[500px] flex flex-col bg-blue-600 text-[#F0EDEA] overflow-hidden",
                              children: [
                                (0, a.jsx)("p", {
                                  className:
                                    "px-4 py-5.5 relative z-10 font-sans text-[25px] leading-6.5 tracking-[-4%]",
                                  children:
                                    "Ensures financial integrity and simplifying audits across your organization.",
                                }),
                                (0, a.jsx)("div", {
                                  className:
                                    "relative mt-auto min-h-[215px] 2xl:min-h-[280px] w-full rounded-md overflow-hidden",
                                  children: (0, a.jsx)(n.default, {
                                    src: r.am$,
                                    alt: "",
                                    "aria-hidden": !0,
                                    fill: !0,
                                    sizes: "25vw",
                                    className:
                                      "pointer-events-none object-cover select-none",
                                  }),
                                }),
                              ],
                            }),
                            (0, a.jsx)("div", {
                              className:
                                "rounded-[16px] border border-black/10 bg-[#EFEFEF] p-7 flex items-start",
                              children: (0, a.jsxs)("h3", {
                                className:
                                  "font-sans text-[45px] text-black leading-10 tracking-[-4%]",
                                children: [
                                  "Fully SOX",
                                  (0, a.jsx)("br", {}),
                                  "compliant",
                                ],
                              }),
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, a.jsxs)("div", {
                  className: "mt-10 md:mt-12",
                  children: [
                    (0, a.jsx)("h5", {
                      className:
                        "font-sans text-[21px] md:text-[25px] leading-[34px] md:leading-6 tracking-[-4%] text-black/50 md:text-black flex items-center mb-1 md:mb-0 md:h-10",
                      children: "Audit Ready",
                    }),
                    (0, a.jsx)("ul", {
                      className:
                        "divide-y divide-black/30 md:divide-black border-y border-black/30 md:border-black",
                      children: c.map((e) =>
                        (0, a.jsx)(
                          "li",
                          {
                            children: (0, a.jsxs)(l(), {
                              href: "".concat(d.n.SECURITY, "#").concat(e.slug),
                              className:
                                "group font-sans text-[15px] md:text-[18px] leading-[34px] md:leading-10 tracking-[-4%] font-medium text-black/50 md:text-black/80 h-[25px] md:h-9 flex items-center justify-between pr-2 md:pr-3 transition-colors duration-200 hover:bg-black/5 hover:text-black",
                              children: [
                                (0, a.jsx)("span", { children: e.label }),
                                (0, a.jsx)("span", {
                                  className:
                                    "h-[14px] w-[15px] flex-shrink-0 rotate-45 transition-transform duration-200 ease-out group-hover:translate-x-[3px]",
                                  children: (0, a.jsx)(o.R, {
                                    className: "block",
                                  }),
                                }),
                              ],
                            }),
                          },
                          e.slug,
                        ),
                      ),
                    }),
                  ],
                }),
              ],
            }),
          });
    },
  },
  (e) => {
    (e.O(0, [850, 715, 553, 637, 89, 440, 441, 255, 358], () =>
      e((e.s = 2949)),
    ),
      (_N_E = e.O()));
  },
]);
