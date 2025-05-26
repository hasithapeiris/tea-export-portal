import { motion } from "framer-motion";
import { Download, Smartphone } from "lucide-react";
import { Header_3 } from "../assets";

export default function CallToAction() {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={Header_3}
          alt="Smart Agriculture Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-emerald-800/85 to-teal-900/90"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-10 w-16 h-16 bg-white/10 rounded-full blur-sm"
        ></motion.div>
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 right-10 w-24 h-24 bg-white/5 rounded-full blur-sm"
        ></motion.div>
        <motion.div
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 right-20 w-12 h-12 bg-white/8 rounded-full blur-sm"
        ></motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Transform Your Farming
              <span className="font-heading block bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                with TeaWedha!
              </span>
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-4xl mx-auto mb-8 leading-relaxed">
              AI-powered image and audio analysis for disease and termite
              detection in tea plantations without expert knowledge.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
          >
            {/* Download App Button */}
            <motion.a
              href="/teawedha"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-3 min-w-[250px] justify-center border-2 border-white/20"
            >
              <Smartphone className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              Download App
              <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
            </motion.a>
          </motion.div>

          {/* App Store Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-gray-800 transition-colors duration-300"
            >
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm">📱</span>
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-300">Download on the</p>
                <p className="text-lg font-semibold">App Store</p>
              </div>
            </motion.a>

            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-gray-800 transition-colors duration-300"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">▶</span>
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-300">Get it on</p>
                <p className="text-lg font-semibold">Google Play</p>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
