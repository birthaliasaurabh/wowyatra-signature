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

const WebsiteHeader = ({ onConciergeClick }) => (
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

      <button
        onClick={onConciergeClick}
        className="bg-gradient-to-r from-amber-500 to-amber-700 text-slate-950 px-6 py-2.5 rounded-full font-bold text-sm hover:shadow-lg hover:shadow-amber-500/20 transition-all flex items-center gap-2 transform hover:-translate-y-0.5 border border-amber-400/50"
      >
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
        className="bg-white text-slate-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-amber-50 transition-all shadow-[0_0_30px_rgba(245,158,11,0.4)] flex items-center gap-3 mx-auto hover:scale-105 border-2 border-transparent hover:border-amber-500"
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

// ==========================================
// 4. FIXED AI PLANNER
// ==========================================

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
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
        {/* Header */}
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

        {/* Content */}
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
              {/* STEP 1 */}
              {step === 1 && (
                <div className="space-y-6 animate-in slide-in-from-right-8 duration-300">
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

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={handleNext}
                      className="bg-slate-900 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-amber-600 transition-colors"
                    >
                      Next Step <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="space-y-6 animate-in slide-in-from-right-8 duration-300">
                  <h4 className="text-2xl font-serif text-slate-900">
                    Dining Preferences
                  </h4>
                  <p className="text-slate-500">
                    Our specialty is home-style food abroad.
                  </p>

                  <div className="space-y-3">
                    {[
                      "Pure Veg",
                      "Jain Meals",
                      "Non-Veg / Mix",
                      "Local Cuisine",
                    ].map((opt) => (
                      <button
                        key={opt}
                        onClick={() =>
                          setPreferences({ ...preferences, food: opt })
                        }
                        className={`w-full p-4 border rounded-lg text-left font-medium transition-all flex justify-between ${
                          preferences.food === opt
                            ? "border-amber-500 bg-amber-50 text-slate-900"
                            : "text-slate-500 hover:bg-slate-50"
                        }`}
                      >
                        {opt}
                        {preferences.food === opt && (
                          <CheckCircle size={20} className="text-amber-600" />
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={handleNext}
                      className="bg-slate-900 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-amber-600 transition-colors"
                    >
                      Finalize <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3 - SUCCESS */}
              {step === 3 && (
                <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 mb-4">
                    <CheckCircle size={32} />
                  </div>
                  <h4 className="text-2xl font-serif text-slate-900">
                    Itinerary Generated!
                  </h4>
                  <p className="text-slate-500">
                    We have curated a plan including{" "}
                    {preferences.seniors
                      ? "senior-friendly hotels"
                      : "luxury stays"}{" "}
                    and {preferences.food} options.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-4 bg-amber-500 text-slate-900 px-8 py-3 rounded-lg font-bold hover:bg-amber-400"
                  >
                    View My Plan
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 5. MAIN APP COMPONENT
// ==========================================

const App = () => {
  const [showPlanner, setShowPlanner] = useState(false);

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900">
      <WebsiteHeader onConciergeClick={() => setShowPlanner(true)} />

      <main>
        <div id="experience">
          <Hero onStart={() => setShowPlanner(true)} />
        </div>

        <TrustBadges />

        <div id="destinations" className="max-w-7xl mx-auto px-4 py-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-serif text-slate-900 mb-4">
                Curated UK Collections
              </h2>
              <p className="text-slate-500 max-w-xl">
                Handpicked itineraries designed for the discerning Indian
                traveler, featuring our signature support and culinary
                excellence.
              </p>
            </div>
            <button className="text-amber-700 font-bold hover:text-amber-800 flex items-center gap-2">
              View All Destinations <ChevronRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {PACKAGES.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                onQuote={() => setShowPlanner(true)}
              />
            ))}
          </div>
        </div>

        <div className="bg-slate-900 text-slate-400 py-12 text-center border-t border-slate-800">
          <p className="font-serif italic opacity-50">
            Wowyatra Signature — The Art of Travel
          </p>
          <p className="text-xs mt-4">© 2025 Wowyatra. All rights reserved.</p>
        </div>
      </main>

      {/* AI Planner Modal */}
      {showPlanner && <AIPlanner onClose={() => setShowPlanner(false)} />}
    </div>
  );
};

export default App;
