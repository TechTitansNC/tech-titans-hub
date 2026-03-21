import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Lightbulb, Bot, Heart, ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { getSiteData } from "@/lib/siteData";

const cards = [
  { to: "/about", icon: Users, title: "About Us", description: "Learn about our team and mission" },
  { to: "/team", icon: Users, title: "Team Members", description: "Meet the people behind the robots" },
  { to: "/innovation", icon: Lightbulb, title: "Innovation Project", description: "Our real-world problem solving" },
  { to: "/robot", icon: Bot, title: "Robot Games", description: "Our robot design and strategy" },
  { to: "/corevalues", icon: Heart, title: "Core Values", description: "The values that drive us" },
];

const fullTitle = "Tech Titans";

const Typewriter = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [displayed, text, started]);

  return (
    <>
      {displayed.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className={char !== " " && i >= 5 ? "text-blue-500" : ""}
        >
          {char}
        </motion.span>
      ))}
      {started && displayed.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="text-blue-400"
        >
          |
        </motion.span>
      )}
    </>
  );
};

const Index = () => {
  const data = getSiteData();
  const { tagline, slogan } = data.pageContent.home;

  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-black py-32 px-6 relative overflow-hidden">
        {/* Glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-blue-400/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block text-sm font-medium tracking-wider text-blue-400 border border-blue-500/50 px-4 py-1.5 rounded-full mb-6 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
            >
              {tagline}
            </motion.span>
          </motion.div>

          <h1
            className="text-6xl md:text-8xl font-black mb-6 leading-none text-white"
            style={{
              textShadow: "0 0 20px rgba(59,130,246,0.5), 0 0 60px rgba(59,130,246,0.2)",
            }}
          >
            <Typewriter text={fullTitle} delay={600} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.2 }}
            className="text-xl md:text-2xl text-gray-400 italic"
          >
            {slogan}
          </motion.p>

          {/* Animated scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8 }}
            className="mt-16"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-blue-500/40 rounded-full mx-auto flex justify-center pt-2"
            >
              <motion.div
                animate={{ opacity: [1, 0], y: [0, 12] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-blue-400 rounded-full"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-12"
          >
            Explore <span className="text-blue-500">Our World</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, i) => (
              <motion.div
                key={card.to}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link
                  to={card.to}
                  className="group block bg-gray-800 border-2 border-gray-700 hover:border-blue-500 rounded-lg p-6 transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                >
                  <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                    <card.icon className="w-10 h-10 text-blue-500 mb-4" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    {card.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-blue-500 text-sm font-medium group-hover:gap-2 transition-all">
                    Learn more <ArrowRight size={16} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
