const Section = ({ label }) => (
  <div className="flex items-center gap-3 mb-5">
    <span className="text-[8px] sm:text-[9px] font-semibold tracking-[0.2em] uppercase text-stone-400 whitespace-nowrap">
      {label}
    </span>
    <div className="flex-1 h-px bg-stone-200" />
  </div>
);

const ExpItem = ({ role, company, date, bullets }) => (
  <div className="mb-7 last:mb-0">
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-0 mb-0.5">
      <span className="font-serif text-[16px] sm:text-[18px] font-light text-stone-900">
        {role}
      </span>
      <span className="text-[9px] sm:text-[10px] font-medium tracking-wide text-stone-400 whitespace-nowrap">
        {date}
      </span>
    </div>
    <div className="text-[9px] sm:text-[10px] font-semibold tracking-[0.12em] uppercase text-stone-500 mb-3">
      {company}
    </div>
    <ul className="space-y-1.5">
      {bullets.map((b, i) => (
        <li
          key={i}
          className="flex gap-3 text-[11px] sm:text-[12.5px] font-light text-stone-700 leading-relaxed"
        >
          <span className="text-stone-300 mt-0 shrink-0">—</span>
          <span>{b}</span>
        </li>
      ))}
    </ul>
  </div>
);

const ProjectItem = ({ name, desc, url }) => (
  <div className="mb-6 last:mb-0">
    <div className="font-serif text-[15px] sm:text-[17px] font-normal text-stone-900 mb-1">
      {name}
    </div>
    <p className="text-[11px] sm:text-[12px] font-light text-stone-600 leading-relaxed mb-2">
      {desc}
    </p>
    <a
      href={`https://${url}`}
      target="_blank"
      rel="noreferrer"
      className="text-[9px] sm:text-[10px] font-medium tracking-wide text-stone-400 border-b border-stone-200 pb-px hover:text-stone-800 hover:border-stone-800 transition-colors duration-150 print:text-stone-400 break-all"
    >
      {url}
    </a>
  </div>
);

const SideLabel = ({ children }) => (
  <div className="mb-3">
    <div className="text-[8px] sm:text-[9px] font-semibold tracking-[0.2em] uppercase text-stone-400 mb-2">
      {children}
    </div>
    <div className="h-px bg-stone-200" />
  </div>
);

export default function CV() {
  const handlePrint = () => window.print();

  return (
    <>
      {/* ── Print styles injected via a style tag ── */}
      <style>{`
        @media print {
          body { background: white !important; }
          .no-print { display: none !important; }
          .print-page { box-shadow: none !important; margin: 0 !important; max-width: 100% !important; }
        }
      `}</style>

      {/* ── Download button (hidden on print) ── */}
      <div className="no-print flex justify-center py-4 sm:py-6 bg-stone-100">
        <button
          onClick={handlePrint}
          className="bg-stone-900 text-stone-50 text-[10px] sm:text-[11px] font-medium tracking-[0.12em] uppercase px-6 sm:px-8 py-2.5 sm:py-3 rounded-sm hover:bg-stone-700 transition-colors duration-150"
        >
          Download as PDF
        </button>
      </div>

      {/* ── Page ── */}
      <div className="min-h-screen bg-stone-100 py-6 sm:py-10 px-3 sm:px-4 print:bg-white print:py-0 print:px-0">
        <div className="print-page max-w-[760px] mx-auto bg-[#faf9f7] shadow-[0_2px_4px_rgba(0,0,0,0.04),0_12px_40px_rgba(0,0,0,0.08)]">
          {/* ══ HEADER ══ */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 px-6 sm:gap-8 sm:px-14 pt-8 sm:pt-12 pb-6 sm:pb-9 border-b border-stone-200">
            <div>
              <h1 className="font-serif text-[36px] sm:text-[52px] font-light leading-none tracking-tight text-stone-900 mb-2">
                Marius Odediran
              </h1>
              <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.18em] uppercase text-stone-400">
                Front-End Developer
              </p>
            </div>
            <div className="text-left sm:text-right shrink-0">
              <a
                href="mailto:themariusodediran@gmail.com"
                className="block text-[10px] sm:text-[11px] font-light text-stone-500 leading-relaxed sm:leading-loose hover:text-stone-900 transition-colors"
              >
                themariusodediran@gmail.com
              </a>
              <span className="block text-[10px] sm:text-[11px] font-light text-stone-500 leading-relaxed sm:leading-loose">
                +234 903 659 5403
              </span>
              <span className="block text-[10px] sm:text-[11px] font-light text-stone-500 leading-relaxed sm:leading-loose">
                Lagos, Nigeria
              </span>
            </div>
          </div>

          {/* ══ BODY ══ */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_220px]">
            {/* ── MAIN ── */}
            <div className="px-6 sm:px-14 py-8 sm:py-10 border-b md:border-b-0 md:border-r border-stone-200">
              {/* Experience */}
              <div className="mb-10">
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
              <div>
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
            <div className="px-6 sm:px-8 py-8 sm:py-10 space-y-8">
              {/* Links */}
              <div>
                <SideLabel>Links</SideLabel>
                <div className="mt-3 space-y-2.5">
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
                      <span className="text-[8px] sm:text-[9px] font-semibold tracking-wide uppercase text-stone-400 w-14 shrink-0 mt-0.5">
                        {label}
                      </span>
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[9px] sm:text-[10.5px] font-light text-stone-500 hover:text-stone-900 transition-colors break-all"
                      >
                        {url}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <SideLabel>Education</SideLabel>
                <div className="mt-3">
                  <div className="font-serif text-[13px] sm:text-[15px] font-normal text-stone-900 leading-snug mb-1">
                    Federal University of Technology, Akure
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-light text-stone-500 mb-1">
                    BSc — Computer Science
                  </div>
                  <div className="text-[9px] sm:text-[10px] font-medium tracking-wide text-stone-400">
                    Feb 2024 — Present
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <SideLabel>Skills</SideLabel>
                <div className="mt-3 space-y-4">
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
                      <div className="text-[8px] sm:text-[9px] font-semibold tracking-[0.12em] uppercase text-stone-500 mb-2">
                        {cat}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] sm:text-[10px] font-light text-stone-500 bg-stone-100 px-2 py-0.5 rounded-sm"
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
              <div>
                <SideLabel>Languages</SideLabel>
                <div className="mt-3 space-y-2">
                  {[
                    ["English", "Fluent"],
                    ["Yoruba", "Native"],
                  ].map(([lang, level]) => (
                    <div
                      key={lang}
                      className="flex justify-between items-center"
                    >
                      <span className="text-[11px] sm:text-[12px] font-light text-stone-700">
                        {lang}
                      </span>
                      <span className="text-[8px] sm:text-[9px] font-semibold tracking-wide uppercase text-stone-400">
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
