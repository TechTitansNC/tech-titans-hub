import Navbar from "./Navbar";
import FooterSection from "./FooterSection";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">{children}</main>
      <FooterSection />
    </div>
  );
};

export default PageLayout;
