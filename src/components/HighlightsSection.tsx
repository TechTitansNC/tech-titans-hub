import { motion } from "framer-motion";

const highlights = [
  {
    emoji: "🤖",
    title: "Robot Design",
    description: "We engineer robots for precision and power — designing, building, and programming autonomous machines to tackle FLL challenges!",
    borderClass: "doodle-border-blue",
  },
  {
    emoji: "💡",
    title: "Innovation Project",
    description: "We find real-world problems and create innovative solutions that make a difference in our community and beyond.",
    borderClass: "doodle-border-orange",
  },
  {
    emoji: "🌟",
    title: "Core Values",
    description: "Discovery, innovation, impact, inclusion, teamwork, and fun — these pillars drive everything we do as Tech Titans!",
    borderClass: "doodle-border",
  },
];

const HighlightsSection = () => {
  return (
    <section className="relative py-20 px-6 notebook-lines">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-handwriting text-5xl md:text-7xl font-bold text-secondary rotate-1">
            What We Do
          </h2>
          <svg width="100" height="12" viewBox="0 0 100 12" className="mx-auto mt-1">
            <path d="M2 6 C25 2, 50 10, 75 4 C85 3, 95 7, 98 5" stroke="hsl(220 70% 55%)" strokeWidth="3" fill="none" strokeLinecap="round" />
          </svg>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: i === 1 ? 1.5 : i === 2 ? -1 : -1.5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ scale: 1.03, rotate: 0 }}
              className={`${item.borderClass} bg-card p-7 cursor-default`}
            >
              <div className="text-4xl mb-4">{item.emoji}</div>
              <h3 className="font-handwriting text-2xl font-bold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="font-comic text-muted-foreground leading-relaxed text-sm">
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
