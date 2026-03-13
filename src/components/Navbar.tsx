import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b-2 border-dashed border-border bg-background/90 backdrop-blur-sm"
    >
      <div className="max-w-4xl mx-auto flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          <span className="font-heading text-2xl font-bold text-primary">
            Tech Titans
          </span>
          <span className="font-body text-sm text-muted-foreground">
            #32795
          </span>
        </div>
        <div className="flex items-center gap-5 font-body text-base">
          <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
            About
          </a>
          <a href="#highlights" className="text-muted-foreground hover:text-secondary transition-colors">
            What We Do
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
