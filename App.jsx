import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, ChevronDown, CassetteTape, MonitorSmartphone, 
  ArrowDown, Search, Compass, Palette, Rocket, TrendingUp, 
  BarChart2, Check, Target, Heart, Phone, Mail, Headphones, 
  Eye, Send, Instagram, Twitter, Linkedin, ArrowRight 
} from 'lucide-react';

// --- CONSTANTS ---

const SERVICES_MENU = [
  {
    id: 'seo',
    label: 'Technical SEO & Local Growth',
    bullets: ['Dominate local search (Beat your competitors)', 'Technical Audits for SaaS & E-commerce', 'Plain English Reporting - No Jargon.'],
    Icon: BarChart2,
    iconColor: 'text-[#A3CFFF]',
    headingClass: 'neon-text-blue',
    gradientClass: 'bg-gradient-to-tr from-blue-900 to-transparent opacity-50',
    rotateClass: 'rotate-2'
  },
  {
    id: 'ads',
    label: 'Google & Social Ads',
    bullets: ['Data-Driven ROI Focus', 'Lead Gen for High-Ticket B2B', 'Transparent Ad Spend Tracking'],
    Icon: Target,
    iconColor: 'text-[#F5A6C9]',
    headingClass: 'neon-text-pink',
    gradientClass: 'bg-gradient-to-bl from-pink-900 to-transparent opacity-50',
    rotateClass: '-rotate-2'
  },
  {
    id: 'branding',
    label: 'Branding & Non-Profit',
    bullets: ['Mission-Driven Storytelling', 'Google Ad Grants Management', 'Accessible Web Design'],
    Icon: Heart,
    iconColor: 'text-[#CDB7FF]',
    headingClass: 'neon-text-lavender',
    gradientClass: 'bg-gradient-to-r from-purple-900 to-transparent opacity-50',
    rotateClass: 'rotate-1'
  },
];

const TESTIMONIALS = [
  { text: "I used to hate marketing jargon. These guys just made my phone ring. I'm finally booked out for weddings!", author: "Chef Seema, SpiceCraft", color: "bg-[#CDB7FF]" },
  { text: "Incredible design eye. They took our boring corporate site and made it actually cool.", author: "John D, TechStart", color: "bg-[#A3CFFF]" },
  { text: "Best agency we've worked with in 5 years. Hands down.", author: "Sarah L.", color: "bg-[#F5A6C9]" },
  { text: "Finally, an agency that understands DATA. They lowered our CPA by 40% in two months.", author: "Rohan, SaaS Manager", color: "bg-[#FF8F8F]" },
  { text: "They truly care about our mission. The donation page they built is a game changer.", author: "Ananya, Project Umeed", color: "bg-[#FEF9A7]" },
  { text: "Highly recommended for branding.", author: "Mike T.", color: "bg-[#B5F1CC]" }
];

const PROJECTS = {
  saas: {
    title: 'TechFlow - SaaS Growth',
    industry: 'B2B Software',
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-block text-[#A3CFFF] mb-4">The Challenge</h3>
          <p className="text-gray-300 mb-4">TechFlow was struggling with high CPA and low lead quality. Their internal team was stretched thin and needed specialist help.</p>
          <h3 className="text-2xl font-block text-[#A3CFFF] mb-4">Our Strategy</h3>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Deep Technical SEO Audit</li>
            <li>LinkedIn Ads targeting CTOs</li>
            <li>Dedicated Landing Page Optimization</li>
          </ul>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-2xl font-block text-white mb-6">The Data (ROI)</h3>
          <div className="space-y-6">
            <div>
              <span className="text-4xl text-[#A3CFFF] font-bold">300%</span>
              <p className="text-gray-400">Increase in Marketing Qualified Leads (MQLs)</p>
            </div>
            <div>
              <span className="text-4xl text-[#B5F1CC] font-bold">40%</span>
              <p className="text-gray-400">Reduction in Cost Per Acquisition</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  catering: {
    title: 'SpiceCraft - Local Domination',
    industry: 'Food & Beverage',
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-block text-[#FF8F8F] mb-4">The Goal</h3>
          <p className="text-gray-300 mb-4">Seema wanted to stop doing small birthday parties and book large corporate events. She was tired of her competitor showing up first on Google.</p>
          <h3 className="text-2xl font-block text-[#FF8F8F] mb-4">What We Did</h3>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Google My Business Optimization</li>
            <li>"Wedding Catering" Keyword Targeting</li>
            <li>Reputation Management</li>
          </ul>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-2xl font-block text-white mb-6">The Results</h3>
          <div className="space-y-6">
            <div>
              <span className="text-4xl text-[#FF8F8F] font-bold">#1</span>
              <p className="text-gray-400">Ranking on Google Maps</p>
            </div>
            <div>
              <span className="text-4xl text-white font-bold">15x</span>
              <p className="text-gray-400">Wedding Inquiries per Month</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  nonprofit: {
    title: 'Hope.org - Mission Scale',
    industry: 'Non-Profit',
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-block text-[#CDB7FF] mb-4">The Mission</h3>
          <p className="text-gray-300 mb-4">Ananya needed consistent monthly donors to keep her programs running, but lacked the budget for big ad spends.</p>
          <h3 className="text-2xl font-block text-[#CDB7FF] mb-4">Our Approach</h3>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Google Ad Grant Application (₹1000k/mo free ads)</li>
            <li>Emotional Storytelling Video Campaign</li>
            <li>Simplified Donation Checkout Flow</li>
          </ul>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-2xl font-block text-white mb-6">Impact</h3>
          <div className="space-y-6">
            <div>
              <span className="text-4xl text-[#CDB7FF] font-bold">₹1000k</span>
              <p className="text-gray-400">Free Monthly Ad Spend Secured</p>
            </div>
            <div>
              <span className="text-4xl text-white font-bold">200%</span>
              <p className="text-gray-400">Increase in Recurring Donors</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  ecommerce: {
    title: 'LuxeFit - Fashion Scale',
    industry: 'E-commerce',
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-block text-[#F5A6C9] mb-4">The Vision</h3>
          <p className="text-gray-300 mb-4">A high-end activewear brand needing to break through a crowded market with high ROAS requirements.</p>
          <h3 className="text-2xl font-block text-[#F5A6C9] mb-4">Execution</h3>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Instagram & TikTok Influencer Seeding</li>
            <li>Shopping Feed Optimization</li>
            <li>Email Retention Flows</li>
          </ul>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-2xl font-block text-white mb-6">Revenue</h3>
          <div className="space-y-6">
            <div>
              <span className="text-4xl text-[#F5A6C9] font-bold">5.0x</span>
              <p className="text-gray-400">Return on Ad Spend (ROAS)</p>
            </div>
            <div>
              <span className="text-4xl text-white font-bold">₹45000k</span>
              <p className="text-gray-400">Generated in Q4</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  corporate: {
    title: 'Apex Law - Rebranding',
    industry: 'Legal / Corporate',
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-block text-[#FEF9A7] mb-4">The Need</h3>
          <p className="text-gray-300 mb-4">An established firm looking to modernize their image without losing their sense of authority.</p>
          <h3 className="text-2xl font-block text-[#FEF9A7] mb-4">The Solution</h3>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Complete Visual Identity Overhaul</li>
            <li>Accessible, Fast-Loading Website</li>
            <li>Content Marketing Strategy for SEO</li>
          </ul>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-2xl font-block text-white mb-6">Outcome</h3>
          <div className="space-y-6">
            <div>
              <span className="text-4xl text-[#FEF9A7] font-bold">Modern</span>
              <p className="text-gray-400">Identity established across all channels</p>
            </div>
            <div>
              <span className="text-4xl text-white font-bold">+45%</span>
              <p className="text-gray-400">Increase in organic traffic</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  app: {
    title: 'Zen App - Mobile Launch',
    industry: 'Mobile App',
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-block text-[#B5F1CC] mb-4">Launch Strategy</h3>
          <p className="text-gray-300 mb-4">Launching a new meditation app in a saturated market requires precise targeting and creative ads.</p>
          <h3 className="text-2xl font-block text-[#B5F1CC] mb-4">Tactics</h3>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>App Store Optimization (ASO)</li>
            <li>Apple Search Ads</li>
            <li>User Generated Content (UGC) Ads</li>
          </ul>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-2xl font-block text-white mb-6">Growth</h3>
          <div className="space-y-6">
            <div>
              <span className="text-4xl text-[#B5F1CC] font-bold">10k+</span>
              <p className="text-gray-400">Downloads in First Month</p>
            </div>
            <div>
              <span className="text-4xl text-white font-bold">Top 10</span>
              <p className="text-gray-400">Category Ranking</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

// Small visual meta for project cards (keeps visual layout data separate)
const PROJECT_CARDS = [
  { id: 'saas', color: 'text-[#A3CFFF]', rotate: '-rotate-6', pos: 'top-0 left-4 md:left-20', z: 'z-10' },
  { id: 'catering', color: 'text-[#FF8F8F]', rotate: 'rotate-3', pos: 'top-10 right-4 md:right-32', z: 'z-20' },
  { id: 'nonprofit', color: 'text-[#CDB7FF]', rotate: '-rotate-3', pos: 'bottom-20 left-10 md:left-32', z: 'z-30' },
  { id: 'ecommerce', color: 'text-[#F5A6C9]', rotate: 'rotate-6', pos: 'bottom-10 right-10 md:right-24', z: 'z-20' },
  { id: 'corporate', color: 'text-[#FEF9A7]', rotate: '-rotate-2', pos: 'top-40 left-1/2 -translate-x-1/2', z: 'z-0' },
  { id: 'app', color: 'text-[#B5F1CC]', rotate: 'rotate-2', pos: 'bottom-2 left-1/2 -translate-x-1/2', z: 'z-40' },
];

// --- MAIN APP COMPONENT ---

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [showTestimonials, setShowTestimonials] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // Handle Scroll Effect for Navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Custom Cursor
  useEffect(() => {
    const moveCursor = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  // Handle ESC key for modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setActiveModal(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Lock body scroll when menu/modal open
  useEffect(() => {
    if (mobileMenuOpen || activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [mobileMenuOpen, activeModal]);

  const formRef = useRef(null);
  const [formStatusText, setFormStatusText] = useState('');
  const [formStatusColor, setFormStatusColor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatusColor('#33ef5cff');

    const formEl = formRef.current;

    // Build a plain object of the form values
    const formData = {
      first_name: formEl.elements['first_name']?.value || '',
      last_name: formEl.elements['last_name']?.value || '',
      email: formEl.elements['email']?.value || '',
      phone: formEl.elements['phone']?.value || '',
      subject: formEl.elements['subject']?.value || '',
      message: formEl.elements['message']?.value || '',
      timestamp: new Date().toISOString()
    };

    // Log all form data to console
    console.log('=== CONTACT FORM SUBMISSION ===');
    console.log('Form Data:', formData);
    console.log('First Name:', formData.first_name);
    console.log('Last Name:', formData.last_name);
    console.log('Email:', formData.email);
    console.log('Phone:', formData.phone);
    console.log('Subject:', formData.subject);
    console.log('Message:', formData.message);
    console.log('Timestamp:', formData.timestamp);
    console.log('===============================');

    // Also POST the data to local server to save as JSON
    try {
      const response = await fetch('http://localhost:4000/save-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        console.log('✅ Form data saved to JSON file successfully');
        // 
        setFormStatusColor('green');
        formEl.reset();
      } else {
        throw new Error('Server responded with error');
      }
    } catch (err) {
      console.error('❌ Failed to save form:', err);
      setFormStatusText('❌ Failed to send message. Please try again later.');
      setFormStatusColor('red');
    }
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <div className="font-sans text-[#f0f0f0] bg-[#121212] overflow-x-hidden relative" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* --- STYLES & FONTS --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@300;400;600&display=swap');
        
        :root {
          --pastel-lavender: #CDB7FF;
          --pastel-blue: #A3CFFF;
          --pastel-pink: #F5A6C9;
          --pastel-red: #FF8F8F;
          --pastel-yellow: #FEF9A7;
          --pastel-green: #B5F1CC;
        }

        body { font-family: 'Inter', sans-serif; }
        h1, h2, h3, h4, .font-block { font-family: 'Anton', sans-serif; letter-spacing: 1px; text-transform: uppercase; }
        
        .chalk-border {
          border: 2px solid rgba(255,255,255,0.8);
          border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
          box-shadow: 0 0 5px rgba(255,255,255,0.2);
        }

        .neon-text-lavender { color: var(--pastel-lavender); text-shadow: 0 0 8px var(--pastel-lavender); }
        .neon-text-blue { color: var(--pastel-blue); text-shadow: 0 0 8px var(--pastel-blue); }
        .neon-text-pink { color: var(--pastel-pink); text-shadow: 0 0 8px var(--pastel-pink); }
        
        .btn-neon {
          transition: all 0.3s ease;
        }
        .btn-neon:hover {
          transform: scale(1.05) rotate(-1deg);
          box-shadow: 0 0 20px var(--pastel-lavender);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        .floating-element { animation: float 6s ease-in-out infinite; }
        
        .polaroid { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .polaroid:hover { z-index: 50; transform: scale(1.1) rotate(0deg) !important; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }

        @keyframes scroll-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes scroll-right { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        .scroll-left { animation: scroll-left 40s linear infinite; }
        .scroll-right { animation: scroll-right 40s linear infinite; }

        .hamburger-btn span {
          display: block; position: absolute; height: 3px; width: 100%;
          background: #fff; border-radius: 9px; opacity: 1; left: 0;
          transform: rotate(0deg); transition: .25s ease-in-out;
        }
        .hamburger-btn.open span:nth-child(1) { top: 10px; transform: rotate(135deg); background: var(--pastel-lavender); }
        .hamburger-btn.open span:nth-child(2) { opacity: 0; left: -60px; }
        .hamburger-btn.open span:nth-child(3) { top: 10px; transform: rotate(-135deg); background: var(--pastel-lavender); }

        .mobile-nav-link { opacity: 0; transform: translateY(20px); transition: all 0.4s ease-out; }
        .mobile-menu-open .mobile-nav-link { opacity: 1; transform: translateY(0); }
        .mobile-menu-open .mobile-nav-link:nth-child(1) { transition-delay: 0.1s; }
        .mobile-menu-open .mobile-nav-link:nth-child(2) { transition-delay: 0.2s; }
        .mobile-menu-open .mobile-nav-link:nth-child(3) { transition-delay: 0.3s; }
        .mobile-menu-open .mobile-nav-link:nth-child(4) { transition-delay: 0.4s; }
      `}</style>
      
      {/* Background Noise */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-[0.05]" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}>
      </div>

      {/* Custom Cursor */}
      <div className="hidden md:block fixed w-2 h-2 bg-[#CDB7FF] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
           style={{ left: cursorPos.x, top: cursorPos.y }}></div>
      <div className="hidden md:block fixed w-10 h-10 border-2 border-[#CDB7FF] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ease-out"
           style={{ left: cursorPos.x, top: cursorPos.y }}></div>

      {/* 1️⃣ NAVBAR */}
      <nav className={`fixed w-full z-50 top-0 left-0 transition-all duration-300 border-b border-white/10 ${scrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-black/40 backdrop-blur-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0 cursor-pointer z-50 relative">
              <span className="font-block text-3xl neon-text-lavender tracking-wider">NEON<span className="text-white">STUDIO</span>.</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <div className="relative group">
                  <button className="font-block text-lg hover:text-[#A3CFFF] transition-colors flex items-center gap-1">
                    Services <ChevronDown className="w-4 h-4" />
                  </button>
                  {/* Dropdown */}
                  <div className="absolute left-0 mt-2 w-64 bg-[#1a1a1a] border border-white/20 chalk-border overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left">
                    {SERVICES_MENU.map((item, idx) => (
                      <a key={idx} href={`#${item.id}`} className="block px-4 py-3 text-sm hover:bg-white/10 hover:text-[#A3CFFF] transition-colors">
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
                {['Projects', 'Testimonials', 'Contact'].map(item => (
                  <a key={item} href={`#${item.toLowerCase()}`} className="font-block text-lg hover:text-[#F5A6C9] transition-colors">{item}</a>
                ))}
              </div>
            </div>

            {/* Hamburger Button */}
            <div className="-mr-2 flex md:hidden">
              <div className={`hamburger-btn w-[30px] h-[24px] relative z-[60] cursor-pointer ${mobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}>
                <span className="top-0"></span>
                <span className="top-[10px]"></span>
                <span className="top-[20px]"></span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-black/95 flex flex-col items-center justify-center space-y-10 md:hidden transition-all duration-500 ${mobileMenuOpen ? 'opacity-100 visible mobile-menu-open' : 'opacity-0 invisible'}`}>
        <div className="absolute inset-0 z-[-1] opacity-20" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")` }}></div>
        {['Services', 'Projects', 'Testimonials', 'Contact'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} onClick={toggleMobileMenu} className="mobile-nav-link font-block text-5xl text-white hover:text-[#A3CFFF] transition-all transform hover:scale-105">
            {item}
          </a>
        ))}
        <div className="mobile-nav-link mt-8 flex gap-8">
           <Instagram className="w-6 h-6 text-gray-400 hover:text-white" />
           <Twitter className="w-6 h-6 text-gray-400 hover:text-white" />
           <Linkedin className="w-6 h-6 text-gray-400 hover:text-white" />
        </div>
      </div>

      {/* 2️⃣ HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute top-1/4 left-10 md:left-20 floating-element opacity-80" style={{ animationDelay: '0s' }}>
          <CassetteTape className="w-24 h-24 text-[#F5A6C9] rotate-12" />
        </div>
        <div className="absolute bottom-1/4 right-10 md:right-32 floating-element opacity-80" style={{ animationDelay: '2s' }}>
          <MonitorSmartphone className="w-32 h-32 text-[#A3CFFF] -rotate-12" />
        </div>
        <div className="absolute top-1/3 right-10 floating-element opacity-60 blur-sm" style={{ animationDelay: '1s' }}>
          <div className="w-16 h-16 border-4 border-[#CDB7FF] rounded-full"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl mb-4 leading-tight">
            THINKING OUTSIDE<br/><span className="neon-text-lavender">THE BOX</span>
          </h1>
          <p className="font-block text-2xl md:text-3xl text-gray-300 mb-8 tracking-wide">
            DELIVERING BEYOND EXPECTATIONS.
          </p>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            We are a digital marketing agency pushing the boundaries. Not only do we craft exceptional websites, but we make sure they get <em className="text-[#F5A6C9] not-italic">found</em> through powerful SEO and strategies that drive real results.
          </p>
          <a href="#contact" className="btn-neon inline-block bg-[#CDB7FF] text-black font-block text-xl py-4 px-10 rounded-full border-2 border-transparent hover:bg-transparent hover:text-[#CDB7FF] hover:border-[#CDB7FF]">
            Let's Build Your Future
          </a>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-8 h-8 text-white/50" />
        </div>
      </section>

      {/* 3️⃣ ABOUT / APPROACH */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl mb-6">ASTRONOMICALLY CREATIVE.<br/><span className="text-[#A3CFFF]">EXCEPTIONALLY EFFECTIVE.</span></h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              From pixel-perfect designs to data-driven strategies, we deliver results out of this world. We don't just build websites – we craft digital experiences that engage, convert, and scale.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative text-center">
            {[
              { icon: Search, label: 'Audit', color: 'text-[#F5A6C9]', border: 'group-hover:border-[#F5A6C9]' },
              { icon: Compass, label: 'Strategy', color: 'text-[#A3CFFF]', border: 'group-hover:border-[#A3CFFF]' },
              { icon: Palette, label: 'Create', color: 'text-[#CDB7FF]', border: 'group-hover:border-[#CDB7FF]' },
              { icon: Rocket, label: 'Launch', color: 'text-[#FF8F8F]', border: 'group-hover:border-[#FF8F8F]' },
              { icon: TrendingUp, label: 'Scale', color: 'text-white', border: 'group-hover:border-white' }
            ].map((step, i, arr) => (
              <React.Fragment key={i}>
                <div className="flex flex-col items-center group w-full md:w-auto">
                  <div className={`w-20 h-20 border-2 border-dashed border-white/30 rounded-full flex items-center justify-center mb-4 transition-colors ${step.border}`}>
                    <step.icon className={`w-8 h-8 ${step.color}`} />
                  </div>
                  <h3 className="text-xl mb-2">{step.label}</h3>
                </div>
                {i < arr.length - 1 && (
                  <div className="text-white/20">
                    <ArrowRight className="hidden md:block w-8 h-8" />
                    <ArrowDown className="block md:hidden w-8 h-8" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* 4️⃣ SERVICES SECTION */}
      <section id="services" className="py-20 bg-white/5">
        <div className="max-w-7xl mx-auto px-6 space-y-32">
          {SERVICES_MENU.map((s, idx) => {
            const reverse = idx % 2 === 1;
            // For odd-indexed services we want the text on the left and the card on the right on md+ screens
            const imageOrder = reverse ? 'w-full md:w-1/2 order-1 md:order-2' : 'w-full md:w-1/2 order-1';
            const textOrder = reverse ? 'w-full md:w-1/2 order-2 md:order-1' : 'w-full md:w-1/2 order-2';
            const Icon = s.Icon;
            return (
              <div id={s.id} key={s.id} className="flex flex-col md:flex-row items-center gap-12 scroll-mt-24">
                <div className={imageOrder}>
                  <div className={`chalk-border p-2 bg-[#1a1a1a] ${s.rotateClass} hover:rotate-0 transition-transform duration-500`}>
                    <div className="bg-gray-800 h-64 md:h-80 flex items-center justify-center overflow-hidden relative">
                      <div className={`absolute inset-0 ${s.gradientClass}`}></div>
                      <Icon className={`w-32 h-32 ${s.iconColor}`} />
                    </div>
                  </div>
                </div>
                <div className={textOrder}>
                  <h3 className={`text-5xl ${s.headingClass} mb-6`}>{s.label}</h3>
                  <ul className="space-y-4 text-lg text-gray-300 mb-8">
                    {s.bullets.map(txt => (
                      <li key={txt} className="flex items-center gap-3"><Check className={s.iconColor} /> {txt}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5️⃣ PROJECTS SECTION */}
      <section id="projects" className="py-24 overflow-hidden relative min-h-[90vh] flex flex-col items-center justify-center">
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-5xl mb-4">RECENT PROJECTS</h2>
          <p className="text-gray-400 max-w-xl mx-auto">With 500+ projects for over 300 clients, here is a curated selection of our best work.</p>
        </div>

        <div className="relative w-full max-w-5xl h-[700px] flex items-center justify-center">
          {PROJECT_CARDS.map((p) => {
            const fullTitle = PROJECTS[p.id]?.title || '';
            const titleShort = fullTitle.split(' - ')[0]?.toUpperCase() || '';
            const subtitle = fullTitle.split(' - ')[1] || PROJECTS[p.id]?.industry || '';
            return (
              <div key={p.id} onClick={() => setActiveModal(p.id)}
                   className={`polaroid absolute bg-white p-3 shadow-2xl w-64 transform ${p.rotate} ${p.pos} ${p.z} cursor-pointer`}>
                <div className="h-40 bg-gray-900 flex items-center justify-center overflow-hidden">
                  <span className={`font-block text-3xl ${p.color}`}>{titleShort}</span>
                </div>
                <div className="pt-4 pb-2 px-2 text-black">
                  <h4 className="text-xl font-bold">{subtitle}</h4>
                  <p className="text-xs text-gray-600 mt-1">Click to view case study</p>
                </div>
              </div>
            );
          })}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-[500px] h-[500px] border border-white/5 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* PROJECT MODAL */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-[#1e1e1e] border border-white/20 max-w-3xl w-full p-8 rounded-lg relative chalk-border max-h-[90vh] overflow-y-auto shadow-2xl">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white z-50 bg-[#1e1e1e]/80 rounded-full p-1 backdrop-blur-sm transition-colors">
              <X className="w-8 h-8" />
            </button>
            <div className="mt-2">
              <h2 className="text-4xl font-block mb-2 text-white">{PROJECTS[activeModal].title}</h2>
              <span className="inline-block bg-white/10 px-3 py-1 rounded-full text-sm text-gray-300 mb-6">{PROJECTS[activeModal].industry}</span>
              {PROJECTS[activeModal].content}
            </div>
          </div>
        </div>
      )}

      {/* 6️⃣ META SECTION */}
      <section className="py-12 border-t border-b border-white/10 bg-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { val: '500+', label: 'Projects', color: 'neon-text-lavender' },
            { val: '300+', label: 'Clients', color: 'neon-text-blue' },
            { val: '97%', label: 'Satisfaction', color: 'neon-text-pink' },
            { val: '10 Yrs', label: 'Experience', color: 'neon-text-red' },
          ].map((m, i) => (
            <div key={i}>
              <span className={`block text-4xl font-block ${m.color}`}>{m.val}</span>
              <span className="text-gray-400">{m.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 7️⃣ TESTIMONIALS (MARQUEE) */}
      <section id="testimonials" className="py-24 overflow-hidden">
        <div className="text-center mb-16">
          <h2 className="text-5xl">WHAT THEY SAY</h2>
        </div>
        
        {/* Row 1 */}
        <div className="marquee-container mb-8 overflow-hidden flex w-full">
           <div className="marquee-content scroll-left flex shrink-0 gap-8 py-4">
             {TESTIMONIALS.map((t, i) => (
               <div key={i} className={`w-96 ${t.color} p-6 rounded-lg shadow-lg rotate-1 flex-shrink-0 text-black`}>
                 <p className="font-serif italic mb-4">"{t.text}"</p>
                 <div className="font-bold flex items-center gap-2"><div className="w-8 h-8 bg-black/20 rounded-full"></div> {t.author}</div>
               </div>
             ))}
              {/* Duplicate for seamless loop */}
             {TESTIMONIALS.map((t, i) => (
               <div key={`dup-${i}`} className={`w-96 ${t.color} p-6 rounded-lg shadow-lg rotate-1 flex-shrink-0 text-black`}>
                 <p className="font-serif italic mb-4">"{t.text}"</p>
                 <div className="font-bold flex items-center gap-2"><div className="w-8 h-8 bg-black/20 rounded-full"></div> {t.author}</div>
               </div>
             ))}
           </div>
        </div>

        {/* Row 2 (Reversed) */}
        <div className="marquee-container overflow-hidden flex w-full">
           <div className="marquee-content scroll-right flex shrink-0 gap-8 py-4">
             {[...TESTIMONIALS].reverse().map((t, i) => (
               <div key={i} className={`w-96 ${t.color} p-6 rounded-lg shadow-lg -rotate-1 flex-shrink-0 text-black`}>
                 <p className="font-serif italic mb-4">"{t.text}"</p>
                 <div className="font-bold flex items-center gap-2"><div className="w-8 h-8 bg-black/20 rounded-full"></div> {t.author}</div>
               </div>
             ))}
             {/* Duplicate for seamless loop */}
             {[...TESTIMONIALS].reverse().map((t, i) => (
               <div key={`dup-${i}`} className={`w-96 ${t.color} p-6 rounded-lg shadow-lg -rotate-1 flex-shrink-0 text-black`}>
                 <p className="font-serif italic mb-4">"{t.text}"</p>
                 <div className="font-bold flex items-center gap-2"><div className="w-8 h-8 bg-black/20 rounded-full"></div> {t.author}</div>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* 8️⃣ CONTACT SECTION */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-16 items-start relative z-10">
          <div className="lg:w-1/2">
            <h2 className="text-6xl text-[#FEF9A7] mb-8 font-block" style={{ textShadow: '0 0 10px #FEF9A7' }}>GOT QUESTIONS?<br/>LET'S TALK!</h2>
            <p className="text-gray-300 mb-10 text-lg">Ready to transform your digital presence? Whether you need a specific project or just want to explore possibilities, we're here to help chart your course.</p>
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-xl group cursor-pointer">
                <div className="w-12 h-12 border border-[#FF8F8F] rounded-full flex items-center justify-center group-hover:bg-[#FF8F8F] group-hover:text-black transition-all"><Phone className="w-6 h-6" /></div>
                <span className="font-block tracking-wider">CALL US DIRECTLY</span>
              </div>
              <div className="flex items-center gap-4 text-xl group cursor-pointer">
                <div className="w-12 h-12 border border-[#FF8F8F] rounded-full flex items-center justify-center group-hover:bg-[#FF8F8F] group-hover:text-black transition-all"><Mail className="w-6 h-6" /></div>
                <span className="font-block tracking-wider">EMAIL US WHENEVER</span>
              </div>
            </div>
            <div className="mt-20 relative h-64">
              <Headphones className="w-48 h-48 absolute top-0 left-0 text-gray-700 animate-pulse" />
              <div className="absolute top-10 right-20 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <Eye className="w-8 h-8 text-black" />
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">First Name</label>
                  <input type="text" name="first_name" placeholder="Jane" className="w-full bg-transparent border border-gray-600 rounded-full px-4 py-3 focus:border-[#CDB7FF] focus:outline-none transition-colors" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Last Name</label>
                  <input type="text" name="last_name" placeholder="Doe" className="w-full bg-transparent border border-gray-600 rounded-full px-4 py-3 focus:border-[#CDB7FF] focus:outline-none transition-colors" required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                   <label className="text-sm text-gray-400">Email Address</label>
                   <input type="email" name="email" placeholder="hello@example.com" className="w-full bg-transparent border border-gray-600 rounded-full px-4 py-3 focus:border-[#CDB7FF] focus:outline-none transition-colors" required />
                </div>
                <div className="space-y-2">
                   <label className="text-sm text-gray-400">Phone</label>
                   <input type="tel" name="phone" placeholder="(000) 000-0000" className="w-full bg-transparent border border-gray-600 rounded-full px-4 py-3 focus:border-[#CDB7FF] focus:outline-none transition-colors" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">How Can We Help You?</label>
                <select name="subject" className="w-full bg-transparent border border-gray-600 rounded-full px-4 py-3 focus:border-[#CDB7FF] focus:outline-none transition-colors text-white">
                  <option className="bg-gray-900" value="I need more leads (Local Business)">I need more leads (Local Business)</option>
                  <option className="bg-gray-900" value="I need better data/ROI (SaaS)">I need better data/ROI (SaaS)</option>
                  <option className="bg-gray-900" value="Non-Profit / Fundraising Support">Non-Profit / Fundraising Support</option>
                  <option className="bg-gray-900" value="General Web Design">General Web Design</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Message</label>
                <textarea name="message" rows="4" placeholder="Tell us about your project..." className="w-full bg-transparent border border-gray-600 rounded-2xl px-4 py-3 focus:border-[#CDB7FF] focus:outline-none transition-colors" required></textarea>
              </div>
              {formStatusText && (
                <div className={`text-center py-3 px-4 rounded-lg font-medium`} style={{ color: formStatusColor, backgroundColor: formStatusColor === 'green' ? 'rgba(0, 255, 0, 0.1)' : formStatusColor === 'red' ? 'rgba(255, 0, 0, 0.1)' : 'rgba(51, 239, 92, 0.1)' }}>
                  {formStatusText}
                </div>
              )}
              <div className="flex flex-col gap-3">
                <button type="submit" className="w-full bg-[#CDB7FF] text-black font-block text-xl py-4 rounded-full hover:scale-[1.02] transition-transform shadow-lg shadow-[#CDB7FF]/20 flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" /> SUBMIT
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 9️⃣ FOOTER */}
      <footer className="py-12 border-t border-white/10 text-center md:text-left">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-4">
            <span className="font-block text-2xl tracking-wider">NEON<span className="text-gray-500">STUDIO</span>.</span>
            <p className="text-gray-500 text-sm">© 2025 Neon Digital. All rights reserved.</p>
            <div className="flex gap-4 justify-center md:justify-start">
               <Instagram className="w-5 h-5 text-gray-400 hover:text-[#CDB7FF]" />
               <Twitter className="w-5 h-5 text-gray-400 hover:text-[#A3CFFF]" />
               <Linkedin className="w-5 h-5 text-gray-400 hover:text-[#F5A6C9]" />
            </div>
          </div>
          <div className="flex gap-8 text-sm font-bold text-gray-400 items-center">
            {['Services', 'Projects', 'Testimonials', 'Contact'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-white hover:underline decoration-[#CDB7FF] decoration-2 underline-offset-4 transition-all">{link}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}