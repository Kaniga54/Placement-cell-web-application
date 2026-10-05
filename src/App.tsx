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
  EyeOff
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

  // Registered Users persistence in localStorage
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
        name: "Admin Officer",
        email: "admin@placement.edu",
        password: "admin",
        role: "admin",
      }
    ];
  });

  // Current logged in user
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

  // Action: Handle Registration -> Automatically switches to Login
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword) {
      alert("Please fill in all required fields.");
      return;
    }

    const existing = registeredUsers.find(u => u.email.toLowerCase() === regEmail.toLowerCase());
    if (existing) {
      alert("An account with this email address already exists. Please log in.");
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

    // Reset register fields
    setRegName("");
    setRegEmail("");
    setRegRollNo("");
    setRegCgpa("");
    setRegPassword("");

    // Set prefilled email for login, show success notice, and switch directly to Login tab
    setLoginEmail(newUser.email);
    setLoginPassword("");
    setAuthNotification("Registration successful! Please enter your password to sign in.");
    setAuthView("login");
  };

  // Action: Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      alert("Please enter email and password.");
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
      // Fallback: If not in registered list, create standard session for easy flow
      const fallbackUser: UserAccount = {
        name: loginEmail.split("@")[0],
        email: loginEmail,
        role: loginEmail.includes("admin") ? "admin" : "student",
        rollNo: "STU" + Math.floor(1000 + Math.random() * 9000),
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
    if (!currentUser) {
      setActiveTab("home");
      setAuthView("login");
      alert("Please sign in or register to submit an application.");
      return;
    }

    const alreadyApplied = applications.some(a => a.jobId === job.id && a.studentEmail === currentUser.email);
    if (alreadyApplied) {
      alert("You have already applied for this position. Check the 'Applier Track' tab.");
      return;
    }

    const newApp: ApplicationTrack = {
      id: Date.now(),
      jobId: job.id,
      studentName: currentUser.name,
      studentEmail: currentUser.email,
      rollNo: currentUser.rollNo || "STU2026",
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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 flex flex-col font-sans">
      
      {/* ================= HEADER / NAVBAR ================= */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => setActiveTab("home")}
            className="flex items-center space-x-3 cursor-pointer select-none"
          >
            <div className="h-9 w-9 rounded-lg bg-slate-900 dark:bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white">
                ApexPlacement
              </span>
              <p className="text-[10px] text-slate-500 font-medium">Campus Placement Portal</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {[
              { id: "home", label: "Home", icon: Award },
              { id: "about", label: "About", icon: Info },
              { id: "jobs", label: "Jobs", icon: Briefcase },
              { id: "companies", label: "Companies", icon: Building2 },
              { id: "roles", label: "Roles", icon: Compass },
              { id: "tracker", label: "Applier Track", icon: Clock },
              { id: "placed", label: "Placed Students", icon: GraduationCap },
            ].map(item => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    isActive
                      ? "bg-slate-900 text-white dark:bg-blue-600"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <IconComp className="h-3.5 w-3.5" />
                  {item.label}
                </button>
              );
            })}

            {currentUser?.role === "admin" && (
              <button
                onClick={() => setActiveTab("admin")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  activeTab === "admin"
                    ? "bg-amber-600 text-white"
                    : "text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40"
                }`}
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                Admin Panel
              </button>
            )}
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {currentUser ? (
              <div className="flex items-center space-x-2">
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{currentUser.name}</span>
                  <span className="text-[10px] text-slate-500 capitalize">{currentUser.role}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1.5"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => { setActiveTab("home"); setAuthView("login"); }}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 text-white dark:bg-blue-600 hover:opacity-90 transition"
                >
                  Sign In / Register
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Sub Navigation */}
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 px-4 py-2 flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
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
              className={`px-3 py-1 rounded-md text-xs font-medium shrink-0 ${
                activeTab === item.id
                  ? "bg-slate-900 text-white dark:bg-blue-600"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
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
            
            {/* Top Grid: Hero & Auth Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Hero Overview (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold">
                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                    <span>Placement Drive 2026 Active</span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                    Campus Recruitment & Career Portal
                  </h1>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Official centralized platform for graduating students and recruiters. Discover curated job opportunities, submit applications, and monitor interview schedules.
                  </p>

                  <div className="pt-2 flex flex-wrap gap-3">
                    <button
                      onClick={() => setActiveTab("jobs")}
                      className="px-4 py-2 bg-slate-900 text-white dark:bg-blue-600 hover:opacity-90 font-semibold text-xs rounded-xl shadow-sm flex items-center gap-1.5 transition"
                    >
                      <Briefcase className="h-3.5 w-3.5" /> View Active Openings (5)
                    </button>
                    <button
                      onClick={() => setActiveTab("placed")}
                      className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold text-xs rounded-xl transition flex items-center gap-1.5"
                    >
                      <GraduationCap className="h-3.5 w-3.5" /> Placed Candidates
                    </button>
                  </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-[11px] text-slate-500 font-medium block">Highest CTC</span>
                    <span className="text-xl font-bold text-slate-900 dark:text-white">28 LPA</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-[11px] text-slate-500 font-medium block">Average CTC</span>
                    <span className="text-xl font-bold text-slate-900 dark:text-white">18.5 LPA</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-[11px] text-slate-500 font-medium block">Total Placed</span>
                    <span className="text-xl font-bold text-slate-900 dark:text-white">{placedStudents.length} Students</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-[11px] text-slate-500 font-medium block">Partner Firms</span>
                    <span className="text-xl font-bold text-slate-900 dark:text-white">{companies.length} Corporate</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Professional Auth Card (5 cols) */}
              <div className="lg:col-span-5">
                <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
                  
                  {currentUser ? (
                    /* Authenticated State */
                    <div className="space-y-4 text-center py-4">
                      <div className="h-14 w-14 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 mx-auto flex items-center justify-center font-bold text-lg">
                        <User className="h-7 w-7" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">{currentUser.name}</h3>
                        <p className="text-xs text-slate-500">{currentUser.email}</p>
                        {currentUser.rollNo && (
                          <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            {currentUser.rollNo} • {currentUser.branch || "Student"}
                          </span>
                        )}
                      </div>

                      <div className="pt-2 flex flex-col gap-2 text-xs">
                        <button
                          onClick={() => setActiveTab("tracker")}
                          className="w-full py-2 bg-slate-900 text-white dark:bg-blue-600 font-semibold rounded-xl"
                        >
                          View My Applications ({myApplications.length})
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full py-2 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Unauthenticated State: Clean Tab Switcher */
                    <div className="space-y-4">
                      <div className="flex border-b border-slate-200 dark:border-slate-800">
                        <button
                          onClick={() => { setAuthView("login"); setAuthNotification(null); }}
                          className={`flex-1 pb-2.5 text-xs font-bold transition-all border-b-2 ${
                            authView === "login"
                              ? "border-slate-900 dark:border-blue-500 text-slate-900 dark:text-white"
                              : "border-transparent text-slate-400 hover:text-slate-600"
                          }`}
                        >
                          Sign In
                        </button>
                        <button
                          onClick={() => { setAuthView("register"); setAuthNotification(null); }}
                          className={`flex-1 pb-2.5 text-xs font-bold transition-all border-b-2 ${
                            authView === "register"
                              ? "border-slate-900 dark:border-blue-500 text-slate-900 dark:text-white"
                              : "border-transparent text-slate-400 hover:text-slate-600"
                          }`}
                        >
                          Create Account
                        </button>
                      </div>

                      {/* Success / Info Toast */}
                      {authNotification && (
                        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300 text-xs flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" />
                          <span>{authNotification}</span>
                        </div>
                      )}

                      {/* LOGIN FORM */}
                      {authView === "login" ? (
                        <form onSubmit={handleLoginSubmit} className="space-y-3.5">
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Email / Student ID</label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                              <input
                                type="email"
                                required
                                placeholder="name@campus.edu"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-blue-500"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Password</label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                              <input
                                type={showPassword ? "text" : "password"}
                                required
                                placeholder="••••••••"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                className="w-full pl-9 pr-9 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-blue-500"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                              >
                                {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                              </button>
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="w-full py-2.5 bg-slate-900 text-white dark:bg-blue-600 hover:opacity-90 font-bold text-xs rounded-xl shadow-sm transition"
                          >
                            Sign In
                          </button>

                          <div className="text-center text-[11px] text-slate-400 pt-1">
                            <span>New student? </span>
                            <button
                              type="button"
                              onClick={() => { setAuthView("register"); setAuthNotification(null); }}
                              className="text-slate-900 dark:text-blue-400 font-bold hover:underline"
                            >
                              Register here
                            </button>
                          </div>
                        </form>
                      ) : (
                        /* REGISTER FORM */
                        <form onSubmit={handleRegisterSubmit} className="space-y-3">
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Account Role</label>
                            <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-semibold">
                              <button
                                type="button"
                                onClick={() => setRegRole("student")}
                                className={`py-1 rounded-md transition ${
                                  regRole === "student" ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm" : "text-slate-500"
                                }`}
                              >
                                Student
                              </button>
                              <button
                                type="button"
                                onClick={() => setRegRole("admin")}
                                className={`py-1 rounded-md transition ${
                                  regRole === "admin" ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm" : "text-slate-500"
                                }`}
                              >
                                Placement Officer
                              </button>
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Full Name</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Aravind Kumar"
                              value={regName}
                              onChange={(e) => setRegName(e.target.value)}
                              className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-blue-500"
                            />
                          </div>

                          {regRole === "student" && (
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Roll Number</label>
                                <input
                                  type="text"
                                  placeholder="CS26012"
                                  value={regRollNo}
                                  onChange={(e) => setRegRollNo(e.target.value)}
                                  className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] font-semibold text-slate-500 mb-1">CGPA</label>
                                <input
                                  type="number"
                                  step="0.01"
                                  placeholder="8.5"
                                  value={regCgpa}
                                  onChange={(e) => setRegCgpa(e.target.value)}
                                  className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                                />
                              </div>
                            </div>
                          )}

                          {regRole === "student" && (
                            <div>
                              <label className="block text-[11px] font-semibold text-slate-500 mb-1">Branch</label>
                              <select
                                value={regBranch}
                                onChange={(e) => setRegBranch(e.target.value)}
                                className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
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
                            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Email Address</label>
                            <input
                              type="email"
                              required
                              placeholder="name@campus.edu"
                              value={regEmail}
                              onChange={(e) => setRegEmail(e.target.value)}
                              className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Password</label>
                            <input
                              type="password"
                              required
                              placeholder="Create a strong password"
                              value={regPassword}
                              onChange={(e) => setRegPassword(e.target.value)}
                              className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full py-2.5 bg-slate-900 text-white dark:bg-blue-600 hover:opacity-90 font-bold text-xs rounded-xl shadow-sm transition"
                          >
                            Complete Registration
                          </button>
                        </form>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Featured 5 Job Openings Preview */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Active Placement Drives</h3>
                  <p className="text-xs text-slate-500">Curated opportunities currently open for campus applications</p>
                </div>
                <button
                  onClick={() => setActiveTab("jobs")}
                  className="text-xs font-semibold text-slate-900 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  View all openings <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {jobs.slice(0, 3).map(job => (
                  <div
                    key={job.id}
                    className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{job.company}</span>
                        <span className="text-xs font-bold text-emerald-600">{job.salary}</span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">{job.role}</h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{job.description}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
                      <span className="text-[11px] text-slate-400">Min CGPA: {job.minCgpa}</span>
                      <button
                        onClick={() => handleApplyJob(job)}
                        className="px-3 py-1 bg-slate-900 text-white dark:bg-blue-600 rounded-lg text-xs font-semibold"
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
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Placement Directorate</span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Training & Placement Cell</h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                The Training and Placement Cell facilitates career counseling, algorithmic training, and placement drives with national and global technology leaders.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white mb-1">Placement Policy</h4>
                  <p className="text-xs text-slate-500">
                    One-Offer Policy ensures equal opportunity across the graduating cohort. Students receiving Dream category offers remain locked from regular tier recruitment.
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white mb-1">Corporate Relations</h4>
                  <p className="text-xs text-slate-500">
                    Over 50+ MoUs with multinational corporations for semester internships, technology workshops, and direct on-campus hiring.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 text-xs">
                <h4 className="font-bold text-xs text-slate-900 dark:text-white mb-2">Placement Office Contact</h4>
                <p className="text-slate-500">Administrative Block, Academic Campus • Email: <span className="font-mono text-slate-700 dark:text-slate-300">placement@apexplacement.edu</span></p>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 3. JOBS TAB (5 CLEAN JOBS) ==================== */}
        {activeTab === "jobs" && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Active Campus Openings (5)</h2>
                <p className="text-xs text-slate-500">Curated opportunities for Class of 2026</p>
              </div>

              <div className="flex items-center space-x-3">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search role, company..."
                    value={jobSearch}
                    onChange={(e) => setJobSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                  />
                </div>
                {currentUser?.role === "admin" && (
                  <button
                    onClick={() => setShowAddJobModal(true)}
                    className="px-3 py-1.5 bg-slate-900 text-white dark:bg-blue-600 rounded-xl text-xs font-bold shrink-0"
                  >
                    + Post Job
                  </button>
                )}
              </div>
            </div>

            {/* 5 Jobs Listing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredJobs.map(job => {
                const isApplied = applications.some(a => a.jobId === job.id && a.studentEmail === currentUser?.email);
                return (
                  <div
                    key={job.id}
                    className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {job.badge}
                        </span>
                        <span className="text-xs font-bold text-emerald-600">{job.salary}</span>
                      </div>

                      <h3 className="font-bold text-base text-slate-900 dark:text-white">{job.role}</h3>
                      <p className="text-xs font-semibold text-slate-500 mt-0.5">{job.company} • {job.location}</p>

                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 line-clamp-2 leading-relaxed">
                        {job.description}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {job.requirements.map((r, i) => (
                          <span key={i} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800/60 rounded text-[10px] text-slate-600 dark:text-slate-400">
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-400">Deadline: {job.deadline}</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedJobDetails(job)}
                          className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => handleApplyJob(job)}
                          disabled={isApplied}
                          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                            isApplied
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 cursor-not-allowed"
                              : "bg-slate-900 text-white dark:bg-blue-600 hover:opacity-90"
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
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recruiting Corporate Partners ({filteredCompanies.length})</h2>
                <p className="text-xs text-slate-500">Hiring schedule and recruitment criteria</p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search company..."
                  value={companySearch}
                  onChange={(e) => setCompanySearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCompanies.map(comp => (
                <div
                  key={comp.id}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-bold flex items-center justify-center text-base">
                        {comp.logoText}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-slate-900 dark:text-white">{comp.name}</h3>
                        <span className="text-[11px] text-slate-400">{comp.industry}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                      {comp.description}
                    </p>

                    <div className="space-y-1.5 text-xs py-2 border-y border-slate-100 dark:border-slate-800">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Average CTC:</span>
                        <span className="font-bold text-slate-900 dark:text-white">{comp.avgPackage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Visiting Date:</span>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{comp.visitingDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-2 flex justify-between items-center text-xs">
                    <button
                      onClick={() => {
                        setSelectedPlacedCompany(comp.name);
                        setActiveTab("placed");
                      }}
                      className="text-slate-900 dark:text-blue-400 font-semibold hover:underline"
                    >
                      Placed Students
                    </button>
                    <button
                      onClick={() => {
                        setJobSearch(comp.name);
                        setActiveTab("jobs");
                      }}
                      className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-semibold"
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
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Career Tracks & Competency Matrices</h2>
              <p className="text-xs text-slate-500 mt-0.5">Core hiring domains and skill requirements</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roles.map(role => (
                <div
                  key={role.id}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">{role.title}</h3>
                    <span className="text-xs font-bold text-emerald-600">{role.averageSalary}</span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {role.description}
                  </p>

                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Recommended Skills</span>
                    <div className="flex flex-wrap gap-1.5">
                      {role.skills.map((s, idx) => (
                        <span key={idx} className="px-2.5 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs font-medium text-slate-700 dark:text-slate-300">
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
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Application Status Tracker</h2>
              <p className="text-xs text-slate-500">Live recruitment progress stages</p>
            </div>

            {myApplications.length === 0 ? (
              <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-500 space-y-3">
                <FileText className="h-8 w-8 mx-auto text-slate-400" />
                <p className="font-bold text-sm">No applications submitted yet.</p>
                <button
                  onClick={() => setActiveTab("jobs")}
                  className="px-4 py-2 bg-slate-900 text-white dark:bg-blue-600 text-xs font-bold rounded-xl"
                >
                  Explore Jobs (5)
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {myApplications.map(app => (
                  <div
                    key={app.id}
                    className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                      <div>
                        <h3 className="font-bold text-sm text-slate-900 dark:text-white">{app.role} • <span className="text-slate-500">{app.company}</span></h3>
                        <span className="text-[11px] text-slate-400">Candidate: {app.studentName} ({app.rollNo}) • Applied: {app.appliedDate}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold self-start sm:self-auto ${
                        app.stage === "Selected" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300" :
                        app.stage === "Rejected" ? "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300" :
                        "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200"
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
                            <div className={`h-7 w-7 rounded-full flex items-center justify-center font-bold mb-1 ${
                              isDone ? "bg-emerald-600 text-white" :
                              isCurrent ? "bg-slate-900 text-white dark:bg-blue-600" :
                              "bg-slate-100 dark:bg-slate-800 text-slate-400"
                            }`}>
                              {isDone ? "✓" : st.step}
                            </div>
                            <span className="text-[10px] text-slate-500">{st.label}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl text-xs text-slate-600 dark:text-slate-300">
                      <span className="font-bold text-slate-800 dark:text-slate-200 block mb-0.5">Status Update:</span>
                      <p className="text-slate-500">{app.feedback || "Application submitted and queued for evaluation."}</p>
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
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Placed Students Directory ({filteredPlaced.length})</h2>
                  <p className="text-xs text-slate-500">Company-wise selections and packages</p>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search candidate, roll no..."
                    value={placedSearch}
                    onChange={(e) => setPlacedSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                  />
                </div>
              </div>

              {/* Company Selection Tabs */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <button
                  onClick={() => setSelectedPlacedCompany("All")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                    selectedPlacedCompany === "All"
                      ? "bg-slate-900 text-white dark:bg-blue-600"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
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
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        selectedPlacedCompany === cName
                          ? "bg-slate-900 text-white dark:bg-blue-600"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                      }`}
                    >
                      {cName} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Placed Students Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPlaced.map(student => (
                <div
                  key={student.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">{student.name}</h4>
                      <p className="text-[11px] text-slate-400 font-mono">{student.rollNo} • {student.branch}</p>
                    </div>
                    <span className="text-xs font-bold text-emerald-600">{student.packageLpa} LPA</span>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Placed at:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{student.company}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Role:</span>
                      <span className="text-slate-600 dark:text-slate-300 truncate max-w-[130px]">{student.role}</span>
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
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Admin Placement Console</h2>
                <p className="text-xs text-slate-500">Manage placement drives and candidate records</p>
              </div>
              <button
                onClick={() => setShowAddJobModal(true)}
                className="px-3 py-1.5 bg-slate-900 text-white dark:bg-blue-600 text-xs font-bold rounded-xl"
              >
                + Post New Job
              </button>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 uppercase font-semibold">
                  <tr>
                    <th className="px-5 py-3">Role</th>
                    <th className="px-5 py-3">Company</th>
                    <th className="px-5 py-3">Package</th>
                    <th className="px-5 py-3">Applicants</th>
                    <th className="px-5 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {jobs.map(j => (
                    <tr key={j.id}>
                      <td className="px-5 py-3.5 font-bold">{j.role}</td>
                      <td className="px-5 py-3.5">{j.company}</td>
                      <td className="px-5 py-3.5 text-emerald-600 font-semibold">{j.salary}</td>
                      <td className="px-5 py-3.5">{j.applicants}</td>
                      <td className="px-5 py-3.5 text-right">
                        <button
                          onClick={() => setJobs(jobs.filter(x => x.id !== j.id))}
                          className="text-rose-600 font-bold hover:underline"
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
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 w-full max-w-lg shadow-xl space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {selectedJobDetails.badge}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">{selectedJobDetails.role}</h3>
                <p className="text-xs font-semibold text-slate-500">{selectedJobDetails.company} • {selectedJobDetails.location}</p>
              </div>
              <span className="text-xs font-bold text-emerald-600">{selectedJobDetails.salary}</span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {selectedJobDetails.description}
            </p>

            <div className="space-y-1 text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300 block">Requirements:</span>
              <ul className="list-disc pl-4 text-slate-500 space-y-0.5">
                {selectedJobDetails.requirements.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex gap-2">
              <button
                type="button"
                onClick={() => setSelectedJobDetails(null)}
                className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  handleApplyJob(selectedJobDetails);
                  setSelectedJobDetails(null);
                }}
                className="flex-1 py-2 bg-slate-900 text-white dark:bg-blue-600 rounded-xl text-xs font-bold"
              >
                Apply for Position
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD JOB ================= */}
      {showAddJobModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 w-full max-w-md shadow-xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Post New Campus Drive</h3>
            <form onSubmit={handleAddJobSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Company</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Microsoft"
                  value={newJob.company}
                  onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                  className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Role Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Software Engineer"
                  value={newJob.role}
                  onChange={(e) => setNewJob({ ...newJob, role: e.target.value })}
                  className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Salary / CTC</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 18 LPA"
                    value={newJob.salary}
                    onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                    className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Tier</label>
                  <select
                    value={newJob.badge}
                    onChange={(e) => setNewJob({ ...newJob, badge: e.target.value as "Super Dream" | "Dream" | "Regular" })}
                    className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                  >
                    <option value="Super Dream">Super Dream</option>
                    <option value="Dream">Dream</option>
                    <option value="Regular">Regular</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Role overview..."
                  value={newJob.description}
                  onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                  className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 resize-none"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddJobModal(false)}
                  className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-slate-900 text-white dark:bg-blue-600 rounded-xl text-xs font-bold"
                >
                  Publish Drive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= FOOTER ================= */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-center text-xs text-slate-400">
        <p>© 2026 ApexPlacement Portal • Campus Training & Recruitment Directorate</p>
      </footer>
    </div>
  );
}
