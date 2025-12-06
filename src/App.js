import React, { useState, useEffect, useRef } from "react";
import {
  Star,
  MapPin,
  ChevronRight,
  Calendar,
  Users,
  CheckCircle,
  Coffee,
  Shield,
  Phone,
  MessageCircle,
  ChefHat,
  Car,
  Accessibility,
  ArrowRight,
  X,
  Loader2,
  FileCheck,
  ShieldCheck,
  Send,
  Bot,
  Sparkles,
  ImageOff,
  LayoutDashboard,
  CreditCard,
  Search,
  Bell,
  MoreHorizontal,
  Mail,
  Clock,
  FileText,
  ArrowUpRight,
  DollarSign,
  Briefcase,
  Lock,
  Crown,
  Globe,
  Flame,
} from "lucide-react";

// ==========================================
// 1. MOCK DATABASE (DATA)
// ==========================================

const PACKAGES = [
  {
    id: "uk-essential",
    title: "The Essential UK Highlights",
    duration: "5 Days / 4 Nights",
    locations: ["London", "Stonehenge", "Bath"],
    priceRange: "₹79,999",
    image:
      "https://images.unsplash.com/photo-1483247466271-8d53e69111c1?auto=format&fit=crop&q=80&w=1000",
    tags: ["🔥 FEB SPECIAL", "Smart Luxury", "Selling Fast"],
    features: [
      "Premium 4-Star City Center Stays",
      "London to Bath by Scenic Rail",
      "Curated Indian Dinner Stops",
      "Hop-On Hop-Off London Pass",
      "Stonehenge & Roman Baths Tickets",
    ],
    isPromo: true,
  },
  {
    id: "uk-scotland-saver",
    title: "London & Scotland Smart Saver",
    duration: "8 Days / 7 Nights",
    locations: ["London", "Edinburgh", "Highlands"],
    priceRange: "₹99,999",
    image:
      "https://images.unsplash.com/photo-1530272658971-d8564030438a?auto=format&fit=crop&q=80&w=1000",
    tags: ["Best Value", "Train Journey", "Nature"],
    features: [
      "4-Star Hotels (London & Edinburgh)",
      "Scenic High-Speed Train to Scotland",
      "Loch Ness Small Group Tour",
      "Edinburgh Castle Fast-Track",
      "Indian Meals Arranged Daily",
    ],
  },
  {
    id: "uk-royal",
    title: "The London Royal Family Experience",
    duration: "7 Days / 6 Nights",
    locations: ["London", "Windsor", "Oxford"],
    priceRange: "₹1,45,000",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=1000",
    tags: ["Best Seller", "Seniors Friendly", "Shopping"],
    features: [
      "Stay at St. James Court (Taj) - 5 Star",
      "Private Luxury Van (10 Hrs/Day)",
      "Indian Dinner at Dishoom & Gymkhana",
      "End-to-End Visa Assistance",
      "Harry Potter Studio Fast-Track",
    ],
  },
  {
    id: "uk-scotland-royal",
    title: "The Royal UK & Scotland Grand Tour",
    duration: "10 Days / 9 Nights",
    locations: ["London", "Edinburgh", "Highlands"],
    priceRange: "₹2,15,000",
    image:
      "https://images.unsplash.com/photo-1515362534246-0b6ee4f80879?auto=format&fit=crop&q=80&w=1000",
    tags: ["Signature Collection", "5-Star Hotels", "Slow Pace"],
    features: [
      "Stays at The Savoy (London) & Waldorf (Scotland)",
      "First Class Royal Scotsman / LNER Train",
      "Private Butler & Chauffeur Service",
      "Michelin Star Indian Dining Experience",
      "Visa Denial Protection Included",
    ],
  },
];

const RECENT_LEADS = [
  {
    id: "L-101",
    name: "Rahul Sharma",
    package: "Essential UK Highlights",
    phone: "+91 98765 43210",
    status: "New",
    date: "2 mins ago",
    amount: "₹79,999",
    priority: "High",
  },
  {
    id: "L-102",
    name: "Priya Patel",
    package: "London & Scotland Saver",
    phone: "+91 99887 76655",
    status: "Contacted",
    date: "2 hours ago",
    amount: "₹99,999",
    priority: "Medium",
  },
  {
    id: "L-103",
    name: "Amit Verma",
    package: "Essential UK Highlights",
    phone: "+91 88776 65544",
    status: "Visa Processing",
    date: "1 day ago",
    amount: "₹79,999",
    priority: "High",
  },
  {
    id: "L-104",
    name: "Sandeep Singh",
    package: "Royal London Experience",
    phone: "+91 77665 54433",
    status: "Booked",
    date: "3 days ago",
    amount: "₹1,45,000",
    priority: "Low",
  },
];

// ==========================================
// 2. SHARED UTILITIES
// ==========================================

const ImageWithFallback = ({ src, alt, className }) => {
  const [error, setError] = useState(false);
  const fallbackSrc =
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1000";

  return (
    <div className={`relative overflow-hidden bg-slate-200 ${className}`}>
      {!error ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-opacity duration-500"
          onError={() => setError(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-slate-800 relative">
          <img
            src={fallbackSrc}
            alt="Fallback"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="relative z-10 text-white flex flex-col items-center">
            <ImageOff size={24} className="mb-2 opacity-50" />
            <span className="text-xs font-medium uppercase tracking-widest opacity-80">
              Wowyatra Signature
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

const generateGeminiResponse = async (prompt) => {
  const apiKey = ""; // Injected at runtime

  const systemInstruction = `
    You are Winston, the Digital Butler for 'Wowyatra Signature', the elite European travel division of Wowyatra.
    
    YOUR PERSONA:
    - Tone: Sophisticated, Warm, Professional.
    - Audience: High-net-worth Indian families looking for Feb/March deals.

    YOUR KNOWLEDGE BASE:
    1. SPECIAL OFFER: Promote the "Essential UK" package at ₹79,999 PP for February. It is the best value.
    2. Core Promise: Private Luxury Vans, Indian/Veg/Jain food.
    3. Packages:
       - "Essential UK Highlights": 5 Days, ₹79,999 PP (WINTER SALE).
       - "London & Scotland Smart Saver": 8 Days, ₹99,999 PP.
       - "London Royal Family Experience": 7 Days, ₹1,45,000 PP.
       - "Royal UK & Scotland Grand Tour": 10 Days, ₹2,15,000 PP.
    4. Pricing: Use "Per Person" (PP) rates.

    RULES:
    - Keep answers concise.
    - If they ask for "Cheap" or "Deal", push the ₹79,999 package immediately.
    - Encourage "Request Quote".
  `;

  if (!apiKey) {
    // Fallback Simulation
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const lowerPrompt = prompt.toLowerCase();
    if (lowerPrompt.includes("visa"))
      return "We offer complete peace of mind. Our team handles your entire European visa documentation, and we are the only agency to offer a refund on your booking fee if your visa is denied.";
    if (
      lowerPrompt.includes("food") ||
      lowerPrompt.includes("veg") ||
      lowerPrompt.includes("jain")
    )
      return "Absolutely. We specialize in curating culinary experiences for Indian palates, arranging pure vegetarian and Jain meals at top-rated venues.";
    if (
      lowerPrompt.includes("price") ||
      lowerPrompt.includes("offer") ||
      lowerPrompt.includes("deal")
    )
      return "Our special Winter Sale is live! Experience the best of London, Stonehenge and Bath for just ₹79,999 per person. This includes 4-star stays and private transfers. Shall I send you the details?";
    return "I would be delighted to assist you. Wowyatra Signature is currently offering exclusive rates for February travel starting at ₹79,999. Shall I connect you with our concierge for a detailed discussion?";
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          systemInstruction: { parts: [{ text: systemInstruction }] },
        }),
      }
    );
    const data = await response.json();
    return (
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I apologize, I am momentarily unable to access the main concierge frequency."
    );
  } catch (error) {
    return "I apologize, I am having trouble connecting to the network. Please feel free to WhatsApp our expert directly.";
  }
};

// ==========================================
// 3. CUSTOMER WEBSITE COMPONENTS
// ==========================================

const WebsiteHeader = () => (
  <nav className="bg-slate-950 text-white py-4 px-6 sticky top-0 z-50 border-b border-amber-600/20 shadow-2xl">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/20">
          <Crown size={20} className="text-slate-900 fill-slate-900" />
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-2xl font-serif tracking-wide leading-none text-slate-100">
            Signature
          </span>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
        <a
          href="#destinations"
          className="hover:text-amber-400 transition-colors"
        >
          Destinations
        </a>
        <a
          href="#experience"
          className="hover:text-amber-400 transition-colors"
        >
          The Signature Experience
        </a>
        <a href="#about" className="hover:text-amber-400 transition-colors">
          Why Us
        </a>
      </div>

      <button className="bg-gradient-to-r from-amber-500 to-amber-700 text-slate-950 px-6 py-2.5 rounded-full font-bold text-sm hover:shadow-lg hover:shadow-amber-500/20 transition-all flex items-center gap-2 transform hover:-translate-y-0.5 border border-amber-400/50">
        <MessageCircle size={16} />
        Concierge
      </button>
    </div>
  </nav>
);

const Hero = ({ onStart }) => (
  <div className="relative h-[650px] flex items-center justify-center overflow-hidden bg-slate-950">
    <div className="absolute inset-0 z-0 opacity-70">
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&q=80&w=2000"
        alt="Europe Luxury"
        className="w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-900/40"></div>
    </div>

    <div className="relative z-10 text-center max-w-4xl px-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="inline-flex items-center gap-2 bg-amber-500 text-slate-900 backdrop-blur border border-amber-400/50 rounded-full px-6 py-2 text-xs font-bold tracking-[0.2em] uppercase mb-8 shadow-xl animate-pulse">
        <Flame size={14} /> Royal Winter Sale Live
      </div>
      <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight drop-shadow-2xl">
        London Luxury. <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200">
          Now ₹79,999*
        </span>
      </h1>
      <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-light drop-shadow-md leading-relaxed">
        The Essential UK Highlights. 4-Star Stays. Private Transfers. <br />
        Limited seats for February 2026.
      </p>

      <button
        onClick={onStart}
        className="bg-white text-slate-950 px-10 py-4 rounded-full font-bold text-lg hover:bg-amber-50 transition-all shadow-[0_0_30px_rgba(245,158,11,0.4)] flex items-center gap-3 mx-auto hover:scale-105 border-2 border-transparent hover:border-amber-500"
      >
        View The ₹79k Deal <ArrowRight size={20} className="text-amber-600" />
      </button>
    </div>
  </div>
);

const TrustBadges = () => (
  <div className="bg-slate-950 py-16 border-b border-slate-900">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      {[
        { icon: ChefHat, text: "Curated Veg & Jain Dining" },
        { icon: Car, text: "Private Luxury Vehicles" },
        { icon: ShieldCheck, text: "Visa Denial Protection" },
        { icon: FileCheck, text: "100% Visa Support" },
      ].map((item, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center gap-4 text-slate-400 group hover:text-amber-400 transition-colors"
        >
          <div className="p-4 rounded-full bg-slate-900 border border-slate-800 group-hover:border-amber-500/50 transition-colors">
            <item.icon
              size={32}
              className="text-amber-600 group-hover:text-amber-400 transition-colors"
            />
          </div>
          <span className="font-medium text-sm tracking-wide uppercase">
            {item.text}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const PackageCard = ({ pkg, onQuote }) => (
  <div
    className={`bg-white rounded-2xl overflow-hidden shadow-xl border ${
      pkg.isPromo
        ? "border-amber-400 ring-2 ring-amber-400/20"
        : "border-slate-100"
    } group hover:shadow-2xl hover:shadow-amber-900/10 transition-all duration-500 flex flex-col h-full hover:-translate-y-2`}
  >
    <div className="relative h-72 overflow-hidden shrink-0">
      <ImageWithFallback
        src={pkg.image}
        alt={pkg.title}
        className="w-full h-full group-hover:scale-110 transition-transform duration-1000"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-60"></div>
      <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
        {pkg.tags.map((tag) => (
          <span
            key={tag}
            className={`${
              tag.includes("FEB")
                ? "bg-red-600 text-white animate-pulse"
                : "bg-amber-500 text-slate-900"
            } text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-lg`}
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="absolute bottom-4 left-4 text-white">
        <p className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-1">
          {pkg.duration}
        </p>
        <h3 className="text-xl font-serif leading-tight">{pkg.title}</h3>
      </div>
    </div>

    <div className="p-8 flex flex-col flex-grow">
      <div className="space-y-4 mb-8 flex-grow">
        {pkg.features.map((feat, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 text-slate-600 text-sm"
          >
            <CheckCircle size={16} className="text-amber-600 mt-0.5 shrink-0" />
            <span>{feat}</span>
          </div>
        ))}
      </div>

      <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-auto">
        <div>
          <p className="text-slate-400 text-[10px] uppercase tracking-wide font-bold">
            Price Per Person
          </p>
          <div className="flex items-baseline gap-1">
            <p
              className={`font-serif font-bold text-xl ${
                pkg.isPromo ? "text-red-600" : "text-slate-900"
              }`}
            >
              {pkg.priceRange}
            </p>
            <span className="text-slate-500 text-sm font-sans font-normal">
              pp*
            </span>
          </div>
          <p className="text-slate-400 text-[9px] mt-1 font-medium">
            * Off-season base rate
          </p>
        </div>
        <button
          onClick={onQuote}
          className={`px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg ${
            pkg.isPromo
              ? "bg-red-600 text-white hover:bg-red-700 shadow-red-500/30"
              : "bg-slate-900 text-white hover:bg-amber-500 hover:text-slate-900 hover:shadow-amber-500/30"
          }`}
        >
          Request Quote
        </button>
      </div>
    </div>
  </div>
);

const AIPlanner = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    seniors: false,
    kids: false,
    food: "Any",
    pace: "Relaxed",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleNext = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (step < 3) setStep(step + 1);
      else onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
      <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="bg-slate-900 p-6 flex justify-between items-center text-white border-b border-amber-500/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500 rounded-lg text-slate-900">
              <Crown size={20} fill="currentColor" />
            </div>
            <div>
              <h3 className="font-serif text-xl">Signature Butler</h3>
              <p className="text-xs text-slate-400">
                Designing your bespoke itinerary
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="p-8">
          {isProcessing ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Loader2 size={48} className="text-amber-500 animate-spin mb-4" />
              <h4 className="text-xl font-bold text-slate-800">
                Consulting our partners...
              </h4>
              <p className="text-slate-500 mt-2">
                Checking availability for Luxury Vans and Private Guides.
              </p>
            </div>
          ) : (
            <>
              {step === 1 && (
                <div className="space-y-6">
                  <h4 className="text-2xl font-serif text-slate-900">
                    Who is travelling?
                  </h4>
                  <p className="text-slate-500">
                    We customize the logistics based on your group comfort.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() =>
                        setPreferences({
                          ...preferences,
                          seniors: !preferences.seniors,
                        })
                      }
                      className={`p-4 border-2 rounded-xl flex items-center gap-4 transition-all ${
                        preferences.seniors
                          ? "border-amber-500 bg-amber-50"
                          : "border-slate-100 hover:border-slate-300"
                      }`}
                    >
                      <Accessibility
                        className={
                          preferences.seniors
                            ? "text-amber-600"
                            : "text-slate-400"
                        }
                      />
                      <div className="text-left">
                        <span className="block font-bold text-slate-900">
                          Senior Citizens
                        </span>
                        <span className="text-xs text-slate-500">
                          We'll ensure elevators & minimal walking.
                        </span>
                      </div>
                    </button>

                    <button
                      onClick={() =>
                        setPreferences({
                          ...preferences,
                          kids: !preferences.kids,
                        })
                      }
                      className={`p-4 border-2 rounded-xl flex items-center gap-4 transition-all ${
                        preferences.kids
                          ? "border-amber-500 bg-amber-50"
                          : "border-slate-100 hover:border-slate-300"
                      }`}
                    >
                      <Users
                        className={
                          preferences.kids ? "text-amber-600" : "text-slate-400"
                        }
                      />
                      <div className="text-left">
                        <span className="block font-bold text-slate-900">
                          Children
                        </span>
                        <span className="text-xs text-slate-500">
                          We'll add fun stops & kid-friendly food.
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h4 className="text-2xl font-serif text-slate-900">
                    Dietary Preferences?
                  </h4>
                  <p className="text-slate-500">
                    Finding specific food in Europe is our specialty.
                  </p>

                  <div className="grid grid-cols-3 gap-3">
                    {["No Restrictions", "Vegetarian", "Jain / Strict Veg"].map(
                      (opt) => (
                        <button
                          key={opt}
                          onClick={() =>
                            setPreferences({ ...preferences, food: opt })
                          }
                          className={`py-4 px-2 border-2 rounded-xl font-medium transition-all ${
                            preferences.food === opt
                              ? "border-amber-500 bg-amber-50 text-amber-800"
                              : "border-slate-100 text-slate-600"
                          }`}
                        >
                          {opt}
                        </button>
                      )
                    )}
                  </div>

                  <div className="mt-8">
                    <h4 className="text-xl font-serif text-slate-900 mb-4">
                      Preferred Pace?
                    </h4>
                    <div className="flex gap-4">
                      <button
                        onClick={() =>
                          setPreferences({ ...preferences, pace: "Active" })
                        }
                        className={`flex-1 py-3 border-2 rounded-lg ${
                          preferences.pace === "Active"
                            ? "border-amber-500 bg-amber-50"
                            : "border-slate-100"
                        }`}
                      >
                        See Everything (Active)
                      </button>
                      <button
                        onClick={() =>
                          setPreferences({ ...preferences, pace: "Relaxed" })
                        }
                        className={`flex-1 py-3 border-2 rounded-lg ${
                          preferences.pace === "Relaxed"
                            ? "border-amber-500 bg-amber-50"
                            : "border-slate-100"
                        }`}
                      >
                        Relaxed & Leisurely
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                    <CheckCircle size={32} />
                  </div>
                  <h4 className="text-2xl font-serif text-slate-900">
                    We found 2 Signature Matches!
                  </h4>
                  <p className="text-slate-500">
                    Based on your requirement for{" "}
                    <strong>{preferences.food}</strong> food and a{" "}
                    <strong>{preferences.pace}</strong> pace.
                  </p>

                  <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 text-left">
                    <h5 className="font-bold text-amber-900 mb-2">
                      Butler's Insight:
                    </h5>
                    <p className="text-sm text-amber-800">
                      "Since you are travelling with seniors, we have filtered
                      out hotels in London that have stairs at the entrance. We
                      have also prioritized private transfers to avoid the
                      London Underground crowds."
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-10 flex justify-end">
                {step < 3 ? (
                  <button
                    onClick={handleNext}
                    className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold hover:bg-slate-800 transition-colors flex items-center gap-2"
                  >
                    Next Step <ChevronRight size={18} />
                  </button>
                ) : (
                  <button
                    onClick={onClose}
                    className="bg-amber-500 text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-amber-400 transition-colors"
                  >
                    View My Collection
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const LeadModal = ({ isOpen, onClose, packageName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden animate-in slide-in-from-bottom-8">
        <div className="p-6 border-b border-slate-100 bg-amber-50">
          <h3 className="font-serif text-2xl text-slate-900">
            Get Your Custom Quote
          </h3>
          <p className="text-slate-600 text-sm mt-1">
            For: <span className="font-bold">{packageName}</span>
          </p>
        </div>

        <div className="p-8 space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">
              Your Name
            </label>
            <div className="flex items-center border border-slate-300 rounded-lg px-3 py-3 bg-slate-50">
              <Users size={18} className="text-slate-400 mr-2" />
              <input
                type="text"
                placeholder="e.g. Rahul Sharma"
                className="bg-transparent w-full outline-none text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">
              WhatsApp Number
            </label>
            <div className="flex items-center border border-slate-300 rounded-lg px-3 py-3 bg-slate-50">
              <Phone size={18} className="text-slate-400 mr-2" />
              <input
                type="tel"
                placeholder="+91 98765 43210"
                className="bg-transparent w-full outline-none text-slate-900"
              />
            </div>
            <p className="text-xs text-slate-400 mt-1">
              We will send the detailed PDF itinerary here.
            </p>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">
              Tentative Travel Date
            </label>
            <div className="flex items-center border border-slate-300 rounded-lg px-3 py-3 bg-slate-50">
              <Calendar size={18} className="text-slate-400 mr-2" />
              <input
                type="date"
                className="bg-transparent w-full outline-none text-slate-900"
              />
            </div>
          </div>

          <button className="w-full bg-amber-500 text-slate-900 font-bold py-4 rounded-xl text-lg hover:bg-amber-400 transition-colors mt-4 shadow-lg shadow-amber-200">
            Send Me The Itinerary
          </button>

          <button
            onClick={onClose}
            className="w-full text-slate-400 text-sm hover:text-slate-600 py-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const AIConcierge = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "1",
      role: "assistant",
      text: "Welcome to Wowyatra Signature. I am Winston. Ask me about our exclusive ₹79,999 Winter Special!",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input;
    setInput("");
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: "user", text: userText },
    ]);
    setIsTyping(true);

    try {
      const response = await generateGeminiResponse(userText);
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", text: response },
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          text: "I'm having trouble connecting. Please try again or WhatsApp us.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-amber-100 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          {/* Header */}
          <div className="bg-slate-900 p-4 flex justify-between items-center text-white border-b border-amber-500/20">
            <div className="flex items-center gap-3">
              <div className="bg-amber-500 p-1.5 rounded-full text-slate-900">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm">
                  Winston (Butler)
                </h3>
                <p className="text-[10px] text-amber-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>{" "}
                  Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 bg-slate-50 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === "user"
                      ? "bg-amber-500 text-slate-900 rounded-br-none"
                      : "bg-white text-slate-800 border border-slate-200 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-bl-none flex gap-1 shadow-sm">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about visas, food..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-slate-900"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="bg-slate-900 text-white p-2.5 rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isOpen
            ? "bg-slate-900 border-2 border-amber-500"
            : "bg-gradient-to-r from-amber-500 to-amber-600"
        } text-white w-14 h-14 rounded-full shadow-2xl shadow-amber-900/30 flex items-center justify-center hover:scale-110 transition-all duration-300 relative group`}
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <Sparkles
            size={24}
            className={isOpen ? "text-amber-500" : "text-slate-900"}
          />
        )}
        {!isOpen && (
          <span className="absolute right-0 top-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
        )}
      </button>
    </div>
  );
};

// ==========================================
// 4. ADMIN / CRM COMPONENTS
// ==========================================

const AdminSidebar = ({ activeTab, setActiveTab, onLogout }) => (
  <div className="w-64 bg-slate-900 text-slate-300 min-h-screen flex flex-col hidden md:flex border-r border-slate-800">
    <div className="p-6 border-b border-slate-800 flex items-center gap-3">
      <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-slate-900 font-bold font-serif">
        W
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-white tracking-wide leading-none">
          Wowyatra
        </span>
        <span className="text-amber-500 text-[10px] uppercase font-bold">
          Admin Panel
        </span>
      </div>
    </div>
    <nav className="flex-1 p-4 space-y-2">
      {["Dashboard", "Leads", "Bookings", "Visa Status"].map((item) => (
        <button
          key={item}
          onClick={() => setActiveTab(item)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            activeTab === item
              ? "bg-amber-500 text-slate-900 font-bold"
              : "hover:bg-slate-800 hover:text-white"
          }`}
        >
          {item === "Dashboard" && <LayoutDashboard size={20} />}
          {item === "Leads" && <Users size={20} />}
          {item === "Bookings" && <CheckCircle size={20} />}
          {item === "Visa Status" && <FileText size={20} />}
          {item}
        </button>
      ))}
    </nav>
    <div className="p-4">
      <button
        onClick={onLogout}
        className="w-full py-2 text-red-400 hover:text-red-300 text-sm"
      >
        Logout
      </button>
    </div>
  </div>
);

const StatCard = ({ title, value, change, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-opacity-100`}>
        <Icon size={24} className={color.replace("bg-", "text-")} />
      </div>
      <span className="text-green-500 text-xs font-bold flex items-center bg-green-50 px-2 py-1 rounded-full">
        <ArrowUpRight size={12} className="mr-1" /> {change}
      </span>
    </div>
    <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
  </div>
);

// ==========================================
// 5. MAIN APP CONTROLLER
// ==========================================

const AdminLogin = ({ onLogin, onCancel }) => {
  const [pass, setPass] = useState("");
  return (
    <div className="fixed inset-0 bg-slate-950 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl w-full max-w-sm animate-in zoom-in-95 border border-amber-500/20">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center text-slate-900 font-bold font-serif text-2xl">
            W
          </div>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">
          Admin Access
        </h2>
        <p className="text-center text-slate-500 text-sm mb-6">
          Restricted to Wowyatra Signature Staff
        </p>
        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Enter Access Code"
          className="w-full border p-3 rounded-lg mb-4 text-center tracking-widest"
        />
        <button
          onClick={() =>
            pass === "admin123" ? onLogin() : alert("Wrong Code")
          }
          className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold mb-4 hover:bg-slate-800 transition-colors"
        >
          Login
        </button>
        <button
          onClick={onCancel}
          className="w-full text-slate-400 text-sm hover:text-slate-600"
        >
          Back to Website
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState("website"); // 'website', 'login', 'admin'
  const [showPlanner, setShowPlanner] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [adminTab, setAdminTab] = useState("Dashboard");

  const handleQuote = (pkgName) => {
    setSelectedPackage(pkgName);
    setShowLeadForm(true);
  };

  // --- RENDER ADMIN CRM ---
  if (view === "admin") {
    return (
      <div className="min-h-screen bg-slate-50 flex font-sans">
        <AdminSidebar
          activeTab={adminTab}
          setActiveTab={setAdminTab}
          onLogout={() => setView("website")}
        />
        <main className="flex-1 p-8 overflow-y-auto h-screen">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900">
              Signature Dashboard
            </h1>
            <div className="flex gap-2">
              <Bell className="text-slate-400" />
              <div className="w-8 h-8 bg-amber-500 rounded-full text-slate-900 flex items-center justify-center font-bold">
                A
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Revenue"
              value="₹45,20,000"
              change="+12%"
              icon={DollarSign}
              color="bg-green-500"
            />
            <StatCard
              title="Active Leads"
              value="24"
              change="+4"
              icon={Users}
              color="bg-blue-500"
            />
            <StatCard
              title="Visa In-Process"
              value="8"
              change="Critical"
              icon={FileText}
              color="bg-purple-500"
            />
            <StatCard
              title="Pending"
              value="₹3.5L"
              change="Due"
              icon={CreditCard}
              color="bg-amber-500"
            />
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100 font-bold flex justify-between">
              <span>Recent Leads</span>
              <button className="text-xs bg-slate-900 text-white px-3 py-1 rounded">
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase">
                  <tr>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Package</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {RECENT_LEADS.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-bold">
                        {lead.name}
                        <div className="text-xs text-slate-400 font-normal">
                          {lead.date}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {lead.package}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-bold ${
                            lead.status === "New"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-blue-600 hover:underline">
                          Contact
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // --- RENDER LOGIN ---
  if (view === "login")
    return (
      <AdminLogin
        onLogin={() => setView("admin")}
        onCancel={() => setView("website")}
      />
    );

  // --- RENDER WEBSITE (DEFAULT) ---
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 relative">
      <WebsiteHeader />
      <Hero onStart={() => setShowPlanner(true)} />

      {/* Packages Section */}
      <section id="destinations" className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-amber-600 font-bold tracking-widest uppercase text-xs">
            The Collection
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mt-2">
            Signature Journeys
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {PACKAGES.map((pkg) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              onQuote={() => handleQuote(pkg.title)}
            />
          ))}
        </div>
      </section>

      {/* Value Prop Section */}
      <section
        className="bg-slate-950 py-24 relative overflow-hidden"
        id="about"
      >
        <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1560624052-449f5ddf0c31?auto=format&fit=crop&q=80&w=800"
              alt="Luxury Van"
              className="rounded-2xl shadow-2xl border-4 border-slate-800 transform -rotate-2 w-full h-80 opacity-90"
            />
          </div>
          <div className="flex-1 text-white">
            <h2 className="text-4xl font-serif mb-6">The Signature Standard</h2>
            <p className="text-slate-400 mb-8">
              As the exclusive luxury division of{" "}
              <strong className="text-slate-200">Wowyatra</strong>, we combine
              trusted travel expertise with high-end concierge services. We
              don't just book trips; we engineer experiences that respect your
              comfort, your palate, and your time.
            </p>
            <TrustBadges />
          </div>
        </div>
      </section>

      {/* Footer & Secret Admin Link */}
      <footer className="bg-slate-900 text-slate-500 py-12 text-center text-sm border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 mb-6">
          <div className="flex flex-col items-center gap-2 mb-4">
            <Crown size={24} className="text-amber-600 mb-2" />
            <p className="font-serif text-lg text-slate-300 tracking-wide">
              Wowyatra Signature
            </p>
            <p className="text-xs uppercase tracking-widest text-amber-700">
              Luxury Division
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 text-slate-400 text-xs my-6">
            <p>www.wowyatrasignature.com</p>
            <p className="hidden md:block text-slate-700">•</p>
            <p>www.wowyatrasignature.in</p>
            <p className="hidden md:block text-slate-700">•</p>
            <a
              href="mailto:reservations@wowyatrasignature.com"
              className="hover:text-amber-500 transition-colors"
            >
              reservations@wowyatrasignature.com
            </a>
          </div>

          <p className="text-slate-600">&copy; 2026 All Rights Reserved.</p>
        </div>

        <button
          onClick={() => setView("login")}
          className="mt-6 text-slate-800 hover:text-slate-600 text-[10px] flex items-center justify-center mx-auto gap-1 uppercase tracking-widest transition-colors"
        >
          <Lock size={10} /> Staff Access
        </button>
      </footer>

      {showPlanner && <AIPlanner onClose={() => setShowPlanner(false)} />}
      <LeadModal
        isOpen={showLeadForm}
        onClose={() => setShowLeadForm(false)}
        packageName={selectedPackage}
      />
      <AIConcierge />
    </div>
  );
}
