const FooterSection = () => {
  return (
    <footer className="border-t-2 border-dashed border-border py-10 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="font-heading text-3xl font-bold text-foreground mb-1">
          Tech Titans
        </h3>
        <p className="font-body text-sm text-muted-foreground">
          FLL Team #32795
        </p>
        <p className="font-body text-sm text-muted-foreground italic mt-1">
          "The future of the past is in our hands"
        </p>
        <svg width="60" height="8" viewBox="0 0 60 8" className="mx-auto my-4">
          <path d="M2 4 C15 1, 30 7, 45 3 C50 2, 55 5, 58 4" stroke="hsl(25 90% 58%)" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
        <p className="font-body text-xs text-muted-foreground">
          © {new Date().getFullYear()} Tech Titans · Powered by FIRST® LEGO® League
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
