import { motion } from "framer-motion";
import { Cpu, BarChart4, CloudSun, TrendingUp } from "lucide-react";
import TitleBadge from "./TitleBadge";

const solutions = [
  {
    icon: <Cpu className="text-green-600 w-6 h-6" />,
    title: "AI-Powered Plantation Monitoring",
    desc: "Use of machine learning models to predict yield and detect diseases based on environmental and sensor data.",
  },
  {
    icon: <CloudSun className="text-green-600 w-6 h-6" />,
    title: "Climate-Smart Decision Support",
    desc: "Real-time weather data and predictive analytics for informed irrigation and fertilization scheduling.",
  },
  {
    icon: <BarChart4 className="text-green-600 w-6 h-6" />,
    title: "Export Forecasting Models",
    desc: "Advanced time-series models trained on historical production and export data for accurate foreign exchange predictions.",
  },
  {
    icon: <TrendingUp className="text-green-600 w-6 h-6" />,
    title: "Smart Dashboard Interface",
    desc: "Interactive portal for farmers and exporters with visual analytics, alerts, and decision-making tools.",
  },
];

const About = () => {
  return (
    <section id="about" className="section-box bg-gray-50 scroll-mt-16 my-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-gray-700 text-center mb-12"
      >
        <TitleBadge name="About TheGuard" />
        <p className="mb-4">
          Traditional tea plantation management systems lack intelligent
          automation and are heavily dependent on manual processes. Export
          forecasting is often inconsistent, disconnected from production
          patterns, and fails to adapt dynamically to global market shifts.
        </p>
        <p>
          There is a significant need for a unified, smart system that
          integrates ML-powered analytics, climate awareness, and export
          forecasting to enhance both productivity and international market
          value.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.2 }}
        className="max-w-5xl mx-auto"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
              className="flex items-start gap-4 bg-white p-5 border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all"
            >
              <div className="mt-1">{solution.icon}</div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">
                  {solution.title}
                </h4>
                <p className="text-gray-600 text-sm">{solution.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default About;
