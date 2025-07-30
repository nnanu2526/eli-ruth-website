'use client';

import { Mail, Phone, Linkedin, Twitter } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white text-blue-900">
      <header className="p-6 flex items-center justify-between bg-white shadow">
        <img src="/eliRuth_logo2.jpg" alt="Eli Ruth Logo" className="h-14" />
        <nav className="space-x-6 font-semibold text-blue-800">
          <a href="#about">About Us</a>
          <a href="#products">Products</a>
          <a href="#contact">Contact</a>
          <a href="#careers">Careers</a>
          <a href="#faq">FAQ</a>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold text-ocean mb-6">
          Empowering Innovation Through Intelligent AI
        </h1>
        <p className="text-xl mb-10 text-blue-700">
          ELI RUTH creates intelligent AI solutions that help B2B and B2C businesses grow through advanced robotics, data systems, and consumer apps.
        </p>
        <div className="space-x-4">
          <a href="#contact" className="bg-blue-600 text-white px-6 py-3 rounded-xl">Try It Free</a>
          <a href="#contact" className="bg-white border border-blue-600 text-blue-700 px-6 py-3 rounded-xl">Contact Us</a>
        </div>
      </main>

      <section id="products" className="py-20 bg-sky-50">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">AI-Driven Data Systems</h3>
            <p>Custom-built platforms to organize, analyze, and activate data across operations.</p>
          </div>
          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">Advanced Robotics</h3>
            <p>Smart automation tools for physical tasks and intelligent workflow management.</p>
          </div>
          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">Consumer-Facing Apps</h3>
            <p>AI-powered mobile & web apps that enhance user experience and loyalty.</p>
          </div>
        </div>
      </section>

      <section id="about" className="py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 text-blue-900">Our Mission</h2>
          <p className="mb-8 text-blue-800">
            To deliver intelligent AI solutions that empower businesses and consumers to connect, grow, and innovate.
          </p>
          <h2 className="text-3xl font-bold mb-4 text-blue-900">Our Vision</h2>
          <p className="text-blue-800">
            To lead a global quantum leap in innovation by shaping the future of AI-powered business with human-centered technology.
          </p>
        </div>
      </section>

      <section id="highlights" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 text-blue-900">Why Choose ELI RUTH?</h2>
          <ul className="space-y-4 text-blue-800 text-lg">
            <li>🌐 Human-centered AI systems built for real-world impact</li>
            <li>🚀 Scalable architecture for small to mid-sized enterprises</li>
            <li>🔐 Data-secure, cloud-native infrastructure</li>
            <li>🤝 Deep understanding of both consumer and enterprise needs</li>
          </ul>
        </div>
      </section>

      <section id="contact" className="py-20 bg-sky-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 text-blue-900">Get in Touch</h2>
          <p className="text-blue-700 mb-4">We'd love to hear from you. Reach out with questions, feedback, or demo requests.</p>
          <div className="space-y-2 text-blue-800">
            <p className="flex justify-center items-center gap-2"><Mail className="w-5 h-5" /> Eli-Ruth@gmail.com</p>
            <p className="flex justify-center items-center gap-2"><Phone className="w-5 h-5" /> 205-732-9654</p>
            <div className="flex justify-center gap-6 mt-4">
              <a href="#"><Linkedin className="w-6 h-6" /></a>
              <a href="#"><Twitter className="w-6 h-6" /></a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white text-center text-blue-700 py-6 border-t mt-10">
        <p>&copy; 2025 ELI RUTH, LLC. Powered by The Weaver Concept, LLC.</p>
      </footer>
    </div>
  );
}
