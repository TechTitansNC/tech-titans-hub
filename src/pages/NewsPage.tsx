import { motion } from "framer-motion";
import { ExternalLink, Newspaper } from "lucide-react";
import PageLayout from "@/components/PageLayout";

type Article = {
  title: string;
  source: string;
  date: string;
  url: string;
  summary: string;
  upcoming?: boolean;
  directUrl?: string;
};

const articles: Article[] = [
  {
    title: "Tech Titans NC Helps Excavate Archaeologists From Mountains of Paperwork",
    source: "Smithsonian Voices",
    date: "April 14, 2026",
    url: "https://www.smithsonianmag.com/blogs/smithsonian-environmental-research-center/2026/04/14/Tech-Titans-NC-Helps-Excavate-Archaeologists-From-Mountains-of-Paperwork/",
    summary:
      "Smithsonian Environmental Research Center spotlights how the Tech Titans FLL team built ArchePal, an AI-assisted tool that digitizes archaeological field notes and helps researchers get out from under decades of backlogged paperwork. The piece highlights the team's partnership with field archaeologists and the real-world impact of the project.",
  },
  {
    title: "Kiran Das Goel shares the Smithsonian ArchePal article",
    source: "LinkedIn — Kiran Das Goel",
    date: "2026",
    url: "https://www.linkedin.com/posts/kiran-das-goel_tech-titans-nc-helps-excavate-archaeologists-activity-7451977191879479296-nOA9",
    summary:
      "Kiran Das Goel, author of the Smithsonian Voices article, shared the piece on LinkedIn: \"I'm excited to share my Smithsonian Voices article highlighting ArchePal, an all-in-one app created by Tech Titans NC with coach Atul Mene to help archaeologists streamline paperwork and spend more time on research. Looking forward to seeing how ArchePal continues to grow and support the archaeological community!\"",
  },
  {
    title: "NCAS Post: Tech Titans & ArchePal",
    source: "North Carolina Archaeological Society",
    date: "2026",
    url: "https://www.facebook.com/share/p/14TDGYNKmuK/",
    summary:
      "The North Carolina Archaeological Society shared a post recognizing the Tech Titans team for their work on ArchePal, celebrating a student-led technology effort that directly supports the archaeology community in NC.",
  },
  {
    title: "ArchePal – The Archaeologist's Digital Friend",
    source: "Maryland Archeological Society — May 2026 Newsletter",
    date: "May 2026 (Upcoming)",
    url: "https://marylandarcheology.org/publications.html",
    upcoming: true,
    directUrl: "https://marylandarcheology.org/Newsletters/2026/05-2026.pdf",
    summary:
      "Archaeologists spend thousands of hours on manual paperwork—organizing notes, photos, and excavation data. ArchePal – the Archaeologist's Digital Friend transforms this process with a unified platform designed for both field and lab work. ArchePal works as a smartphone app in the field with full online and offline support, and as a browser-based application (www.archepal.com) on desktop in the lab. Features such as a Digital Diary, AI-powered image analysis, speech-to-text, photo and note association, customizable forms, and granular access controls make archaeological documentation faster, smarter, and easier than ever. Truly we believe \"The future of the past is in our hands\" — allowing archaeologists to spend more valuable time on research.",
  },
  {
    title: "12-Year-Old Drops 2KB PermzPlus Bomb on CASL's Bloat",
    source: "The AI Catchup — spotted by Marcus Riverra",
    date: "2026",
    url: "https://theaicatchup.com/article/12-year-old-drops-2kb-permzplus-bomb-on-casls-bloat/",
    summary:
      "Technologist Marcus Riverra spotlights PermzPlus, a reusable permissions library authored by Tech Titans member Arjun Katta. The article breaks down how the tiny 2KB library takes aim at the bloat of existing CASL-style permission systems and why it caught the attention of senior engineers.",
  },
];

const NewsPage = () => {
  return (
    <PageLayout>
      <section className="bg-black text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block text-sm font-medium tracking-wider text-blue-400 border border-blue-500/50 px-4 py-1.5 rounded-full mb-6"
          >
            In The News
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-4"
            style={{ textShadow: "0 0 20px rgba(59,130,246,0.4)" }}
          >
            Tech Titans <span className="text-blue-500">News</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            The team has been recognized across respected institutes and has published thought leadership through articles, blogs, and industry forums.
          </motion.p>
        </div>
      </section>

      <section className="bg-gray-900 py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {articles.map((a, i) => (
            <motion.article
              key={a.url}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="border-2 border-gray-700 hover:border-blue-500 rounded-xl p-6 md:p-8 transition-colors"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="shrink-0 w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                  <Newspaper className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 mb-2">
                    <span className="font-semibold text-blue-400 uppercase tracking-wider">
                      {a.source}
                    </span>
                    <span>·</span>
                    <span>{a.date}</span>
                    {a.upcoming && (
                      <span className="ml-1 inline-block text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/40 px-2 py-0.5 rounded-full">
                        Upcoming
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-white leading-tight">
                    {a.title}
                  </h2>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed mb-6">{a.summary}</p>

              <div className="flex flex-wrap gap-3">
                <a
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
                >
                  {a.upcoming ? "View Publications" : "Read Article"}
                  <ExternalLink className="w-4 h-4" />
                </a>
                {a.directUrl && (
                  <a
                    href={a.directUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border-2 border-blue-500 text-blue-400 hover:bg-blue-500/10 font-medium px-5 py-2.5 rounded-lg transition-colors"
                  >
                    Direct Newsletter Link
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </PageLayout>
  );
};

export default NewsPage;
