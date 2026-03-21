import { motion } from "framer-motion";
import { Bot, Cpu, Target, Trophy } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { getSiteData } from "@/lib/siteData";

const featureIcons = [Cpu, Target, Bot, Trophy];

const RobotPage = () => {
  const data = getSiteData();
  const { features } = data.pageContent.robot;
  const scores = data.robotScores;

  return (
    <PageLayout>
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-4"
          >
            Robot <span className="text-blue-500">Games</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg"
          >
            Our robot design, strategy, and achievements
          </motion.p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg h-72 flex items-center justify-center"
          >
            <div className="text-center">
              <Bot className="w-16 h-16 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400 text-lg">Robot Photo / Diagram Placeholder</p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, i) => {
              const Icon = featureIcons[i] || Bot;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-gray-800 text-white rounded-lg p-8"
                >
                  <Icon className="w-10 h-10 text-blue-400 mb-4" />
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 border-2 border-blue-500 rounded-lg p-8 text-center bg-gray-800"
          >
            <h3 className="text-2xl font-bold text-white mb-2">Score Highlights</h3>
            <p className="text-gray-500 mb-6">Our best competition scores.</p>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="text-3xl font-bold text-blue-500">{scores.bestScore}</div>
                <div className="text-sm text-gray-500">Best Score</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="text-3xl font-bold text-blue-500">{scores.avgScore}</div>
                <div className="text-sm text-gray-500">Avg Score</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="text-3xl font-bold text-blue-500">{scores.missions}</div>
                <div className="text-sm text-gray-500">Missions</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default RobotPage;
