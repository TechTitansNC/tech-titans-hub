const FooterSection = () => {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h3 className="font-display text-xl font-bold text-primary mb-2">
          TECH TITANS
        </h3>
        <p className="font-mono text-xs text-muted-foreground tracking-widest mb-1">
          FLL TEAM #32795
        </p>
        <p className="font-body text-sm text-muted-foreground italic">
          "The future of the past is in our hands"
        </p>
        <div className="h-px w-16 bg-primary/30 mx-auto my-6" />
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} Tech Titans. Powered by FIRST® LEGO® League.
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
