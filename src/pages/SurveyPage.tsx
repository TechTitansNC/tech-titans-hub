import { useState } from "react";
import { motion } from "framer-motion";
import { ClipboardList, Check, Plus, X } from "lucide-react";
import PageLayout from "@/components/PageLayout";

type Submission = {
  teamNumber: string;
  teamName: string;
  yourName: string;
  keywords: string[];
  submittedAt: string;
};

const STORAGE_KEY = "techTitans_boothSurvey";

const loadSubmissions = (): Submission[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Submission[]) : [];
  } catch {
    return [];
  }
};

const SurveyPage = () => {
  const [teamNumber, setTeamNumber] = useState("");
  const [teamName, setTeamName] = useState("");
  const [yourName, setYourName] = useState("");
  const [keywords, setKeywords] = useState<string[]>(["", "", "", "", ""]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateKeyword = (i: number, value: string) => {
    setKeywords((prev) => prev.map((k, idx) => (idx === i ? value : k)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedKeywords = keywords.map((k) => k.trim()).filter(Boolean);
    if (!teamNumber.trim() || !teamName.trim() || !yourName.trim()) {
      setError("Please fill in your team number, team name, and your name.");
      return;
    }
    if (trimmedKeywords.length < 5) {
      setError("Please provide all 5 keywords describing your booth.");
      return;
    }

    const submission: Submission = {
      teamNumber: teamNumber.trim(),
      teamName: teamName.trim(),
      yourName: yourName.trim(),
      keywords: trimmedKeywords,
      submittedAt: new Date().toISOString(),
    };

    const existing = loadSubmissions();
    localStorage.setItem(STORAGE_KEY, JSON.stringify([submission, ...existing]));
    setSubmitted(true);
  };

  const resetForm = () => {
    setTeamNumber("");
    setTeamName("");
    setYourName("");
    setKeywords(["", "", "", "", ""]);
    setSubmitted(false);
    setError(null);
  };

  return (
    <PageLayout>
      <section className="bg-black text-white py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block text-sm font-medium tracking-wider text-blue-400 border border-blue-500/50 px-4 py-1.5 rounded-full mb-6"
          >
            Booth Survey
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-4"
            style={{ textShadow: "0 0 20px rgba(59,130,246,0.4)" }}
          >
            Tell Us About <span className="text-blue-500">Your Booth</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-300"
          >
            Stopping by? Drop your team info and 5 keywords that capture your booth's vibe.
          </motion.p>
        </div>
      </section>

      <section className="bg-gray-900 py-16 px-6">
        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="border-2 border-blue-500 rounded-xl p-8 text-center"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-blue-500/10 border border-blue-500/40 flex items-center justify-center">
                <Check className="w-7 h-7 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Thanks for sharing!</h2>
              <p className="text-gray-400 mb-6">
                Your booth survey has been recorded. We'll come find you on the floor.
              </p>
              <button
                onClick={resetForm}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Submit another response
              </button>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="border-2 border-gray-700 rounded-xl p-6 md:p-8 space-y-6"
            >
              <div className="flex items-start gap-4 pb-4 border-b border-gray-800">
                <div className="shrink-0 w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                  <ClipboardList className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Booth Check-In</h2>
                  <p className="text-sm text-gray-400">All fields are required.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="teamNumber" className="block text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
                    Team Number
                  </label>
                  <input
                    id="teamNumber"
                    type="text"
                    value={teamNumber}
                    onChange={(e) => setTeamNumber(e.target.value)}
                    placeholder="#12345"
                    className="w-full bg-black border-2 border-gray-700 focus:border-blue-500 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="teamName" className="block text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
                    Team Name
                  </label>
                  <input
                    id="teamName"
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="The Robo Wranglers"
                    className="w-full bg-black border-2 border-gray-700 focus:border-blue-500 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="yourName" className="block text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
                  Your Name
                </label>
                <input
                  id="yourName"
                  type="text"
                  value={yourName}
                  onChange={(e) => setYourName(e.target.value)}
                  placeholder="Alex Johnson"
                  className="w-full bg-black border-2 border-gray-700 focus:border-blue-500 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
                  5 Keywords About Your Booth
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  One word or short phrase per slot — what should people remember?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {keywords.map((kw, i) => (
                    <div key={i} className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-600 tabular-nums">
                        {i + 1}.
                      </span>
                      <input
                        type="text"
                        value={kw}
                        onChange={(e) => updateKeyword(i, e.target.value)}
                        placeholder={`Keyword ${i + 1}`}
                        className="w-full bg-black border-2 border-gray-700 focus:border-blue-500 rounded-lg pl-9 pr-4 py-2.5 text-white placeholder-gray-600 outline-none transition-colors"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {error && (
                <div className="flex items-start gap-2 border border-red-500/40 bg-red-500/10 text-red-300 rounded-lg px-4 py-3 text-sm">
                  <X className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-3 rounded-lg transition-colors"
              >
                Submit Survey
                <Check className="w-4 h-4" />
              </button>
            </motion.form>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default SurveyPage;
