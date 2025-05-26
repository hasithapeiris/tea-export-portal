import { motion } from "framer-motion";
import { Mail, Linkedin, MapPin } from "lucide-react";
import { useState } from "react";
import TitleBadge from "./TitleBadge";

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted:", form);
    // Implement email submission logic or API call
  };

  return (
    <section id="contact" className="section-box bg-white my-16">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <TitleBadge name="Contact Us" />

        <p className="mb-10 text-gray-600">
          Have questions or want to get in touch? Fill out the form below or
          reach out on social media.
        </p>

        <form onSubmit={handleSubmit} className="grid gap-6">
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-3 w-full focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-3 w-full focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
          <textarea
            name="message"
            rows={4}
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-3 w-full focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:scale-105 transition-transform text-white font-semibold py-3 rounded-md shadow-md"
          >
            Send Message
          </button>
        </form>

        <div className="mt-12 flex flex-col md:flex-row justify-center items-center gap-6 text-gray-600">
          <div className="flex items-center gap-2">
            <Mail className="text-blue-500" />
            <a href="mailto:research@teaportal.org" className="hover:underline">
              theguard.research@gamil.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Linkedin className="text-blue-600" />
            <a
              href="https://linkedin.com/in/tearesearch"
              target="_blank"
              className="hover:underline"
            >
              LinkedIn
            </a>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="text-red-500" />
            <span>Sri Lanka Institute of Information Technology</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
