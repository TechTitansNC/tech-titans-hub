import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users, FileText, BarChart3, Palette, LogOut, Plus, Trash2, Save, RotateCcw, Check,
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import {
  getSiteData, saveSiteData, resetSiteData, defaultSiteData,
  type SiteData, type TeamMember,
} from "@/lib/siteData";

type Tab = "team" | "content" | "stats" | "penpot";

const tabs: { id: Tab; label: string; icon: typeof Users }[] = [
  { id: "team", label: "Team Members", icon: Users },
  { id: "content", label: "Page Content", icon: FileText },
  { id: "stats", label: "Stats & Scores", icon: BarChart3 },
  { id: "penpot", label: "PenPot Design", icon: Palette },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("team");
  const [data, setData] = useState<SiteData>(getSiteData);
  const [saved, setSaved] = useState(false);

  const save = () => {
    saveSiteData(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const reset = () => {
    if (window.confirm("Reset all content to defaults? This cannot be undone.")) {
      resetSiteData();
      setData(defaultSiteData);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("techTitans_admin");
    navigate("/admin");
  };

  const updateData = (partial: Partial<SiteData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  };

  return (
    <PageLayout>
      <section className="py-8 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <div className="flex items-center gap-3">
              <button onClick={reset} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors">
                <RotateCcw size={16} /> Reset
              </button>
              <button onClick={save} className="flex items-center gap-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                {saved ? <><Check size={16} /> Saved</> : <><Save size={16} /> Save Changes</>}
              </button>
              <button onClick={logout} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-red-400 transition-colors">
                <LogOut size={16} /> Logout
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-8 bg-gray-800 p-1 rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-colors flex-1 justify-center ${
                  activeTab === tab.id
                    ? "bg-blue-500 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <tab.icon size={16} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "team" && <TeamTab data={data} updateData={updateData} />}
            {activeTab === "content" && <ContentTab data={data} updateData={updateData} />}
            {activeTab === "stats" && <StatsTab data={data} updateData={updateData} />}
            {activeTab === "penpot" && <PenPotTab data={data} updateData={updateData} />}
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

/* ─── Team Members Tab ─── */
function TeamTab({ data, updateData }: { data: SiteData; updateData: (p: Partial<SiteData>) => void }) {
  const addMember = () => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: "",
      role: "Team Member",
    };
    updateData({ teamMembers: [...data.teamMembers, newMember] });
  };

  const removeMember = (id: string) => {
    updateData({ teamMembers: data.teamMembers.filter((m) => m.id !== id) });
  };

  const updateMember = (id: string, field: keyof TeamMember, value: string) => {
    updateData({
      teamMembers: data.teamMembers.map((m) =>
        m.id === id ? { ...m, [field]: value } : m
      ),
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Team Members ({data.teamMembers.length})</h2>
        <button onClick={addMember} className="flex items-center gap-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg transition-colors">
          <Plus size={16} /> Add Member
        </button>
      </div>
      {data.teamMembers.map((member) => (
        <div key={member.id} className="flex gap-3 items-center bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex-1 grid grid-cols-2 gap-3">
            <input
              value={member.name}
              onChange={(e) => updateMember(member.id, "name", e.target.value)}
              placeholder="Name"
              className="bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm"
            />
            <input
              value={member.role}
              onChange={(e) => updateMember(member.id, "role", e.target.value)}
              placeholder="Role"
              className="bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm"
            />
          </div>
          <button onClick={() => removeMember(member.id)} className="text-gray-500 hover:text-red-400 transition-colors">
            <Trash2 size={18} />
          </button>
        </div>
      ))}
    </div>
  );
}

/* ─── Page Content Tab ─── */
function ContentTab({ data, updateData }: { data: SiteData; updateData: (p: Partial<SiteData>) => void }) {
  const pc = data.pageContent;

  const updateContent = (section: string, field: string, value: string) => {
    updateData({
      pageContent: {
        ...pc,
        [section]: { ...(pc as Record<string, Record<string, unknown>>)[section], [field]: value },
      },
    });
  };

  const updateStep = (index: number, field: string, value: string) => {
    const steps = [...pc.innovation.steps];
    steps[index] = { ...steps[index], [field]: value };
    updateData({
      pageContent: { ...pc, innovation: { ...pc.innovation, steps } },
    });
  };

  const updateFeature = (index: number, field: string, value: string) => {
    const features = [...pc.robot.features];
    features[index] = { ...features[index], [field]: value };
    updateData({
      pageContent: { ...pc, robot: { ...pc.robot, features } },
    });
  };

  const updateCoreValue = (index: number, field: string, value: string) => {
    const values = [...pc.coreValues];
    values[index] = { ...values[index], [field]: value };
    updateData({ pageContent: { ...pc, coreValues: values } });
  };

  return (
    <div className="space-y-8">
      {/* Home */}
      <Section title="Home Page">
        <Field label="Tagline" value={pc.home.tagline} onChange={(v) => updateContent("home", "tagline", v)} />
        <Field label="Slogan" value={pc.home.slogan} onChange={(v) => updateContent("home", "slogan", v)} />
      </Section>

      {/* About */}
      <Section title="About Page">
        <Field label="Paragraph 1" value={pc.about.paragraph1} onChange={(v) => updateContent("about", "paragraph1", v)} multiline />
        <Field label="Paragraph 2" value={pc.about.paragraph2} onChange={(v) => updateContent("about", "paragraph2", v)} multiline />
      </Section>

      {/* Innovation */}
      <Section title="Innovation Project">
        <Field label="Challenge Description" value={pc.innovation.challengeDescription} onChange={(v) => updateData({ pageContent: { ...pc, innovation: { ...pc.innovation, challengeDescription: v } } })} multiline />
        {pc.innovation.steps.map((step, i) => (
          <div key={i} className="border border-gray-700 rounded-lg p-4 space-y-3">
            <p className="text-xs text-blue-400 font-medium uppercase">Step {i + 1}</p>
            <Field label="Title" value={step.title} onChange={(v) => updateStep(i, "title", v)} />
            <Field label="Description" value={step.description} onChange={(v) => updateStep(i, "description", v)} multiline />
          </div>
        ))}
      </Section>

      {/* Robot */}
      <Section title="Robot Games">
        {pc.robot.features.map((feature, i) => (
          <div key={i} className="border border-gray-700 rounded-lg p-4 space-y-3">
            <Field label="Title" value={feature.title} onChange={(v) => updateFeature(i, "title", v)} />
            <Field label="Description" value={feature.description} onChange={(v) => updateFeature(i, "description", v)} multiline />
          </div>
        ))}
      </Section>

      {/* Core Values */}
      <Section title="Core Values">
        {pc.coreValues.map((cv, i) => (
          <div key={i} className="border border-gray-700 rounded-lg p-4 space-y-3">
            <p className="text-xs text-blue-400 font-medium uppercase">{cv.title}</p>
            <Field label="Description" value={cv.description} onChange={(v) => updateCoreValue(i, "description", v)} multiline />
            <Field label="How We Live This" value={cv.howWeDoIt} onChange={(v) => updateCoreValue(i, "howWeDoIt", v)} multiline />
          </div>
        ))}
      </Section>
    </div>
  );
}

/* ─── Stats Tab ─── */
function StatsTab({ data, updateData }: { data: SiteData; updateData: (p: Partial<SiteData>) => void }) {
  const updateStat = (field: string, value: string) => {
    updateData({ stats: { ...data.stats, [field]: value } });
  };
  const updateScore = (field: string, value: string) => {
    updateData({ robotScores: { ...data.robotScores, [field]: value } });
  };

  return (
    <div className="space-y-8">
      <Section title="About Page Stats">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Team Members" value={data.stats.teamMembers} onChange={(v) => updateStat("teamMembers", v)} />
          <Field label="Seasons" value={data.stats.seasons} onChange={(v) => updateStat("seasons", v)} />
          <Field label="Robots Built" value={data.stats.robotsBuilt} onChange={(v) => updateStat("robotsBuilt", v)} />
          <Field label="Competitions" value={data.stats.competitions} onChange={(v) => updateStat("competitions", v)} />
        </div>
      </Section>

      <Section title="Robot Games Scores">
        <div className="grid grid-cols-3 gap-4">
          <Field label="Best Score" value={data.robotScores.bestScore} onChange={(v) => updateScore("bestScore", v)} />
          <Field label="Avg Score" value={data.robotScores.avgScore} onChange={(v) => updateScore("avgScore", v)} />
          <Field label="Missions" value={data.robotScores.missions} onChange={(v) => updateScore("missions", v)} />
        </div>
      </Section>
    </div>
  );
}

/* ─── PenPot Tab ─── */
function PenPotTab({ data, updateData }: { data: SiteData; updateData: (p: Partial<SiteData>) => void }) {
  return (
    <div className="space-y-6">
      <Section title="PenPot Design Integration">
        <p className="text-gray-400 text-sm mb-4">
          Paste a PenPot share/embed URL below to view your team's designs directly in the admin panel.
          To get a share link: open your project in{" "}
          <a href="https://design.penpot.app" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
            PenPot
          </a>
          , click Share, and copy the view link.
        </p>
        <Field
          label="PenPot Embed URL"
          value={data.penpotEmbedUrl}
          onChange={(v) => updateData({ penpotEmbedUrl: v })}
          placeholder="https://design.penpot.app/#/view/..."
        />
      </Section>

      {data.penpotEmbedUrl ? (
        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
          <div className="px-4 py-2 border-b border-gray-700 flex items-center gap-2">
            <Palette size={16} className="text-blue-400" />
            <span className="text-sm text-gray-300">PenPot Viewer</span>
          </div>
          <iframe
            src={data.penpotEmbedUrl}
            title="PenPot Design"
            className="w-full h-[600px] border-0"
            sandbox="allow-scripts allow-same-origin allow-popups"
          />
        </div>
      ) : (
        <div className="bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg h-64 flex items-center justify-center">
          <div className="text-center">
            <Palette className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500">Paste a PenPot URL above to preview designs here</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Shared Components ─── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({
  label, value, onChange, multiline, placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void; multiline?: boolean; placeholder?: string;
}) {
  const cls = "w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm";
  return (
    <div>
      <label className="block text-xs font-medium text-gray-400 mb-1">{label}</label>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} className={cls + " resize-y"} placeholder={placeholder} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className={cls} placeholder={placeholder} />
      )}
    </div>
  );
}

export default AdminDashboard;
