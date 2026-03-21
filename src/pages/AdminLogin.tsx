import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, AlertCircle } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const ADMIN_PASSWORD = "TechTitans2025";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("techTitans_admin", "true");
      navigate("/admin/dashboard");
    } else {
      setError(true);
      setPassword("");
    }
  };

  return (
    <PageLayout>
      <section className="py-32 px-6">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
            <p className="text-gray-400">Enter the admin password to continue</p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="bg-gray-800 border border-gray-700 rounded-lg p-6"
          >
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm mb-4 bg-red-400/10 border border-red-400/20 rounded-lg p-3">
                <AlertCircle size={16} />
                Incorrect password. Try again.
              </div>
            )}
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Enter admin password"
              className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors mb-4"
              autoFocus
            />
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 rounded-lg transition-colors"
            >
              Login
            </button>
          </motion.form>
        </div>
      </section>
    </PageLayout>
  );
};

export default AdminLogin;
