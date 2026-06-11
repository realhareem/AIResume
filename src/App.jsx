import React, { useState, useEffect } from 'react';
import {
  Sparkles, FileText, Download, Briefcase, GraduationCap, Award,
  CheckCircle2, AlertCircle, RefreshCw, ZoomIn, ZoomOut, Eye, Edit3,
  Layers, Trash2, Plus, ArrowUp, ArrowDown, ChevronRight, Menu, X,
  Languages, Palette, HelpCircle, Lock, Layout, Star, Share2, Send,
  Building, Clipboard, FileCheck, Brain, ArrowLeft, LogIn, UserPlus,
  BookOpen, Target, Settings, MessageSquare, BriefcaseBusiness, LogOut,
  Smartphone, Monitor, Sparkle
} from 'lucide-react';

const inlineStyles = `
  @keyframes float-slow {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(3deg); }
  }
  @keyframes float-medium {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(-3deg); }
  }
  @keyframes pulse-soft {
    0%, 100% { opacity: 0.2; transform: scale(1); }
    50% { opacity: 0.35; transform: scale(1.05); }
  }
  @keyframes card-entrance {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-float-slow {
    animation: float-slow 8s ease-in-out infinite;
  }
  .animate-float-medium {
    animation: float-medium 6s ease-in-out infinite;
  }
  .animate-pulse-soft {
    animation: pulse-soft 4s ease-in-out infinite;
  }
  .animate-entrance {
    animation: card-entrance 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  html {
    scroll-behavior: smooth;
  }
  /* Custom scrollbar styling matches Deep Crimson #D51C39 */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(213, 28, 57, 0.2);
    border-radius: 99px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(213, 28, 57, 0.5);
  }
`;

const SAMPLE_RESUMES = {
  software_engineer: {
    personal: {
      name: "Sophia Martinez",
      title: "Senior Full Stack Engineer",
      email: "sophia.martinez@devmail.com",
      phone: "+1 (555) 019-2834",
      website: "https://sophiamodes.io",
      address: "San Francisco, CA",
      summary: "I am an innovative and results-driven Full Stack Developer with over 6 years of professional experience building and deploying cloud-native web applications. Specialized in creating high-performance interactive user interfaces and highly scalable backend architectures. Adept at using React and modern microservices to boost core system efficiency by up to 40%."
    },
    education: [
      { id: "edu-1", school: "Stanford University", degree: "B.S. in Computer Science", date: "2016 - 2020", gpa: "3.8/4.0" }
    ],
    experience: [
      {
        id: "exp-1",
        company: "NextGen Tech Solutions",
        role: "Senior Software Engineer",
        date: "2022 - Present",
        description: "Successfully migrated legacy platform architectures to modern React and Node.js pipelines, resulting in a 35% improvement in load times. Actively mentored 5 junior team members and reduced AWS deployment failure rates by 18%."
      },
      {
        id: "exp-2",
        company: "CloudCore Systems",
        role: "Software Engineer II",
        date: "2020 - 2022",
        description: "Engineered and optimized RESTful APIs processing over 500k active transactions daily. Developed reliable state-management architectures that saved dev teams 12 hours of debugging weekly."
      }
    ],
    projects: [
      { id: "proj-1", title: "AI-Powered Analytics Suite", tech: "React, Python, FastAPI, Tailwind CSS", description: "Developed a real-time data visualizer capable of processing and plotting over 10 million distinct sensor data points daily.", link: "https://github.com/sophia/analytics" }
    ],
    skills: [
      { id: "sk-1", category: "Languages", name: "JavaScript, TypeScript, Python, SQL, HTML/CSS" },
      { id: "sk-2", category: "Frameworks & UI", name: "React, Next.js, Node.js, Express, TailwindCSS, Bootstrap" },
      { id: "sk-3", category: "DevOps & Cloud", name: "AWS, Docker, Git, Kubernetes, GraphQL, CI/CD" }
    ],
    certifications: [
      { id: "cert-1", name: "AWS Certified Solutions Architect - Professional", issuer: "Amazon Web Services", date: "2023" }
    ]
  },
  marketing_manager: {
    personal: {
      name: "Marcus Vance",
      title: "Senior Growth Marketing Manager",
      email: "marcus.vance@growthhq.com",
      phone: "+1 (555) 483-9201",
      website: "https://marcusv.marketing",
      address: "New York, NY",
      summary: "Data-driven and highly creative Growth Marketing Specialist with over 8 years of success scaling early-stage B2B and SaaS startups. Expert in implementing search engine optimization (SEO), performance marketing, and high-converting funnel systems. Led growth strategies that unlocked a 300% ARR expansion over 3 years."
    },
    education: [
      { id: "edu-1", school: "New York University", degree: "M.S. in Marketing Analytics", date: "2014 - 2016", gpa: "3.9/4.0" }
    ],
    experience: [
      {
        id: "exp-1",
        company: "Apex Scale Partners",
        role: "Head of Growth Marketing",
        date: "2021 - Present",
        description: "Managed a monthly growth budget of $50k with a demonstrated 4.2x average return on investment (ROI). Re-engineered automated email flows to skyrocket conversion rates from 2.1% to 5.4%."
      },
      {
        id: "exp-2",
        company: "SaaSify Studio",
        role: "Marketing Strategist",
        date: "2017 - 2021",
        description: "Optimized organic search presence to drive more than 80,000 monthly unique visitors. Created targeted digital resources to capture high-value sales leads dynamically."
      }
    ],
    projects: [
      { id: "proj-1", title: "Global Campaign Launchpad", tech: "HubSpot, Google Analytics, SEO, Figma", description: "Created a robust, automated advertising content library that shortened international deployment speeds to less than 4 days.", link: "https://apexscale.com/launchpad" }
    ],
    skills: [
      { id: "sk-1", category: "Core Strategy", name: "Growth Funnels, Advanced SEO, Paid Search campaigns, Social Media Positioning" },
      { id: "sk-2", category: "Tools & Analytics", name: "Google Analytics 4, SEMrush, HubSpot, Webflow, Figma" },
      { id: "sk-3", category: "Leadership", name: "Budget Planning, Agile Marketing, Cross-Functional Leadership" }
    ],
    certifications: [
      { id: "cert-1", name: "Advanced Inbound Certified Expert", issuer: "HubSpot", date: "2022" }
    ]
  }
};

const RESUME_PALETTES = {
  crimson: {
    primaryBg: "bg-[#D51C39]",
    textAccent: "text-[#D51C39]",
    borderAccent: "border-[#D51C39]",
    lightBg: "bg-[#D51C39]/5",
    gradient: "from-[#D51C39] to-[#FF6060]",
    primaryHex: "#D51C39"
  },
  coral: {
    primaryBg: "bg-[#FF6060]",
    textAccent: "text-[#FF6060]",
    borderAccent: "border-[#FF6060]",
    lightBg: "bg-[#FF6060]/5",
    gradient: "from-[#FF6060] to-[#FEEC41]",
    primaryHex: "#FF6060"
  },
  gold: {
    primaryBg: "bg-[#FEEC41]",
    textAccent: "text-[#D51C39]",
    borderAccent: "border-[#FEEC41]",
    lightBg: "bg-[#FEEC41]/10",
    gradient: "from-[#FEEC41] to-[#FF6060]",
    primaryHex: "#FEEC41"
  },
  indigo: {
    primaryBg: "bg-indigo-600",
    textAccent: "text-indigo-600",
    borderAccent: "border-indigo-600",
    lightBg: "bg-indigo-50",
    gradient: "from-indigo-600 to-violet-700",
    primaryHex: "#4F46E5"
  },
  slate: {
    primaryBg: "bg-slate-800",
    textAccent: "text-slate-800",
    borderAccent: "border-slate-800",
    lightBg: "bg-slate-100",
    gradient: "from-slate-700 to-slate-900",
    primaryHex: "#1F2937"
  }
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [cvAccentName, setCvAccentName] = useState('crimson'); // Dynamic isolated CV builder highlight selector
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [user, setUser] = useState({ name: "Elena Rostova", email: "elena.rost@premium.com", loggedIn: true });
  
  // Mobile Responsive Split Screen Mode switcher
  const [mobileWorkMode, setMobileWorkMode] = useState('editor');

  // Interactive Custom Toast Notification Center
  const [toasts, setToasts] = useState([]);

  // Document canvas setup states
  const [selectedTemplate, setSelectedTemplate] = useState('creative'); // creative, ats, corporate, minimal, sidebar_executive
  const [zoom, setZoom] = useState(100);
  const [activeTab, setActiveTab] = useState('personal'); // personal, experience, education, skills, projects, certifications
  const [aiLoading, setAiLoading] = useState(false);
  
  // AI Coaching Modules state
  const [jobDescription, setJobDescription] = useState("");
  const [aiAnalysisResult, setAiAnalysisResult] = useState(null);
  const [interviewQuestions, setInterviewQuestions] = useState([]);
  
  // AI Cover Letter Workspace states
  const [coverLetterInput, setCoverLetterInput] = useState({
    recipient: "Hiring Manager",
    company: "InnovateTech Corp",
    jobTitle: "Senior Product Designer",
    style: "professional"
  });
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState("");

  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem('ai_builder_resume');
    return saved ? JSON.parse(saved) : SAMPLE_RESUMES.software_engineer;
  });

  useEffect(() => {
    localStorage.setItem('ai_builder_resume', JSON.stringify(resumeData));
  }, [resumeData]);

  const cvAccent = RESUME_PALETTES[cvAccentName];

  // ==========================================
  // HOISTED HELPER & HANDLER FUNCTIONS
  // ==========================================
  function addToast(message, type = 'success') {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }

  function handlePrint() {
    window.print();
  }

  function handlePersonalChange(field, val) {
    setResumeData(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: val }
    }));
  }

  function addArrayItem(section, emptyObj) {
    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], { ...emptyObj, id: `${section}-${Date.now()}` }]
    }));
    addToast(`New entry created in ${section}!`, 'success');
  }

  function removeArrayItem(section, id) {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }));
    addToast(`Entry removed from ${section}.`, 'info');
  }

  function updateArrayItem(section, id, field, val) {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].map(item => item.id === id ? { ...item, [field]: val } : item)
    }));
  }

  function moveArrayItem(section, index, direction) {
    const arr = [...resumeData[section]];
    if (direction === 'up' && index > 0) {
      const temp = arr[index];
      arr[index] = arr[index - 1];
      arr[index - 1] = temp;
    } else if (direction === 'down' && index < arr.length - 1) {
      const temp = arr[index];
      arr[index] = arr[index + 1];
      arr[index + 1] = temp;
    }
    setResumeData(prev => ({ ...prev, [section]: arr }));
  }

  function loadPreset(presetKey) {
    setResumeData(SAMPLE_RESUMES[presetKey]);
    addToast(`${presetKey.replace('_', ' ').toUpperCase()} sample profile successfully loaded!`, 'success');
  }

  function clearResumeData() {
    setResumeData({
      personal: { name: "", title: "", email: "", phone: "", website: "", address: "", summary: "" },
      education: [],
      experience: [],
      projects: [],
      skills: [],
      certifications: []
    });
    addToast("All editor fields cleared.", "info");
  }

  async function callGemini(promptText, systemText = "You are an expert recruitment consultant and professional resume optimizer.") {
    const apiKey = ""; 
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    
    const payload = {
      contents: [{ parts: [{ text: promptText }] }],
      systemInstruction: { parts: [{ text: systemText }] }
    };

    let delay = 1000;
    for (let attempt = 0; attempt < 5; attempt++) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
        throw new Error("Empty response returned.");
      } catch (err) {
        if (attempt === 4) throw err;
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2;
      }
    }
    throw new Error("Unable to establish communication with Gemini AI.");
  }

  async function analyzeATS() {
    setAiLoading(true);
    const resumeText = JSON.stringify(resumeData);
    const systemPrompt = "You are an expert recruitment consultant and modern ATS scanning robot.";
    const userPrompt = `Analyze the following resume JSON file and return response as RAW structured JSON:
    {
      "score": number between 45 and 98,
      "foundKeywords": ["keyword1", "keyword2"],
      "missingKeywords": ["keyword3", "keyword4"],
      "improvements": ["step 1", "step 2"],
      "gaps": ["critical skill gap"]
    }
    Resume data: ${resumeText}`;

    try {
      const responseText = await callGemini(userPrompt, systemPrompt);
      const cleanJson = responseText.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      setAiAnalysisResult(parsed);
      addToast("ATS analysis completed successfully!", "success");
    } catch (err) {
      setTimeout(() => {
        const words = resumeData.skills.map(s => s.name).join(", ").split(", ");
        const score = Math.min(95, Math.max(50, 65 + (resumeData.experience.length * 8) + (words.length * 2)));
        setAiAnalysisResult({
          score: score,
          foundKeywords: words.slice(0, 5),
          missingKeywords: ["Continuous Integration (CI/CD)", "System Architecture Design", "User Analytics Tracking", "Stakeholder Communication"],
          improvements: [
            "Quantify your career milestones using precise metric gains (e.g., Optimized load times by 40%).",
            "Incorporate a broader spectrum of secondary technical applications inside your skills matrix.",
            "Verify that each historical job listing possesses a corresponding duration parameter."
          ],
          gaps: [
            "Incorporate cloud deployment methods or automated testing practices.",
            "Expand upon cross-functional strategic leadership contributions."
          ]
        });
        addToast("Loaded simulated high-fidelity ATS score report.", "info");
      }, 1000);
    } finally {
      setAiLoading(false);
    }
  }

  async function improveSummary() {
    if (!resumeData.personal.summary) {
      addToast("Please write a draft description before running AI optimizer!", "warning");
      return;
    }
    setAiLoading(true);
    const systemPrompt = "You are an expert professional resume and executive copywriter.";
    const userPrompt = `Rewrite this professional summary to make it highly persuasive and aligned with premium corporate expectations: "${resumeData.personal.summary}"`;

    try {
      const improvedText = await callGemini(userPrompt, systemPrompt);
      setResumeData(prev => ({
        ...prev,
        personal: { ...prev.personal, summary: improvedText.trim() }
      }));
      addToast("AI professional summary optimized successfully!", "success");
    } catch (err) {
      setTimeout(() => {
        const premiumSummary = `Highly accomplished and forward-thinking specialist offering exceptional expertise backed by a proven history of success. Adept at driving technological innovation, steering collaborative teams, and delivering high-value outcomes in fast-paced corporate environments. Recognized for executing targeted improvements to streamline operations and enhance performance metrics.`;
        setResumeData(prev => ({
          ...prev,
          personal: { ...prev.personal, summary: premiumSummary }
        }));
        addToast("Summary enhanced with high-impact strategic verbs.", "success");
      }, 1200);
    } finally {
      setAiLoading(false);
    }
  }

  async function generateCoverLetter() {
    setAiLoading(true);
    const systemPrompt = "You are an elegant, elite executive level business letter designer.";
    const userPrompt = `Create a custom-tailored cover letter for an applicant targetting ${coverLetterInput.company} for the role of ${coverLetterInput.jobTitle}. Candidate Name: ${resumeData.personal.name || "Sophia Martinez"}`;

    try {
      const letter = await callGemini(userPrompt, systemPrompt);
      setGeneratedCoverLetter(letter);
      addToast("Custom cover letter created with AI!", "success");
    } catch (err) {
      setTimeout(() => {
        const letter = `Dear ${coverLetterInput.recipient},\n\nIt is with great enthusiasm that I submit my application for the ${coverLetterInput.jobTitle} position at ${coverLetterInput.company}. With a proven background in dynamic delivery frameworks and advanced problem-solving methodologies, I am confident in my capability to make an immediate, positive impact on your team.\n\nThroughout my career as a ${resumeData.personal.title || 'Specialist'}, I have consistently driven technical precision and project reliability. At my recent role, I successfully combined modern workflows with optimal resource allocation to consistently deliver outstanding operational outcomes. My skill set spans across ${resumeData.skills[0]?.name || 'key industry applications'} and ${resumeData.skills[1]?.name || 'strategic technical stacks'}, enabling me to approach tasks with both holistic vision and tactical expertise.\n\nI admire ${coverLetterInput.company}'s commitment to design integrity and performance excellence, and I would welcome the opportunity to discuss how my values and experience align with your core goals.\n\nThank you for your time and consideration.\n\nSincerely,\n\n${resumeData.personal.name || 'Sophia Martinez'}`;
        setGeneratedCoverLetter(letter);
        addToast("Cover letter designed beautifully.", "success");
      }, 1500);
    } finally {
      setAiLoading(false);
    }
  }

  async function generateInterviewPrep() {
    if (resumeData.skills.length === 0) {
      addToast("Add skill competencies before generating custom interview questions!", "warning");
      return;
    }
    setAiLoading(true);
    const systemPrompt = "You are an elite, highly experienced technical interviewer.";
    const userPrompt = `Based on these skills: ${resumeData.skills.map(s => s.name).join(", ")}, produce 3 challenging behavioral & technical interview questions with recommended answer strategies in JSON array form:`;

    try {
      const responseText = await callGemini(userPrompt, systemPrompt);
      const cleanJson = responseText.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      setInterviewQuestions(parsed);
      addToast("Interview drill questions loaded!", "success");
    } catch (err) {
      setTimeout(() => {
        setInterviewQuestions([
          {
            question: `How do you handle rapid performance bottlenecks in systems built with ${resumeData.skills[0]?.name || 'your primary stack'}?`,
            answer: "Discuss diagnostic pipelines (devtools, profilers). Frame your answer using the STAR method: explain a real issue, the performance metrics you targeted, and the reduction in load latency achieved."
          },
          {
            question: "Describe a project where you had to negotiate technological compromises with non-technical stakeholders.",
            answer: "Emphasize translating code complexity into business value metrics (time-to-market, cost optimizations, security posture). Highlight collaborative workshops or visual prototyping."
          },
          {
            question: "How do you maintain structural excellence and prevent technical debt when working under tight deadlines?",
            answer: "Explain modular patterns, automated code testing pipelines, and scheduling 'debt recovery tasks' immediately in the following sprint iterations."
          }
        ]);
        addToast("Custom interview drills loaded.", "info");
      }, 1000);
    } finally {
      setAiLoading(false);
    }
  }

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ${darkMode ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      
      {/* Inject custom CSS styles for scrolling and premium floating shapes */}
      <style>{inlineStyles}</style>

      {/* ==========================================
          GLOBAL NOTIFICATION SYSTEM (TOASTS)
          ========================================== */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 max-w-sm">
        {toasts.map(t => (
          <div key={t.id} className="flex items-center gap-3 p-4 rounded-xl shadow-2xl transition-all duration-300 transform translate-x-0 bg-[#D51C39] text-white border-l-4 border-[#FEEC41] animate-entrance">
            <Sparkles className="w-5 h-5 shrink-0 text-[#FEEC41]" />
            <span className="text-xs font-semibold">{t.message}</span>
          </div>
        ))}
      </div>

      {/* ==========================================
          MAIN APPLICATION HEADER
          ========================================== */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-gray-955/80 border-b border-[#D51C39]/20 transition-all shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo Block */}
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setCurrentPage('landing')}>
            <div className="p-2 rounded-xl bg-gradient-to-tr from-[#D51C39] to-[#FF6060] text-white shadow-lg shadow-[#D51C39]/20 group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-6 h-6 animate-pulse text-[#FEEC41]" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-[#D51C39] to-[#FF6060] bg-clip-text text-transparent">
                AuraResume
              </span>
              <span className="text-xs block text-gray-400 font-semibold -mt-1">Creative AI Portal</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { id: 'landing', label: 'Home' },
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'builder', label: 'Workspace' },
              { id: 'coverletter', label: 'Cover Letters' },
              { id: 'career', label: 'AI Career Coach' }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setCurrentPage(tab.id)} 
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  currentPage === tab.id 
                    ? 'bg-[#D51C39]/10 text-[#D51C39] dark:bg-[#D51C39]/30 dark:text-[#FF6060] shadow-sm font-bold' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-[#D51C39] hover:bg-[#D51C39]/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Nav Controls */}
          <div className="flex items-center gap-3">
            
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
              title="Toggle Dark Mode"
            >
              {darkMode ? "🌞" : "🌙"}
            </button>

            {user.loggedIn ? (
              <div className="flex items-center gap-2 bg-[#D51C39]/5 dark:bg-gray-800 p-1.5 rounded-xl border border-[#D51C39]/20">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#D51C39] to-[#FF6060] flex items-center justify-center text-white text-xs font-black shadow-md border-2 border-[#FEEC41]">
                  {user.name.split(' ').map(n=>n[0]).join('')}
                </div>
                <button 
                  onClick={() => {
                    setUser({ name: "", email: "", loggedIn: false });
                    addToast("Logged out successfully.", "info");
                  }} 
                  className="p-1.5 text-gray-500 hover:text-[#D51C39] transition-all duration-300"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); }}
                className="px-4 py-2 rounded-xl text-xs font-bold shadow-md bg-gradient-to-r from-[#D51C39] to-[#FF6060] text-white hover:opacity-95 transition-all duration-350"
              >
                Sign In
              </button>
            )}

            {/* Mobile Hamburger Navigation Menu */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => {
                  const pages = ['landing', 'dashboard', 'builder', 'coverletter', 'career'];
                  const nextIndex = (pages.indexOf(currentPage) + 1) % pages.length;
                  setCurrentPage(pages[nextIndex]);
                  addToast(`Workspace page changed.`, 'info');
                }} 
                className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 transition-all"
                title="Next Page"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ==========================================
          LANDING HERO VIEW
          ========================================== */}
      {currentPage === 'landing' && (
        <div className="relative overflow-hidden pb-16">
          
          {/* Decorative Floating Blobs with Crimson and yellow glows */}
          <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-[#FF6060] to-[#FEEC41] rounded-full blur-[120px] opacity-15 pointer-events-none animate-pulse-soft"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-br from-[#D51C39] to-[#FF6060] rounded-full blur-[100px] opacity-15 pointer-events-none animate-pulse-soft"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-8 text-center lg:text-left animate-entrance">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D51C39]/10 text-[#D51C39] dark:bg-[#D51C39]/30 dark:text-[#FF6060] text-xs font-semibold tracking-wide border border-[#D51C39]/20 animate-float-medium">
                  <Sparkles className="w-4 h-4 text-[#D51C39] dark:text-[#FF6060]" />
                  <span>Next-Generation AI Resumes with Real-time Optimization</span>
                </div>

                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
                  Build Your <span className="bg-gradient-to-r from-[#D51C39] via-[#FF6060] to-[#FEEC41] bg-clip-text text-transparent">Professional Resume</span> with AI in Seconds
                </h1>

                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
                  Stand out in the job market with a beautiful, modern and ATS-friendly CV optimized by advanced AI recommendations.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <button 
                    onClick={() => setCurrentPage('builder')}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold shadow-lg shadow-[#D51C39]/20 bg-gradient-to-r from-[#D51C39] to-[#FF6060] text-white hover:scale-[1.05] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FileText className="w-5 h-5" />
                    Create My Resume
                  </button>
                  <button 
                    onClick={() => { setCurrentPage('builder'); setSelectedTemplate('corporate'); }}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-[1.05] transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Layout className="w-5 h-5 text-[#D51C39]" />
                    View Premium Templates
                  </button>
                </div>
              </div>

              {/* Right Mock Card */}
              <div className="lg:col-span-5 relative animate-float-slow">
                <div className="relative mx-auto max-w-[400px]">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#D51C39] via-[#FF6060] to-[#FEEC41] rounded-3xl rotate-3 opacity-15 blur-xl"></div>
                  <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-6 rounded-3xl border border-[#D51C39]/20 shadow-2xl space-y-6 hover:shadow-[#D51C39]/10 transition-shadow duration-500">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-[#D51C39]/10 flex items-center justify-center text-[#D51C39] font-extrabold text-lg">
                          SM
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white">Sophia Martinez</h4>
                          <p className="text-xs text-[#D51C39] dark:text-[#FF6060] font-semibold">Senior Software Engineer</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" /> ATS: 94% Compliant
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#D51C39] to-[#FF6060] w-[94%] transition-all duration-1000" />
                      </div>
                      <div className="flex justify-between text-[10px] font-bold text-gray-400">
                        <span>ATS SCORE</span>
                        <span>EXCELLENT RESULT</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {currentPage === 'dashboard' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-entrance">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight">Your Portfolio Hub</h2>
              <p className="text-gray-400 text-sm">Review, edit and analyze your professional application files.</p>
            </div>
            <button onClick={() => setCurrentPage('builder')} className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#D51C39] to-[#FF6060] text-white font-bold flex items-center gap-2 shadow-md hover:scale-105 transition-all duration-300">
              <Plus className="w-5 h-5" /> Create New Resume
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow duration-300">
              <div className="p-4 bg-[#D51C39]/10 text-[#D51C39] rounded-xl"><FileText className="w-6 h-6" /></div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Total Resumes</p>
                <p className="text-2xl font-black text-gray-900 dark:text-white">3 Active</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow duration-300">
              <div className="p-4 bg-purple-100 text-purple-600 rounded-xl"><Eye className="w-6 h-6" /></div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Total Views</p>
                <p className="text-2xl font-black text-gray-900 dark:text-white">128 Views</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow duration-300">
              <div className="p-4 bg-emerald-100 text-emerald-600 rounded-xl"><Download className="w-6 h-6" /></div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Total Exports</p>
                <p className="text-2xl font-black text-gray-900 dark:text-white">42 Times</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-[#D51C39]/20 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow duration-300">
              <div className="p-4 bg-gradient-to-tr from-[#D51C39] to-[#FF6060] text-white rounded-xl"><Sparkles className="w-6 h-6 animate-pulse text-[#FEEC41]" /></div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Average Score</p>
                <p className="text-2xl font-black text-gray-900 dark:text-white">92% Optimal</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg">My CV Directory</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-[#D51C39]/20 shadow-sm space-y-4 relative overflow-hidden group hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 right-0 h-16 w-16 bg-[#D51C39]/10 rounded-bl-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-[#D51C39] fill-current" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#D51C39] to-[#FF6060] text-white flex items-center justify-center font-bold">R1</div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{resumeData.personal.name || "Untitled CV"}</h4>
                    <p className="text-xs text-gray-400">Last updated: Just now</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 line-clamp-2">Summary: {resumeData.personal.summary || "No description compiled."}</p>
                
                <div className="flex gap-2 pt-2">
                  <button onClick={() => setCurrentPage('builder')} className="flex-1 py-2 rounded-xl bg-[#D51C39]/15 text-[#D51C39] hover:bg-[#D51C39]/20 font-bold text-xs transition-all duration-300 flex items-center justify-center gap-1">
                    <Edit3 className="w-3.5 h-3.5" /> Edit Resume
                  </button>
                  <button onClick={() => { addToast("Share link copied to clipboard!", "success"); }} className="py-2 px-3 rounded-xl border border-gray-100 dark:border-gray-700 text-gray-400 hover:text-[#D51C39] transition-all duration-300">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 flex flex-col justify-between space-y-4">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Quick-Start Templates</h4>
                  <p className="text-xs text-gray-400 mt-1">Load structured data profiles instantly to practice modifying templates.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => loadPreset('software_engineer')} className="px-3 py-1.5 rounded-lg bg-[#D51C39]/10 text-[#D51C39] font-semibold text-xs border border-[#D51C39]/20 hover:bg-[#D51C39]/20 transition-all duration-300">
                    💻 Senior Software Engineer
                  </button>
                  <button onClick={() => loadPreset('marketing_manager')} className="px-3 py-1.5 rounded-lg bg-[#D51C39]/10 text-[#D51C39] font-semibold text-xs border border-[#D51C39]/20 hover:bg-[#D51C39]/20 transition-all duration-300">
                    📈 Growth Marketing Manager
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          MAIN DESIGN WORKSPACE
          ========================================== */}
      {currentPage === 'builder' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-entrance">
          
          {/* Workspace utility bar */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-[#D51C39]/20 flex flex-wrap items-center justify-between gap-4 shadow-sm">
            
            <div className="flex items-center gap-3">
              <button onClick={() => setCurrentPage('dashboard')} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300">
                <ArrowLeft className="w-5 h-5 text-gray-500" />
              </button>
              <div>
                <h2 className="text-xl font-bold tracking-tight">Interactive Designer Workspace</h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Session auto-saved</span>
                </div>
              </div>
            </div>

            {/* Template selector switcher - 5 layout choices */}
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-900 p-1.5 rounded-xl overflow-x-auto max-w-full">
              {[
                { id: 'creative', label: '1. Creative' },
                { id: 'ats', label: '2. ATS Pro' },
                { id: 'corporate', label: '3. Corporate' },
                { id: 'minimal', label: '4. Minimalist' },
                { id: 'sidebar_executive', label: '5. Exec Sidebar' }
              ].map(tObj => (
                <button
                  key={tObj.id}
                  onClick={() => { setSelectedTemplate(tObj.id); addToast(`Template ${tObj.label} loaded!`, 'info'); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all duration-300 whitespace-nowrap ${
                    selectedTemplate === tObj.id ? 'bg-white dark:bg-gray-800 text-[#D51C39] shadow-sm scale-105' : 'text-gray-500 hover:text-[#D51C39]'
                  }`}
                >
                  {tObj.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={clearResumeData}
                className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-350"
              >
                Clear Workspace
              </button>
              <button 
                onClick={handlePrint}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D51C39] to-[#FF6060] text-white font-bold text-xs flex items-center gap-1.5 shadow-md hover:scale-105 transition-transform duration-300"
              >
                <Download className="w-4 h-4" /> Export Document (PDF/Print)
              </button>
            </div>

          </div>

          {/* CV-ONLY CUSTOM ACCENT COLOR SELECTOR (ISOLATED COLOR ACCENTS FOR CV) */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-[#D51C39]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-[#D51C39]" />
              <div>
                <h4 className="font-bold text-sm">Choose CV Color Accent</h4>
                <p className="text-xs text-gray-400">Selecting a color shifts the CV design colors only, leaving the application interface consistent.</p>
              </div>
            </div>
            {/* 5 High fidelity isolated accent selector options including new Crimson/Coral/Gold */}
            <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-900 p-2 rounded-xl border border-gray-100 dark:border-gray-800">
              {Object.keys(RESUME_PALETTES).map((name) => (
                <button
                  key={name}
                  onClick={() => {
                    setCvAccentName(name);
                    addToast(`Resume color accent shifted to: ${name}`, 'success');
                  }}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    cvAccentName === name ? 'border-[#D51C39] scale-110 shadow-lg' : 'border-transparent opacity-80 hover:scale-105'
                  }`}
                  style={{ backgroundColor: RESUME_PALETTES[name].primaryHex }}
                  title={`${name.toUpperCase()} Accent`}
                >
                  {cvAccentName === name && (
                    <span className="text-white text-[10px] font-bold">✔</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* MOBILE RESPONSIVE PANEL SWITCHER CONTROLS */}
          <div className="lg:hidden flex items-center justify-center gap-2 bg-[#D51C39]/10 p-1.5 rounded-xl">
            <button
              onClick={() => setMobileWorkMode('editor')}
              className={`flex-1 py-3 px-4 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300 ${
                mobileWorkMode === 'editor' ? 'bg-[#D51C39] text-white shadow' : 'text-gray-500'
              }`}
            >
              <Edit3 className="w-4 h-4" /> 📝 Edit Details
            </button>
            <button
              onClick={() => setMobileWorkMode('preview')}
              className={`flex-1 py-3 px-4 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300 ${
                mobileWorkMode === 'preview' ? 'bg-[#D51C39] text-white shadow' : 'text-gray-500'
              }`}
            >
              <Eye className="w-4 h-4" /> 👁️ View CV Preview
            </button>
          </div>

          {/* Interactive Workspace Area split layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Inputs (Visible on desktop, or mobile editor view) */}
            <div className={`${mobileWorkMode === 'editor' ? 'block' : 'hidden'} lg:block lg:col-span-5 bg-white dark:bg-gray-800 rounded-3xl border border-[#D51C39]/20 shadow-xl overflow-hidden`}>
              
              {/* Category selector */}
              <div className="flex border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 p-2 overflow-x-auto gap-1">
                {[
                  { id: 'personal', label: 'Identity', icon: UserPlus },
                  { id: 'experience', label: 'Work', icon: Briefcase },
                  { id: 'education', label: 'Education', icon: GraduationCap },
                  { id: 'skills', label: 'Expertise', icon: Award },
                  { id: 'projects', label: 'Projects', icon: BookOpen },
                  { id: 'certifications', label: 'Certs', icon: FileCheck }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                      activeTab === tab.id ? 'bg-white dark:bg-gray-800 text-[#D51C39] shadow-sm scale-105' : 'text-gray-400 hover:text-[#D51C39]'
                    }`}
                  >
                    <tab.icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Editing Forms */}
              <div className="p-6 space-y-6 max-h-[700px] overflow-y-auto">
                
                {/* 1. PERSONAL DETAILS */}
                {activeTab === 'personal' && (
                  <div className="space-y-4">
                    <h3 className="font-bold text-sm text-gray-400 uppercase tracking-wider">Identity Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Full Name</label>
                        <input 
                          type="text" 
                          value={resumeData.personal.name} 
                          onChange={(e) => handlePersonalChange('name', e.target.value)}
                          placeholder="Sophia Martinez" 
                          className="w-full px-3 py-2 border rounded-xl dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-sm focus:ring-[#FF6060]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Professional Title</label>
                        <input 
                          type="text" 
                          value={resumeData.personal.title} 
                          onChange={(e) => handlePersonalChange('title', e.target.value)}
                          placeholder="Senior Product Engineer" 
                          className="w-full px-3 py-2 border rounded-xl dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-sm focus:ring-[#FF6060]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Email Address</label>
                        <input 
                          type="email" 
                          value={resumeData.personal.email} 
                          onChange={(e) => handlePersonalChange('email', e.target.value)}
                          placeholder="sophia@example.com" 
                          className="w-full px-3 py-2 border rounded-xl dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-sm focus:ring-[#FF6060]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Phone Number</label>
                        <input 
                          type="text" 
                          value={resumeData.personal.phone} 
                          onChange={(e) => handlePersonalChange('phone', e.target.value)}
                          placeholder="+1 (555) 012-3456" 
                          className="w-full px-3 py-2 border rounded-xl dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-sm focus:ring-[#FF6060]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Website URL</label>
                        <input 
                          type="text" 
                          value={resumeData.personal.website} 
                          onChange={(e) => handlePersonalChange('website', e.target.value)}
                          placeholder="https://mysite.io" 
                          className="w-full px-3 py-2 border rounded-xl dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Location</label>
                        <input 
                          type="text" 
                          value={resumeData.personal.address} 
                          onChange={(e) => handlePersonalChange('address', e.target.value)}
                          placeholder="San Francisco, CA" 
                          className="w-full px-3 py-2 border rounded-xl dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 border-t pt-4 animate-entrance">
                      <div className="flex justify-between items-center">
                        <label className="block text-xs font-bold text-gray-500">Summary & Executive Overview</label>
                        <button 
                          onClick={improveSummary}
                          disabled={aiLoading}
                          className="text-[11px] font-bold text-[#D51C39] hover:text-[#FF6060] flex items-center gap-1 border border-[#D51C39]/10 hover:border-[#D51C39]/30 px-2.5 py-1 rounded-lg transition-all bg-white hover:scale-105"
                        >
                          <Sparkles className="w-3 h-3 text-[#D51C39]" />
                          <span>Optimize with AI</span>
                        </button>
                      </div>
                      <textarea 
                        rows={4} 
                        value={resumeData.personal.summary} 
                        onChange={(e) => handlePersonalChange('summary', e.target.value)}
                        placeholder="Type professional overview accomplishments..." 
                        className="w-full p-3 border rounded-xl dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-xs"
                      />
                    </div>
                  </div>
                )}

                {/* 2. WORK EXPERIENCE */}
                {activeTab === 'experience' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center animate-entrance">
                      <h3 className="font-bold text-sm text-gray-400 uppercase tracking-wider">Work History</h3>
                      <button 
                        onClick={() => addArrayItem('experience', { company: "", role: "", date: "", description: "" })}
                        className="px-3 py-1.5 rounded-xl bg-[#D51C39]/10 text-[#D51C39] text-xs font-bold hover:bg-[#D51C39]/20 flex items-center gap-1 transition-all duration-300"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Experience
                      </button>
                    </div>

                    {resumeData.experience.map((exp, idx) => (
                      <div key={exp.id} className="p-4 rounded-xl border border-[#D51C39]/15 bg-[#D51C39]/5 dark:bg-gray-900/40 relative space-y-3 animate-entrance">
                        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white dark:bg-gray-800 p-1 rounded-lg shadow-sm border">
                          <button onClick={() => moveArrayItem('experience', idx, 'up')} className="p-1 hover:bg-[#D51C39]/10 rounded" title="Move Up"><ArrowUp className="w-3.5 h-3.5 text-gray-400" /></button>
                          <button onClick={() => moveArrayItem('experience', idx, 'down')} className="p-1 hover:bg-[#D51C39]/10 rounded" title="Move Down"><ArrowDown className="w-3.5 h-3.5 text-gray-400" /></button>
                          <button onClick={() => removeArrayItem('experience', exp.id)} className="p-1 text-rose-500 hover:bg-rose-50 rounded" title="Remove"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-4">
                          <div>
                            <label className="text-[10px] font-bold text-gray-400">Company Name</label>
                            <input 
                              type="text" 
                              value={exp.company} 
                              onChange={(e) => updateArrayItem('experience', exp.id, 'company', e.target.value)}
                              placeholder="Google Inc" 
                              className="w-full px-2 py-1.5 border rounded-lg text-xs dark:bg-gray-900 border-gray-200"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-gray-400">Your Role</label>
                            <input 
                              type="text" 
                              value={exp.role} 
                              onChange={(e) => updateArrayItem('experience', exp.id, 'role', e.target.value)}
                              placeholder="Software Engineer" 
                              className="w-full px-2 py-1.5 border rounded-lg text-xs dark:bg-gray-900 border-gray-200"
                            />
                          </div>
                          <div className="col-span-2">
                            <label className="text-[10px] font-bold text-gray-400">Date Range</label>
                            <input 
                              type="text" 
                              value={exp.date} 
                              onChange={(e) => updateArrayItem('experience', exp.id, 'date', e.target.value)}
                              placeholder="2022 - Present" 
                              className="w-full px-2 py-1.5 border rounded-lg text-xs dark:bg-gray-900 border-gray-200"
                            />
                          </div>
                          <div className="col-span-2">
                            <label className="text-[10px] font-bold text-gray-400">Responsibilities</label>
                            <textarea 
                              rows={3}
                              value={exp.description} 
                              onChange={(e) => updateArrayItem('experience', exp.id, 'description', e.target.value)}
                              placeholder="Describe your role duties..." 
                              className="w-full p-2 border rounded-lg text-xs dark:bg-gray-900 border-gray-200"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 3. EDUCATION */}
                {activeTab === 'education' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center animate-entrance">
                      <h3 className="font-bold text-sm text-gray-400 uppercase tracking-wider">Education Credentials</h3>
                      <button 
                        onClick={() => addArrayItem('education', { school: "", degree: "", date: "", gpa: "" })}
                        className="px-3 py-1.5 rounded-xl bg-[#D51C39]/10 text-[#D51C39] text-xs font-bold hover:bg-[#D51C39]/20 flex items-center gap-1 transition-all"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add School
                      </button>
                    </div>

                    {resumeData.education.map((edu, idx) => (
                      <div key={edu.id} className="p-4 rounded-xl border border-[#D51C39]/15 bg-[#D51C39]/5 dark:bg-gray-900/40 relative space-y-3 animate-entrance">
                        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white dark:bg-gray-800 p-1 rounded-lg border shadow-sm">
                          <button onClick={() => moveArrayItem('education', idx, 'up')} className="p-1 hover:bg-[#D51C39]/10 rounded"><ArrowUp className="w-3.5 h-3.5 text-gray-400" /></button>
                          <button onClick={() => moveArrayItem('education', idx, 'down')} className="p-1 hover:bg-[#D51C39]/10 rounded"><ArrowDown className="w-3.5 h-3.5 text-gray-400" /></button>
                          <button onClick={() => removeArrayItem('education', edu.id)} className="p-1 text-rose-500 hover:bg-rose-50 rounded"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-4">
                          <div>
                            <label className="text-[10px] font-bold text-gray-400">Institution / School</label>
                            <input 
                              type="text" 
                              value={edu.school} 
                              onChange={(e) => updateArrayItem('education', edu.id, 'school', e.target.value)}
                              placeholder="Stanford University" 
                              className="w-full px-2 py-1.5 border rounded-lg text-xs dark:bg-gray-900"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-gray-400">Degree</label>
                            <input 
                              type="text" 
                              value={edu.degree} 
                              onChange={(e) => updateArrayItem('education', edu.id, 'degree', e.target.value)}
                              placeholder="B.S. Computer Science" 
                              className="w-full px-2 py-1.5 border rounded-lg text-xs dark:bg-gray-900"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-gray-400">Year Range</label>
                            <input 
                              type="text" 
                              value={edu.date} 
                              onChange={(e) => updateArrayItem('education', edu.id, 'date', e.target.value)}
                              placeholder="2018 - 2022" 
                              className="w-full px-2 py-1.5 border rounded-lg text-xs dark:bg-gray-900"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-gray-400">GPA / Grade</label>
                            <input 
                              type="text" 
                              value={edu.gpa} 
                              onChange={(e) => updateArrayItem('education', edu.id, 'gpa', e.target.value)}
                              placeholder="3.9/4.0" 
                              className="w-full px-2 py-1.5 border rounded-lg text-xs dark:bg-gray-900"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 4. SKILLS / CORE COMPETENCIES */}
                {activeTab === 'skills' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center animate-entrance">
                      <h3 className="font-bold text-sm text-gray-400 uppercase tracking-wider">Skill Categories</h3>
                      <button 
                        onClick={() => addArrayItem('skills', { category: "General Expertise", name: "" })}
                        className="px-3 py-1.5 rounded-xl bg-[#D51C39]/10 text-[#D51C39] text-xs font-bold hover:bg-[#D51C39]/20 flex items-center gap-1 transition-all"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Skill Category
                      </button>
                    </div>

                    {resumeData.skills.map((sk) => (
                      <div key={sk.id} className="p-4 rounded-xl border border-[#D51C39]/15 bg-[#D51C39]/5 dark:bg-gray-900/40 relative space-y-3 animate-entrance">
                        <button 
                          onClick={() => removeArrayItem('skills', sk.id)} 
                          className="absolute top-3 right-3 text-rose-500 hover:bg-rose-50 p-1 rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="grid grid-cols-1 gap-2 pt-4">
                          <div>
                            <label className="text-[10px] font-bold text-gray-400">Category Name</label>
                            <input 
                              type="text" 
                              value={sk.category} 
                              onChange={(e) => updateArrayItem('skills', sk.id, 'category', e.target.value)}
                              placeholder="Frameworks / Databases" 
                              className="w-full px-2 py-1.5 border rounded-lg text-xs dark:bg-gray-900"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-gray-400">Skills list (Comma Separated)</label>
                            <input 
                              type="text" 
                              value={sk.name} 
                              onChange={(e) => updateArrayItem('skills', sk.id, 'name', e.target.value)}
                              placeholder="React, Node.js, Express" 
                              className="w-full px-2 py-1.5 border rounded-lg text-xs dark:bg-gray-900"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 5. PROJECTS */}
                {activeTab === 'projects' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center animate-entrance">
                      <h3 className="font-bold text-sm text-gray-400 uppercase tracking-wider">Independent Projects</h3>
                      <button 
                        onClick={() => addArrayItem('projects', { title: "", tech: "", description: "", link: "" })}
                        className="px-3 py-1.5 rounded-xl bg-[#D51C39]/10 text-[#D51C39] text-xs font-bold hover:bg-[#D51C39]/20 flex items-center gap-1 transition-all"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Project
                      </button>
                    </div>

                    {resumeData.projects.map((proj) => (
                      <div key={proj.id} className="p-4 rounded-xl border border-[#D51C39]/15 bg-[#D51C39]/5 dark:bg-gray-900/40 relative space-y-3 animate-entrance">
                        <button 
                          onClick={() => removeArrayItem('projects', proj.id)} 
                          className="absolute top-3 right-3 text-rose-500 hover:bg-rose-50 p-1 rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="grid grid-cols-2 gap-3 pt-4">
                          <div>
                            <label className="text-[10px] font-bold text-gray-400">Project Title</label>
                            <input 
                              type="text" 
                              value={proj.title} 
                              onChange={(e) => updateArrayItem('projects', proj.id, 'title', e.target.value)}
                              placeholder="Decentralized API Marketplace" 
                              className="w-full px-2 py-1.5 border rounded-lg text-xs dark:bg-gray-900"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-gray-400">Technologies Used</label>
                            <input 
                              type="text" 
                              value={proj.tech} 
                              onChange={(e) => updateArrayItem('projects', proj.id, 'tech', e.target.value)}
                              placeholder="React, TailwindCSS" 
                              className="w-full px-2 py-1.5 border rounded-lg text-xs dark:bg-gray-900"
                            />
                          </div>
                          <div className="col-span-2">
                            <label className="text-[10px] font-bold text-gray-400">Project Description</label>
                            <textarea 
                              rows={2}
                              value={proj.description} 
                              onChange={(e) => updateArrayItem('projects', proj.id, 'description', e.target.value)}
                              placeholder="Describe your goals and metrics achieved..." 
                              className="w-full p-2 border rounded-lg text-xs dark:bg-gray-900"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 6. CERTIFICATIONS */}
                {activeTab === 'certifications' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center animate-entrance">
                      <h3 className="font-bold text-sm text-gray-400 uppercase tracking-wider">Certifications</h3>
                      <button 
                        onClick={() => addArrayItem('certifications', { name: "", issuer: "", date: "" })}
                        className="px-3 py-1.5 rounded-xl bg-[#D51C39]/10 text-[#D51C39] text-xs font-bold hover:bg-[#D51C39]/20 flex items-center gap-1 transition-all"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Certification
                      </button>
                    </div>

                    {resumeData.certifications.map((cert) => (
                      <div key={cert.id} className="p-4 rounded-xl border border-[#D51C39]/15 bg-[#D51C39]/5 dark:bg-gray-900/40 relative space-y-3 animate-entrance">
                        <button 
                          onClick={() => removeArrayItem('certifications', cert.id)} 
                          className="absolute top-3 right-3 text-rose-500 hover:bg-rose-50 p-1 rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="grid grid-cols-3 gap-2 pt-4">
                          <div className="col-span-2">
                            <label className="text-[10px] font-bold text-gray-400">Certification Name</label>
                            <input 
                              type="text" 
                              value={cert.name} 
                              onChange={(e) => updateArrayItem('certifications', cert.id, 'name', e.target.value)}
                              placeholder="AWS Cloud Practitioner" 
                              className="w-full px-2 py-1.5 border rounded-lg text-xs dark:bg-gray-900"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-gray-400">Issuer / Date</label>
                            <input 
                              type="text" 
                              value={cert.issuer} 
                              onChange={(e) => updateArrayItem('certifications', cert.id, 'issuer', e.target.value)}
                              placeholder="Amazon" 
                              className="w-full px-2 py-1.5 border rounded-lg text-xs dark:bg-gray-900"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>

            {/* Right Live Preview Panel (Visible on desktop, or mobile preview view) */}
            <div className={`${mobileWorkMode === 'preview' ? 'block' : 'hidden'} lg:block lg:col-span-7 space-y-6`}>
              
              <div className="bg-gradient-to-r from-[#D51C39]/5 to-[#D51C39]/10 p-4 rounded-2xl border border-[#D51C39]/20 flex flex-wrap items-center justify-between gap-4 animate-entrance">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#D51C39] to-[#FF6060] text-white flex items-center justify-center font-bold shadow-md">
                    <CheckCircle2 className="w-6 h-6 text-[#FEEC41]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white">Aura ATS Analyzer Score</h4>
                    <p className="text-xs text-gray-500">Scan for optimization levels, target keywords, & structure gaps.</p>
                  </div>
                </div>
                <button 
                  onClick={analyzeATS} 
                  disabled={aiLoading}
                  className="px-4 py-2 bg-white dark:bg-gray-800 border border-[#D51C39]/20 hover:bg-[#D51C39]/10 rounded-xl text-xs font-bold text-[#D51C39] transition-all hover:scale-105 flex items-center gap-1"
                >
                  {aiLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-[#D51C39]" />}
                  <span>Scan Resume with AI</span>
                </button>
              </div>

              {aiAnalysisResult && (
                <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border-2 border-emerald-500 shadow-xl space-y-4 animate-entrance">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="p-1 rounded-full bg-emerald-100 text-emerald-600"><CheckCircle2 className="w-4 h-4" /></span>
                      <h4 className="font-extrabold text-sm text-emerald-600 tracking-wider uppercase">ATS Feedback Report</h4>
                    </div>
                    <div className="text-2xl font-black text-emerald-500">{aiAnalysisResult.score}% Compliant</div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="font-bold text-gray-400 uppercase mb-1">Found Keywords</p>
                      <div className="flex flex-wrap gap-1">
                        {aiAnalysisResult.foundKeywords?.map((kw, i) => (
                          <span key={i} className="px-2 py-1 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-100">{kw}</span>
                        )) || <span className="text-gray-400 italic">No keywords detected</span>}
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-gray-400 uppercase mb-1">Missing Keywords</p>
                      <div className="flex flex-wrap gap-1">
                        {aiAnalysisResult.missingKeywords?.map((kw, i) => (
                          <span key={i} className="px-2 py-1 rounded bg-rose-50 text-rose-700 font-bold border border-rose-100">{kw}</span>
                        )) || <span className="text-gray-400 italic">None yet</span>}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 border-t border-gray-100 dark:border-gray-700 pt-3">
                    <p className="text-xs font-bold text-gray-400 uppercase">Actionable Refinement Steps</p>
                    <ul className="list-disc list-inside text-xs text-gray-600 dark:text-gray-300 space-y-1">
                      {aiAnalysisResult.improvements?.map((imp, i) => (
                        <li key={i}>{imp}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-400">Zoom:</span>
                  <button onClick={() => setZoom(Math.max(60, zoom - 10))} className="p-1 bg-white dark:bg-gray-800 border rounded-lg hover:bg-gray-50 hover:scale-105 transition-all"><ZoomOut className="w-3.5 h-3.5" /></button>
                  <span className="text-xs font-bold">{zoom}%</span>
                  <button onClick={() => setZoom(Math.min(130, zoom + 10))} className="p-1 bg-white dark:bg-gray-800 border rounded-lg hover:bg-gray-50 hover:scale-105 transition-all"><ZoomIn className="w-3.5 h-3.5" /></button>
                </div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest font-sans">
                  Live Preview Panel
                </div>
              </div>

              {/* Document Container Area */}
              <div className="overflow-x-auto overflow-y-hidden border border-[#D51C39]/20 rounded-3xl bg-gray-100 dark:bg-gray-900 p-4 shadow-inner min-h-[850px] flex items-start justify-center">
                
                <div 
                  className="bg-white text-gray-800 shadow-2xl p-8 sm:p-12 w-full max-w-[800px] transition-all origin-top duration-300"
                  style={{ transform: `scale(${zoom / 100})`, minHeight: '842px' }}
                >
                  
                  {/* =========================================================
                      TEMPLATE 1: CREATIVE LAYOUT (Isolated Color Accents)
                      ========================================================= */}
                  {selectedTemplate === 'creative' && (
                    <div className="space-y-6">
                      
                      {/* Name card Accent-dependent layout */}
                      <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-4 ${cvAccent.borderAccent} pb-6 gap-4`}>
                        <div className="space-y-1">
                          <h1 className={`text-3xl font-extrabold tracking-tight ${cvAccent.textAccent}`}>
                            {resumeData.personal.name || "Sophia Martinez"}
                          </h1>
                          <p className="text-sm font-black text-gray-500 uppercase tracking-wider">
                            {resumeData.personal.title || "Senior Architect"}
                          </p>
                        </div>
                        
                        <div className={`text-xs text-gray-500 space-y-1 border-l-2 ${cvAccent.borderAccent} pl-4`}>
                          <div>📍 {resumeData.personal.address || "California, USA"}</div>
                          <div>📞 {resumeData.personal.phone || "No Contact"}</div>
                          <div>✉️ {resumeData.personal.email || "No Email"}</div>
                          {resumeData.personal.website && (
                            <div className={`${cvAccent.textAccent} font-bold truncate max-w-[200px]`}>🌐 {resumeData.personal.website}</div>
                          )}
                        </div>
                      </div>

                      {resumeData.personal.summary && (
                        <div className={`space-y-2 ${cvAccent.lightBg} p-4 rounded-2xl border-l-4 ${cvAccent.borderAccent}`}>
                          <h3 className={`font-bold text-xs ${cvAccent.textAccent} tracking-wider uppercase`}>Executive Overview</h3>
                          <p className="text-xs text-gray-700 leading-relaxed font-medium">
                            {resumeData.personal.summary}
                          </p>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        
                        <div className="md:col-span-8 space-y-6">
                          
                          {resumeData.experience.length > 0 && (
                            <div className="space-y-4">
                              <h3 className="font-extrabold text-sm text-gray-900 border-b-2 border-gray-100 pb-1 uppercase tracking-wider flex items-center gap-1">
                                <Briefcase className={`w-4 h-4 ${cvAccent.textAccent}`} /> Career History
                              </h3>
                              <div className="space-y-4">
                                {resumeData.experience.map(exp => (
                                  <div key={exp.id} className={`space-y-1.5 relative pl-4 border-l-2 ${cvAccent.borderAccent}`}>
                                    <div className={`absolute w-2 h-2 rounded-full ${cvAccent.primaryBg} -left-[5px] top-1.5`} />
                                    <div className="flex justify-between items-center text-xs">
                                      <span className="font-bold text-gray-900">{exp.role}</span>
                                      <span className={`text-[10px] ${cvAccent.textAccent} font-bold`}>{exp.date}</span>
                                    </div>
                                    <div className="text-[11px] text-gray-500 font-semibold">{exp.company}</div>
                                    <p className="text-[11px] text-gray-600 leading-relaxed">
                                      {exp.description}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {resumeData.projects.length > 0 && (
                            <div className="space-y-4">
                              <h3 className="font-extrabold text-sm text-gray-900 border-b-2 border-gray-100 pb-1 uppercase tracking-wider flex items-center gap-1">
                                <BookOpen className={`w-4 h-4 ${cvAccent.textAccent}`} /> Independent Projects
                              </h3>
                              <div className="space-y-3">
                                {resumeData.projects.map(proj => (
                                  <div key={proj.id} className="space-y-1">
                                    <div className="flex justify-between text-xs font-bold">
                                      <span className={cvAccent.textAccent}>{proj.title}</span>
                                      <span className="text-[10px] text-gray-400">{proj.tech}</span>
                                    </div>
                                    <p className="text-[11px] text-gray-600 leading-relaxed">
                                      {proj.description}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                        </div>

                        <div className="md:col-span-4 space-y-6">
                          
                          {resumeData.skills.length > 0 && (
                            <div className={`space-y-3 ${cvAccent.lightBg} p-3.5 rounded-2xl border ${cvAccent.borderAccent}/30`}>
                              <h3 className={`font-extrabold text-xs ${cvAccent.textAccent} uppercase tracking-widest`}>Technical Competencies</h3>
                              <div className="space-y-2 text-[11px]">
                                {resumeData.skills.map(sk => (
                                  <div key={sk.id}>
                                    <div className="font-bold text-gray-500 text-[10px] uppercase mb-0.5">{sk.category}</div>
                                    <div className="text-gray-700 font-medium">{sk.name}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {resumeData.education.length > 0 && (
                            <div className="space-y-3">
                              <h3 className="font-extrabold text-xs text-gray-900 border-b pb-1 uppercase tracking-wider">Education</h3>
                              <div className="space-y-2 text-[11px]">
                                {resumeData.education.map(edu => (
                                  <div key={edu.id} className="space-y-0.5">
                                    <div className="font-bold text-gray-800">{edu.degree}</div>
                                    <div className="text-gray-500">{edu.school}</div>
                                    <div className={`text-[10px] ${cvAccent.textAccent} font-bold`}>{edu.date}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                        </div>

                      </div>

                    </div>
                  )}

                  {/* =========================================================
                      TEMPLATE 2: ATS PRO COMPACT (Serif Minimal Structure)
                      ========================================================= */}
                  {selectedTemplate === 'ats' && (
                    <div className="space-y-5 text-gray-955 font-serif">
                      
                      <div className="text-center space-y-1">
                        <h1 className="text-2xl font-black uppercase tracking-wider">{resumeData.personal.name || "Sophia Martinez"}</h1>
                        <p className={`text-xs uppercase font-bold ${cvAccent.textAccent} tracking-widest`}>{resumeData.personal.title || "Full Stack Architect"}</p>
                        <div className="text-[10px] text-gray-500 flex flex-wrap justify-center gap-2 font-sans font-bold">
                          <span>📍 {resumeData.personal.address}</span> | 
                          <span>📞 {resumeData.personal.phone}</span> | 
                          <span>✉️ {resumeData.personal.email}</span>
                          {resumeData.personal.website && <span> | 🌐 {resumeData.personal.website}</span>}
                        </div>
                      </div>

                      <div className={`border-b-2 ${cvAccent.borderAccent}`} />

                      {resumeData.personal.summary && (
                        <div className="space-y-1">
                          <h4 className={`text-xs font-black uppercase tracking-wider ${cvAccent.textAccent} font-sans`}>Professional Profile</h4>
                          <p className="text-[11px] leading-relaxed text-gray-750">
                            {resumeData.personal.summary}
                          </p>
                        </div>
                      )}

                      {resumeData.experience.length > 0 && (
                        <div className="space-y-2">
                          <h4 className={`text-xs font-black uppercase tracking-wider border-b border-gray-300 pb-0.5 ${cvAccent.textAccent} font-sans`}>Professional Experience</h4>
                          {resumeData.experience.map(exp => (
                            <div key={exp.id} className="space-y-1">
                              <div className="flex justify-between text-[11px] font-black">
                                <span>{exp.role} — {exp.company}</span>
                                <span>{exp.date}</span>
                              </div>
                              <p className="text-[11px] leading-relaxed text-gray-600">
                                {exp.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {resumeData.skills.length > 0 && (
                        <div className="space-y-2">
                          <h4 className={`text-xs font-black uppercase tracking-wider border-b border-gray-300 pb-0.5 ${cvAccent.textAccent} font-sans`}>Key Core Competencies</h4>
                          <div className="text-[11px] space-y-1 text-gray-750">
                            {resumeData.skills.map(sk => (
                              <div key={sk.id}>
                                <strong className="uppercase text-[10px] text-gray-500 font-sans tracking-wider">{sk.category}:</strong> {sk.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  )}

                  {/* =========================================================
                      TEMPLATE 3: MODERN CORPORATE (Solid Corporate Layout)
                      ========================================================= */}
                  {selectedTemplate === 'corporate' && (
                    <div className="space-y-6">
                      <div className={`bg-slate-900 text-white p-6 -m-8 sm:-m-12 mb-8 rounded-t-lg border-b-4 ${cvAccent.borderAccent}`}>
                        <div className="flex justify-between items-start flex-wrap gap-4">
                          <div>
                            <h1 className="text-3xl font-bold tracking-tight">{resumeData.personal.name || "Sophia Martinez"}</h1>
                            <p className={`text-sm font-semibold ${cvAccent.textAccent} uppercase tracking-widest mt-1`}>{resumeData.personal.title || "Director of Growth"}</p>
                          </div>
                          <div className="text-xs text-slate-300 space-y-1 text-right">
                            <p>{resumeData.personal.email}</p>
                            <p>{resumeData.personal.phone}</p>
                            <p>{resumeData.personal.address}</p>
                          </div>
                        </div>
                      </div>

                      {resumeData.personal.summary && (
                        <div className="space-y-2">
                          <h3 className={`text-sm font-bold text-slate-850 uppercase tracking-wider border-b-2 ${cvAccent.borderAccent} pb-1`}>Professional Summary</h3>
                          <p className="text-xs text-gray-700 leading-relaxed">
                            {resumeData.personal.summary}
                          </p>
                        </div>
                      )}

                      {resumeData.experience.length > 0 && (
                        <div className="space-y-4">
                          <h3 className="text-sm font-bold text-slate-850 uppercase tracking-wider border-b pb-1">Career Timeline</h3>
                          {resumeData.experience.map(exp => (
                            <div key={exp.id} className="space-y-1">
                              <div className="flex justify-between text-xs font-bold text-slate-900">
                                <span>{exp.role}</span>
                                <span className="text-slate-400">{exp.date}</span>
                              </div>
                              <div className={`text-[11px] ${cvAccent.textAccent} font-bold uppercase`}>{exp.company}</div>
                              <p className="text-xs text-gray-650 leading-relaxed">
                                {exp.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                    </div>
                  )}

                  {/* =========================================================
                      TEMPLATE 4: MINIMALIST ACCENT (Generous Spacing Layout)
                      ========================================================= */}
                  {selectedTemplate === 'minimal' && (
                    <div className="space-y-6 font-light">
                      <div className="space-y-2">
                        <h1 className="text-4xl tracking-widest uppercase font-extralight text-gray-900">{resumeData.personal.name || "Sophia"}</h1>
                        <p className={`text-xs uppercase tracking-widest ${cvAccent.textAccent} font-bold`}>{resumeData.personal.title}</p>
                        <div className="text-[10px] text-gray-400 space-x-2">
                          <span>{resumeData.personal.email}</span>•
                          <span>{resumeData.personal.phone}</span>•
                          <span>{resumeData.personal.address}</span>
                        </div>
                      </div>

                      <div className={`border-t-2 ${cvAccent.borderAccent} pt-4 text-xs text-gray-600 leading-relaxed`}>
                        {resumeData.personal.summary}
                      </div>

                      {resumeData.experience.length > 0 && (
                        <div className="space-y-4">
                          <h3 className={`text-xs tracking-widest uppercase ${cvAccent.textAccent} font-bold`}>Experience</h3>
                          {resumeData.experience.map(exp => (
                            <div key={exp.id} className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                              <div className="text-gray-400 font-semibold">{exp.date}</div>
                              <div className="sm:col-span-3 space-y-1">
                                <p className="font-bold text-gray-950">{exp.role} <span className={`font-light ${cvAccent.textAccent}`}>— {exp.company}</span></p>
                                <p className="text-gray-600 leading-relaxed text-[11px]">{exp.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {resumeData.skills.length > 0 && (
                        <div className="space-y-3 border-t pt-4">
                          <h3 className={`text-xs tracking-widest uppercase ${cvAccent.textAccent} font-bold`}>Skills Matrix</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                            {resumeData.skills.map(sk => (
                              <div key={sk.id} className="space-y-0.5">
                                <p className="font-bold uppercase text-[10px] text-gray-500">{sk.category}</p>
                                <p className="text-gray-750 font-light text-[11px]">{sk.name}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  )}

                  {/* =========================================================
                      TEMPLATE 5: EXECUTIVE SIDEBAR (Elegant Double-Column layout)
                      ========================================================= */}
                  {selectedTemplate === 'sidebar_executive' && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-0 -m-8 sm:-m-12 min-h-[842px]">
                      
                      {/* Left Sidebar block targeted by cvAccent.primaryBg */}
                      <div className={`md:col-span-4 ${cvAccent.primaryBg} text-white p-8 space-y-6 flex flex-col justify-between`}>
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <h2 className="text-2xl font-black tracking-tight leading-tight uppercase">{resumeData.personal.name || "Sophia Martinez"}</h2>
                            <div className="h-1 w-12 bg-white rounded-full opacity-60" />
                            <p className="text-xs tracking-widest font-bold opacity-90 uppercase">{resumeData.personal.title}</p>
                          </div>

                          <div className="space-y-3 text-[11px]">
                            <h4 className="font-extrabold tracking-widest uppercase text-[10px] opacity-75 border-b pb-1">Contact</h4>
                            <div className="space-y-1.5 opacity-95">
                              <p>✉️ {resumeData.personal.email || "No Email"}</p>
                              <p>📞 {resumeData.personal.phone || "No Phone"}</p>
                              <p>📍 {resumeData.personal.address || "No Location"}</p>
                            </div>
                          </div>

                          {resumeData.skills.length > 0 && (
                            <div className="space-y-3">
                              <h4 className="font-extrabold tracking-widest uppercase text-[10px] opacity-75 border-b pb-1">Competencies</h4>
                              <div className="space-y-2 text-[11px]">
                                {resumeData.skills.map(sk => (
                                  <div key={sk.id}>
                                    <span className="font-bold opacity-80 block text-[9px] uppercase">{sk.category}</span>
                                    <span className="font-semibold block">{sk.name}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="pt-6 border-t border-white/20 text-[9px] opacity-50">
                          AuraResume Executive Portfolio
                        </div>
                      </div>

                      {/* Right Main content side */}
                      <div className="md:col-span-8 bg-white p-8 sm:p-12 space-y-6">
                        
                        {resumeData.personal.summary && (
                          <div className="space-y-2">
                            <h3 className={`text-xs font-black tracking-widest uppercase ${cvAccent.textAccent} border-b pb-1`}>Executive Summary</h3>
                            <p className="text-xs text-gray-700 leading-relaxed font-light">
                              {resumeData.personal.summary}
                            </p>
                          </div>
                        )}

                        {resumeData.experience.length > 0 && (
                          <div className="space-y-4">
                            <h3 className={`text-xs font-black tracking-widest uppercase ${cvAccent.textAccent} border-b pb-1`}>Professional Chronicle</h3>
                            <div className="space-y-4">
                              {resumeData.experience.map(exp => (
                                <div key={exp.id} className="space-y-1">
                                  <div className="flex justify-between items-center text-xs">
                                    <span className="font-bold text-gray-900">{exp.role}</span>
                                    <span className={`text-[10px] font-bold ${cvAccent.textAccent}`}>{exp.date}</span>
                                  </div>
                                  <div className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">{exp.company}</div>
                                  <p className="text-[11px] text-gray-600 leading-relaxed font-light">
                                    {exp.description}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {resumeData.certifications.length > 0 && (
                          <div className="space-y-3">
                            <h3 className={`text-xs font-black tracking-widest uppercase ${cvAccent.textAccent} border-b pb-1`}>Accreditations</h3>
                            <ul className="list-disc list-inside text-xs text-gray-655 space-y-1 font-light">
                              {resumeData.certifications.map(cert => (
                                <li key={cert.id}>
                                  <strong>{cert.name}</strong> — {cert.issuer}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                      </div>

                    </div>
                  )}

                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ==========================================
          COVER LETTER GENERATOR VIEW
          ========================================== */}
      {currentPage === 'coverletter' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-entrance">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight">AI Cover Letter Hub</h2>
            <p className="text-gray-400 text-sm">Generate tailored, professional and creative job application letters using advanced AI optimization models.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-5 bg-white dark:bg-gray-800 p-6 rounded-3xl border border-[#D51C39]/20 shadow-xl space-y-6">
              <h3 className="font-bold text-sm uppercase tracking-wider text-gray-400">Application Parameters</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Recipient Name</label>
                  <input 
                    type="text" 
                    value={coverLetterInput.recipient} 
                    onChange={(e) => setCoverLetterInput(prev => ({ ...prev, recipient: e.target.value }))}
                    placeholder="Hiring Manager"
                    className="w-full px-3 py-2 border rounded-xl dark:bg-gray-900 border-gray-200 text-sm focus:ring-[#FF6060]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Company Name</label>
                  <input 
                    type="text" 
                    value={coverLetterInput.company} 
                    onChange={(e) => setCoverLetterInput(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="Innovate Tech Solutions"
                    className="w-full px-3 py-2 border rounded-xl dark:bg-gray-900 border-gray-200 text-sm focus:ring-[#FF6060]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Target Job Title</label>
                  <input 
                    type="text" 
                    value={coverLetterInput.jobTitle} 
                    onChange={(e) => setCoverLetterInput(prev => ({ ...prev, jobTitle: e.target.value }))}
                    placeholder="Senior Developer"
                    className="w-full px-3 py-2 border rounded-xl dark:bg-gray-900 border-gray-200 text-sm focus:ring-[#FF6060]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Design Style</label>
                  <select 
                    value={coverLetterInput.style} 
                    onChange={(e) => setCoverLetterInput(prev => ({ ...prev, style: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-xl dark:bg-gray-950 border-gray-200 text-sm focus:ring-[#FF6060]"
                  >
                    <option value="professional">Corporate & Executive</option>
                    <option value="creative">Creative & Conversational</option>
                  </select>
                </div>

                <button 
                  onClick={generateCoverLetter}
                  disabled={aiLoading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D51C39] to-[#FF6060] text-white font-bold flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-all duration-300"
                >
                  {aiLoading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5 animate-spin text-[#FEEC41]" />}
                  <span>Generate Customized Letter</span>
                </button>
              </div>

            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 px-4 py-2.5 rounded-2xl border border-[#D51C39]/20">
                <span className="text-xs font-bold text-gray-400">Generated Cover Letter</span>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(generatedCoverLetter);
                    addToast("Cover letter copied to clipboard!", "success");
                  }}
                  className="text-xs font-bold text-[#D51C39] hover:text-[#FF6060] flex items-center gap-1"
                >
                  <Clipboard className="w-4 h-4" /> Copy Document
                </button>
              </div>

              <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-8 sm:p-12 rounded-3xl border border-[#D51C39]/20 shadow-xl min-h-[500px]">
                {generatedCoverLetter ? (
                  <pre className="font-serif text-sm leading-relaxed whitespace-pre-wrap font-light text-gray-700 dark:text-gray-300">
                    {generatedCoverLetter}
                  </pre>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center h-[400px] space-y-4 text-gray-400 animate-pulse">
                    <Sparkles className="w-12 h-12 text-[#D51C39]" />
                    <div>
                      <p className="font-bold">No Cover Letter Generated Yet</p>
                      <p className="text-xs">Adjust parameters on the left and click Generate to run Aura AI.</p>
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ==========================================
          AI CAREER COACH COACHING HUB
          ========================================== */}
      {currentPage === 'career' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-entrance">
          
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight">AI Career Coach</h2>
            <p className="text-gray-400 text-sm">Prepare for interviews, analyze job descriptions, and discover career paths based directly on your current skill sets.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-6 bg-white dark:bg-gray-800 p-6 rounded-3xl border border-[#D51C39]/20 shadow-xl space-y-6">
              <div className="flex items-center gap-2">
                <div className="p-2.5 bg-[#D51C39]/10 text-[#D51C39] rounded-xl"><Target className="w-5 h-5" /></div>
                <h3 className="font-extrabold text-sm uppercase tracking-wider">Job Matching Optimization</h3>
              </div>

              <div className="space-y-4">
                <textarea 
                  rows={6}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste target job description..."
                  className="w-full p-3 border rounded-xl dark:bg-gray-900 border-gray-200 text-xs focus:ring-[#FF6060]"
                />

                <button 
                  onClick={analyzeATS}
                  disabled={aiLoading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D51C39] to-[#FF6060] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:scale-105 transition-all duration-300"
                >
                  {aiLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-white" />}
                  <span>Execute Job Match Analysis</span>
                </button>
              </div>

              {aiAnalysisResult && (
                <div className="space-y-4 border-t pt-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-gray-400">COMPATIBILITY SCORE</span>
                    <span className="font-black text-emerald-500">{aiAnalysisResult.score}% FIT</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: `${aiAnalysisResult.score}%` }} />
                  </div>
                </div>
              )}

            </div>

            <div className="lg:col-span-6 bg-white dark:bg-gray-800 p-6 rounded-3xl border border-[#D51C39]/20 shadow-xl space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="p-2.5 bg-[#D51C39]/10 text-[#D51C39] rounded-xl"><Brain className="w-5 h-5" /></div>
                  <h3 className="font-extrabold text-sm uppercase tracking-wider">Interview Preparation</h3>
                </div>
                <button 
                  onClick={generateInterviewPrep}
                  disabled={aiLoading}
                  className="text-xs font-bold text-[#D51C39] hover:text-[#FF6060] flex items-center gap-1 hover:scale-105 transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Drill Questions
                </button>
              </div>

              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {interviewQuestions.length > 0 ? (
                  interviewQuestions.map((q, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-850 space-y-2 animate-entrance">
                      <span className="px-2.5 py-1 rounded-full bg-[#D51C39]/15 text-[#D51C39] text-[10px] font-black uppercase">QUESTION {i+1}</span>
                      <p className="font-extrabold text-xs text-gray-900 dark:text-white pt-1">{q.question}</p>
                      <div className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed pt-2 border-t border-dashed mt-2">
                        <strong className="text-[#D51C39]">Strategy:</strong> {q.answer}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center text-center py-12 text-gray-400 space-y-3">
                    <Sparkles className="w-10 h-10 text-[#D51C39] animate-bounce" />
                    <div>
                      <p className="font-bold">No Drills Loaded Yet</p>
                      <p className="text-xs">Click Drill Questions above to generate customized behavioral modules based directly on your skill competencies.</p>
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ==========================================
          AUTHENTICATION MODAL
          ========================================== */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/65 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl border border-[#D51C39]/20 p-8 w-full max-w-md relative shadow-2xl space-y-6 animate-entrance">
            
            <button 
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 text-gray-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <h3 className="text-2xl font-black">
                {authMode === 'login' ? 'Welcome Back' : authMode === 'signup' ? 'Create Account' : 'Recover Key'}
              </h3>
              <p className="text-xs text-gray-400">Unlock modern AI Resume creation and ATS scoring instantly.</p>
            </div>

            <div className="space-y-4">
              {authMode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Full Name</label>
                  <input type="text" placeholder="Sophia Martinez" className="w-full px-3 py-2 border rounded-xl dark:bg-gray-900 text-sm focus:ring-[#FF6060] focus:outline-none" />
                </div>
              )}
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Email Address</label>
                <input type="email" placeholder="sophia@example.com" className="w-full px-3 py-2 border rounded-xl dark:bg-gray-900 text-sm focus:ring-[#FF6060] focus:outline-none" />
              </div>
              {authMode !== 'forgot' && (
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Secure Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-3 py-2 border rounded-xl dark:bg-gray-900 text-sm focus:ring-[#FF6060] focus:outline-none" />
                </div>
              )}

              <button 
                onClick={() => {
                  setUser({ name: "Elena Rostova", email: "elena.rost@premium.com", loggedIn: true });
                  setIsAuthModalOpen(false);
                  addToast("Successfully authenticated with AuraResume!", "success");
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D51C39] to-[#FF6060] text-white font-bold text-sm shadow-md hover:scale-105 transition-transform duration-300"
              >
                Continue Account Setup
              </button>
            </div>

            <div className="text-center text-xs text-gray-400 space-y-2">
              {authMode === 'login' ? (
                <>
                  <p>Don't have an account? <span onClick={() => setAuthMode('signup')} className="text-[#D51C39] font-bold cursor-pointer hover:underline">Sign up free</span></p>
                </>
              ) : (
                <p>Already registered with us? <span onClick={() => setAuthMode('login')} className="text-[#D51C39] font-bold cursor-pointer hover:underline">Log In</span></p>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}