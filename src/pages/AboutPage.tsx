import { motion } from "framer-motion";
import { Users, CalendarDays, Bot, Trophy } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { getSiteData } from "@/lib/siteData";

const statIcons = [Users, CalendarDays, Bot, Trophy];
const statKeys = ["teamMembers", "seasons", "robotsBuilt", "competitions"] as const;
const statLabels = ["Team Members", "Seasons", "Robots Built", "Competitions"];

const AboutPage = () => {
  const data = getSiteData();
  const { paragraph1, paragraph2 } = data.pageContent.about;

  return (
    <PageLayout>
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-4"
          >
            About <span className="text-blue-500">Us</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg"
          >
            Get to know Tech Titans
          </motion.p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-6">
              Who We <span className="text-blue-500">Are</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-4">
              {paragraph1}
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              {paragraph2}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg h-64 flex items-center justify-center"
          >
            <p className="text-gray-400 text-lg">Team Photo Placeholder</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {statKeys.map((key, i) => {
              const Icon = statIcons[i];
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-blue-500 text-white rounded-lg p-6 text-center"
                >
                  <Icon className="w-8 h-8 text-white mx-auto mb-3" />
                  <div className="text-3xl font-bold">{data.stats[key]}</div>
                  <div className="text-sm text-blue-100">{statLabels[i]}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AboutPage;
