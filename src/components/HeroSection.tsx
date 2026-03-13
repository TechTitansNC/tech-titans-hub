import { motion } from "framer-motion";
import { Cog, Wrench, Star, Lightbulb } from "lucide-react";
import heroRobot from "@/assets/hero-robot-doodle.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Scattered icon decorations */}
      <motion.div
        className="absolute top-24 left-12 text-primary/20"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        <Cog size={48} />
      </motion.div>
      <motion.div
        className="absolute top-36 right-20 text-secondary/20"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Star size={36} />
      </motion.div>
      <motion.div
        className="absolute bottom-36 left-24 text-muted-foreground/20"
        animate={{ rotate: [0, -15, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <Wrench size={40} />
      </motion.div>
      <motion.div
        className="absolute bottom-44 right-28 text-accent/30"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <Lightbulb size={34} />
      </motion.div>

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
          <span className="font-body text-base tracking-wider text-primary doodle-border-blue px-4 py-1.5 inline-block bg-card rotate-1">
            FLL Team #32795
          </span>
        </motion.div>

        {/* Team name */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-heading text-7xl md:text-9xl font-bold text-foreground mb-4 leading-none"
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
          className="font-body text-xl md:text-2xl text-muted-foreground italic -rotate-1"
        >
          "The future of the past is in our hands"
        </motion.p>

        {/* Arrow down */}
        <motion.div
          className="mt-12 text-muted-foreground/40"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg width="24" height="40" viewBox="0 0 24 40" className="mx-auto" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round">
            <path d="M12 2 L12 34 M4 26 L12 36 L20 26" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
