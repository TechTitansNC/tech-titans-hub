import { motion } from "framer-motion";
import { Compass, Lightbulb, Globe, UsersRound, Handshake, PartyPopper } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { getSiteData } from "@/lib/siteData";

const valueIcons = [Compass, Lightbulb, Globe, UsersRound, Handshake, PartyPopper];

const CoreValuesPage = () => {
  const data = getSiteData();
  const coreValues = data.pageContent.coreValues;

  return (
    <PageLayout>
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-4"
          >
            Core <span className="text-blue-500">Values</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg"
          >
            The pillars that guide everything we do
          </motion.p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, i) => {
              const Icon = valueIcons[i] || Compass;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="border-2 border-gray-700 rounded-lg p-6 hover:border-blue-500 transition-colors group"
                >
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-800 transition-colors">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{value.description}</p>
                  <div className="border-t border-gray-700 pt-4">
                    <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-1">How We Live This</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{value.howWeDoIt}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CoreValuesPage;
