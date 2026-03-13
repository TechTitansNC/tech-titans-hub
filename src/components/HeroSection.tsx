import { motion } from "framer-motion";
import heroRobot from "@/assets/hero-robot-doodle.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden notebook-lines px-6">
      {/* Scattered doodle decorations */}
      <motion.span
        className="absolute top-20 left-10 text-5xl select-none"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        ⚙️
      </motion.span>
      <motion.span
        className="absolute top-32 right-16 text-4xl select-none"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        ⭐
      </motion.span>
      <motion.span
        className="absolute bottom-32 left-20 text-4xl select-none"
        animate={{ rotate: [0, -15, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        🔧
      </motion.span>
      <motion.span
        className="absolute bottom-40 right-24 text-3xl select-none"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        💡
      </motion.span>

      <div className="relative z-10 text-center max-w-4xl">
        {/* Robot image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: -2 }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-8 w-56 h-56 md:w-72 md:h-72 animate-float"
        >
          <img
            src={heroRobot}
            alt="Tech Titans Robot Doodle"
            className="w-full h-full object-cover doodle-border rounded-2xl"
          />
        </motion.div>

        {/* Team badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <span className="font-hand text-lg tracking-wider text-primary doodle-border-blue px-4 py-1.5 inline-block bg-card rotate-1">
            FLL Team #32795
          </span>
        </motion.div>

        {/* Team name */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-handwriting text-7xl md:text-9xl font-bold text-foreground mb-4 leading-none"
        >
          Tech{" "}
          <span className="text-primary sketch-underline decoration-secondary">
            Titans
          </span>
        </motion.h1>

        {/* Slogan */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-hand text-xl md:text-2xl text-muted-foreground italic -rotate-1"
        >
          ✏️ "The future of the past is in our hands" ✏️
        </motion.p>

        {/* Doodle arrow pointing down */}
        <motion.div
          className="mt-12 text-4xl"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ↓
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
