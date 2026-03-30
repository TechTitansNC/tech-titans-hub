import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Lightbulb, Smartphone, Bot } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const images = [
  "/assets/img1.JPG",
  "/assets/img2.JPG",
  "/assets/img3.jpg",
];

const Index = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, []);

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
            Tech Titans
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 italic"
          >
            🚀 First Championship Houston, here we come!
            <br />
            We're beyond excited to represent North Carolina at the FIRST
            Championship in Houston!
            <br />
            This journey has been incredible, and we're proud to carry our NC
            state's spirit, innovation, and teamwork to the global stage. Let's
            go make it count!
          </motion.p>
        </div>
      </section>

      <section className="bg-black py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-xl">
            <AnimatePresence mode="wait">
              <motion.img
                key={current}
                src={images[current]}
                alt={`Team photo ${current + 1}`}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.3 }}
                className="w-full h-80 md:h-[480px] object-cover rounded-xl"
              />
            </AnimatePresence>

            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? "bg-blue-500" : "bg-gray-600 hover:bg-gray-400"}`}
                aria-label={`Go to photo ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="bg-gray-900 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="inline-block text-sm font-medium tracking-wider text-blue-400 border border-blue-500/50 px-4 py-1.5 rounded-full mb-4">
              FLL Innovation Project
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              Meet <span className="text-blue-500">Archepal</span>
            </h2>
            <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
              A full-stack web and mobile app built by Tech Titans — combining AI, secure authentication, and cross-platform design to solve a real-world problem.
            </p>
            <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto">&nbsp;</p>       
            <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
              ArchePal is more than software — it is a true Archaeologists’ Friend.
                It helps researchers:
                1. Reduce manual, repetitive work
                2. Improve accuracy and efficiency
                3. Work anywhere, even without internet
                4. Generate new funding opportunities
                5. Collaborate and share discoveries worldwide
              ArchePal empowers the people who uncover humanity’s past by giving them the tools of the future.
            </p>
          </motion.div>



          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <a
              href="https://www.archepal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              View Archepal <ArrowRight size={16} />
            </a>
            <a
              href="https://apps.apple.com/us/app/archepal/id6756281728"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Get Archepal Mobile App for Apple Users<ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
