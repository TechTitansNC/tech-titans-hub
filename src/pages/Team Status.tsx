import { motion } from "framer-motion";
import { Lightbulb, Trophy, Compass, Award } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const innovationProjects = [
  {
    season: "2025–2026",
    title: "Submerged / Marine Energy Monitor",
    description:
      "Developed a prototype sensor array to monitor tidal flow power usage and reduce local ocean energy footprint.",
  },
  {
    season: "2024–2025",
    title: "Masterpiece / Eco-Acoustic Panel",
    description:
      "Designed low-cost acoustic soundproofing using recycled community materials for school performance spaces.",
  },
  {
    season: "2023–2024",
    title: "SUPERPOWERED / Smart Grid Node",
    description:
      "Created an automated load-balancing simulator for local clean energy distribution.",
  },
];

const seasonAwards = [
  {
    season: "2025–2026",
    awards: [
      "1st Place - Innovation Project Award",
      "Global Innovation Nominee",
      "Robot Performance Finalist",
    ],
  },
  {
    season: "2024–2025",
    awards: [
      "Engineering Excellence Award",
      "2nd Place - State Championship",
      "Core Values Award",
    ],
  },
  {
    season: "2023–2024",
    awards: [
      "Breakthrough Award",
      "1st Place - Regional Qualifier",
      "Motivate Award",
    ],
  },
];

const journeyMilestones = [
  {
    year: "2025–2026",
    title: "Expanding Our Reach",
    description:
      "Grew team membership, established secondary school mentorship programs, and published open-source CAD designs for rookie teams.",
  },
  {
    year: "2024–2025",
    title: "Refining Engineering Standards",
    description:
      "Transitioned to full custom 3D-printed attachments, standardized sensor calibration routines, and reached State Finals.",
  },
  {
    year: "2023–2024",
    title: "The Founding Season",
    description:
      "Formed Tech Titans #32795, built our dedicated pit area, and secured our first regional competition victory.",
  },
];

const StatusPage = () => {
  return (
    <PageLayout>
      {/* Hero Header */}
      <section className="bg-black text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block text-sm font-medium tracking-wider text-blue-400 border border-blue-500/50 px-4 py-1.5 rounded-full mb-6"
          >
            FLL Team #32795
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-4"
            style={{ textShadow: "0 0 20px rgba(59,130,246,0.4)" }}
          >
            Team <span className="text-blue-500">Status</span> & History
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400"
          >
            Our past 3 seasons of Innovation Projects, Awards, and Journey
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-gray-900 py-16 px-6 text-white space-y-16">
        <div className="max-w-5xl mx-auto space-y-16">
          {/* Section 1: Innovation Projects */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Lightbulb className="w-8 h-8 text-blue-400" />
              <h2 className="text-2xl md:text-3xl font-bold">
                Innovation Projects
              </h2>
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
              {innovationProjects.map((proj, i) => (
                <motion.div
                  key={proj.season}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="border-2 border-gray-700 hover:border-blue-500 rounded-xl p-6 transition-colors bg-black/40 flex flex-col justify-between"
                >
                  <div>
                    <span className="inline-block bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-bold px-3 py-1 rounded-md mb-3">
                      {proj.season}
                    </span>
                    <h3 className="text-xl font-bold mb-2">{proj.title}</h3>
                    <p className="text-sm text-gray-400">{proj.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Section 2: Awards */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Trophy className="w-8 h-8 text-blue-400" />
              <h2 className="text-2xl md:text-3xl font-bold">Season Awards</h2>
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
              {seasonAwards.map((item, i) => (
                <motion.div
                  key={item.season}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="border-2 border-gray-700 hover:border-blue-500 rounded-xl p-6 transition-colors bg-black/40"
                >
                  <span className="inline-block bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-bold px-3 py-1 rounded-md mb-4">
                    {item.season}
                  </span>
                  <ul className="space-y-3">
                    {item.awards.map((award, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-gray-200"
                      >
                        <Award className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        <span>{award}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Section 3: Team Journey Timeline */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Compass className="w-8 h-8 text-blue-400" />
              <h2 className="text-2xl md:text-3xl font-bold">Our Journey</h2>
            </div>
            <div className="relative border-l-2 border-gray-700 ml-4 pl-6 space-y-8">
              {journeyMilestones.map((milestone, i) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-blue-500 border-4 border-gray-900" />
                  <span className="text-xs font-bold text-blue-400 tracking-wider uppercase">
                    {milestone.year}
                  </span>
                  <h3 className="text-xl font-bold mt-1 text-white">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1 max-w-2xl">
                    {milestone.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Team Status;
