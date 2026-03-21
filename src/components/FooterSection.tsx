const FooterSection = () => {
  return (
    <footer className="bg-gray-900 py-10 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-2xl font-bold text-white mb-1">
          Tech Titans
        </h3>
        <p className="text-sm text-gray-400">
          FLL Team #32795
        </p>
        <p className="text-sm text-gray-400 italic mt-1">
          "The future of the past is in our hands"
        </p>
        <div className="w-16 h-0.5 bg-blue-500 mx-auto my-4" />
        <p className="text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Tech Titans &middot; Powered by FIRST&reg; LEGO&reg; League
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
