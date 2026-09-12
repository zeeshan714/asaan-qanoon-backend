"use client";

import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "No response received." },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error connecting to AI service." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async (text: string) => {
    try {
      const res = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text }),
      });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "legal-summary.pdf";
      a.click();
    } catch (err) {
      alert("Failed to download PDF.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a111e] text-slate-100 font-sans flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      {/* Header & Navbar */}
      <header className="sticky top-0 z-50 bg-[#0a111e]/90 backdrop-blur border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <img src="/logo.png" alt="Asaan Qanoon AI logo" className="h-10 w-auto object-contain" />
            <span className="text-xl font-bold text-white tracking-tight">
              آسان قانون <span className="text-emerald-400">AI</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#about" className="hover:text-emerald-400 transition-colors">About</a>
            <a href="#services" className="hover:text-emerald-400 transition-colors">Legal Services</a>
            <a href="#how" className="hover:text-emerald-400 transition-colors">How it works</a>
            <a href="#impact" className="hover:text-emerald-400 transition-colors">Features</a>
            <a href="#chatbot" className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-full font-semibold transition-all shadow-md shadow-emerald-900/30">
              Ask AI Now →
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-300 focus:outline-none text-2xl"
          >
            ☰
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0f172a] border-b border-slate-800 px-6 py-4 flex flex-col gap-4 text-sm font-medium text-slate-200">
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)}>Legal Services</a>
            <a href="#how" onClick={() => setMobileMenuOpen(false)}>How it works</a>
            <a href="#impact" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="#chatbot" onClick={() => setMobileMenuOpen(false)} className="text-emerald-400">Ask AI Now →</a>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-24 flex-1 w-full">
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-2 bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 text-xs px-3.5 py-1.5 rounded-full font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              AI-Powered Legal & Civic Consultation Platform
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
              Helping people find the <span className="text-emerald-400">right legal support</span> when they need it most.
            </h1>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl">
              Asaan Qanoon AI simplifies complex legal frameworks, constitutional rights, civic registration processes, and official documentation for everyone in Pakistan.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a href="#chatbot" className="bg-emerald-600 hover:bg-emerald-500 text-white px-7 py-3.5 rounded-lg font-semibold transition-all shadow-lg shadow-emerald-950 flex items-center gap-2">
                Get Legal Guidance <span>→</span>
              </a>
              <a href="#how" className="bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 px-7 py-3.5 rounded-lg font-semibold transition-all">
                See How It Works
              </a>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium text-slate-400 pt-6 border-t border-slate-800">
              <span>Source-verified Laws</span>
              <span>•</span>
              <span>English · Roman Urdu · Urdu</span>
              <span>•</span>
              <span>Built for Pakistan</span>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-[#0a111e] p-2 rounded-2xl border border-slate-800 shadow-2xl relative">
            <div className="bg-white text-slate-900 p-8 rounded-xl space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
                <div>
                  <h3 className="font-bold text-lg text-slate-900">آسان قانون AI Portal</h3>
                  <p className="text-xs text-slate-500">Legal Intelligence & Civic Help</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Instant legal consultation grounded in official Pakistani acts, PPC sections, NADRA procedures, and family/property law guidance.
              </p>
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-emerald-900 text-xs font-medium space-y-1">
                <div className="font-bold text-emerald-800">✓ Accurate & Fast Legal Assistance</div>
                <div>Real-time case logging with downloadable PDF legal notes.</div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Bar / Steps */}
        <section id="impact" className="bg-slate-900/90 rounded-2xl p-8 border border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-center shadow-lg">
          <div className="space-y-1">
            <strong className="text-emerald-400 text-2xl font-bold block">01</strong>
            <span className="text-sm font-bold text-white block">Query</span>
            <small className="text-xs text-slate-400">Ask legal or civic questions</small>
          </div>
          <div className="space-y-1">
            <strong className="text-emerald-400 text-2xl font-bold block">02</strong>
            <span className="text-sm font-bold text-white block">Understand</span>
            <small className="text-xs text-slate-400">See laws & legal clauses</small>
          </div>
          <div className="space-y-1">
            <strong className="text-emerald-400 text-2xl font-bold block">03</strong>
            <span className="text-sm font-bold text-white block">Log Context</span>
            <small className="text-xs text-slate-400">Saved securely in Supabase</small>
          </div>
          <div className="space-y-1">
            <strong className="text-emerald-400 text-2xl font-bold block">04</strong>
            <span className="text-sm font-bold text-white block">Export PDF</span>
            <small className="text-xs text-slate-400">Download official PDF summary</small>
          </div>
        </section>

        {/* Services / What We Cover */}
        <section id="services" className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">LEGAL & CIVIC COVERAGE</span>
            <h2 className="text-3xl font-extrabold text-white">Comprehensive legal support at your fingertips.</h2>
            <p className="text-sm text-slate-400">Select a category and get simplified legal guidance instantly.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <article className="bg-white text-slate-900 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between border-t-4 border-emerald-500">
              <div>
                <span className="text-emerald-600 text-xs font-extrabold tracking-wider">01</span>
                <h3 className="text-lg font-bold text-slate-900 mt-2">Family & Property Law</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Guidance on inheritance, marriage contracts, property transfer, and legal documentation.
                </p>
              </div>
              <a href="#chatbot" className="text-xs font-bold text-emerald-700 mt-6 hover:underline flex items-center gap-1">
                Consult AI →
              </a>
            </article>

            <article className="bg-white text-slate-900 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between border-t-4 border-emerald-500">
              <div>
                <span className="text-emerald-600 text-xs font-extrabold tracking-wider">02</span>
                <h3 className="text-lg font-bold text-slate-900 mt-2">Civic & NADRA Rules</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Understand procedures for CNIC, FRC, passport requirements, and government documentation.
                </p>
              </div>
              <a href="#chatbot" className="text-xs font-bold text-emerald-700 mt-6 hover:underline flex items-center gap-1">
                Explore Support →
              </a>
            </article>

            <article className="bg-white text-slate-900 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between border-t-4 border-emerald-500">
              <div>
                <span className="text-emerald-600 text-xs font-extrabold tracking-wider">03</span>
                <h3 className="text-lg font-bold text-slate-900 mt-2">Case Context Log</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Automatic session history logging and memory integration via Supabase backend database.
                </p>
              </div>
              <a href="#chatbot" className="text-xs font-bold text-emerald-700 mt-6 hover:underline flex items-center gap-1">
                View Feature →
              </a>
            </article>

            <article className="bg-white text-slate-900 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between border-t-4 border-emerald-500">
              <div>
                <span className="text-emerald-600 text-xs font-extrabold tracking-wider">04</span>
                <h3 className="text-lg font-bold text-slate-900 mt-2">PDF Export Tool</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Convert legal answers into neat, downloadable PDF documents for offline reference.
                </p>
              </div>
              <a href="#chatbot" className="text-xs font-bold text-emerald-700 mt-6 hover:underline flex items-center gap-1">
                Export PDF →
              </a>
            </article>
          </div>
        </section>

        {/* How It Works */}
        <section id="how" className="bg-slate-900/80 p-8 rounded-2xl border border-slate-800 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">HOW IT WORKS</span>
            <h2 className="text-3xl font-extrabold text-white">A clearer journey from legal doubt to action.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-[#0a111e] p-5 rounded-xl border border-slate-800">
              <span className="text-emerald-400 font-bold text-lg block mb-2">01</span>
              <h4 className="font-bold text-white text-sm">Ask your Legal Question</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">Type your issue in Urdu, Roman Urdu, or English.</p>
            </div>
            <div className="bg-[#0a111e] p-5 rounded-xl border border-emerald-500/50">
              <span className="text-emerald-400 font-bold text-lg block mb-2">02</span>
              <h4 className="font-bold text-white text-sm">Gemini AI Legal Engine</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">Retrieves legal clauses and structures a clear guide.</p>
            </div>
            <div className="bg-[#0a111e] p-5 rounded-xl border border-slate-800">
              <span className="text-emerald-400 font-bold text-lg block mb-2">03</span>
              <h4 className="font-bold text-white text-sm">Review Laws & Steps</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">Check official procedures and your constitutional rights.</p>
            </div>
            <div className="bg-[#0a111e] p-5 rounded-xl border border-slate-800">
              <span className="text-emerald-400 font-bold text-lg block mb-2">04</span>
              <h4 className="font-bold text-white text-sm">Download PDF</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">Export advice as a formatted PDF for legal reference.</p>
            </div>
          </div>
        </section>

        {/* Live Interactive Chatbot Section */}
        <section id="chatbot" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              ⚖️ آسان قانون AI Assistant
            </h2>
            <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-800 px-3 py-1 rounded-full font-semibold">
              Live Connected
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col h-[520px] shadow-2xl">
            <div className="flex-1 overflow-y-auto space-y-4 p-2">
              {messages.length === 0 && (
                <div className="text-center text-slate-400 pt-28">
                  <p className="text-lg font-bold text-slate-700">How can Asaan Qanoon AI assist you today?</p>
                  <p className="text-xs text-slate-500 mt-1">Ask any legal question, NADRA procedure, or property rule in Pakistan...</p>
                </div>
              )}
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    msg.role === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`p-3.5 rounded-2xl max-w-[80%] text-sm ${
                      msg.role === "user"
                        ? "bg-emerald-600 text-white font-medium"
                        : "bg-slate-100 text-slate-800 border border-slate-200"
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.role === "assistant" && (
                    <button
                      onClick={() => handleDownloadPDF(msg.content)}
                      className="text-xs text-emerald-700 font-bold mt-1.5 hover:underline flex items-center gap-1"
                    >
                      📥 Download Legal PDF Summary
                    </button>
                  )}
                </div>
              ))}
              {loading && (
                <p className="text-xs text-slate-500 animate-pulse font-medium">
                  Asaan Qanoon AI is analyzing legal framework...
                </p>
              )}
            </div>

            {/* Input Bar */}
            <div className="flex gap-3 mt-4 pt-4 border-t border-slate-100">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask about legal rights, court procedures, NADRA rules..."
                className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 text-slate-900 placeholder-slate-400"
              />
              <button
                onClick={handleSendMessage}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-7 py-3 rounded-lg text-sm font-bold transition-all shadow-md shadow-emerald-900/20"
              >
                Send
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-20 bg-[#0a111e] py-10 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Asaan Qanoon AI" className="h-8 w-auto object-contain" />
            <span className="font-bold text-white text-sm">آسان قانون AI</span>
            <span>— AI-powered legal & civic support navigation for Pakistan.</span>
          </div>
          <div className="flex gap-6 font-medium text-slate-300">
            <a href="#about" className="hover:text-emerald-400">About</a>
            <a href="#services" className="hover:text-emerald-400">Services</a>
            <a href="#how" className="hover:text-emerald-400">How it works</a>
            <a href="#impact" className="hover:text-emerald-400">Features</a>
          </div>
          <div>© 2026 Asaan Qanoon AI. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}