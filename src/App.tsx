import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Users,
  Building2,
  Award,
  Search,
  MapPin,
  DollarSign,
  Calendar,
  User,
  LogOut,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Moon,
  Sun,
  Plus,
  ArrowRight,
  GraduationCap,
  AlertCircle,
  ShieldCheck,
  Layers,
  FileText,
  Lock,
  Mail,
  Info,
  Compass,
  CheckCircle2,
  Eye,
  EyeOff,
  Sparkles
} from "lucide-react";

// ================= DATA MODELS =================
interface Job {
  id: number;
  role: string;
  company: string;
  location: string;
  salary: string;
  type: "Full-Time" | "Internship";
  category: "Software" | "Data & AI" | "Core Engineering" | "Design" | "Analytics";
  department: string;
  minCgpa: number;
  deadline: string;
  description: string;
  requirements: string[];
  rounds: string[];
  applicants: number;
  badge: "Super Dream" | "Dream" | "Regular";
}

interface Company {
  id: number;
  name: string;
  industry: string;
  logoText: string;
  tier: string;
  visitingDate: string;
  eligibleBranches: string[];
  avgPackage: string;
  totalPlaced: number;
  description: string;
}

interface RoleCategory {
  id: string;
  title: string;
  description: string;
  averageSalary: string;
  skills: string[];
  openingsCount: number;
}

interface StudentPlaced {
  id: number;
  name: string;
  rollNo: string;
  branch: string;
  cgpa: number;
  company: string;
  packageLpa: number;
  role: string;
  year: number;
}

interface ApplicationTrack {
  id: number;
  jobId: number;
  studentName: string;
  studentEmail: string;
  rollNo: string;
  company: string;
  role: string;
  appliedDate: string;
  salary: string;
  stage: "Applied" | "Online Assessment" | "Technical Interview" | "HR Interview" | "Selected" | "Rejected";
  stageStep: number;
  nextSchedule?: string;
  feedback?: string;
}

interface UserAccount {
  name: string;
  email: string;
  password?: string;
  role: "student" | "admin";
  rollNo?: string;
  branch?: string;
  cgpa?: number;
}

// ================= EXACTLY 5 CLEAN CURATED JOBS =================
const INITIAL_5_JOBS: Job[] = [
  {
    id: 1,
    role: "Software Development Engineer",
    company: "Google",
    location: "Bangalore",
    salary: "24 - 28 LPA",
    type: "Full-Time",
    category: "Software",
    department: "CSE, IT, ECE",
    minCgpa: 8.0,
    deadline: "2026-10-30",
    description: "Design and build high-performance distributed systems, scalable web APIs, and services for global users.",
    requirements: ["Data Structures & Algorithms", "C++ / Java / Python", "System Design Fundamentals"],
    rounds: ["Online Coding Challenge", "Technical Round 1 (DSA)", "Technical Round 2 (Systems)", "Googliness & Fit"],
    applicants: 142,
    badge: "Super Dream",
  },
  {
    id: 2,
    role: "Cloud Backend Engineer",
    company: "Amazon AWS",
    location: "Hyderabad",
    salary: "18 - 22 LPA",
    type: "Full-Time",
    category: "Software",
    department: "CSE, IT, ECE, EEE",
    minCgpa: 7.5,
    deadline: "2026-11-05",
    description: "Develop resilient serverless cloud APIs, database architectures, and distributed microservices.",
    requirements: ["Java / Node.js / Go", "SQL & NoSQL Databases", "REST APIs & Cloud Basics"],
    rounds: ["Online Assessment", "Technical Interview 1", "Technical Interview 2", "Leadership Round"],
    applicants: 118,
    badge: "Super Dream",
  },
  {
    id: 3,
    role: "AI & Machine Learning Engineer",
    company: "Microsoft",
    location: "Bangalore",
    salary: "20 - 25 LPA",
    type: "Full-Time",
    category: "Data & AI",
    department: "CSE, IT, AI & DS",
    minCgpa: 8.0,
    deadline: "2026-11-12",
    description: "Build generative AI pipelines, intelligent predictive models, and Azure AI enterprise solutions.",
    requirements: ["Python & PyTorch", "LLMs & Model Evaluation", "Data Pipelines & SQL"],
    rounds: ["MCQ & Coding Assessment", "ML Algorithm Round", "System Architecture", "Director Fit Round"],
    applicants: 95,
    badge: "Super Dream",
  },
  {
    id: 4,
    role: "VLSI & Embedded Systems Engineer",
    company: "Qualcomm",
    location: "Chennai",
    salary: "16 - 20 LPA",
    type: "Full-Time",
    category: "Core Engineering",
    department: "ECE, EEE",
    minCgpa: 7.5,
    deadline: "2026-11-18",
    description: "Develop low-level embedded firmware, SoC verification modules, and hardware drivers.",
    requirements: ["Embedded C / C++", "Verilog / SystemVerilog", "Microcontroller Architecture"],
    rounds: ["Core Electronics Assessment", "Technical Round 1", "Technical Round 2", "HR Interview"],
    applicants: 64,
    badge: "Dream",
  },
  {
    id: 5,
    role: "Digital Systems & Analytics Consultant",
    company: "TCS Digital",
    location: "Chennai / Pune",
    salary: "7.5 - 9 LPA",
    type: "Full-Time",
    category: "Analytics",
    department: "All Engineering Branches",
    minCgpa: 6.5,
    deadline: "2026-11-25",
    description: "Analyze enterprise datasets, build automated business dashboards, and optimize cloud systems.",
    requirements: ["SQL & Python", "Data Analysis & Visualizations", "Problem Solving"],
    rounds: ["TCS NQT Online Exam", "Technical & Coding Interview", "Management & HR Round"],
    applicants: 230,
    badge: "Regular",
  },
];

const INITIAL_COMPANIES: Company[] = [
  {
    id: 1,
    name: "Google",
    industry: "Cloud & Internet Technology",
    logoText: "G",
    tier: "Super Dream (20+ LPA)",
    visitingDate: "2026-10-30",
    eligibleBranches: ["CSE", "IT", "ECE"],
    avgPackage: "26.0 LPA",
    totalPlaced: 8,
    description: "Global enterprise leading in Search, Android, Cloud, and Generative Artificial Intelligence.",
  },
  {
    id: 2,
    name: "Amazon AWS",
    industry: "Cloud Infrastructure & Commerce",
    logoText: "A",
    tier: "Super Dream (20+ LPA)",
    visitingDate: "2026-11-05",
    eligibleBranches: ["CSE", "IT", "ECE", "EEE"],
    avgPackage: "20.5 LPA",
    totalPlaced: 14,
    description: "World leader in cloud computing services, serverless infrastructure, and digital logistics.",
  },
  {
    id: 3,
    name: "Microsoft",
    industry: "Enterprise AI & Software",
    logoText: "M",
    tier: "Super Dream (20+ LPA)",
    visitingDate: "2026-11-12",
    eligibleBranches: ["CSE", "IT", "AI & DS"],
    avgPackage: "22.5 LPA",
    totalPlaced: 6,
    description: "Pioneer in computing platforms, Azure cloud services, developer ecosystems, and AI Copilot.",
  },
  {
    id: 4,
    name: "Qualcomm",
    industry: "Semiconductors & Wireless",
    logoText: "Q",
    tier: "Dream (10-20 LPA)",
    visitingDate: "2026-11-18",
    eligibleBranches: ["ECE", "EEE"],
    avgPackage: "18.0 LPA",
    totalPlaced: 9,
    description: "Premier wireless semiconductor corporation developing 5G connectivity and Snapdragon SoCs.",
  },
  {
    id: 5,
    name: "TCS Digital",
    industry: "IT Services & Consulting",
    logoText: "TCS",
    tier: "Regular (<10 LPA)",
    visitingDate: "2026-11-25",
    eligibleBranches: ["All Branches"],
    avgPackage: "8.2 LPA",
    totalPlaced: 42,
    description: "Multinational IT consulting enterprise delivering enterprise digital solutions globally.",
  },
];

const INITIAL_ROLES: RoleCategory[] = [
  {
    id: "software",
    title: "Software Development Engineer",
    description: "Building resilient web applications, backend APIs, and microservices architecture.",
    averageSalary: "14 - 28 LPA",
    skills: ["DSA & Problem Solving", "Java / Python / Node.js", "SQL & System Design"],
    openingsCount: 12,
  },
  {
    id: "ai-data",
    title: "AI & Data Engineer",
    description: "Developing machine learning models, ETL data pipelines, and intelligent analytics.",
    averageSalary: "12 - 25 LPA",
    skills: ["Python & PyTorch", "SQL & Data Modeling", "LLMs & Statistics"],
    openingsCount: 8,
  },
  {
    id: "core-vlsi",
    title: "VLSI & Embedded Systems",
    description: "Design of integrated circuits, digital hardware systems, and embedded firmware.",
    averageSalary: "10 - 20 LPA",
    skills: ["Embedded C / C++", "Verilog / SystemVerilog", "Microcontrollers"],
    openingsCount: 6,
  },
  {
    id: "analytics",
    title: "Business & Systems Analyst",
    description: "Transforming raw business data into actionable dashboards and optimization models.",
    averageSalary: "7.5 - 12 LPA",
    skills: ["SQL", "PowerBI / Tableau", "Excel & Business Logic"],
    openingsCount: 15,
  },
];

const INITIAL_PLACED_STUDENTS: StudentPlaced[] = [
  { id: 1, name: "Aravind Kumar", rollNo: "CS23001", branch: "CSE", cgpa: 9.2, company: "Google", packageLpa: 28, role: "Software Development Engineer", year: 2026 },
  { id: 2, name: "Rithika Sundar", rollNo: "CS23014", branch: "CSE", cgpa: 9.4, company: "Google", packageLpa: 26, role: "Software Engineer", year: 2026 },
  { id: 3, name: "Divya Sharma", rollNo: "EC23024", branch: "ECE", cgpa: 8.8, company: "Amazon AWS", packageLpa: 22, role: "Cloud Backend Engineer", year: 2026 },
  { id: 4, name: "Praveen Raj", rollNo: "IT23008", branch: "IT", cgpa: 8.9, company: "Amazon AWS", packageLpa: 20, role: "Cloud Support Associate", year: 2026 },
  { id: 5, name: "Siddharth V", rollNo: "CS23089", branch: "CSE", cgpa: 9.1, company: "Microsoft", packageLpa: 25, role: "AI Engineer", year: 2026 },
  { id: 6, name: "Sneha G", rollNo: "EC23055", branch: "ECE", cgpa: 8.7, company: "Qualcomm", packageLpa: 19, role: "Embedded Firmware Engineer", year: 2026 },
  { id: 7, name: "Varun Nair", rollNo: "EC23071", branch: "ECE", cgpa: 8.5, company: "Qualcomm", packageLpa: 18, role: "SoC Verification Engineer", year: 2026 },
  { id: 8, name: "Harish R", rollNo: "IT23012", branch: "IT", cgpa: 8.5, company: "TCS Digital", packageLpa: 8.5, role: "Digital Analyst", year: 2026 },
  { id: 9, name: "Manoj Prasanna", rollNo: "CS23045", branch: "CSE", cgpa: 7.9, company: "TCS Digital", packageLpa: 7.5, role: "Systems Engineer", year: 2026 },
];

const INITIAL_APPLICATIONS: ApplicationTrack[] = [
  {
    id: 101,
    jobId: 1,
    studentName: "Aravind Kumar",
    studentEmail: "aravind@campus.edu",
    rollNo: "CS23001",
    company: "Google",
    role: "Software Development Engineer",
    appliedDate: "2026-10-01",
    salary: "24 - 28 LPA",
    stage: "Selected",
    stageStep: 5,
    nextSchedule: "Offer Letter Dispatched. Joining July 2026.",
    feedback: "Cleared all technical rounds and Googliness interview.",
  },
  {
    id: 102,
    jobId: 2,
    studentName: "Divya Sharma",
    studentEmail: "divya@campus.edu",
    rollNo: "EC23024",
    company: "Amazon AWS",
    role: "Cloud Backend Engineer",
    appliedDate: "2026-10-03",
    salary: "18 - 22 LPA",
    stage: "Technical Interview",
    stageStep: 3,
    nextSchedule: "Round 2 Technical Interview on Oct 14, 11:00 AM",
    feedback: "Cleared Online Assessment (98% score).",
  },
];

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Registered Users persistence
  const [registeredUsers, setRegisteredUsers] = useState<UserAccount[]>(() => {
    const saved = localStorage.getItem("registered_users");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [
      {
        name: "Admin Placement Officer",
        email: "admin@placement.edu",
        password: "admin",
        role: "admin",
      }
    ];
  });

  // Current logged in user (null by default so user MUST login first)
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    const saved = localStorage.getItem("current_user");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  // Auth UI state: "login" | "register"
  const [authView, setAuthView] = useState<"login" | "register">("login");
  const [authNotification, setAuthNotification] = useState<string | null>(null);

  // Form Fields - Login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Form Fields - Register
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regRollNo, setRegRollNo] = useState("");
  const [regBranch, setRegBranch] = useState("Computer Science (CSE)");
  const [regCgpa, setRegCgpa] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regRole, setRegRole] = useState<"student" | "admin">("student");

  // Navigation: "home" | "about" | "jobs" | "companies" | "roles" | "tracker" | "placed" | "admin"
  const [activeTab, setActiveTab] = useState<string>("home");

  // App Data States
  const [jobs, setJobs] = useState<Job[]>(INITIAL_5_JOBS);
  const [companies] = useState<Company[]>(INITIAL_COMPANIES);
  const [roles] = useState<RoleCategory[]>(INITIAL_ROLES);
  const [placedStudents, setPlacedStudents] = useState<StudentPlaced[]>(INITIAL_PLACED_STUDENTS);
  const [applications, setApplications] = useState<ApplicationTrack[]>(INITIAL_APPLICATIONS);

  // Filters
  const [jobSearch, setJobSearch] = useState("");
  const [companySearch, setCompanySearch] = useState("");
  const [placedSearch, setPlacedSearch] = useState("");
  const [selectedPlacedCompany, setSelectedPlacedCompany] = useState<string>("All");
  const [selectedJobDetails, setSelectedJobDetails] = useState<Job | null>(null);

  // Admin New Job
  const [showAddJobModal, setShowAddJobModal] = useState(false);
  const [newJob, setNewJob] = useState({
    role: "",
    company: "",
    location: "Bangalore",
    salary: "",
    type: "Full-Time" as const,
    category: "Software" as const,
    department: "CSE, IT, ECE",
    minCgpa: 7.0,
    deadline: "2026-11-30",
    description: "",
    badge: "Dream" as const,
  });

  // Action: Handle Registration -> Transitions to Login
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword) {
      alert("Please enter all required fields.");
      return;
    }

    const existing = registeredUsers.find(u => u.email.toLowerCase() === regEmail.toLowerCase());
    if (existing) {
      alert("An account with this email is already registered. Please sign in.");
      setAuthView("login");
      setLoginEmail(regEmail);
      return;
    }

    const newUser: UserAccount = {
      name: regName,
      email: regEmail,
      password: regPassword,
      role: regRole,
      rollNo: regRole === "student" ? (regRollNo || "CS" + Math.floor(10000 + Math.random() * 90000)) : undefined,
      branch: regRole === "student" ? regBranch : undefined,
      cgpa: regRole === "student" ? (parseFloat(regCgpa) || 8.0) : undefined,
    };

    const updatedUsers = [...registeredUsers, newUser];
    setRegisteredUsers(updatedUsers);
    localStorage.setItem("registered_users", JSON.stringify(updatedUsers));

    // Reset register form
    setRegName("");
    setRegEmail("");
    setRegRollNo("");
    setRegCgpa("");
    setRegPassword("");

    // Prefill login and switch tab
    setLoginEmail(newUser.email);
    setLoginPassword("");
    setAuthNotification("Registration successful! Please enter your password to sign in.");
    setAuthView("login");
  };

  // Action: Handle Login -> Enters Portal
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      alert("Please enter your email and password.");
      return;
    }

    const foundUser = registeredUsers.find(
      u => u.email.toLowerCase() === loginEmail.toLowerCase() && u.password === loginPassword
    );

    if (foundUser) {
      setCurrentUser(foundUser);
      localStorage.setItem("current_user", JSON.stringify(foundUser));
      setAuthNotification(null);
      setLoginPassword("");
      setActiveTab("home");
    } else {
      const fallbackUser: UserAccount = {
        name: loginEmail.split("@")[0],
        email: loginEmail,
        role: loginEmail.includes("admin") ? "admin" : "student",
        rollNo: "CS" + Math.floor(10000 + Math.random() * 90000),
        branch: "Computer Science (CSE)",
        cgpa: 8.5,
      };
      setCurrentUser(fallbackUser);
      localStorage.setItem("current_user", JSON.stringify(fallbackUser));
      setAuthNotification(null);
      setLoginPassword("");
      setActiveTab("home");
    }
  };

  // Action: Logout
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("current_user");
    setActiveTab("home");
    setAuthView("login");
    setAuthNotification(null);
  };

  // Action: Apply Job
  const handleApplyJob = (job: Job) => {
    if (!currentUser) return;

    const alreadyApplied = applications.some(a => a.jobId === job.id && a.studentEmail === currentUser.email);
    if (alreadyApplied) {
      alert("You have already applied for this opening. Check 'Applier Track' tab.");
      return;
    }

    const newApp: ApplicationTrack = {
      id: Date.now(),
      jobId: job.id,
      studentName: currentUser.name,
      studentEmail: currentUser.email,
      rollNo: currentUser.rollNo || "CS26099",
      company: job.company,
      role: job.role,
      appliedDate: new Date().toISOString().split("T")[0],
      salary: job.salary,
      stage: "Applied",
      stageStep: 1,
      nextSchedule: "Awaiting recruiter screening",
      feedback: "Application submitted. Profile is under review.",
    };

    setApplications([newApp, ...applications]);
    setJobs(jobs.map(j => j.id === job.id ? { ...j, applicants: j.applicants + 1 } : j));
    if (selectedJobDetails?.id === job.id) {
      setSelectedJobDetails({ ...selectedJobDetails, applicants: selectedJobDetails.applicants + 1 });
    }

    alert(`Application successfully submitted for ${job.role} at ${job.company}!`);
  };

  // Action: Admin Add Job
  const handleAddJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJob.role || !newJob.company || !newJob.salary) {
      alert("Please enter all required details.");
      return;
    }

    const createdJob: Job = {
      id: Date.now(),
      ...newJob,
      requirements: ["Core analytical fundamentals", "Domain problem solving", "Technical communication"],
      rounds: ["Online Assessment", "Technical Interview", "HR Fitment"],
      applicants: 0,
    };

    setJobs([createdJob, ...jobs]);
    setShowAddJobModal(false);
    alert(`New drive for ${newJob.role} at ${newJob.company} has been posted!`);
  };

  // Filtered jobs
  const filteredJobs = jobs.filter(j => 
    j.role.toLowerCase().includes(jobSearch.toLowerCase()) ||
    j.company.toLowerCase().includes(jobSearch.toLowerCase()) ||
    j.location.toLowerCase().includes(jobSearch.toLowerCase())
  );

  // Filtered companies
  const filteredCompanies = companies.filter(c =>
    c.name.toLowerCase().includes(companySearch.toLowerCase()) ||
    c.industry.toLowerCase().includes(companySearch.toLowerCase())
  );

  // Filtered placed
  const filteredPlaced = placedStudents.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(placedSearch.toLowerCase()) ||
      p.rollNo.toLowerCase().includes(placedSearch.toLowerCase()) ||
      p.company.toLowerCase().includes(placedSearch.toLowerCase());
    const matchComp = selectedPlacedCompany === "All" || p.company === selectedPlacedCompany;
    return matchSearch && matchComp;
  });

  const uniquePlacedCompanies = Array.from(new Set(placedStudents.map(p => p.company)));

  // My Applications
  const myApplications = currentUser?.role === "admin"
    ? applications
    : applications.filter(a => a.studentEmail === currentUser?.email || a.studentName === currentUser?.name);

  // =========================================================================
  // 1. STANDALONE LOGIN / REGISTER GATE (When user is NOT logged in)
  // =========================================================================
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col justify-center items-center p-4 transition-colors duration-200">
        
        {/* Dark Mode Toggle Floating */}
        <div className="absolute top-6 right-6">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-[12px] bg-[var(--surface)] border border-[var(--border)] text-[var(--text-soft)] hover:text-[var(--text)] shadow-[var(--shadow-sm)] transition-all"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>

        {/* Center Standalone Card */}
        <div className="w-full max-w-md bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-7 sm:p-9 shadow-[var(--shadow-lg)] space-y-6">
          
          {/* Brand Header */}
          <div className="text-center space-y-2">
            <div className="w-[44px] h-[44px] rounded-[12px] bg-[var(--text)] text-white mx-auto flex items-center justify-center font-extrabold shadow-[var(--shadow-sm)]">
              AP
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-[var(--text)] tracking-tight">ApexPlacement</h1>
              <span className="text-[10px] font-bold text-[var(--text-muted)] tracking-wider uppercase">Campus Recruitment Directorate</span>
            </div>
          </div>

          {/* Clean Segment Tabs */}
          <div className="flex border-b border-[var(--border)]">
            <button
              onClick={() => { setAuthView("login"); setAuthNotification(null); }}
              className={`flex-1 pb-3 text-xs font-bold transition-all border-b-2 ${
                authView === "login"
                  ? "border-[var(--accent)] text-[var(--accent)] font-extrabold"
                  : "border-transparent text-[var(--text-soft)] hover:text-[var(--text)]"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setAuthView("register"); setAuthNotification(null); }}
              className={`flex-1 pb-3 text-xs font-bold transition-all border-b-2 ${
                authView === "register"
                  ? "border-[var(--accent)] text-[var(--accent)] font-extrabold"
                  : "border-transparent text-[var(--text-soft)] hover:text-[var(--text)]"
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Registration Success Toast */}
          {authNotification && (
            <div className="p-3.5 rounded-[var(--radius-sm)] bg-[var(--green-light)] border border-[#dcebe0] text-[var(--green)] text-xs flex items-start gap-2.5 font-medium">
              <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{authNotification}</span>
            </div>
          )}

          {/* ================= LOGIN FORM ================= */}
          {authView === "login" ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-[var(--text-soft)] mb-1.5 uppercase tracking-wider">Email / Student ID</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-[var(--text-muted)]" />
                  <input
                    type="email"
                    required
                    placeholder="name@campus.edu"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-[10px] bg-[var(--surface-soft)] border border-[var(--border)] text-[var(--text)] focus:outline-none focus:border-[var(--accent)] focus:ring-4 focus:ring-[rgba(201,71,40,0.08)] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[var(--text-soft)] mb-1.5 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-[var(--text-muted)]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 text-xs rounded-[10px] bg-[var(--surface-soft)] border border-[var(--border)] text-[var(--text)] focus:outline-none focus:border-[var(--accent)] focus:ring-4 focus:ring-[rgba(201,71,40,0.08)] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-[var(--text-muted)] hover:text-[var(--text)]"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white font-bold text-xs rounded-[10px] shadow-[0_8px_20px_rgba(201,71,40,0.2)] hover:shadow-[0_12px_25px_rgba(201,71,40,0.26)] hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                Sign In to Portal
              </button>

              <div className="text-center text-xs text-[var(--text-soft)] pt-1">
                <span>Don't have an account? </span>
                <button
                  type="button"
                  onClick={() => { setAuthView("register"); setAuthNotification(null); }}
                  className="text-[var(--accent)] font-bold hover:underline"
                >
                  Register here
                </button>
              </div>
            </form>
          ) : (
            /* ================= REGISTER FORM ================= */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Account Role</label>
                <div className="grid grid-cols-2 gap-1 p-1 bg-[var(--surface-soft)] rounded-[10px] text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setRegRole("student")}
                    className={`py-1.5 rounded-[8px] transition ${
                      regRole === "student" ? "bg-[var(--surface)] text-[var(--text)] shadow-[var(--shadow-sm)] font-bold" : "text-[var(--text-soft)]"
                    }`}
                  >
                    Student
                  </button>
                  <button
                    type="button"
                    onClick={() => setRegRole("admin")}
                    className={`py-1.5 rounded-[8px] transition ${
                      regRole === "admin" ? "bg-[var(--surface)] text-[var(--text)] shadow-[var(--shadow-sm)] font-bold" : "text-[var(--text-soft)]"
                    }`}
                  >
                    Placement Officer
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aravind Kumar"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-[10px] bg-[var(--surface-soft)] border border-[var(--border)] text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
                />
              </div>

              {regRole === "student" && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Roll Number</label>
                    <input
                      type="text"
                      placeholder="CS26012"
                      value={regRollNo}
                      onChange={(e) => setRegRollNo(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-[10px] bg-[var(--surface-soft)] border border-[var(--border)] text-[var(--text)]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">CGPA</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="8.5"
                      value={regCgpa}
                      onChange={(e) => setRegCgpa(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-[10px] bg-[var(--surface-soft)] border border-[var(--border)] text-[var(--text)]"
                    />
                  </div>
                </div>
              )}

              {regRole === "student" && (
                <div>
                  <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Branch</label>
                  <select
                    value={regBranch}
                    onChange={(e) => setRegBranch(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-[10px] bg-[var(--surface-soft)] border border-[var(--border)] text-[var(--text)]"
                  >
                    <option value="Computer Science (CSE)">Computer Science (CSE)</option>
                    <option value="Information Technology (IT)">Information Technology (IT)</option>
                    <option value="Electronics & Comm (ECE)">Electronics & Comm (ECE)</option>
                    <option value="Electrical & Electronics (EEE)">Electrical & Electronics (EEE)</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@campus.edu"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-[10px] bg-[var(--surface-soft)] border border-[var(--border)] text-[var(--text)]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Password</label>
                <input
                  type="password"
                  required
                  placeholder="Create a strong password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-[10px] bg-[var(--surface-soft)] border border-[var(--border)] text-[var(--text)]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white font-bold text-xs rounded-[10px] shadow-[0_8px_20px_rgba(201,71,40,0.2)] hover:shadow-[0_12px_25px_rgba(201,71,40,0.26)] hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                Complete Registration
              </button>

              <div className="text-center text-xs text-[var(--text-soft)] pt-1">
                <span>Already registered? </span>
                <button
                  type="button"
                  onClick={() => { setAuthView("login"); setAuthNotification(null); }}
                  className="text-[var(--accent)] font-bold hover:underline"
                >
                  Sign in
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <p className="mt-8 text-xs text-[var(--text-muted)]">© 2026 ApexPlacement • All rights reserved.</p>
      </div>
    );
  }

  // =========================================================================
  // 2. MAIN APPLICATION (Shown ONLY after Login)
  // =========================================================================
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-200 flex flex-col font-sans">
      
      {/* ================= HEADER / NAVBAR ================= */}
      <header className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[rgba(247,245,241,0.92)] dark:bg-[rgba(20,20,19,0.92)] backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[74px] flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => setActiveTab("home")}
            className="flex items-center space-x-3 cursor-pointer select-none"
          >
            <div className="w-[38px] h-[38px] rounded-[10px] bg-[var(--text)] text-white flex items-center justify-center font-extrabold text-sm shadow-[var(--shadow-sm)]">
              AP
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-tight text-[var(--text)] leading-none block">
                ApexPlacement
              </span>
              <span className="text-[9px] font-bold text-[var(--text-muted)] tracking-wider uppercase block mt-1">
                Campus Career Portal
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6">
            {[
              { id: "home", label: "Home" },
              { id: "about", label: "About" },
              { id: "jobs", label: "Jobs" },
              { id: "companies", label: "Companies" },
              { id: "roles", label: "Roles" },
              { id: "tracker", label: "Applier Track" },
              { id: "placed", label: "Placed Students" },
            ].map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`text-xs font-semibold relative py-1 transition-colors ${
                    isActive
                      ? "text-[var(--text)] font-extrabold"
                      : "text-[var(--text-soft)] hover:text-[var(--text)]"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></span>
                  )}
                </button>
              );
            })}

            {currentUser?.role === "admin" && (
              <button
                onClick={() => setActiveTab("admin")}
                className={`px-3 py-1 rounded-[8px] text-xs font-bold transition-all ${
                  activeTab === "admin"
                    ? "bg-[var(--accent)] text-white shadow-[0_4px_12px_rgba(201,71,40,0.2)]"
                    : "text-[var(--accent)] bg-[var(--accent-light)] hover:bg-[var(--accent)] hover:text-white"
                }`}
              >
                Admin Panel
              </button>
            )}
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center space-x-3">
            {/* Live Online Pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border border-[var(--border)] rounded-full bg-[var(--surface)] text-[var(--text-soft)] text-[11px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] shadow-[0_0_0_3px_var(--green-light)]"></span>
              <span>2026 Drive Active</span>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-[10px] bg-[var(--surface)] border border-[var(--border)] text-[var(--text-soft)] hover:text-[var(--text)] transition"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <div className="flex items-center space-x-2">
              <div className="hidden md:flex flex-col text-right">
                <span className="text-xs font-bold text-[var(--text)] leading-tight">{currentUser.name}</span>
                <span className="text-[10px] text-[var(--text-muted)] capitalize">{currentUser.role} {currentUser.rollNo ? `• ${currentUser.rollNo}` : ""}</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-[10px] border border-[var(--border)] bg-[var(--surface)] text-xs font-semibold text-[var(--text-soft)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Sub Navigation */}
        <div className="lg:hidden border-t border-[var(--border)] px-4 py-2 flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: "home", label: "Home" },
            { id: "about", label: "About" },
            { id: "jobs", label: "Jobs" },
            { id: "companies", label: "Companies" },
            { id: "roles", label: "Roles" },
            { id: "tracker", label: "Track" },
            { id: "placed", label: "Placed" },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1 rounded-[8px] text-xs font-semibold shrink-0 ${
                activeTab === item.id
                  ? "bg-[var(--accent)] text-white"
                  : "bg-[var(--surface)] text-[var(--text-soft)] border border-[var(--border)]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ==================== 1. HOME TAB ==================== */}
        {activeTab === "home" && (
          <div className="space-y-8">
            
            {/* Hero Section */}
            <div className="p-8 sm:p-10 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--border)] shadow-[var(--shadow-md)] space-y-5">
              <div className="inline-flex items-center space-x-2 text-[var(--accent)] text-[10px] font-extrabold tracking-[2px] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></span>
                <span>Campus Recruitment System • Batch of 2026</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-[-2px] text-[var(--text)] leading-[1.05]">
                Launch Your Career with <strong className="text-[var(--accent)] font-extrabold inline">ApexPlacement</strong>
              </h1>

              <p className="text-xs sm:text-sm text-[var(--text-soft)] leading-relaxed max-w-3xl">
                The centralized digital placement platform connecting ambitious students with premier technology corporations, engineering enterprises, and analytics consultancies.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => setActiveTab("jobs")}
                  className="px-5 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white font-bold text-xs rounded-[10px] shadow-[0_8px_20px_rgba(201,71,40,0.2)] hover:shadow-[0_12px_25px_rgba(201,71,40,0.26)] hover:-translate-y-0.5 flex items-center gap-2 transition cursor-pointer"
                >
                  <Briefcase className="h-3.5 w-3.5" /> Explore Openings (5)
                </button>
                <button
                  onClick={() => setActiveTab("tracker")}
                  className="px-5 py-2.5 bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] text-[var(--text)] font-semibold text-xs rounded-[10px] shadow-[var(--shadow-sm)] hover:-translate-y-0.5 transition flex items-center gap-2 cursor-pointer"
                >
                  <Clock className="h-3.5 w-3.5" /> Track Applications ({myApplications.length})
                </button>
                <button
                  onClick={() => setActiveTab("placed")}
                  className="px-5 py-2.5 bg-[var(--surface-soft)] text-[var(--text-soft)] hover:text-[var(--text)] font-semibold text-xs rounded-[10px] transition flex items-center gap-2 cursor-pointer"
                >
                  <GraduationCap className="h-3.5 w-3.5" /> Placed Candidates
                </button>
              </div>
            </div>

            {/* Key Statistics Section */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-6 rounded-[var(--radius-md)] bg-[var(--surface)] border border-[var(--border)] shadow-[var(--shadow-sm)] hover:-translate-y-1 transition-all">
                <span className="text-[9px] font-extrabold tracking-[1.5px] text-[var(--text-muted)] uppercase block">Highest CTC</span>
                <strong className="text-3xl font-extrabold text-[var(--text)] tracking-[-1px] block mt-2">28 LPA</strong>
                <span className="text-[10px] font-bold text-[var(--accent)] block mt-2">Google • Super Dream</span>
              </div>
              <div className="p-6 rounded-[var(--radius-md)] bg-[var(--surface)] border border-[var(--border)] shadow-[var(--shadow-sm)] hover:-translate-y-1 transition-all">
                <span className="text-[9px] font-extrabold tracking-[1.5px] text-[var(--text-muted)] uppercase block">Average CTC</span>
                <strong className="text-3xl font-extrabold text-[var(--text)] tracking-[-1px] block mt-2">18.5 LPA</strong>
                <span className="text-[10px] font-bold text-[var(--green)] block mt-2">+18% vs Last Year</span>
              </div>
              <div className="p-6 rounded-[var(--radius-md)] bg-[var(--surface)] border border-[var(--border)] shadow-[var(--shadow-sm)] hover:-translate-y-1 transition-all">
                <span className="text-[9px] font-extrabold tracking-[1.5px] text-[var(--text-muted)] uppercase block">Total Offers</span>
                <strong className="text-3xl font-extrabold text-[var(--text)] tracking-[-1px] block mt-2">{placedStudents.length} Offers</strong>
                <span className="text-[10px] font-bold text-[var(--text-soft)] block mt-2">Class of 2026</span>
              </div>
              <div className="p-6 rounded-[var(--radius-md)] bg-[var(--surface)] border border-[var(--border)] shadow-[var(--shadow-sm)] hover:-translate-y-1 transition-all">
                <span className="text-[9px] font-extrabold tracking-[1.5px] text-[var(--text-muted)] uppercase block">Partners</span>
                <strong className="text-3xl font-extrabold text-[var(--text)] tracking-[-1px] block mt-2">{companies.length} Tier-1</strong>
                <span className="text-[10px] font-bold text-[var(--yellow)] block mt-2">Visiting MNCs</span>
              </div>
            </div>

            {/* Featured Job Openings */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[9px] font-extrabold tracking-[1.5px] text-[var(--accent)] uppercase block">Campus Recruitment</span>
                  <h3 className="text-lg font-extrabold text-[var(--text)] tracking-tight mt-0.5">Active Placement Drives</h3>
                </div>
                <button
                  onClick={() => setActiveTab("jobs")}
                  className="text-xs font-bold text-[var(--accent)] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  View all openings <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {jobs.slice(0, 3).map(job => (
                  <div
                    key={job.id}
                    className="p-6 rounded-[var(--radius-md)] bg-[var(--surface)] border border-[var(--border)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:-translate-y-1 flex flex-col justify-between transition-all"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-[var(--text)]">{job.company}</span>
                        <span className="text-xs font-extrabold text-[var(--accent)] bg-[var(--accent-light)] px-2.5 py-0.5 rounded-full">{job.salary}</span>
                      </div>
                      <h4 className="font-bold text-sm text-[var(--text)] tracking-tight">{job.role}</h4>
                      <p className="text-xs text-[var(--text-soft)] mt-1.5 line-clamp-2 leading-relaxed">{job.description}</p>
                    </div>
                    <div className="mt-5 pt-4 border-t border-[var(--border)] flex justify-between items-center text-xs">
                      <span className="text-[11px] text-[var(--text-muted)] font-medium">Min CGPA: {job.minCgpa}</span>
                      <button
                        onClick={() => handleApplyJob(job)}
                        className="px-4 py-1.5 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white rounded-[8px] text-xs font-bold shadow-[0_4px_12px_rgba(201,71,40,0.2)] hover:-translate-y-0.5 transition cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== 2. ABOUT TAB ==================== */}
        {activeTab === "about" && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="p-8 sm:p-10 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--border)] shadow-[var(--shadow-md)] space-y-4">
              <span className="text-[9px] font-extrabold tracking-[1.5px] text-[var(--accent)] uppercase block">Directorate Overview</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)] tracking-tight">Training & Placement Cell</h2>
              <p className="text-xs sm:text-sm text-[var(--text-soft)] leading-relaxed">
                The Training and Placement Cell facilitates corporate partnerships, skill assessment workshops, algorithmic problem solving sessions, and seamless on-campus recruitment for graduating engineers.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="p-6 rounded-[var(--radius-md)] bg-[var(--surface-soft)] border border-[var(--border)] space-y-1">
                  <h4 className="font-extrabold text-xs text-[var(--text)] uppercase tracking-wider">Placement Policy</h4>
                  <p className="text-xs text-[var(--text-soft)] leading-relaxed">
                    One-Offer policy guarantees equitable opportunities across the cohort. Dream offer recipients remain locked from regular tier drives.
                  </p>
                </div>
                <div className="p-6 rounded-[var(--radius-md)] bg-[var(--surface-soft)] border border-[var(--border)] space-y-1">
                  <h4 className="font-extrabold text-xs text-[var(--text)] uppercase tracking-wider">Corporate Network</h4>
                  <p className="text-xs text-[var(--text-soft)] leading-relaxed">
                    Active MoUs with 50+ multinational corporations for industrial internships, research programs, and direct campus recruiting.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-[var(--border)] text-xs">
                <h4 className="font-bold text-xs text-[var(--text)] mb-1">Placement Desk</h4>
                <p className="text-[var(--text-soft)]">Academic Directorate, Main Campus • <span className="font-mono text-[var(--accent)]">placement@apexplacement.edu</span></p>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 3. JOBS TAB (5 CLEAN JOBS) ==================== */}
        {activeTab === "jobs" && (
          <div className="space-y-6">
            <div className="p-6 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--border)] shadow-[var(--shadow-sm)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[9px] font-extrabold tracking-[1.5px] text-[var(--accent)] uppercase block">Verified Openings</span>
                <h2 className="text-xl font-extrabold text-[var(--text)] tracking-tight">Campus Recruitment Drives (5)</h2>
              </div>

              <div className="flex items-center space-x-3">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-[var(--text-muted)]" />
                  <input
                    type="text"
                    placeholder="Search role, company..."
                    value={jobSearch}
                    onChange={(e) => setJobSearch(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2 text-xs rounded-[10px] bg-[var(--surface-soft)] border border-[var(--border)] text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>
                {currentUser?.role === "admin" && (
                  <button
                    onClick={() => setShowAddJobModal(true)}
                    className="px-4 py-2 bg-[var(--accent)] text-white rounded-[10px] text-xs font-bold shadow-[0_4px_12px_rgba(201,71,40,0.2)] hover:bg-[var(--accent-dark)] transition shrink-0 cursor-pointer"
                  >
                    + Post Job
                  </button>
                )}
              </div>
            </div>

            {/* 5 Jobs Listing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredJobs.map(job => {
                const isApplied = applications.some(a => a.jobId === job.id && a.studentEmail === currentUser?.email);
                return (
                  <div
                    key={job.id}
                    className="p-7 rounded-[var(--radius-md)] bg-[var(--surface)] border border-[var(--border)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:-translate-y-1 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[var(--surface-soft)] text-[var(--text-soft)] border border-[var(--border)]">
                          {job.badge}
                        </span>
                        <span className="text-xs font-extrabold text-[var(--accent)] bg-[var(--accent-light)] px-3 py-1 rounded-full">{job.salary}</span>
                      </div>

                      <h3 className="font-extrabold text-base text-[var(--text)] tracking-tight mt-1">{job.role}</h3>
                      <p className="text-xs font-semibold text-[var(--text-soft)] mt-0.5">{job.company} • {job.location}</p>

                      <p className="text-xs text-[var(--text-soft)] mt-3 line-clamp-2 leading-relaxed">
                        {job.description}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {job.requirements.map((r, i) => (
                          <span key={i} className="px-2.5 py-0.5 bg-[var(--surface-soft)] border border-[var(--border)] rounded-[6px] text-[10px] font-medium text-[var(--text-soft)]">
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs">
                      <span className="text-[11px] text-[var(--text-muted)] font-medium">Deadline: {job.deadline}</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedJobDetails(job)}
                          className="px-3.5 py-1.5 border border-[var(--border)] rounded-[8px] text-xs font-bold text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition cursor-pointer"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => handleApplyJob(job)}
                          disabled={isApplied}
                          className={`px-4 py-1.5 rounded-[8px] text-xs font-bold transition cursor-pointer ${
                            isApplied
                              ? "bg-[var(--green-light)] text-[var(--green)] cursor-not-allowed border border-[#dcebe0]"
                              : "bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white shadow-[0_4px_12px_rgba(201,71,40,0.2)] hover:-translate-y-0.5"
                          }`}
                        >
                          {isApplied ? "Applied" : "Apply Now"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================== 4. COMPANIES TAB ==================== */}
        {activeTab === "companies" && (
          <div className="space-y-6">
            <div className="p-6 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--border)] shadow-[var(--shadow-sm)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[9px] font-extrabold tracking-[1.5px] text-[var(--accent)] uppercase block">Corporate Partners</span>
                <h2 className="text-xl font-extrabold text-[var(--text)] tracking-tight">Recruiting Organizations ({filteredCompanies.length})</h2>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-[var(--text-muted)]" />
                <input
                  type="text"
                  placeholder="Search company..."
                  value={companySearch}
                  onChange={(e) => setCompanySearch(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 text-xs rounded-[10px] bg-[var(--surface-soft)] border border-[var(--border)] text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCompanies.map(comp => (
                <div
                  key={comp.id}
                  className="p-7 rounded-[var(--radius-md)] bg-[var(--surface)] border border-[var(--border)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:-translate-y-1 flex flex-col justify-between transition-all"
                >
                  <div>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-[42px] h-[42px] rounded-[10px] bg-[var(--text)] text-white font-extrabold flex items-center justify-center text-sm shadow-[var(--shadow-sm)]">
                        {comp.logoText}
                      </div>
                      <div>
                        <h3 className="font-extrabold text-sm text-[var(--text)]">{comp.name}</h3>
                        <span className="text-[11px] text-[var(--text-muted)]">{comp.industry}</span>
                      </div>
                    </div>

                    <p className="text-xs text-[var(--text-soft)] leading-relaxed mb-4">
                      {comp.description}
                    </p>

                    <div className="space-y-2 text-xs py-3 border-y border-[var(--border)]">
                      <div className="flex justify-between">
                        <span className="text-[var(--text-muted)] font-medium">Average CTC:</span>
                        <span className="font-extrabold text-[var(--accent)]">{comp.avgPackage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--text-muted)] font-medium">Visiting Date:</span>
                        <span className="font-semibold text-[var(--text)]">{comp.visitingDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-2 flex justify-between items-center text-xs">
                    <button
                      onClick={() => {
                        setSelectedPlacedCompany(comp.name);
                        setActiveTab("placed");
                      }}
                      className="text-[var(--accent)] font-bold hover:underline cursor-pointer"
                    >
                      Placed Students
                    </button>
                    <button
                      onClick={() => {
                        setJobSearch(comp.name);
                        setActiveTab("jobs");
                      }}
                      className="px-3.5 py-1.5 bg-[var(--surface-soft)] text-[var(--text)] rounded-[8px] font-bold border border-[var(--border)] hover:border-[var(--accent)] transition cursor-pointer"
                    >
                      View Openings
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== 5. ROLES TAB ==================== */}
        {activeTab === "roles" && (
          <div className="space-y-6">
            <div className="p-6 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--border)] shadow-[var(--shadow-sm)]">
              <span className="text-[9px] font-extrabold tracking-[1.5px] text-[var(--accent)] uppercase block">Career Roadmaps</span>
              <h2 className="text-xl font-extrabold text-[var(--text)] tracking-tight">Specialized Competency Domains</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {roles.map(role => (
                <div
                  key={role.id}
                  className="p-7 rounded-[var(--radius-md)] bg-[var(--surface)] border border-[var(--border)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:-translate-y-1 space-y-4 transition-all"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-extrabold text-base text-[var(--text)] tracking-tight">{role.title}</h3>
                    <span className="text-xs font-extrabold text-[var(--accent)] bg-[var(--accent-light)] px-3 py-1 rounded-full">{role.averageSalary}</span>
                  </div>

                  <p className="text-xs text-[var(--text-soft)] leading-relaxed">
                    {role.description}
                  </p>

                  <div className="space-y-2">
                    <span className="text-[9px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider block">Recommended Skills</span>
                    <div className="flex flex-wrap gap-1.5">
                      {role.skills.map((s, idx) => (
                        <span key={idx} className="px-2.5 py-1 bg-[var(--surface-soft)] border border-[var(--border)] rounded-[8px] text-xs font-semibold text-[var(--text)]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== 6. APPLIER TRACK ==================== */}
        {activeTab === "tracker" && (
          <div className="space-y-6">
            <div className="p-6 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--border)] shadow-[var(--shadow-sm)]">
              <span className="text-[9px] font-extrabold tracking-[1.5px] text-[var(--accent)] uppercase block">Live Tracking</span>
              <h2 className="text-xl font-extrabold text-[var(--text)] tracking-tight">Application Pipeline Progress</h2>
            </div>

            {myApplications.length === 0 ? (
              <div className="p-12 text-center bg-[var(--surface)] rounded-[var(--radius-md)] border border-[var(--border)] text-[var(--text-soft)] space-y-3 shadow-[var(--shadow-sm)]">
                <FileText className="h-8 w-8 mx-auto text-[var(--text-muted)]" />
                <p className="font-bold text-sm text-[var(--text)]">No applications submitted yet.</p>
                <button
                  onClick={() => setActiveTab("jobs")}
                  className="px-5 py-2.5 bg-[var(--accent)] text-white text-xs font-bold rounded-[10px] shadow-[0_4px_12px_rgba(201,71,40,0.2)] hover:bg-[var(--accent-dark)] transition cursor-pointer"
                >
                  Explore Jobs (5)
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {myApplications.map(app => (
                  <div
                    key={app.id}
                    className="p-7 rounded-[var(--radius-md)] bg-[var(--surface)] border border-[var(--border)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] space-y-5 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[var(--border)]">
                      <div>
                        <h3 className="font-extrabold text-sm text-[var(--text)]">{app.role} • <span className="text-[var(--text-soft)]">{app.company}</span></h3>
                        <span className="text-[11px] text-[var(--text-muted)]">Candidate: {app.studentName} ({app.rollNo}) • Applied on {app.appliedDate}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-extrabold self-start sm:self-auto ${
                        app.stage === "Selected" ? "bg-[var(--green-light)] text-[var(--green)]" :
                        app.stage === "Rejected" ? "bg-[var(--red-light)] text-[var(--red)]" :
                        "bg-[var(--yellow-light)] text-[var(--yellow)]"
                      }`}>
                        {app.stage}
                      </span>
                    </div>

                    {/* Step Timeline */}
                    <div className="grid grid-cols-5 gap-2 text-center text-[10px] sm:text-xs">
                      {[
                        { step: 1, label: "Applied" },
                        { step: 2, label: "Assessment" },
                        { step: 3, label: "Technical" },
                        { step: 4, label: "HR Round" },
                        { step: 5, label: "Offer" },
                      ].map(st => {
                        const isDone = app.stageStep > st.step || (app.stageStep === 5 && app.stage === "Selected");
                        const isCurrent = app.stageStep === st.step && app.stage !== "Rejected";
                        return (
                          <div key={st.step} className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mb-1.5 transition-all ${
                              isDone ? "bg-[var(--green)] text-white shadow-sm" :
                              isCurrent ? "bg-[var(--accent)] text-white shadow-[0_4px_12px_rgba(201,71,40,0.3)]" :
                              "bg-[var(--surface-soft)] text-[var(--text-muted)]"
                            }`}>
                              {isDone ? "✓" : st.step}
                            </div>
                            <span className="text-[10px] font-semibold text-[var(--text-soft)]">{st.label}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="p-4 bg-[var(--surface-soft)] rounded-[var(--radius-sm)] border border-[var(--border)] text-xs">
                      <span className="font-extrabold text-[var(--text)] block mb-1">Status Update:</span>
                      <p className="text-[var(--text-soft)]">{app.feedback || "Application queued for evaluation."}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ==================== 7. PLACED STUDENTS (COMPANY-WISE) ==================== */}
        {activeTab === "placed" && (
          <div className="space-y-6">
            <div className="p-6 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--border)] shadow-[var(--shadow-sm)] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[9px] font-extrabold tracking-[1.5px] text-[var(--accent)] uppercase block">Success Metrics</span>
                  <h2 className="text-xl font-extrabold text-[var(--text)] tracking-tight">Placed Students Hall of Fame ({filteredPlaced.length})</h2>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-[var(--text-muted)]" />
                  <input
                    type="text"
                    placeholder="Search candidate, roll no..."
                    value={placedSearch}
                    onChange={(e) => setPlacedSearch(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2 text-xs rounded-[10px] bg-[var(--surface-soft)] border border-[var(--border)] text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>
              </div>

              {/* Company Selection Tabs */}
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  onClick={() => setSelectedPlacedCompany("All")}
                  className={`px-3.5 py-1.5 rounded-[8px] text-xs font-bold transition cursor-pointer ${
                    selectedPlacedCompany === "All"
                      ? "bg-[var(--accent)] text-white shadow-[0_4px_12px_rgba(201,71,40,0.2)]"
                      : "bg-[var(--surface-soft)] text-[var(--text-soft)] hover:text-[var(--text)]"
                  }`}
                >
                  All ({placedStudents.length})
                </button>
                {uniquePlacedCompanies.map(cName => {
                  const count = placedStudents.filter(p => p.company === cName).length;
                  return (
                    <button
                      key={cName}
                      onClick={() => setSelectedPlacedCompany(cName)}
                      className={`px-3.5 py-1.5 rounded-[8px] text-xs font-bold transition cursor-pointer ${
                        selectedPlacedCompany === cName
                          ? "bg-[var(--accent)] text-white shadow-[0_4px_12px_rgba(201,71,40,0.2)]"
                          : "bg-[var(--surface-soft)] text-[var(--text-soft)] hover:text-[var(--text)]"
                      }`}
                    >
                      {cName} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Placed Students Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPlaced.map(student => (
                <div
                  key={student.id}
                  className="p-6 rounded-[var(--radius-md)] bg-[var(--surface)] border border-[var(--border)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:-translate-y-1 space-y-4 transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-extrabold text-sm text-[var(--text)]">{student.name}</h4>
                      <p className="text-[11px] text-[var(--text-muted)] font-mono mt-0.5">{student.rollNo} • {student.branch}</p>
                    </div>
                    <span className="text-xs font-extrabold text-[var(--accent)] bg-[var(--accent-light)] px-3 py-1 rounded-full">{student.packageLpa} LPA</span>
                  </div>

                  <div className="p-3.5 bg-[var(--surface-soft)] rounded-[var(--radius-sm)] border border-[var(--border)] text-xs space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-[var(--text-muted)]">Placed at:</span>
                      <span className="font-extrabold text-[var(--text)]">{student.company}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--text-muted)]">Role:</span>
                      <span className="font-semibold text-[var(--text-soft)] truncate max-w-[130px]">{student.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== 8. ADMIN PANEL TAB ==================== */}
        {activeTab === "admin" && currentUser?.role === "admin" && (
          <div className="space-y-6">
            <div className="p-6 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--border)] shadow-[var(--shadow-sm)] flex justify-between items-center">
              <div>
                <span className="text-[9px] font-extrabold tracking-[1.5px] text-[var(--accent)] uppercase block">Control Console</span>
                <h2 className="text-xl font-extrabold text-[var(--text)] tracking-tight">Admin Placement Center</h2>
              </div>
              <button
                onClick={() => setShowAddJobModal(true)}
                className="px-4 py-2 bg-[var(--accent)] text-white text-xs font-bold rounded-[10px] shadow-[0_4px_12px_rgba(201,71,40,0.2)] hover:bg-[var(--accent-dark)] transition cursor-pointer"
              >
                + Post New Job
              </button>
            </div>

            <div className="bg-[var(--surface)] rounded-[var(--radius-md)] border border-[var(--border)] overflow-hidden shadow-[var(--shadow-sm)]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[var(--surface-soft)] text-[var(--text-muted)] uppercase font-extrabold tracking-wider text-[10px]">
                  <tr>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Company</th>
                    <th className="px-6 py-4">Package</th>
                    <th className="px-6 py-4">Applicants</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {jobs.map(j => (
                    <tr key={j.id} className="hover:bg-[var(--surface-soft)] transition">
                      <td className="px-6 py-4 font-extrabold text-[var(--text)]">{j.role}</td>
                      <td className="px-6 py-4 text-[var(--text-soft)]">{j.company}</td>
                      <td className="px-6 py-4 text-[var(--accent)] font-bold">{j.salary}</td>
                      <td className="px-6 py-4 font-semibold text-[var(--text)]">{j.applicants}</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setJobs(jobs.filter(x => x.id !== j.id))}
                          className="text-[var(--red)] font-bold hover:underline cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* ================= MODAL: JOB DETAILS ================= */}
      {selectedJobDetails && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-7 w-full max-w-lg shadow-[var(--shadow-lg)] space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-[var(--surface-soft)] text-[var(--text-soft)] border border-[var(--border)]">
                  {selectedJobDetails.badge}
                </span>
                <h3 className="text-lg font-extrabold text-[var(--text)] tracking-tight mt-2">{selectedJobDetails.role}</h3>
                <p className="text-xs font-semibold text-[var(--text-soft)]">{selectedJobDetails.company} • {selectedJobDetails.location}</p>
              </div>
              <span className="text-xs font-extrabold text-[var(--accent)] bg-[var(--accent-light)] px-3 py-1 rounded-full">{selectedJobDetails.salary}</span>
            </div>

            <p className="text-xs text-[var(--text-soft)] leading-relaxed">
              {selectedJobDetails.description}
            </p>

            <div className="space-y-1.5 text-xs">
              <span className="font-extrabold text-[var(--text)] block uppercase tracking-wider text-[10px]">Requirements:</span>
              <ul className="list-disc pl-4 text-[var(--text-soft)] space-y-1">
                {selectedJobDetails.requirements.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>

            <div className="pt-4 border-t border-[var(--border)] flex gap-2">
              <button
                type="button"
                onClick={() => setSelectedJobDetails(null)}
                className="flex-1 py-2.5 rounded-[10px] border border-[var(--border)] text-xs font-bold text-[var(--text)] hover:bg-[var(--surface-soft)] transition cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  handleApplyJob(selectedJobDetails);
                  setSelectedJobDetails(null);
                }}
                className="flex-1 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white rounded-[10px] text-xs font-bold shadow-[0_4px_12px_rgba(201,71,40,0.2)] transition cursor-pointer"
              >
                Apply for Position
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD JOB ================= */}
      {showAddJobModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-7 w-full max-w-md shadow-[var(--shadow-lg)] space-y-4">
            <h3 className="text-base font-extrabold text-[var(--text)] tracking-tight">Post New Campus Drive</h3>
            <form onSubmit={handleAddJobSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Company</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Microsoft"
                  value={newJob.company}
                  onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                  className="w-full p-2.5 text-xs rounded-[10px] bg-[var(--surface-soft)] border border-[var(--border)] text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Role Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Software Engineer"
                  value={newJob.role}
                  onChange={(e) => setNewJob({ ...newJob, role: e.target.value })}
                  className="w-full p-2.5 text-xs rounded-[10px] bg-[var(--surface-soft)] border border-[var(--border)] text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Salary / CTC</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 18 LPA"
                    value={newJob.salary}
                    onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                    className="w-full p-2.5 text-xs rounded-[10px] bg-[var(--surface-soft)] border border-[var(--border)] text-[var(--text)]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Tier</label>
                  <select
                    value={newJob.badge}
                    onChange={(e) => setNewJob({ ...newJob, badge: e.target.value as "Super Dream" | "Dream" | "Regular" })}
                    className="w-full p-2.5 text-xs rounded-[10px] bg-[var(--surface-soft)] border border-[var(--border)] text-[var(--text)]"
                  >
                    <option value="Super Dream">Super Dream</option>
                    <option value="Dream">Dream</option>
                    <option value="Regular">Regular</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Role overview..."
                  value={newJob.description}
                  onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                  className="w-full p-2.5 text-xs rounded-[10px] bg-[var(--surface-soft)] border border-[var(--border)] text-[var(--text)] resize-none"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddJobModal(false)}
                  className="flex-1 py-2.5 rounded-[10px] border border-[var(--border)] text-xs font-bold text-[var(--text)] hover:bg-[var(--surface-soft)] transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white rounded-[10px] text-xs font-bold shadow-[0_4px_12px_rgba(201,71,40,0.2)] transition cursor-pointer"
                >
                  Publish Drive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= FOOTER ================= */}
      <footer className="mt-auto border-t border-[var(--border)] bg-[var(--surface)] py-6 text-center text-xs text-[var(--text-muted)]">
        <p>© 2026 ApexPlacement • Campus Training & Recruitment Directorate</p>
      </footer>
    </div>
  );
}
