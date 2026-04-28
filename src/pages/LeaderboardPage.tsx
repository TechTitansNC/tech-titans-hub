import { useEffect } from "react";

const LEADERBOARD_URL = "https://www.archepal.com/#/booth-battle";

const LeaderboardPage = () => {
  useEffect(() => {
    window.location.replace(LEADERBOARD_URL);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <p className="text-lg text-gray-400">
        Redirecting to{" "}
        <a href={LEADERBOARD_URL} className="text-blue-500 underline">
          {LEADERBOARD_URL}
        </a>
        …
      </p>
    </div>
  );
};

export default LeaderboardPage;
