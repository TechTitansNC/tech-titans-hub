import { motion } from "framer-motion";
import heroRobot from "@/assets/hero-robot.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid">
      {/* Background image overlay */}
      <div className="absolute inset-0">
        <img
          src={heroRobot}
          alt="Tech Titans Robot"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Animated border lines */}
      <motion.div
        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
      />

      <div className="relative z-10 text-center px-6 max-w-5xl">
        {/* Team number */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <span className="font-mono text-sm tracking-[0.4em] text-primary uppercase border border-primary/30 px-4 py-1.5 border-glow-cyan">
            FLL Team #32795
          </span>
        </motion.div>

        {/* Team name */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-display text-6xl md:text-8xl lg:text-9xl font-black tracking-tight mb-6 text-glow-cyan text-primary"
        >
          TECH
          <br />
          <span className="text-accent text-glow-gold">TITANS</span>
        </motion.h1>

        {/* Slogan */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-body text-xl md:text-2xl text-muted-foreground tracking-widest uppercase"
        >
          The future of the past is in our hands
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto mt-8 max-w-md"
        />

        {/* Scroll indicator */}
        <motion.div
          className="mt-16"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent mx-auto" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
