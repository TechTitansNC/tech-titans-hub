import { useParams } from "react-router-dom";
import { getSiteData } from "@/lib/siteData";
import PageLayout from "@/components/PageLayout";
import BlockRenderer from "@/components/BlockRenderer";

const DynamicPage = () => {
  const { slug } = useParams();
  const data = getSiteData();

  const resolvedSlug = slug ? `/${slug}` : "/";
  const page = data.pages.find((p) => p.slug === resolvedSlug);

  if (!page) {
    return (
      <PageLayout>
        <div className="py-32 text-center">
          <h1 className="text-5xl font-black text-white mb-4">404</h1>
          <p className="text-gray-400">Page not found</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {page.blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </PageLayout>
  );
};

export default DynamicPage;
