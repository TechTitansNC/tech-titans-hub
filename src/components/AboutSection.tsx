import { motion } from "framer-motion";

const stats = [
  { emoji: "👥", label: "Team Members", value: "10" },
  { emoji: "📅", label: "Seasons", value: "3+" },
  { emoji: "🤖", label: "Robots Built", value: "5" },
  { emoji: "🏆", label: "Competitions", value: "8+" },
];

const AboutSection = () => {
  return (
    <section className="relative py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-handwriting text-5xl md:text-7xl font-bold text-primary mb-2 -rotate-1">
            Who We Are
          </h2>
          <svg width="120" height="12" viewBox="0 0 120 12" className="mx-auto mb-8">
            <path d="M2 8 C30 2, 60 12, 90 4 C100 2, 110 6, 118 5" stroke="hsl(25 90% 58%)" strokeWidth="3" fill="none" strokeLinecap="round" />
          </svg>
          <p className="font-comic text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We are <span className="font-bold text-foreground">Tech Titans</span> — a passionate FIRST LEGO League team
            dedicated to innovation, teamwork, and creative problem-solving. We believe the future of the past is in our hands,
            and we're building it one brick at a time! 🧱
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -1.5 : 1.5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 0 }}
              className="doodle-border bg-card p-5 text-center cursor-default"
            >
              <div className="text-3xl mb-2">{stat.emoji}</div>
              <div className="font-handwriting text-3xl md:text-4xl font-bold text-primary">
                {stat.value}
              </div>
              <div className="font-hand text-sm text-muted-foreground">
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
