import { motion } from "framer-motion";
import { User } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const members = [
  { name: "Aarush Mene", photo: "/assets/Aarush.png", grade: "6th", school: "Martin Middle", fll: "5 years (FLL-3,Explorer-2)" },
  { name: "Anish Rudrabhatla", photo: "/assets/Anish.png", grade: "5th", school: "Thales Academy", fll: "2 years" },
  { name: "Arjun Katta", photo: "/assets/ArjunKatta.png", grade: "6th", school: "TMSA", fll: "3 years" },
  { name: "Atharv Pardeshi", photo: "/assets/Atharv.png", grade: "8th", school: "TMSA", fll: "1st Year (Rookie)" },
  { name: "Prakhar Purohit", photo: "/assets/Prakhar.png", grade: "6th", school: "TMSA", fll: "1st Year (Rookie)" },
  { name: "Sachin Senthil Kumar", photo: "/assets/Sachin.png", grade: "8th", school: "Alston Ridge", fll: "3 years" },
  { name: "Shreyan Sharma", photo: "/assets/Shreyan.png", grade: "5th", school: "Thales Academy", fll: "3 years" },
  { name: "Yogi Desai", photo: "/assets/Yogi.png", grade: "8th", school: "TMSA", fll: "3 years" },
  { name: "Aatmaja Mene", photo: "/assets/Aatmaja.png", grade: "9th", school: "Youth Mentor", schoolLabel: "Role", fll: "4 years (FLL-2,FTC-2)" },
  { name: "Atul Mene", photo: "/assets/Atul.png", grade: "IBM, Master Inventor", gradeLabel: "Title", school: "Head Coach", schoolLabel: "Role", fll: "5 years" },
];

const TeamPage = () => {
  return (
    <PageLayout>
      <section className="bg-black text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block text-sm font-medium tracking-wider text-blue-400 border border-blue-500/50 px-4 py-1.5 rounded-full mb-6"
          >
            FLL Team #32795
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-4"
            style={{ textShadow: "0 0 20px rgba(59,130,246,0.4)" }}
          >
            Our <span className="text-blue-500">Team</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400"
          >
            Meet the people behind Tech Titans
          </motion.p>
        </div>
      </section>

      <section className="bg-gray-900 py-16 px-6">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="border-2 border-gray-700 hover:border-blue-500 rounded-xl p-6 text-center transition-colors"
            >
              <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden bg-gray-800 flex items-center justify-center">
                {m.photo ? (
                  <img src={m.photo} alt={m.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-10 h-10 text-blue-500" />
                )}
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{m.name}</h3>
              <div className="text-left space-y-1.5 border-t border-gray-700 pt-3">
                <div className="flex justify-between text-sm gap-2">
                  <span className="text-gray-500 shrink-0">{m.gradeLabel ?? "Grade"}</span>
                  <span className="text-white font-medium text-right">{m.grade}</span>
                </div>
                <div className="flex justify-between text-sm gap-2">
                  <span className="text-gray-500 shrink-0">{m.schoolLabel ?? "School"}</span>
                  <span className="text-white font-medium text-right">{m.school}</span>
                </div>
                <div className="flex justify-between text-sm gap-2">
                  <span className="text-gray-500 shrink-0">FLL Exp.</span>
                  <span className="text-blue-400 font-medium text-right">{m.fll}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
};

export default TeamPage;
