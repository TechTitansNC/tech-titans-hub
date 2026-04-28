import { useEffect } from "react";

const SURVEY_URL = "https://www.archepal.com/#/booth-battle/submit";

const SurveyPage = () => {
  useEffect(() => {
    window.location.replace(SURVEY_URL);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <p className="text-lg text-gray-400">
        Redirecting to{" "}
        <a href={SURVEY_URL} className="text-blue-500 underline">
          {SURVEY_URL}
        </a>
        …
      </p>
    </div>
  );
};

export default SurveyPage;
