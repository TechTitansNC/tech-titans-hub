import { motion } from "framer-motion";
import { Search, Lightbulb, FlaskConical, Presentation } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { getSiteData } from "@/lib/siteData";

const stepIcons = [Search, Lightbulb, FlaskConical, Presentation];

const InnovationPage = () => {
  const data = getSiteData();
  const { challengeDescription, steps } = data.pageContent.innovation;

  return (
    <PageLayout>
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-4"
          >
            Innovation <span className="text-blue-500">Project</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg"
          >
            Solving real-world problems with creativity
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
              The <span className="text-blue-500">Challenge</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              {challengeDescription}
            </p>
          </motion.div>

          <div className="space-y-8">
            {steps.map((step, i) => {
              const Icon = stepIcons[i] || Lightbulb;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-6 items-start"
                >
                  <div className="flex-shrink-0 w-14 h-14 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-gray-800 border-2 border-blue-500 rounded-lg p-8 text-center"
          >
            <Lightbulb className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Project Details Coming Soon</h3>
            <p className="text-gray-500">
              Our Innovation Project details for the current season will be added here.
            </p>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default InnovationPage;
