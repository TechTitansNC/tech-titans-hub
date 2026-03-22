import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPublishedData, getSiteData, type SiteData } from "@/lib/siteData";
import { getGitHubConfig, fetchPublishedFromGitHub } from "@/lib/githubSync";
import PageLayout from "@/components/PageLayout";
import BlockRenderer from "@/components/BlockRenderer";

const DynamicPage = () => {
  const { slug } = useParams();
  const [data, setData] = useState<SiteData>(() => getPublishedData() ?? getSiteData());

  useEffect(() => {
    const config = getGitHubConfig();
    fetchPublishedFromGitHub(config).then((remote) => {
      if (remote && (remote as SiteData).pages) {
        setData(remote as SiteData);
      }
    });
  }, []);

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
