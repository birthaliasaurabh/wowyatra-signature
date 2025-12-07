import React, { useState, useEffect, useRef } from 'react';
import { 
  Star, MapPin, ChevronRight, Calendar, Users, 
  CheckCircle, Coffee, Shield, Phone, MessageCircle, 
  ChefHat, Car, Accessibility, ArrowRight, X, Loader2,
  FileCheck, ShieldCheck, Send, Bot, Sparkles, ImageOff,
  LayoutDashboard, CreditCard, Search, Bell, MoreHorizontal, 
  Mail, Clock, FileText, ArrowUpRight, DollarSign, Briefcase, Lock,
  Crown, Globe, Flame, Heart, User, Smartphone, Download
} from 'lucide-react';

// NOTE: Libraries (jsPDF, EmailJS) are loaded via CDN in the component to prevent build errors.

// ==========================================
// 0. GLOBAL STYLES & FONTS
// ==========================================

const GlobalStyles = () => (
  <style>
    {`
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');
      
      body {
        font-family: 'Montserrat', sans-serif;
      }
      
      .font-serif {
        font-family: 'Playfair Display', serif !important;
      }
      
      .font-sans {
        font-family: 'Montserrat', sans-serif !important;
      }
    `}
  </style>
);

// ==========================================
// 1. MOCK DATABASE (DATA)
// ==========================================

const PACKAGES = [
  // 1. THE HERO PACKAGE (MOVED TO FIRST POSITION)
  {
    id: 'uk-power',
    title: 'The Power-Packed London Grand',
    duration: '5 Days / 4 Nights',
    locations: ['London', 'Windsor', 'Bath', 'Oxford'],
    priceRange: '₹89,999', // FINAL APPROVED PRICE (The Anchor)
    // UNIQUE IMAGE: Dynamic London City View (Tower Bridge/City skyline)
    image: 'https://images.unsplash.com/photo-1543884394-5b23d9b4b9b9?auto=format&fit=crop&q=80&w=1000',
    tags: ['🔥 Best Seller', 'All Attractions', 'Private Car'],
    features: [
      'Includes London Eye & Madame Tussauds',
      'Private Contracted Airport Transfers', 
      'Tower of London & Crown Jewels Entry',
      'Stonehenge & Bath Full Day Trip',
      'Thames Jazz Cruise Included',
      'Visa Denial Protection Included'
    ],
    isPromo: true,
    showPrice: true // SHOW PRICE (Marketing Anchor)
  },
  // 2. LONDON ROYAL FAMILY EXPERIENCE (NOW SECOND)
  {
    id: 'uk-royal-family',
    title: 'The London Royal Family Experience',
    duration: '7 Days / 6 Nights',
    locations: ['London', 'Windsor', 'Oxford'],
    priceRange: '₹1,45,000', // Internal Reference Price
    // UNIQUE IMAGE: Regal architecture/Palace setting
    image: 'https://images.unsplash.com/photo-1577741270273-d1447029580a?auto=format&fit=crop&q=80&w=1000',
    tags: ['Best Seller', 'Seniors Friendly', 'Shopping'],
    features: [
      'Stay at Premium 5-Star Hotels',
      'Private Luxury Van (10 Hrs/Day)',
      'Indian Dinner at Dishoom & Gymkhana',
      'Visa Denial Protection Included',
      'Harry Potter Studio Fast-Track'
    ],
    showPrice: false // HIDE PRICE (Niche Strategy)
  },
  // 3. NEW EUROPE CLASSIC PACKAGE (NOW THIRD)
  {
    id: 'euro-classic',
    title: 'The Classic European Trio',
    duration: '10 Days / 9 Nights',
    locations: ['Paris', 'Rome', 'Florence'],
    priceRange: '₹2,50,000', 
    // UNIQUE IMAGE: Classic European Cityscape (Paris/Rome)
    image: 'https://images.unsplash.com/photo-1502602898624-ad8744093c83?auto=format&fit=crop&q=80&w=1000',
    tags: ['Continental', 'Multi-City', 'First Class Rail'],
    features: [
      'Accommodation in 4-Star Hotels', 
      'Paris to Rome via High-Speed Rail',
      'Louvre Museum & Colosseum Skip-the-Line',
      'Private City Walking Tours in English',
      'Visa Denial Protection Included'
    ],
    showPrice: false 
  },
  // 4. NEW EUROPE HONEYMOON PACKAGE (NOW FOURTH)
  {
    id: 'euro-honeymoon',
    title: 'The European Honeymoon Elite',
    duration: '14 Days / 13 Nights',
    locations: ['Paris', 'Swiss Alps', 'Santorini'],
    priceRange: '₹4,25,000',
    // UNIQUE IMAGE: Romantic, scenic landscape (Santorini/Alps)
    image: 'https://images.unsplash.com/photo-1490650577907-73d8a9e7019f?auto=format&fit=crop&q=80&w=1000',
    tags: ['Honeymoon', '5-Star Luxury', 'Private Pool'],
    features: [
      'Stay in Private Villa/Suites with Pools',
      'First Class Flight Transfers between Countries',
      'Dedicated Private Chauffeur Service',
      'Michelin-Starred Dining Experiences',
      'Visa Denial Protection Included'
    ],
    showPrice: false 
  },
  // 5. MID-RANGE SCOTLAND PACKAGE (NOW FIFTH)
  {
    id: 'uk-scotland-saver',
    title: 'London & Scotland Smart Saver',
    duration: '8 Days / 7 Nights',
    locations: ['London', 'Edinburgh', 'Highlands'],
    priceRange: '₹1,35,000', // Internal Reference Price
    // UNIQUE IMAGE: Edinburgh Castle / Cityscape
    image: 'https://images.unsplash.com/photo-1502781252882-974a95c3746a?auto=format&fit=crop&q=80&w=1000',
    tags: ['Best Value', 'Train Journey', 'Nature'],
    features: [
      '4-Star Hotels (London & Edinburgh)',
      'Scenic High-Speed Train to Scotland',
      'Loch Ness Small Group Tour',
      'Edinburgh Castle Fast-Track',
      'Visa Denial Protection Included'
    ],
    showPrice: false // HIDE PRICE (Niche Strategy)
  },
  // 6. TOP-TIER LUXURY SCOTLAND PACKAGE (NOW LAST)
  {
    id: 'uk-scotland-royal',
    title: 'The Royal UK & Scotland Grand Tour',
    duration: '10 Days / 9 Nights',
    locations: ['London', 'Edinburgh', 'Highlands'],
    priceRange: '₹2,15,000', // Internal Reference Price
    // UNIQUE IMAGE: Scenic Scottish landscape (Loch/Castle)
    image: 'https://images.unsplash.com/photo-1525642441926-d6211d2797e5?auto=format&fit=crop&q=80&w=1000',
    tags: ['Signature Collection', '5-Star Hotels', 'Slow Pace'],
    features: [
      'Stays at Premium 5-Star Hotels (London & Edinburgh)',
      'First Class Royal Scotsman / LNER Train',
      'Private Butler & Chauffeur Service',
      'Michelin Star Indian Dining Experience',
      'Visa Denial Protection Included'
    ],
    showPrice: false // HIDE PRICE (Niche Strategy)
  }
];

// ==========================================
// 2. SHARED UTILITIES
// ==========================================

const ImageWithFallback = ({ src, alt, className }) => {
  const [error, setError] = useState(false);
  const fallbackSrc = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1000";

  return (
    <div className={`relative overflow-hidden bg-slate-200 ${className}`}>
      {!error ? (
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover transition-opacity duration-5-00"
          onError={() => setError(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-slate-800 relative">
             <img src={fallbackSrc} alt="Fallback" className="absolute inset-0 w-full h-full object-cover opacity-60" />
             <div className="relative z-10 text-white flex flex-col items-center">
                 <ImageOff size={24} className="mb-2 opacity-50"/>
                 <span className="text-xs font-medium uppercase tracking-widest opacity-80">Wowyatra Signature</span>
             </div>
        </div>
      )}
    </div>
  );
};

const generateGeminiResponse = async (prompt) => {
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY || ""; 
  
  const systemInstruction = `
    You are Winston, the Digital Butler for 'Wowyatra Signature', the elite European travel division of Wowyatra.
    YOUR PERSONA: Sophisticated, Warm, Professional.
    KNOWLEDGE: Promote "The Power-Packed London Grand" package at ₹89,999 PP.
  `;

  if (!apiKey) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return "I would be delighted to assist you. Wowyatra Signature is currently offering exclusive rates for February travel starting at ₹89,999. Shall I connect you with our concierge for a detailed discussion?";
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          systemInstruction: { parts: [{ text: systemInstruction }] }
        }),
      }
    );
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "I apologize, I am momentarily unable to access the main concierge frequency.";
  } catch (error) {
    return "I apologize, I am having trouble connecting to the network. Please feel free to WhatsApp our expert directly.";
  }
};

// ==========================================
// 3. CORE COMPONENTS (Must be defined first)
// ==========================================

const WebsiteHeader = ({ activeSection }) => (
  <nav className="bg-slate-950 text-white py-5 px-6 sticky top-0 z-50 border-b border-amber-600/20 shadow-2xl">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/20">
          <Crown size={24} className="text-slate-900 fill-slate-900" />
        </div>
        <div className="flex flex-col justify-center">
            <span className="text-3xl font-serif tracking-wide leading-none text-slate-100 font-medium">Wowyatra Signature</span>
        </div>
      </div>
      
      <div className="hidden md:flex items-center gap-10 text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
        <a 
          href="#destinations" 
          className={`transition-colors ${activeSection === 'destinations' ? 'text-amber-500' : 'hover:text-amber-400'}`}
        >
          Destinations
        </a>
        <a 
          href="#experience" 
          className={`transition-colors ${activeSection === 'experience' ? 'text-amber-500' : 'hover:text-amber-400'}`}
        >
          The Signature Experience
        </a>
        <a 
          href="#about" 
          className={`transition-colors ${activeSection === 'about' ? 'text-amber-500' : 'hover:text-amber-400'}`}
        >
          Why Us
        </a>
        <a 
          href="#contact" 
          className={`transition-colors ${activeSection === 'contact' ? 'text-amber-500' : 'hover:text-amber-400'}`}
        >
          Contact Us
        </a>
      </div>
    </div>
  </nav>
);

const Hero = ({ onStart }) => (
  <div id="experience" className="relative h-[700px] flex items-center justify-center overflow-hidden bg-slate-950">
    <div className="absolute inset-0 z-0 opacity-70">
      <ImageWithFallback 
        src="https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&q=80&w=2000" 
        alt="Europe Luxury" 
        className="w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-900/40"></div>
    </div>

    <div className="relative z-10 text-center max-w-5xl px-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="inline-flex items-center gap-3 bg-amber-500 text-slate-900 backdrop-blur border border-amber-400/50 rounded-full px-6 py-2 text-xs font-bold tracking-[0.2em] uppercase mb-10 shadow-xl animate-pulse">
        <Flame size={14} /> Royal Winter Sale Live
      </div>
      <h1 className="text-6xl md:text-8xl font-serif text-white mb-8 leading-[1.1] drop-shadow-2xl font-medium">
        London Luxury. <br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200">Now ₹89,999*</span>
      </h1>
      <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto font-light drop-shadow-md leading-relaxed">
        The Power-Packed London Grand. All Attractions Included. Private Transfers. <br/> 
        Limited seats for February 2026.
      </p>
      
      <button 
        onClick={onStart}
        className="bg-white text-slate-900 px-12 py-5 rounded-full font-bold text-lg hover:bg-amber-50 transition-all shadow-[0_0_30px_rgba(245,158,11,0.4)] flex items-center gap-4 mx-auto hover:scale-105 border-2 border-transparent hover:border-amber-500"
      >
        View The ₹89k Deal <ArrowRight size={22} className="text-amber-600" />
      </button>
    </div>
  </div>
);

const TrustBadges = () => (
  <div className="bg-slate-950 py-20 border-b border-slate-900">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      {[
        { icon: ChefHat, text: "Curated Veg & Jain Dining" },
        { icon: Car, text: "Private Luxury Vehicles" },
        { icon: ShieldCheck, text: "Visa Denial Protection" },
        { icon: FileCheck, text: "100% Visa Support" },
      ].map((item, idx) => (
        <div key={idx} className="flex flex-col items-center gap-5 text-slate-400 group hover:text-amber-400 transition-colors">
          <div className="p-5 rounded-full bg-slate-900 border border-slate-800 group-hover:border-amber-500/50 transition-colors">
            <item.icon size={36} className="text-amber-600 group-hover:text-amber-400 transition-colors" />
          </div>
          <span className="font-bold text-xs tracking-[0.15em] uppercase">{item.text}</span>
        </div>
      ))}
    </div>
  </div>
);

const PackageCard = ({ pkg, onQuote }) => (
  <div className={`bg-white rounded-2xl overflow-hidden shadow-xl border ${pkg.isPromo ? 'border-amber-400 ring-2 ring-amber-400/20' : 'border-slate-100'} group hover:shadow-2xl hover:shadow-amber-900/10 transition-all duration-500 flex flex-col h-full hover:-translate-y-2`}>
    <div className="relative h-80 overflow-hidden shrink-0">
      <ImageWithFallback 
        src={pkg.image} 
        alt={pkg.title} 
        className="w-full h-full group-hover:scale-110 transition-transform duration-1000" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent opacity-60"></div>
      <div className="absolute top-5 left-5 flex gap-2 flex-wrap">
        {pkg.tags.map(tag => (
          <span key={tag} className={`${pkg.isPromo ? 'bg-red-600 text-white animate-pulse' : 'bg-amber-500 text-slate-900'} text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg`}>
            {tag}
          </span>
        ))}
      </div>
      <div className="absolute bottom-6 left-6 text-white right-6">
         <p className="text-amber-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-2">{pkg.duration}</p>
         <h3 className="text-2xl font-serif leading-tight font-medium">{pkg.title}</h3>
      </div>
    </div>
    
    <div className="p-8 flex flex-col flex-grow">
      <div className="space-y-4 mb-10 flex-grow">
        {pkg.features.map((feat, idx) => (
          <div key={idx} className="flex items-start gap-3 text-slate-600 text-sm font-medium">
            <CheckCircle size={18} className="text-amber-600 mt-0.5 shrink-0" />
            <span>{feat}</span>
          </div>
        ))}
      </div>

      <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-auto">
        
        {/* START MARKETING STRATEGY IMPLEMENTATION */}
        {pkg.showPrice ? (
          <div>
            <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">Price Per Person</p>
            <div className="flex items-baseline gap-1">
              <p className={`font-serif font-bold text-2xl ${pkg.isPromo ? 'text-red-600' : 'text-slate-900'}`}>{pkg.priceRange}</p>
              <span className="text-slate-500 text-sm font-sans font-medium">pp*</span>
            </div>
            {/* UPDATED: Replaced explicit tax note with T&C */}
            <p className="text-slate-400 text-[10px] mt-1 font-medium">* T&C Applied</p>
          </div>
        ) : (
          <div>
            <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">Pricing Model</p>
            <div className="flex items-baseline gap-1">
              <p className="font-serif font-bold text-xl text-slate-900">Custom Quote</p>
            </div>
            <p className="text-slate-400 text-[10px] mt-1 font-medium">Bespoke pricing based on needs</p>
          </div>
        )}
        {/* END MARKETING STRATEGY IMPLEMENTATION */}


        <button 
          // All packages now use the Deal Inquiry Modal for lead capture
          onClick={() => onQuote(pkg)} 
          className={`px-6 py-3 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg ${pkg.isPromo ? 'bg-red-600 text-white hover:bg-red-700 shadow-red-500/30' : 'bg-slate-900 text-white hover:bg-amber-500 hover:text-slate-900 hover:shadow-amber-500/30'}`}
        >
          {pkg.showPrice ? 'Request Quote' : 'Call Me Back'}
        </button>
      </div>
    </div>
  </div>
);

const DealInquiryModal = ({ onClose, packageData }) => {
  // Use default package data if none is passed (e.g., if triggered from the Hero button)
  const defaultPackage = PACKAGES.find(p => p.id === 'uk-power') || {
      title: 'The Power-Packed London Grand',
      priceRange: '₹89,999',
      duration: '5 Days / 4 Nights',
  };
  const pkg = packageData || defaultPackage;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    travellers: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Load scripts (jsPDF + EmailJS) from CDN
  useEffect(() => {
    // 1. Load jsPDF
    const pdfScript = document.createElement('script');
    pdfScript.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    pdfScript.async = true;
    document.body.appendChild(pdfScript);

    // 2. Load EmailJS Browser SDK
    const emailScript = document.createElement('script');
    emailScript.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
    emailScript.async = true;
    document.body.appendChild(emailScript);

    return () => {
      // Cleanup on unmount if needed
      if(document.body.contains(pdfScript)) document.body.removeChild(pdfScript);
      if(document.body.contains(emailScript)) document.body.removeChild(emailScript);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // --- GENERATE PDF IN BACKGROUND ---
    let pdfDataUri = null;
    if (window.jspdf) {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.width;
      
      // --- COLORS (Matching Website) ---
      const slate900 = [15, 23, 42]; // Header Background
      const amber500 = [245, 158, 11]; // Accents
      const textDark = [30, 30, 30]; // Body Text

      // --- HEADER ---
      doc.setFillColor(...slate900);
      doc.rect(0, 0, pageWidth, 55, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFont("times", "bold");
      doc.setFontSize(24);
      doc.text("WOWYATRA SIGNATURE", 20, 25);
      
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...amber500); 
      doc.setCharSpace(1.5);
      doc.text("THE ART OF LUXURY TRAVEL", 20, 35);
      doc.setCharSpace(0);

      doc.setDrawColor(...amber500);
      doc.setLineWidth(0.5);
      doc.line(20, 42, 80, 42);

      // --- CLIENT INFO ---
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text("PREPARED FOR:", 20, 70);
      doc.setFont("helvetica", "normal");
      doc.text(formData.name.toUpperCase(), 60, 70);

      doc.setFont("helvetica", "bold");
      doc.text("GUESTS:", 20, 77);
      doc.setFont("helvetica", "normal");
      doc.text(`${formData.travellers} Travellers`, 60, 77);

      doc.setFont("helvetica", "bold");
      doc.text("PACKAGE:", 20, 84);
      // DYNAMIC PACKAGE NAME IN PDF
      doc.setFont("helvetica", "normal");
      doc.text(`${pkg.title} (${pkg.duration})`, 60, 84); 

      // --- ITINERARY CONTENT ---
      // NOTE: Itinerary content is static for the Hero package for PDF simplicity
      let y = 105;
      const itinerary = [
        { day: "Day 01", title: "Arrival in London", desc: "Private luxury transfer from Heathrow to a Premium 4-Star hotel. Leisure time to explore Mayfair." }, 
        { day: "Day 02", title: "Royal London & Thames", desc: "Private guided tour of Tower of London and Crown Jewels. Afternoon Hop-on Hop-off pass. Sunset Jazz Cruise on the River Thames." },
        { day: "Day 03", title: "Stonehenge & Bath", desc: "Full-day luxury coach expedition to the prehistoric Stonehenge and the historic Roman Baths. Traditional pump room lunch included." },
        { day: "Day 04", title: "Icons & Shopping", desc: "Morning fast-track entry to Madame Tussauds. Afternoon shopping at Oxford Street. Evening flight on The London Eye for sunset views." },
        { day: "Day 05", title: "Departure", desc: "Breakfast at hotel. Private chauffeur transfer to Heathrow Airport for your onward journey." }
      ];

      doc.setFont("times", "bold");
      doc.setFontSize(16);
      doc.setTextColor(...slate900);
      doc.text("Your Journey", 20, 95);

      itinerary.forEach(item => {
        if (y > 240) { doc.addPage(); y = 30; }
        // Day Marker
        doc.setFillColor(...slate900);
        doc.rect(20, y - 4, 16, 6, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.text(item.day, 22, y);
        // Title
        doc.setTextColor(...slate900);
        doc.setFont("times", "bold");
        doc.setFontSize(12);
        doc.text(item.title, 42, y);
        // Description
        y += 6;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(...textDark);
        const descLines = doc.splitTextToSize(item.desc, 150);
        doc.text(descLines, 42, y);
        y += (descLines.length * 5) + 10;
      });

      // --- FOOTER PRICE ---
      const footerY = 260;
      doc.setDrawColor(200, 200, 200);
      doc.line(20, footerY - 5, pageWidth - 20, footerY - 5);
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text("Total Estimated Investment (Excluding Tax)", 20, footerY + 5);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(...slate900); 
      // DYNAMIC PRICE IN PDF
      doc.text(`${pkg.priceRange} per person`, pageWidth - 20, footerY + 5, { align: "right" });
      doc.setFontSize(8);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(100, 100, 100);
      // UPDATED: Replaced explicit tax note with T&C
      doc.text("*Note: Terms and Conditions Apply.", 20, footerY + 12);

      // Get PDF as data URI string
      pdfDataUri = doc.output('datauristring');
    }

    // --- SEND EMAIL VIA EMAILJS ---
    const YOUR_SERVICE_ID = "YOUR_SERVICE_ID"; // Paste your Service ID here
    const YOUR_TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // Paste your Template ID here
    const YOUR_PUBLIC_KEY = "YOUR_PUBLIC_KEY"; // Paste your Public Key here

    const templateParams = {
      to_name: formData.name,
      to_email: formData.email,
      phone: formData.phone,
      travellers: formData.travellers,
      package_name: pkg.title, // DYNAMIC PACKAGE NAME FOR EMAIL SUBJECT
      my_pdf: pdfDataUri 
    };

    try {
      if (window.emailjs && YOUR_SERVICE_ID !== "YOUR_SERVICE_ID") {
         await window.emailjs.send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, templateParams, YOUR_PUBLIC_KEY);
      } else {
         // Simulation if keys are missing
         await new Promise(resolve => setTimeout(resolve, 2000));
      }
      setSubmitted(true);
    } catch (error) {
      console.error("Email failed:", error);
      alert("There was an issue sending the email. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl border border-slate-100 relative">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto text-amber-600 mb-6">
            <Mail size={32} />
          </div>
          <h3 className="text-2xl font-serif text-slate-900 mb-2 font-medium">Inquiry Sent!</h3>
          <p className="text-slate-500 text-sm mb-8 leading-relaxed">
            Thank you, {formData.name}. Your inquiry for the **{pkg.title}** package has been sent! We will contact you soon.
          </p>
          <button onClick={onClose} className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold w-full hover:bg-slate-800 uppercase tracking-widest text-sm transition-all shadow-lg">
            Return to Site
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative">
        {/* Header */}
        <div className="bg-slate-900 p-6 flex justify-between items-start text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 bg-amber-500/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
          <div className="relative z-10">
            {/* DYNAMIC HEADER */}
            <h3 className="font-serif text-2xl md:text-3xl leading-tight font-medium">Inquire About {pkg.title}</h3>
            {/* Conditionally show price if available */}
            {pkg.showPrice && (
                <p className="text-slate-400 text-xs mt-2 font-medium uppercase tracking-wide">{pkg.duration} • Starts at {pkg.priceRange}*</p>
            )}
            {!pkg.showPrice && (
                <p className="text-slate-400 text-xs mt-2 font-medium uppercase tracking-wide">{pkg.duration} • Custom Pricing</p>
            )}
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all z-10">
            <X size={20} />
          </button>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
           <div className="space-y-4">
             <div>
               <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Full Name</label>
               <div className="relative">
                 <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                 <input 
                   type="text" 
                   required
                   className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-slate-900 font-medium placeholder:text-slate-400"
                   placeholder="e.g. Rahul Sharma"
                   value={formData.name}
                   onChange={e => setFormData({...formData, name: e.target.value})}
                 />
               </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
               <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Phone Number</label>
                 <div className="relative">
                   <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                   <input 
                     type="tel" 
                     required
                     pattern="[0-9]{10}"
                     title="Please enter a valid 10-digit phone number"
                     className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-slate-900 font-medium placeholder:text-slate-400"
                     placeholder="9876543210"
                     value={formData.phone}
                     onChange={e => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setFormData({...formData, phone: val});
                     }}
                   />
                 </div>
               </div>
               <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Travellers</label>
                 <div className="relative">
                   <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                   <input 
                     type="number" 
                     min="1"
                     required
                     className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-slate-900 font-medium placeholder:text-slate-400"
                     placeholder="2"
                     value={formData.travellers}
                     onChange={e => setFormData({...formData, travellers: e.target.value})}
                   />
                 </div>
               </div>
             </div>

             <div>
               <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email Address</label>
               <div className="relative">
                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                 <input 
                   type="email" 
                   required
                   className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-slate-900 font-medium placeholder:text-slate-400"
                   placeholder="rahul@example.com"
                   value={formData.email}
                   onChange={e => setFormData({...formData, email: e.target.value})}
                 />
               </div>
             </div>
           </div>

           <button 
             type="submit" 
             disabled={isSubmitting}
             className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-amber-600 transition-all shadow-lg flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
           >
             {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : 'Send Me The Quote'}
           </button>

           <p className="text-[10px] text-center text-slate-400 leading-tight px-4">
             By submitting, you agree to receive the itinerary via email. Wowyatra Signature respects your privacy.
           </p>
        </form>
      </div>
    </div>
  )
}

const AIPlanner = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    seniors: false,
    honeymoon: false,
    family: false,
    food: 'Any',
    pace: 'Relaxed'
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
    <div className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-2rem)] flex flex-col animate-in slide-in-from-bottom-10 duration-500 shadow-2xl rounded-2xl overflow-hidden border border-slate-200 font-sans">
      <div className="bg-slate-900 p-5 flex justify-between items-center text-white border-b border-amber-500/20">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-amber-500 rounded-lg text-slate-900">
            <Crown size={22} fill="currentColor" />
          </div>
          <div>
            <h3 className="font-serif text-lg leading-tight font-medium">Signature Butler</h3>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Designing your bespoke itinerary</p>
          </div>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors p-1 hover:bg-slate-800 rounded">
          <X size={20} />
        </button>
      </div>

      <div className="bg-white p-6 max-h-[60vh] overflow-y-auto">
        {isProcessing ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Loader2 size={36} className="text-amber-500 animate-spin mb-4" />
            <h4 className="text-lg font-bold text-slate-800">Consulting partners...</h4>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">Checking luxury availability.</p>
          </div>
        ) : (
          <>
            {step === 1 && (
              <div className="space-y-6 animate-in slide-in-from-right-8 duration-300">
                <div className="space-y-2">
                  <h4 className="text-2xl font-serif text-slate-900">Who is travelling?</h4>
                  <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">We customize logistics for group comfort.</p>
                </div>
                
                <div className="space-y-3">
                  <button 
                    onClick={() => setPreferences({...preferences, honeymoon: !preferences.honeymoon})}
                    className={`w-full p-4 border rounded-xl flex items-center gap-4 transition-all ${preferences.honeymoon ? 'border-amber-500 bg-amber-50' : 'border-slate-100 hover:border-slate-300'}`}
                  >
                    <Heart size={22} className={preferences.honeymoon ? 'text-amber-600' : 'text-slate-400'} />
                    <div className="text-left">
                      <span className="block font-bold text-sm text-slate-900 uppercase tracking-wide">Honeymoon Couple</span>
                      <span className="text-[10px] text-slate-500 font-medium">Private dining & romantic suites.</span>
                    </div>
                  </button>

                  <button 
                    onClick={() => setPreferences({...preferences, family: !preferences.family})}
                    className={`w-full p-4 border rounded-xl flex items-center gap-4 transition-all ${preferences.family ? 'border-amber-500 bg-amber-50' : 'border-slate-100 hover:border-slate-300'}`}
                  >
                    <Users size={22} className={preferences.family ? 'text-amber-600' : 'text-slate-400'} />
                    <div className="text-left">
                      <span className="block font-bold text-sm text-slate-900 uppercase tracking-wide">Family</span>
                      <span className="text-[10px] text-slate-500 font-medium">Fun stops & kid-friendly food.</span>
                    </div>
                  </button>

                  <button 
                    onClick={() => setPreferences({...preferences, seniors: !preferences.seniors})}
                    className={`w-full p-4 border rounded-xl flex items-center gap-4 transition-all ${preferences.seniors ? 'border-amber-500 bg-amber-50' : 'border-slate-100 hover:border-slate-300'}`}
                  >
                    <Accessibility size={22} className={preferences.seniors ? 'text-amber-600' : 'text-slate-400'} />
                    <div className="text-left">
                      <span className="block font-bold text-sm text-slate-900 uppercase tracking-wide">Senior Citizens</span>
                      <span className="text-[10px] text-slate-500 font-medium">Elevators & minimal walking.</span>
                    </div>
                  </button>
                </div>
                
                <div className="flex justify-end">
                  <button onClick={handleNext} className="bg-slate-900 text-white px-6 py-3 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-amber-600 transition-colors shadow-lg uppercase tracking-wider">
                    Next Step <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in slide-in-from-right-8 duration-300">
                <div className="space-y-2">
                  <h4 className="text-2xl font-serif text-slate-900">Dining Preferences</h4>
                  <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">Home-style food abroad.</p>
                </div>

                 <div className="space-y-3">
                   {['Pure Veg', 'Jain Meals', 'Non-Veg / Mix', 'Local Cuisine'].map(opt => (
                      <button key={opt} onClick={() => setPreferences({...preferences, food: opt})} 
                        className={`w-full p-4 border rounded-lg text-left text-sm font-bold tracking-wide transition-all flex justify-between ${preferences.food === opt ? 'border-amber-500 bg-amber-50 text-slate-900' : 'text-slate-500 hover:bg-slate-50'}`}>
                        {opt}
                        {preferences.food === opt && <CheckCircle size={18} className="text-amber-600" />}
                      </button>
                   ))}
                 </div>

                 <div className="flex justify-end">
                  <button onClick={handleNext} className="bg-slate-900 text-white px-6 py-3 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-amber-600 transition-colors shadow-lg uppercase tracking-wider">
                    Finalize <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center py-8 space-y-6 animate-in zoom-in-95 duration-300">
                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                   <CheckCircle size={32} />
                 </div>
                 <div>
                   <h4 className="text-2xl font-serif text-slate-900">Itinerary Generated!</h4>
                   <p className="text-xs text-slate-500 mt-2 leading-relaxed font-medium">We have curated a plan including {preferences.seniors ? 'senior-friendly hotels' : 'luxury stays'} and {preferences.food} options.</p>
                 </div>
                 <button onClick={onClose} className="w-full bg-amber-500 text-slate-900 px-4 py-4 rounded-lg font-bold hover:bg-amber-400 text-sm shadow-md uppercase tracking-widest">
                   View My Plan
                 </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const ContactUsSection = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call and success state
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
        }, 1500);
    };

    return (
        <div id="contact" className="bg-slate-900 py-24">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16">
                
                <div className="space-y-6 text-white">
                    <h2 className="text-5xl font-serif font-medium text-amber-500">Contact Us</h2>
                    <p className="text-slate-300 text-lg max-w-lg">
                        For partnership inquiries, vendor relations (hotels, transport), or other general questions, please reach out directly.
                    </p>
                    
                    <div className="space-y-3 pt-4">
                        <div className="flex items-center gap-3">
                            <Mail size={24} className="text-amber-500 shrink-0" />
                            <p className="text-lg text-slate-100 font-bold">info@wowyatrasignature.in</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone size={24} className="text-amber-500 shrink-0" />
                            {/* UPDATED PHONE NUMBER */}
                            <p className="text-lg text-slate-100">+91-78377-77553</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin size={24} className="text-amber-500 shrink-0" />
                            {/* UPDATED ADDRESS */}
                            <p className="text-lg text-slate-100">Wowyatra Signature, Punjab, INDIA</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-2xl">
                    {submitted ? (
                        <div className="text-center py-12">
                            <CheckCircle size={48} className="text-green-600 mx-auto mb-4" />
                            <h3 className="text-2xl font-serif font-medium text-slate-900">Message Sent!</h3>
                            <p className="text-slate-600 mt-2">Thank you. We will respond to your query at **info@wowyatrasignature.in** shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <h3 className="text-2xl font-serif font-medium text-slate-900 mb-4">Send a General Inquiry</h3>
                            
                            <input 
                                type="text" 
                                required 
                                placeholder="Your Name"
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                            />
                            <input 
                                type="email" 
                                required 
                                placeholder="Email Address"
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                                value={formData.email}
                                onChange={e => setFormData({...formData, email: e.target.value})}
                            />
                            <input 
                                type="text" 
                                required 
                                placeholder="Subject"
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                                value={formData.subject}
                                onChange={e => setFormData({...formData, subject: e.target.value})}
                            />
                            <textarea 
                                required 
                                rows="4"
                                placeholder="Your Message / Partnership Details"
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                                value={formData.message}
                                onChange={e => setFormData({...formData, message: e.target.value})}
                            ></textarea>
                            
                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full bg-amber-600 text-white py-3 rounded-lg font-bold hover:bg-amber-700 transition-colors uppercase tracking-widest text-sm disabled:opacity-70 flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : 'Send Message'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

const WhyUsSection = () => (
    <div id="about" className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-5xl font-serif font-medium text-slate-900 mb-12 text-center">
                Why Wowyatra Signature is Different
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                
                <div className="space-y-8">
                    <h3 className="text-3xl font-serif font-medium text-amber-600">
                        The B2B Advantage: Corporate Grade, Personal Touch
                    </h3>
                    
                    <p className="text-slate-600 text-lg leading-relaxed">
                        After 15 years spent perfecting travel logistics for top global corporations and luxury travel agencies, Wowyatra is finally opening its private portfolio to the individual traveler. We don't just book trips; we apply the same rigorous, zero-error corporate standards to your family vacation.
                    </p>
                    
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <CheckCircle size={24} className="text-amber-500 mt-1 shrink-0"/>
                            <div>
                                <h4 className="text-xl font-bold text-slate-900">Zero-Failure Logistics</h4>
                                <p className="text-slate-600 mt-1">
                                    We utilize our established 15-year network of private drivers, secure ticketing systems, and verified ground handlers to ensure your itinerary runs with corporate efficiency.
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                            <Crown size={24} className="text-amber-500 mt-1 shrink-0"/>
                            <div>
                                <h4 className="text-xl font-bold text-slate-900">Insider Access and Pricing Power</h4>
                                <p className="text-slate-600 mt-1">
                                    We bypass standard retail pricing, ensuring you get placed in the best rooms and benefit from stable, fixed costs secured through high-volume contracts.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="space-y-8">
                    <div className="p-8 bg-slate-100 rounded-xl border border-slate-200">
                         <h4 className="text-3xl font-serif font-medium text-slate-900 mb-4">Protection, Not Just Planning</h4>
                         <p className="text-slate-700">
                             Our B2B experience taught us that peace of mind is priceless. We handle every administrative burden so you don't have to:
                         </p>
                         <ul className="list-none space-y-3 mt-4">
                            <li className="flex items-start gap-3">
                                <Shield size={20} className="text-red-500 mt-0.5 shrink-0"/>
                                <span className="text-slate-800 font-medium">Guaranteed Visa Denial Protection.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone size={20} className="text-red-500 mt-0.5 shrink-0"/>
                                <span className="text-slate-800 font-medium">24/7 Concierge (not a call center) for crisis management.</span>
                            </li>
                             <li className="flex items-start gap-3">
                                <Globe size={20} className="text-red-500 mt-0.5 shrink-0"/>
                                <span className="text-slate-800 font-medium">Experience, Not Experiments: Our routes are fully road-tested.</span>
                            </li>
                         </ul>
                    </div>

                    <div className="text-center pt-4">
                        <h4 className="text-2xl font-serif text-slate-900">Our Promise</h4>
                        <p className="text-slate-600 mt-2 italic">
                           We manage the complexity so you and your family can simply enjoy the majesty of the UK and Europe, worry-free.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);


const App = () => {
  const [showPlanner, setShowPlanner] = useState(true);
  const [showDealModal, setShowDealModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(PACKAGES.find(p => p.id === 'uk-power')); // Default to Hero
  
  const sectionRefs = useRef({});
  const [activeSection, setActiveSection] = useState('experience');

  // Unified Quote Handler
  const handleQuote = (pkg) => {
    setSelectedPackage(pkg);
    setShowDealModal(true);
  };


  // Logic to determine which section is currently active for navigation highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['experience', 'about', 'destinations', 'contact'];
      let currentSection = activeSection;

      sections.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if the element's top is visible AND above the viewport's 30% mark
          if (rect.top <= window.innerHeight * 0.3 && rect.bottom >= window.innerHeight * 0.3) {
            currentSection = id;
          }
        }
      });
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check on load
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);


  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900">
      <GlobalStyles />
      <WebsiteHeader activeSection={activeSection} />
      
      <main>
        {/* Hero Section is already marked with id="experience" */}
        <Hero onStart={() => handleQuote(PACKAGES.find(p => p.id === 'uk-power'))} />
        
        <TrustBadges />

        {/* --- WHY US SECTION INTEGRATED --- */}
        {/* This section is already marked with id="about" */}
        <WhyUsSection />

        <div id="destinations" className="max-w-7xl mx-auto px-4 py-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-5xl font-serif text-slate-900 mb-6 font-medium">Curated UK & Europe Collections</h2>
              <p className="text-slate-500 max-w-xl text-lg font-light">Handpicked itineraries designed for the discerning Indian traveler, featuring our signature support and culinary excellence.</p>
            </div>
            <button className="text-amber-700 font-bold hover:text-amber-800 flex items-center gap-2 uppercase tracking-widest text-sm">
              View All Destinations <ChevronRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {PACKAGES.map(pkg => (
              // Use the unified handler and pass the package object
              <PackageCard key={pkg.id} pkg={pkg} onQuote={() => handleQuote(pkg)} />
            ))}
          </div>
        </div>
        
        {/* CONTACT US SECTION */}
        <ContactUsSection />

        <div className="bg-slate-900 text-slate-400 py-16 text-center border-t border-slate-800">
           <p className="font-serif italic opacity-60 text-lg">Wowyatra Signature — The Art of Travel</p>
           <p className="text-[10px] mt-4 uppercase tracking-widest opacity-40">© 2025 Wowyatra. All rights reserved.</p>
        </div>
      </main>

      {/* Floating Butler */}
      {showPlanner && <AIPlanner onClose={() => setShowPlanner(false)} />}
      
      {/* 89k Deal Modal - PASS SELECTED PACKAGE DATA */}
      {showDealModal && <DealInquiryModal onClose={() => setShowDealModal(false)} packageData={selectedPackage} />}
    </div>
  );
};

export default App;
