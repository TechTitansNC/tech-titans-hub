import { motion } from "framer-motion";
import { Cpu, Cog, Zap, Users } from "lucide-react";

const stats = [
  { icon: Users, label: "Team Members", value: "10" },
  { icon: Cog, label: "Seasons", value: "3+" },
  { icon: Cpu, label: "Robots Built", value: "5" },
  { icon: Zap, label: "Competitions", value: "8+" },
];

const AboutSection = () => {
  return (
    <section className="relative py-24 px-6 bg-grid">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary text-glow-cyan mb-4">
            WHO WE ARE
          </h2>
          <div className="h-px w-24 bg-accent mx-auto mb-8" />
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We are <span className="text-foreground font-semibold">Tech Titans</span> — a passionate FIRST LEGO League team 
            dedicated to innovation, teamwork, and creative problem-solving. We believe the future of the past is in our hands, 
            and we're building it one brick at a time.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border border-border bg-card/50 p-6 text-center group hover:border-primary/50 transition-colors border-glow-cyan"
            >
              <stat.icon className="w-8 h-8 text-accent mx-auto mb-3 group-hover:text-primary transition-colors" />
              <div className="font-display text-2xl md:text-3xl font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="font-mono text-xs text-muted-foreground tracking-wider uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
