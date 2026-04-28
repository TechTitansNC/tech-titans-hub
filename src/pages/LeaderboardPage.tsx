import { motion } from "framer-motion";
import { Trophy, Medal, Award } from "lucide-react";
import PageLayout from "@/components/PageLayout";

type Entry = {
  rank: number;
  team: string;
  number: string;
  region: string;
  score: number;
};

const entries: Entry[] = [
  { rank: 1, team: "Tech Titans", number: "#32795", region: "North Carolina", score: 485 },
  { rank: 2, team: "Quantum Builders", number: "#41208", region: "California", score: 472 },
  { rank: 3, team: "Robo Phoenix", number: "#28743", region: "Texas", score: 461 },
  { rank: 4, team: "Gear Wizards", number: "#15902", region: "Massachusetts", score: 448 },
  { rank: 5, team: "Circuit Sharks", number: "#37541", region: "Florida", score: 432 },
  { rank: 6, team: "Lego Lions", number: "#22186", region: "Illinois", score: 419 },
  { rank: 7, team: "Brick Brigade", number: "#49027", region: "Washington", score: 405 },
  { rank: 8, team: "Pixel Pioneers", number: "#33614", region: "Georgia", score: 391 },
  { rank: 9, team: "Mecha Mavericks", number: "#17855", region: "Colorado", score: 378 },
  { rank: 10, team: "Byte Knights", number: "#26430", region: "Ohio", score: 364 },
];

const rankStyle = (rank: number) => {
  if (rank === 1) return { ring: "border-yellow-400", badge: "bg-yellow-400/10 text-yellow-300 border-yellow-400/40", icon: <Trophy className="w-5 h-5" /> };
  if (rank === 2) return { ring: "border-gray-300", badge: "bg-gray-300/10 text-gray-200 border-gray-300/40", icon: <Medal className="w-5 h-5" /> };
  if (rank === 3) return { ring: "border-amber-600", badge: "bg-amber-600/10 text-amber-400 border-amber-600/40", icon: <Award className="w-5 h-5" /> };
  return { ring: "border-gray-700", badge: "bg-blue-500/10 text-blue-300 border-blue-500/30", icon: null };
};

const LeaderboardPage = () => {
  return (
    <PageLayout>
      <section className="bg-black text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block text-sm font-medium tracking-wider text-blue-400 border border-blue-500/50 px-4 py-1.5 rounded-full mb-6"
          >
            Season Standings
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-4"
            style={{ textShadow: "0 0 20px rgba(59,130,246,0.4)" }}
          >
            Leader<span className="text-blue-500">board</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Top FLL teams ranked by season-high robot game score. Demo data shown for layout preview.
          </motion.p>
        </div>
      </section>

      <section className="bg-gray-900 py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-3">
          {entries.map((e, i) => {
            const style = rankStyle(e.rank);
            const isUs = e.team === "Tech Titans";
            return (
              <motion.div
                key={e.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-center gap-4 md:gap-6 border-2 ${isUs ? "border-blue-500 bg-blue-500/5" : style.ring} rounded-xl p-4 md:p-5 transition-colors`}
              >
                <div className={`shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-lg border ${style.badge} flex items-center justify-center font-black text-lg`}>
                  {style.icon ?? `#${e.rank}`}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h2 className="text-lg md:text-xl font-bold text-white truncate">
                      {e.team}
                    </h2>
                    <span className="text-xs font-semibold text-blue-400">{e.number}</span>
                    {isUs && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/40 px-2 py-0.5 rounded-full">
                        That's Us
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">{e.region}</p>
                </div>

                <div className="shrink-0 text-right">
                  <div className="text-2xl md:text-3xl font-black text-white tabular-nums">
                    {e.score}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-gray-500">points</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </PageLayout>
  );
};

export default LeaderboardPage;
