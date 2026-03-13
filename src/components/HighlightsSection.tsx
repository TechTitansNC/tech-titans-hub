import { motion } from "framer-motion";
import { Bot, Lightbulb, Trophy } from "lucide-react";

const highlights = [
  {
    icon: Bot,
    title: "ROBOT DESIGN",
    description:
      "Our robots are engineered for precision and power. We design, build, and program autonomous machines to tackle complex FLL challenges.",
  },
  {
    icon: Lightbulb,
    title: "INNOVATION PROJECT",
    description:
      "We identify real-world problems and create innovative solutions that make a difference in our community and beyond.",
  },
  {
    icon: Trophy,
    title: "CORE VALUES",
    description:
      "Discovery, innovation, impact, inclusion, teamwork, and fun. These are the pillars that drive everything we do as Tech Titans.",
  },
];

const HighlightsSection = () => {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-accent text-glow-gold mb-4">
            WHAT WE DO
          </h2>
          <div className="h-px w-24 bg-primary mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative border border-border bg-card/30 p-8 hover:border-accent/50 transition-all duration-300"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <item.icon className="w-10 h-10 text-primary mb-6 group-hover:text-accent transition-colors" />
              <h3 className="font-display text-lg font-bold text-foreground mb-3 tracking-wide">
                {item.title}
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;
