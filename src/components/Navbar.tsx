import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md"
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="font-display text-lg font-bold text-primary text-glow-cyan">
            TT
          </span>
          <span className="hidden sm:inline font-mono text-xs text-muted-foreground tracking-widest">
            #32795
          </span>
        </div>
        <div className="flex items-center gap-6 font-mono text-xs tracking-wider uppercase">
          <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
            About
          </a>
          <a href="#highlights" className="text-muted-foreground hover:text-primary transition-colors">
            What We Do
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
