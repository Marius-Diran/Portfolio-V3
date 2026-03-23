const Section = ({ label }) => (
  <div className="flex items-center gap-3 mb-5">
    <span className="text-[8px] sm:text-[9px] lg:text-[9.5px] font-semibold tracking-[0.2em] uppercase text-stone-400 whitespace-nowrap print:text-[9px]">
      {label}
    </span>
    <div className="flex-1 h-px bg-stone-200 print:bg-stone-300" />
  </div>
);

const ExpItem = ({ role, company, date, bullets }) => (
  <div className="mb-7 last:mb-0 page-break-inside-avoid">
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-0 mb-0.5">
      <span className="font-serif text-[16px] sm:text-[18px] lg:text-[19px] font-light text-stone-900 print:text-[18px]">
        {role}
      </span>
      <span className="text-[9px] sm:text-[10px] lg:text-[10.5px] font-medium tracking-wide text-stone-400 whitespace-nowrap print:text-[10px]">
        {date}
      </span>
    </div>
    <div className="text-[9px] sm:text-[10px] lg:text-[10.5px] font-semibold tracking-[0.12em] uppercase text-stone-500 mb-3 print:text-[10px]">
      {company}
    </div>
    <ul className="space-y-1.5 print:space-y-1">
      {bullets.map((b, i) => (
        <li
          key={i}
          className="flex gap-3 text-[11px] sm:text-[12.5px] lg:text-[13px] font-light text-stone-700 leading-relaxed print:text-[12px] print:leading-normal"
        >
          <span className="text-stone-300 mt-0 shrink-0 print:text-stone-400">
            —
          </span>
          <span>{b}</span>
        </li>
      ))}
    </ul>
  </div>
);

const ProjectItem = ({ name, desc, url }) => (
  <div className="mb-6 last:mb-0 page-break-inside-avoid">
    <div className="font-serif text-[15px] sm:text-[17px] lg:text-[18px] font-normal text-stone-900 mb-1 print:text-[17px]">
      {name}
    </div>
    <p className="text-[11px] sm:text-[12px] lg:text-[13px] font-light text-stone-600 leading-relaxed mb-2 print:text-[12px] print:leading-normal">
      {desc}
    </p>
    <a
      href={`https://${url}`}
      target="_blank"
      rel="noreferrer"
      className="text-[9px] sm:text-[10px] lg:text-[10.5px] font-medium tracking-wide text-stone-400 border-b border-stone-200 pb-px hover:text-stone-800 hover:border-stone-800 transition-colors duration-150 print:text-stone-500 print:border-stone-300 break-all print:no-underline"
    >
      {url}
    </a>
  </div>
);

const SideLabel = ({ children }) => (
  <div className="mb-3">
    <div className="text-[8px] sm:text-[9px] lg:text-[9.5px] font-semibold tracking-[0.2em] uppercase text-stone-400 mb-2 print:text-[9px]">
      {children}
    </div>
    <div className="h-px bg-stone-200 print:bg-stone-300" />
  </div>
);

export default function CV() {
  const handlePrint = () => window.print();

  return (
    <>
      {/* ── Print styles injected via a style tag ── */}
      <style>{`
        @media print {
          body {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .no-print { display: none !important; }
          .print-page {
            box-shadow: none !important;
            margin: 0 !important;
            max-width: 100% !important;
            width: 8.5in;
            height: 11in;
            padding: 0.5in;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          a {
            text-decoration: none !important;
            color: inherit !important;
          }
          /* Prevent page breaks inside sections */
          .mb-10, .mb-6, .mt-7 {
            page-break-inside: avoid !important;
          }
          /* Ensure proper spacing in print */
          h1 { page-break-after: avoid !important; }
          h2 { page-break-after: avoid !important; }
        }
      `}</style>

      {/* ── Download button (hidden on print) ── */}
      <div className="no-print flex justify-center py-4 sm:py-6 lg:py-8 bg-stone-100">
        <button
          onClick={handlePrint}
          className="bg-stone-900 text-stone-50 text-[10px] sm:text-[11px] lg:text-[12px] font-medium tracking-[0.12em] uppercase px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3 lg:py-3.5 rounded-sm hover:bg-stone-700 transition-colors duration-150 active:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2"
        >
          Download as PDF
        </button>
      </div>

      {/* ── Page ── */}
      <div className="min-h-screen bg-stone-100 py-6 sm:py-8 lg:py-10 px-3 sm:px-4 lg:px-6 print:bg-white print:py-0 print:px-0">
        <div className="print-page max-w-[760px] mx-auto bg-[#faf9f7] shadow-[0_2px_4px_rgba(0,0,0,0.04),0_12px_40px_rgba(0,0,0,0.08)] print:shadow-none print:max-w-none">
          {/* ══ HEADER ══ */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 px-6 sm:gap-8 sm:px-14 lg:px-16 pt-8 sm:pt-12 pb-6 sm:pb-9 border-b border-stone-200 page-break-after-avoid">
            <div>
              <h1 className="font-serif text-[36px] sm:text-[48px] lg:text-[52px] font-light leading-tight sm:leading-none tracking-tight text-stone-900 mb-2 print:text-[52px]">
                Marius Odediran
              </h1>
              <p className="text-[9px] sm:text-[10px] lg:text-[11px] font-semibold tracking-[0.18em] uppercase text-stone-400 print:text-[10px]">
                Front-End Developer
              </p>
            </div>
            <div className="text-left sm:text-right shrink-0 flex flex-col gap-1.5">
              <a
                href="mailto:themariusodediran@gmail.com"
                className="block text-[10px] sm:text-[11px] lg:text-[12px] font-light text-stone-500 leading-relaxed hover:text-stone-900 transition-colors print:text-[11px] print:no-underline"
              >
                themariusodediran@gmail.com
              </a>
              <span className="block text-[10px] sm:text-[11px] lg:text-[12px] font-light text-stone-500 leading-relaxed print:text-[11px]">
                +234 903 659 5403
              </span>
              <span className="block text-[10px] sm:text-[11px] lg:text-[12px] font-light text-stone-500 leading-relaxed print:text-[11px]">
                Lagos, Nigeria
              </span>
            </div>
          </div>

          {/* ══ BODY ══ */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_220px] lg:grid-cols-[1fr_260px] print:grid-cols-[1fr_220px]">
            {/* ── MAIN ── */}
            <div className="px-6 sm:px-14 lg:px-16 py-8 sm:py-10 lg:py-12 border-b md:border-b-0 md:border-r border-stone-200 print:px-14 print:py-10">
              {/* Experience */}
              <div className="mb-10 page-break-inside-avoid">
                <Section label="Experience" />
                <ExpItem
                  role="AWS Cloud Trainee"
                  company="Akure Tech Hub"
                  date="2 Months"
                  bullets={[
                    "Gained hands-on experience with core AWS services including EC2, S3, and IAM.",
                    "Learned cloud architecture fundamentals and best practices for scalable deployments.",
                    "Explored cloud infrastructure relevant to modern frontend deployment pipelines.",
                  ]}
                />
                <div className="mt-7">
                  <ExpItem
                    role="Physical Computing & Robotics Trainee"
                    company="Co-Creation Hub (CcHUB) · STEMcafe · Lagos"
                    date=""
                    bullets={[
                      "Studied physical computing principles and robotics at Nigeria's premier innovation hub.",
                      "Built hands-on projects bridging hardware and software, strengthening problem-solving skills.",
                    ]}
                  />
                </div>
              </div>

              {/* Projects */}
              <div className="page-break-inside-avoid">
                <Section label="Projects" />
                <ProjectItem
                  name="Personal Portfolio V3"
                  desc="Latest iteration of personal portfolio showcasing projects, skills, and contact. Built with a focus on clean UI and performance."
                  url="mariusodediranv3.vercel.app"
                />
                <ProjectItem
                  name="Weather App"
                  desc="Real-time weather application fetching live data from a weather API, displaying current conditions and forecasts with a clean interface."
                  url="mariusweatherappv1.netlify.app"
                />
                <ProjectItem
                  name="Milo — AI Assistant"
                  desc="An AI-powered conversational assistant with a clean chat interface. Integrates a language model API to handle real-time user queries and responses."
                  url="milo-beryl.vercel.app"
                />
                <ProjectItem
                  name="Val Project — AI Love Notes"
                  desc="An AI-powered love note generator that crafts personalised romantic messages, built with React and integrated with an AI language model API."
                  url="val-project-olive.vercel.app"
                />
              </div>
            </div>

            {/* ── SIDEBAR ── */}
            <div className="px-6 sm:px-8 lg:px-10 py-8 sm:py-10 lg:py-12 space-y-8 print:px-8 print:py-10 print:space-y-6">
              {/* Links */}
              <div className="page-break-inside-avoid">
                <SideLabel>Links</SideLabel>
                <div className="mt-3 space-y-2.5 print:space-y-2">
                  {[
                    {
                      label: "Portfolio",
                      url: "mariusodediranv3.vercel.app",
                      href: "https://mariusodediranv3.vercel.app/",
                    },
                    {
                      label: "GitHub",
                      url: "github.com/Marius-Diran",
                      href: "https://github.com/Marius-Diran/",
                    },
                    {
                      label: "LinkedIn",
                      url: "in/marius-odediran",
                      href: "https://www.linkedin.com/in/marius-odediran-94795b235/",
                    },
                  ].map(({ label, url, href }) => (
                    <div key={label} className="flex gap-2 items-start">
                      <span className="text-[8px] sm:text-[9px] lg:text-[9.5px] font-semibold tracking-wide uppercase text-stone-400 w-14 shrink-0 mt-0.5 print:text-[9px]">
                        {label}
                      </span>
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[9px] sm:text-[10.5px] lg:text-[11px] font-light text-stone-500 hover:text-stone-900 transition-colors break-all print:text-stone-600 print:text-[10px] print:no-underline"
                      >
                        {url}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="page-break-inside-avoid">
                <SideLabel>Education</SideLabel>
                <div className="mt-3">
                  <div className="font-serif text-[13px] sm:text-[15px] lg:text-[16px] font-normal text-stone-900 leading-snug mb-1 print:text-[15px]">
                    Federal University of Technology, Akure
                  </div>
                  <div className="text-[10px] sm:text-[11px] lg:text-[12px] font-light text-stone-500 mb-1 print:text-[11px]">
                    BSc — Computer Science
                  </div>
                  <div className="text-[9px] sm:text-[10px] lg:text-[10.5px] font-medium tracking-wide text-stone-400 print:text-[10px]">
                    Feb 2024 — Present
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="page-break-inside-avoid">
                <SideLabel>Skills</SideLabel>
                <div className="mt-3 space-y-4 print:space-y-3">
                  {[
                    { cat: "Languages", tags: ["HTML", "CSS", "JavaScript"] },
                    {
                      cat: "Frameworks",
                      tags: ["React", "Node.js", "Tailwind CSS"],
                    },
                    {
                      cat: "Tools",
                      tags: [
                        "Git",
                        "GitHub",
                        "Vercel",
                        "Netlify",
                        "AWS",
                        "Figma",
                      ],
                    },
                  ].map(({ cat, tags }) => (
                    <div key={cat}>
                      <div className="text-[8px] sm:text-[9px] lg:text-[9.5px] font-semibold tracking-[0.12em] uppercase text-stone-500 mb-2 print:text-[9px]">
                        {cat}
                      </div>
                      <div className="flex flex-wrap gap-1.5 print:gap-1">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] sm:text-[10px] lg:text-[10.5px] font-light text-stone-500 bg-stone-100 px-2 py-0.5 rounded-sm print:text-[9px] print:bg-stone-50 print:px-1.5 print:py-0.25"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="page-break-inside-avoid">
                <SideLabel>Languages</SideLabel>
                <div className="mt-3 space-y-2 print:space-y-1">
                  {[
                    ["English", "Fluent"],
                    ["Yoruba", "Native"],
                  ].map(([lang, level]) => (
                    <div
                      key={lang}
                      className="flex justify-between items-center"
                    >
                      <span className="text-[11px] sm:text-[12px] lg:text-[13px] font-light text-stone-700 print:text-[11px]">
                        {lang}
                      </span>
                      <span className="text-[8px] sm:text-[9px] lg:text-[9.5px] font-semibold tracking-wide uppercase text-stone-400 print:text-[9px]">
                        {level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
