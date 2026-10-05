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
  BookOpen,
  GraduationCap,
  AlertCircle,
  Filter,
  ShieldCheck,
  Layers,
  FileText,
  Mail,
  Lock,
  Sparkles,
  Phone,
  Info,
  Compass,
  Star,
  CheckCircle2
} from "lucide-react";

// ================= TYPES =================
interface Job {
  id: number;
  role: string;
  company: string;
  location: string;
  salary: string;
  type: "Full-Time" | "Internship" | "Contract";
  category: "Software" | "Data & AI" | "Core Engineering" | "Design" | "Analytics";
  department: string;
  minCgpa: number;
  deadline: string;
  description: string;
  requirements: string[];
  rounds: string[];
  applicants: number;
  status: "Active" | "Closed";
  badge?: "Super Dream" | "Dream" | "Regular";
}

interface Company {
  id: number;
  name: string;
  industry: string;
  logoText: string;
  color: string;
  tier: "Super Dream (20+ LPA)" | "Dream (10-20 LPA)" | "Regular (<10 LPA)";
  visitingDate: string;
  eligibleBranches: string[];
  avgPackage: string;
  totalPlaced: number;
  description: string;
}

interface RoleCategory {
  id: string;
  title: string;
  iconName: string;
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
  stageStep: number; // 1 to 5
  nextSchedule?: string;
  feedback?: string;
}

interface UserAuth {
  name: string;
  email: string;
  role: "student" | "admin";
  rollNo?: string;
  branch?: string;
  cgpa?: number;
}

// ================= INITIAL MOCK DATA =================
const INITIAL_JOBS: Job[] = [
  {
    id: 1,
    role: "Software Development Engineer (SDE-1)",
    company: "Google",
    location: "Bangalore / Hyderabad",
    salary: "22 - 28 LPA",
    type: "Full-Time",
    category: "Software",
    department: "CSE, IT, ECE",
    minCgpa: 8.0,
    deadline: "2026-10-25",
    description: "Build robust, highly scalable, distributed backend architectures and client applications powering billions of global users.",
    requirements: ["Strong proficiency in DSA & C++/Java/Python", "Understanding of Distributed Systems", "Knowledge of REST APIs & Cloud basics"],
    rounds: ["Online Coding Test (90 mins)", "Technical Round 1 (DSA)", "Technical Round 2 (System Design)", "Googliness & Leadership"],
    applicants: 184,
    status: "Active",
    badge: "Super Dream",
  },
  {
    id: 2,
    role: "Cloud Backend Engineer",
    company: "Amazon Web Services (AWS)",
    location: "Hyderabad / Chennai",
    salary: "18 - 24 LPA",
    type: "Full-Time",
    category: "Software",
    department: "CSE, IT, ECE, EEE",
    minCgpa: 7.5,
    deadline: "2026-10-28",
    description: "Architect secure microservices and high-throughput serverless pipelines using AWS primitives.",
    requirements: ["Hands-on with Java/Go/Node.js", "Solid understanding of relational and NoSQL databases", "Basic cloud infrastructure familiarity"],
    rounds: ["Online Assessment", "Technical Interview 1", "Technical Interview 2", "Bar Raiser Interview"],
    applicants: 142,
    status: "Active",
    badge: "Super Dream",
  },
  {
    id: 3,
    role: "AI & Machine Learning Engineer",
    company: "Microsoft",
    location: "Bangalore / Noida",
    salary: "20 - 25 LPA",
    type: "Full-Time",
    category: "Data & AI",
    department: "CSE, IT, AI & DS",
    minCgpa: 8.5,
    deadline: "2026-11-05",
    description: "Develop generative AI workflows, computer vision models, and Copilot integrations with enterprise datasets.",
    requirements: ["Python, PyTorch, Scikit-learn, LangChain", "Deep understanding of LLMs, Transformers", "Data modeling & evaluation pipelines"],
    rounds: ["Coding & AI MCQ Screening", "ML Coding Interview", "Architecture & Research Discussion", "Managerial Round"],
    applicants: 98,
    status: "Active",
    badge: "Super Dream",
  },
  {
    id: 4,
    role: "Product Experience Designer",
    company: "Adobe",
    location: "Noida / Bangalore",
    salary: "14 - 18 LPA",
    type: "Full-Time",
    category: "Design",
    department: "All Branches Eligible",
    minCgpa: 7.0,
    deadline: "2026-10-30",
    description: "Design intuitive user experiences, interactive prototypes, design systems, and user empathy journeys.",
    requirements: ["Figma, Adobe Creative Suite, Design Thinking", "Strong portfolio showcasing UI/UX case studies", "Good communication & presentation skills"],
    rounds: ["Portfolio Review", "Live Design Challenge", "Cross-Functional Collaboration Round"],
    applicants: 62,
    status: "Active",
    badge: "Dream",
  },
  {
    id: 5,
    role: "Business & Data Analyst",
    company: "TCS Digital",
    location: "Chennai / Pune / Kochi",
    salary: "7.5 - 9 LPA",
    type: "Full-Time",
    category: "Analytics",
    department: "All Branches Eligible",
    minCgpa: 6.5,
    deadline: "2026-11-15",
    description: "Derive key actionable business insights, create automated PowerBI/Tableau dashboards, and optimize SQL queries.",
    requirements: ["SQL, Python / R, PowerBI / Tableau", "Data Warehousing concepts", "Strong statistical foundation"],
    rounds: ["TCS NQT Assessment", "Technical & Coding Interview", "HR & Management Round"],
    applicants: 380,
    status: "Active",
    badge: "Regular",
  },
  {
    id: 6,
    role: "Embedded Systems & VLSI Engineer",
    company: "Qualcomm",
    location: "Bangalore / Chennai",
    salary: "16 - 21 LPA",
    type: "Full-Time",
    category: "Core Engineering",
    department: "ECE, EEE, CSE",
    minCgpa: 7.8,
    deadline: "2026-11-10",
    description: "Develop firmware, SoC verification modules, and embedded Linux drivers for next-gen Snapdragon processors.",
    requirements: ["Embedded C, C++, Verilog/SystemVerilog", "Microcontroller architectures (ARM, RISC-V)", "RTOS & Device Drivers"],
    rounds: ["Aptitude & Core Hardware Test", "Technical Interview 1 (Digital Electronics)", "Technical Interview 2 (Embedded C)", "HR Round"],
    applicants: 76,
    status: "Active",
    badge: "Dream",
  },
];

const INITIAL_COMPANIES: Company[] = [
  {
    id: 1,
    name: "Google",
    industry: "Tech / Cloud / Search",
    logoText: "G",
    color: "from-red-500 to-yellow-500",
    tier: "Super Dream (20+ LPA)",
    visitingDate: "2026-10-25",
    eligibleBranches: ["CSE", "IT", "ECE"],
    avgPackage: "24.5 LPA",
    totalPlaced: 12,
    description: "Global technology powerhouse specializing in Internet services, AI, Cloud Computing, and Operating Systems.",
  },
  {
    id: 2,
    name: "Amazon",
    industry: "E-Commerce / Cloud",
    logoText: "A",
    color: "from-amber-500 to-orange-600",
    tier: "Super Dream (20+ LPA)",
    visitingDate: "2026-10-28",
    eligibleBranches: ["CSE", "IT", "ECE", "EEE"],
    avgPackage: "21.0 LPA",
    totalPlaced: 18,
    description: "Leading enterprise in cloud infrastructure (AWS), logistics, AI voice systems, and digital streaming.",
  },
  {
    id: 3,
    name: "Microsoft",
    industry: "Enterprise Software & AI",
    logoText: "M",
    color: "from-blue-600 to-cyan-500",
    tier: "Super Dream (20+ LPA)",
    visitingDate: "2026-11-05",
    eligibleBranches: ["CSE", "IT", "AI & DS"],
    avgPackage: "23.2 LPA",
    totalPlaced: 9,
    description: "Pioneer in computing platforms, Azure cloud, GitHub, Copilot AI, and global operating software.",
  },
  {
    id: 4,
    name: "Adobe",
    industry: "Digital Media & Creativity",
    logoText: "Ad",
    color: "from-rose-500 to-red-600",
    tier: "Dream (10-20 LPA)",
    visitingDate: "2026-10-30",
    eligibleBranches: ["All Branches Eligible"],
    avgPackage: "16.8 LPA",
    totalPlaced: 7,
    description: "Worldwide leader in digital creative suites, document cloud, digital marketing, and UI design solutions.",
  },
  {
    id: 5,
    name: "Qualcomm",
    industry: "Semiconductors & Telecom",
    logoText: "Q",
    color: "from-blue-700 to-indigo-800",
    tier: "Dream (10-20 LPA)",
    visitingDate: "2026-11-10",
    eligibleBranches: ["ECE", "EEE", "CSE"],
    avgPackage: "18.5 LPA",
    totalPlaced: 11,
    description: "Premier semiconductor corporation developing 5G connectivity, mobile processors, and IoT chips.",
  },
  {
    id: 6,
    name: "TCS (Digital & Prime)",
    industry: "IT Services & Consulting",
    logoText: "TCS",
    color: "from-indigo-600 to-purple-600",
    tier: "Regular (<10 LPA)",
    visitingDate: "2026-11-15",
    eligibleBranches: ["All Engineering Branches"],
    avgPackage: "8.2 LPA",
    totalPlaced: 64,
    description: "Multinational IT giant delivering digital transformation, cloud migrations, analytics, and consultancy.",
  },
];

const INITIAL_ROLES: RoleCategory[] = [
  {
    id: "software",
    title: "Software Development & Web",
    iconName: "Briefcase",
    description: "Frontend, Backend, and Fullstack engineers building web applications, APIs, and microservices.",
    averageSalary: "14 - 28 LPA",
    skills: ["React / Next.js", "Node.js / Java / Go", "SQL / MongoDB", "Data Structures & Algorithms", "Git & Docker"],
    openingsCount: 18,
  },
  {
    id: "ai-data",
    title: "Artificial Intelligence & Data",
    iconName: "TrendingUp",
    description: "Data scientists, ML engineers, and data analysts creating intelligent pipelines and models.",
    averageSalary: "12 - 25 LPA",
    skills: ["Python", "PyTorch / TensorFlow", "Pandas / NumPy", "LLMs / Prompting", "SQL & PowerBI"],
    openingsCount: 12,
  },
  {
    id: "core-vlsi",
    title: "Core Electronics & Embedded",
    iconName: "Layers",
    description: "Specialized roles in Semiconductor design, VLSI verification, IoT, and embedded firmware.",
    averageSalary: "10 - 22 LPA",
    skills: ["Embedded C / C++", "Verilog / VHDL", "Microcontrollers", "Digital Electronics", "PCB Design"],
    openingsCount: 9,
  },
  {
    id: "design-product",
    title: "UI/UX & Product Design",
    iconName: "Compass",
    description: "Product designers, interaction creators, and user experience researchers.",
    averageSalary: "9 - 18 LPA",
    skills: ["Figma & FigJam", "Wireframing", "Design Systems", "User Research", "Interaction Design"],
    openingsCount: 6,
  },
];

const INITIAL_PLACED_STUDENTS: StudentPlaced[] = [
  { id: 1, name: "Aravind Kumar", rollNo: "CS23001", branch: "CSE", cgpa: 9.2, company: "Google", packageLpa: 26, role: "Software Development Engineer", year: 2026 },
  { id: 2, name: "Rithika S", rollNo: "CS23014", branch: "CSE", cgpa: 9.4, company: "Google", packageLpa: 28, role: "Software Engineer", year: 2026 },
  { id: 3, name: "Divya Sharma", rollNo: "EC23024", branch: "ECE", cgpa: 8.8, company: "Amazon", packageLpa: 22, role: "Cloud Backend Engineer", year: 2026 },
  { id: 4, name: "Praveen Raj", rollNo: "IT23008", branch: "IT", cgpa: 8.9, company: "Amazon", packageLpa: 20, role: "SDE-1", year: 2026 },
  { id: 5, name: "Siddharth V", rollNo: "CS23089", branch: "CSE", cgpa: 9.1, company: "Microsoft", packageLpa: 24, role: "AI Software Engineer", year: 2026 },
  { id: 6, name: "Sneha G", rollNo: "EC23055", branch: "ECE", cgpa: 8.7, company: "Qualcomm", packageLpa: 19, role: "Embedded Firmware Engineer", year: 2026 },
  { id: 7, name: "Varun Nair", rollNo: "EC23071", branch: "ECE", cgpa: 8.5, company: "Qualcomm", packageLpa: 18, role: "SoC Verification Engineer", year: 2026 },
  { id: 8, name: "Ananya Iyer", rollNo: "IT23042", branch: "IT", cgpa: 8.2, company: "Adobe", packageLpa: 16, role: "Product Designer", year: 2026 },
  { id: 9, name: "Harish R", rollNo: "IT23012", branch: "IT", cgpa: 8.5, company: "TCS", packageLpa: 8.5, role: "Data Analyst (Digital)", year: 2026 },
  { id: 10, name: "Manoj Prasanna", rollNo: "CS23045", branch: "CSE", cgpa: 7.9, company: "TCS", packageLpa: 7.5, role: "Systems Engineer", year: 2026 },
  { id: 11, name: "Kavya Murugan", rollNo: "EE23030", branch: "EEE", cgpa: 8.1, company: "TCS", packageLpa: 7.5, role: "Associate Developer", year: 2026 },
];

const INITIAL_APPLICATIONS: ApplicationTrack[] = [
  {
    id: 101,
    jobId: 1,
    studentName: "Demo Student",
    studentEmail: "student@apexplacement.edu",
    rollNo: "CS26099",
    company: "Google",
    role: "Software Development Engineer (SDE-1)",
    appliedDate: "2026-10-01",
    salary: "22 - 28 LPA",
    stage: "Technical Interview",
    stageStep: 3,
    nextSchedule: "Round 2: System Design on Oct 12, 10:30 AM",
    feedback: "Cleared Online Assessment (100%) and Technical Round 1 DSA.",
  },
  {
    id: 102,
    jobId: 2,
    studentName: "Demo Student",
    studentEmail: "student@apexplacement.edu",
    rollNo: "CS26099",
    company: "Amazon Web Services (AWS)",
    role: "Cloud Backend Engineer",
    appliedDate: "2026-10-03",
    salary: "18 - 24 LPA",
    stage: "Online Assessment",
    stageStep: 2,
    nextSchedule: "Assessment Link active till Oct 10, 11:59 PM",
    feedback: "Resume shortlisted based on 8.92 CGPA and cloud coursework.",
  },
  {
    id: 103,
    jobId: 5,
    studentName: "Demo Student",
    studentEmail: "student@apexplacement.edu",
    rollNo: "CS26099",
    company: "TCS Digital",
    role: "Business & Data Analyst",
    appliedDate: "2026-09-28",
    salary: "7.5 - 9 LPA",
    stage: "Selected",
    stageStep: 5,
    nextSchedule: "Offer Letter Dispatched. Joining July 2026.",
    feedback: "🎉 Congratulations! Cleared all NQT, Technical and HR rounds successfully.",
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

  // Auth state
  const [currentUser, setCurrentUser] = useState<UserAuth | null>(() => {
    const saved = localStorage.getItem("apex_user");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    // Default demo student logged in for immediate easy use
    return {
      name: "Demo Student",
      email: "student@apexplacement.edu",
      role: "student",
      rollNo: "CS26099",
      branch: "Computer Science (CSE)",
      cgpa: 8.92,
    };
  });

  const [authModal, setAuthModal] = useState<"none" | "login" | "register">("none");
  const [authTab, setAuthTab] = useState<"student" | "admin">("student");

  // Login form inputs
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register form inputs
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regRollNo, setRegRollNo] = useState("");
  const [regBranch, setRegBranch] = useState("Computer Science (CSE)");
  const [regCgpa, setRegCgpa] = useState("8.5");
  const [regPassword, setRegPassword] = useState("");

  // Navigation tab: "home" | "about" | "jobs" | "companies" | "roles" | "tracker" | "placed" | "admin"
  const [activeTab, setActiveTab] = useState<string>("home");

  // Application Data States
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [companies] = useState<Company[]>(INITIAL_COMPANIES);
  const [roles] = useState<RoleCategory[]>(INITIAL_ROLES);
  const [placedStudents, setPlacedStudents] = useState<StudentPlaced[]>(INITIAL_PLACED_STUDENTS);
  const [applications, setApplications] = useState<ApplicationTrack[]>(INITIAL_APPLICATIONS);

  // Search & Filter states for Jobs
  const [jobSearch, setJobSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");

  // Search & Filter for Companies
  const [companySearch, setCompanySearch] = useState("");
  const [selectedCompanyTier, setSelectedCompanyTier] = useState<string>("All");

  // Filter for Placed Students
  const [placedSearch, setPlacedSearch] = useState("");
  const [selectedPlacedCompany, setSelectedPlacedCompany] = useState<string>("All");

  // Filter for Tracker
  const [trackerFilter, setTrackerFilter] = useState<string>("All");

  // Job Details Modal
  const [selectedJobDetails, setSelectedJobDetails] = useState<Job | null>(null);

  // Admin New Job Modal
  const [showAddJobModal, setShowAddJobModal] = useState(false);
  const [newJob, setNewJob] = useState({
    role: "",
    company: "",
    location: "",
    salary: "",
    type: "Full-Time" as const,
    category: "Software" as const,
    department: "CSE, IT, ECE",
    minCgpa: 7.0,
    deadline: "2026-11-30",
    description: "",
    badge: "Dream" as const,
  });

  // Action: Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail) {
      alert("Please enter email / ID");
      return;
    }

    const user: UserAuth = {
      name: authTab === "admin" ? "Placement Director (Admin)" : (loginEmail.split("@")[0] || "Student User"),
      email: loginEmail,
      role: authTab,
      rollNo: authTab === "student" ? "CS26" + Math.floor(100 + Math.random() * 900) : undefined,
      branch: authTab === "student" ? "Computer Science (CSE)" : undefined,
      cgpa: 8.85,
    };

    setCurrentUser(user);
    localStorage.setItem("apex_user", JSON.stringify(user));
    setAuthModal("none");
  };

  // Action: Handle Register
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword) {
      alert("Please fill in all mandatory fields");
      return;
    }

    const user: UserAuth = {
      name: regName,
      email: regEmail,
      role: authTab,
      rollNo: authTab === "student" ? regRollNo || "CS26001" : undefined,
      branch: authTab === "student" ? regBranch : undefined,
      cgpa: parseFloat(regCgpa) || 8.0,
    };

    setCurrentUser(user);
    localStorage.setItem("apex_user", JSON.stringify(user));
    setAuthModal("none");
  };

  // Action: Logout
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("apex_user");
    setActiveTab("home");
  };

  // Quick 1-Click Demo Login
  const handleQuickDemoLogin = (role: "student" | "admin") => {
    const user: UserAuth = role === "student"
      ? {
          name: "Demo Student",
          email: "student@apexplacement.edu",
          role: "student",
          rollNo: "CS26099",
          branch: "Computer Science (CSE)",
          cgpa: 8.92,
        }
      : {
          name: "Prof. Ramachandran (Head - Placement)",
          email: "placement.head@apexplacement.edu",
          role: "admin",
        };

    setCurrentUser(user);
    localStorage.setItem("apex_user", JSON.stringify(user));
    setAuthModal("none");
  };

  // Action: Apply for a job
  const handleApplyJob = (job: Job) => {
    if (!currentUser) {
      setAuthModal("login");
      return;
    }

    const alreadyApplied = applications.some(a => a.jobId === job.id && a.studentEmail === currentUser.email);
    if (alreadyApplied) {
      alert("You have already applied for this opening. Check 'Track Applications' tab.");
      return;
    }

    const newApp: ApplicationTrack = {
      id: Date.now(),
      jobId: job.id,
      studentName: currentUser.name,
      studentEmail: currentUser.email,
      rollNo: currentUser.rollNo || "STU" + Math.floor(1000 + Math.random() * 9000),
      company: job.company,
      role: job.role,
      appliedDate: new Date().toISOString().split("T")[0],
      salary: job.salary,
      stage: "Applied",
      stageStep: 1,
      nextSchedule: "Awaiting recruiter screening",
      feedback: "Application submitted successfully. Resume in review.",
    };

    setApplications([newApp, ...applications]);
    setJobs(jobs.map(j => j.id === job.id ? { ...j, applicants: j.applicants + 1 } : j));
    if (selectedJobDetails?.id === job.id) {
      setSelectedJobDetails({ ...selectedJobDetails, applicants: selectedJobDetails.applicants + 1 });
    }

    alert(`🎉 Success! Application submitted for ${job.role} at ${job.company}. You can track stages in 'Track Applications'.`);
  };

  // Action: Add Job by Admin
  const handleAddJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJob.role || !newJob.company || !newJob.location || !newJob.salary) {
      alert("Please fill all required job details.");
      return;
    }

    const created: Job = {
      id: Date.now(),
      ...newJob,
      requirements: ["Strong analytical skills", "Relevant academic coursework", "Team collaboration"],
      rounds: ["Online Aptitude / Coding", "Technical Interview", "HR Round"],
      applicants: 0,
      status: "Active",
    };

    setJobs([created, ...jobs]);
    setShowAddJobModal(false);
    alert(`Job post for ${newJob.role} at ${newJob.company} created successfully!`);
  };

  // Action: Admin updates applicant stage
  const handleUpdateApplicantStage = (
    appId: number,
    newStage: "Applied" | "Online Assessment" | "Technical Interview" | "HR Interview" | "Selected" | "Rejected",
    step: number,
    feedbackText: string
  ) => {
    setApplications(applications.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          stage: newStage,
          stageStep: step,
          feedback: feedbackText,
        };
      }
      return app;
    }));

    // If selected, automatically add to Placed Students hall of fame
    if (newStage === "Selected") {
      const targetApp = applications.find(a => a.id === appId);
      if (targetApp) {
        const alreadyPlaced = placedStudents.some(p => p.name === targetApp.studentName && p.company === targetApp.company);
        if (!alreadyPlaced) {
          const newPlaced: StudentPlaced = {
            id: Date.now(),
            name: targetApp.studentName,
            rollNo: targetApp.rollNo,
            branch: currentUser?.branch || "CSE",
            cgpa: currentUser?.cgpa || 8.8,
            company: targetApp.company,
            packageLpa: parseFloat(targetApp.salary) || 12.0,
            role: targetApp.role,
            year: 2026,
          };
          setPlacedStudents([newPlaced, ...placedStudents]);
        }
      }
    }
  };

  // Derived filter calculations
  const filteredJobs = jobs.filter(j => {
    const matchSearch = j.role.toLowerCase().includes(jobSearch.toLowerCase()) ||
      j.company.toLowerCase().includes(jobSearch.toLowerCase()) ||
      j.location.toLowerCase().includes(jobSearch.toLowerCase());
    const matchCat = selectedCategory === "All" || j.category === selectedCategory;
    const matchType = selectedType === "All" || j.type === selectedType;
    return matchSearch && matchCat && matchType;
  });

  const filteredCompanies = companies.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(companySearch.toLowerCase()) ||
      c.industry.toLowerCase().includes(companySearch.toLowerCase());
    const matchTier = selectedCompanyTier === "All" || c.tier.includes(selectedCompanyTier);
    return matchSearch && matchTier;
  });

  const filteredPlaced = placedStudents.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(placedSearch.toLowerCase()) ||
      p.rollNo.toLowerCase().includes(placedSearch.toLowerCase()) ||
      p.company.toLowerCase().includes(placedSearch.toLowerCase()) ||
      p.branch.toLowerCase().includes(placedSearch.toLowerCase());
    const matchComp = selectedPlacedCompany === "All" || p.company === selectedPlacedCompany;
    return matchSearch && matchComp;
  });

  const myApplications = currentUser
    ? applications.filter(a => a.studentEmail === currentUser.email || a.studentName === currentUser.name)
    : [];

  const filteredTrackerApps = (currentUser?.role === "admin" ? applications : myApplications).filter(a => {
    if (trackerFilter === "All") return true;
    if (trackerFilter === "In-Progress") return a.stage !== "Selected" && a.stage !== "Rejected";
    return a.stage === trackerFilter;
  });

  // Unique list of companies for Placed Filter dropdown
  const uniquePlacedCompanies = Array.from(new Set(placedStudents.map(p => p.company)));

  // Global aggregate stats
  const totalOffers = placedStudents.length;
  const highestPackage = Math.max(...placedStudents.map(p => p.packageLpa), 28);
  const avgPackageCalculated = (placedStudents.reduce((acc, p) => acc + p.packageLpa, 0) / placedStudents.length).toFixed(1);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 flex flex-col font-sans antialiased">
      
      {/* ================= HEADER / NAVBAR ================= */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab("home")}
            className="flex items-center space-x-3 cursor-pointer select-none shrink-0"
          >
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                ApexPlacement
              </span>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Campus Placement Portal</p>
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden xl:flex items-center space-x-1">
            {[
              { id: "home", label: "Home", icon: Sparkles },
              { id: "about", label: "About", icon: Info },
              { id: "jobs", label: "Jobs", icon: Briefcase },
              { id: "companies", label: "Companies", icon: Building2 },
              { id: "roles", label: "Roles", icon: Compass },
              { id: "tracker", label: "Applier Track", icon: Clock },
              { id: "placed", label: "Placed Students", icon: GraduationCap },
            ].map(item => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <IconComponent className="h-3.5 w-3.5" />
                  {item.label}
                </button>
              );
            })}

            {/* Admin tab if logged in as Admin */}
            {currentUser?.role === "admin" && (
              <button
                onClick={() => setActiveTab("admin")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  activeTab === "admin"
                    ? "bg-amber-600 text-white shadow-sm"
                    : "text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30"
                }`}
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                Admin Panel
              </button>
            )}
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center space-x-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* User Auth Profile / Login Button */}
            {currentUser ? (
              <div className="flex items-center space-x-2">
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-xs font-bold leading-tight">{currentUser.name}</span>
                  <span className="text-[10px] text-slate-500 capitalize">{currentUser.role} {currentUser.rollNo ? `• ${currentUser.rollNo}` : ""}</span>
                </div>
                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition flex items-center gap-1 text-xs font-semibold"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => { setAuthTab("student"); setAuthModal("login"); }}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setAuthTab("student"); setAuthModal("register"); }}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20 transition"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="xl:hidden border-t border-slate-200 dark:border-slate-800 px-4 py-2 flex items-center space-x-2 overflow-x-auto no-scrollbar">
          {[
            { id: "home", label: "Home" },
            { id: "about", label: "About" },
            { id: "jobs", label: "Jobs" },
            { id: "companies", label: "Companies" },
            { id: "roles", label: "Roles" },
            { id: "tracker", label: "Tracker" },
            { id: "placed", label: "Placed" },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 whitespace-nowrap ${
                activeTab === item.id
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              }`}
            >
              {item.label}
            </button>
          ))}
          {currentUser?.role === "admin" && (
            <button
              onClick={() => setActiveTab("admin")}
              className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 whitespace-nowrap ${
                activeTab === "admin" ? "bg-amber-600 text-white" : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
              }`}
            >
              Admin Panel
            </button>
          )}
        </div>
      </header>

      {/* ================= MAIN CONTENT PAGES ================= */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ==================== 1. HOME TAB ==================== */}
        {activeTab === "home" && (
          <div className="space-y-10">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white p-8 sm:p-12 shadow-xl shadow-blue-500/10">
              <div className="absolute -right-12 -top-12 w-96 h-96 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="max-w-2xl relative z-10 space-y-4">
                <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-semibold">
                  <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
                  <span>Campus Drive Season 2026 is LIVE</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                  Launch Your Dream Career with ApexPlacement
                </h1>
                <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
                  Connecting ambitious graduates with world-class engineering, design, and analytics opportunities. Explore active openings, track recruitment rounds, and celebrate campus placements.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => setActiveTab("jobs")}
                    className="bg-white text-blue-700 hover:bg-blue-50 font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md flex items-center gap-2 transition"
                  >
                    <Briefcase className="h-4 w-4" /> Explore Active Jobs ({jobs.length})
                  </button>
                  <button
                    onClick={() => setActiveTab("tracker")}
                    className="bg-blue-500/30 hover:bg-blue-500/50 backdrop-blur-md border border-white/20 text-white font-semibold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition flex items-center gap-2"
                  >
                    <Clock className="h-4 w-4" /> Track My Applications
                  </button>
                  <button
                    onClick={() => setActiveTab("placed")}
                    className="bg-purple-900/40 hover:bg-purple-900/60 border border-purple-300/30 text-white font-semibold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition flex items-center gap-2"
                  >
                    <GraduationCap className="h-4 w-4" /> Placed Students
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Metrics Statistics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-4">
                <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-xl">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Highest Package</p>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">{highestPackage} LPA</h3>
                  <span className="text-[10px] text-emerald-600 font-semibold">Google / Super Dream</span>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-4">
                <div className="p-3.5 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-xl">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Average CTC</p>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">{avgPackageCalculated} LPA</h3>
                  <span className="text-[10px] text-blue-600 font-semibold">+18% vs Last Year</span>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-4">
                <div className="p-3.5 bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 rounded-xl">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Offers Extended</p>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">{totalOffers} Offers</h3>
                  <span className="text-[10px] text-purple-600 font-semibold">Class of 2026</span>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-4">
                <div className="p-3.5 bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 rounded-xl">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Visiting Partners</p>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">{companies.length}+ Tier-1</h3>
                  <span className="text-[10px] text-amber-600 font-semibold">MNCs & Unicorns</span>
                </div>
              </div>
            </div>

            {/* Top Recruiters Logos Showcase */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-base font-bold flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-blue-600" />
                    Key Recruiting Partners
                  </h3>
                  <p className="text-xs text-slate-500">Top organizations currently conducting on-campus recruitment</p>
                </div>
                <button
                  onClick={() => setActiveTab("companies")}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  View all companies <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {companies.map(c => (
                  <div
                    key={c.id}
                    onClick={() => { setSelectedCompanyTier("All"); setCompanySearch(c.name); setActiveTab("companies"); }}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-md transition cursor-pointer text-center group"
                  >
                    <div className={`h-12 w-12 mx-auto rounded-xl bg-gradient-to-br ${c.color} text-white flex items-center justify-center font-black text-lg mb-2 shadow-sm group-hover:scale-105 transition-transform`}>
                      {c.logoText}
                    </div>
                    <span className="font-bold text-xs block truncate">{c.name}</span>
                    <span className="text-[10px] text-slate-500">{c.avgPackage}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* How It Works - 4 Step Process */}
            <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-8 rounded-3xl space-y-6">
              <div className="text-center max-w-xl mx-auto">
                <h3 className="text-xl font-bold">4-Step Campus Placement Workflow</h3>
                <p className="text-xs text-slate-300 mt-1">Simple and transparent process from application to receiving offer letter</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="h-8 w-8 rounded-full bg-blue-500 text-white font-bold text-xs flex items-center justify-center mx-auto mb-3">1</div>
                  <h4 className="font-bold text-xs mb-1">Profile Registration</h4>
                  <p className="text-[11px] text-slate-300">Complete student profile with CGPA, branch, resume & skill tags.</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="h-8 w-8 rounded-full bg-blue-500 text-white font-bold text-xs flex items-center justify-center mx-auto mb-3">2</div>
                  <h4 className="font-bold text-xs mb-1">Explore Openings</h4>
                  <p className="text-[11px] text-slate-300">Browse verified job postings filtered by eligibility and domain.</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="h-8 w-8 rounded-full bg-blue-500 text-white font-bold text-xs flex items-center justify-center mx-auto mb-3">3</div>
                  <h4 className="font-bold text-xs mb-1">Online One-Click Apply</h4>
                  <p className="text-[11px] text-slate-300">Submit applications directly before the company deadline.</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="h-8 w-8 rounded-full bg-emerald-500 text-white font-bold text-xs flex items-center justify-center mx-auto mb-3">4</div>
                  <h4 className="font-bold text-xs mb-1">Live Applier Tracker</h4>
                  <p className="text-[11px] text-slate-300">Track shortlisting, online assessments, interviews, and offer letters.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 2. ABOUT TAB ==================== */}
        {activeTab === "about" && (
          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
              <div className="max-w-3xl space-y-3">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs font-bold rounded-full">
                  About Our Center
                </span>
                <h2 className="text-2xl sm:text-3xl font-black">University Training & Placement Cell</h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  The Training & Placement Cell acts as the vital bridge between academia and corporate enterprises. Our mission is to equip students with industry-relevant competencies, algorithmic problem solving, professional communication, and placement assistance with Fortune 500 tech firms.
                </p>
              </div>

              {/* Vision & Mission Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <div className="p-6 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 space-y-2">
                  <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-300 font-bold text-sm">
                    <Sparkles className="h-4 w-4" />
                    <h3>Our Vision</h3>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    To achieve 100% placement readiness by fostering technological excellence, industrial internships, core competence, and ethical leadership among all graduating students.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 space-y-2">
                  <div className="flex items-center space-x-2 text-indigo-700 dark:text-indigo-300 font-bold text-sm">
                    <ShieldCheck className="h-4 w-4" />
                    <h3>Placement Policy & Guidelines</h3>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    One-Student-One-Dream policy: Once an offer above 15 LPA is accepted, the candidate remains locked for further regular drives, enabling equal opportunities for all peers.
                  </p>
                </div>
              </div>

              {/* Contact Coordinators */}
              <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                <h3 className="text-base font-bold mb-4 flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  Placement Officers & Coordinators
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                    <p className="font-bold text-sm">Prof. Ramachandran K</p>
                    <p className="text-slate-500 text-[11px]">Director - Placement & Industry Relations</p>
                    <p className="mt-2 text-blue-600 dark:text-blue-400 font-mono">placement.head@apexplacement.edu</p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                    <p className="font-bold text-sm">Dr. Preethi Sundaram</p>
                    <p className="text-slate-500 text-[11px]">Lead Coordinator (Tech & Core Engineering)</p>
                    <p className="mt-2 text-blue-600 dark:text-blue-400 font-mono">tech.placement@apexplacement.edu</p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                    <p className="font-bold text-sm">Placement Helpdesk</p>
                    <p className="text-slate-500 text-[11px]">Office 204, Academic Block A</p>
                    <p className="mt-2 text-blue-600 dark:text-blue-400 font-mono">+91 (044) 2899-4400</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 3. JOBS TAB ==================== */}
        {activeTab === "jobs" && (
          <div className="space-y-6">
            {/* Top Filter and Search Bar */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                    Campus Job Openings ({filteredJobs.length})
                  </h2>
                  <p className="text-xs text-slate-500">Explore and apply for verified drives from leading tech and core employers</p>
                </div>

                {currentUser?.role === "admin" && (
                  <button
                    onClick={() => setShowAddJobModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded-xl flex items-center gap-1.5 shadow-md shadow-blue-500/20 shrink-0 self-start md:self-auto"
                  >
                    <Plus className="h-4 w-4" /> Post New Job
                  </button>
                )}
              </div>

              {/* Search & Filter Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="relative sm:col-span-1">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by role, company, location..."
                    value={jobSearch}
                    onChange={(e) => setJobSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="All">All Domains / Categories</option>
                    <option value="Software">Software</option>
                    <option value="Data & AI">Data & AI</option>
                    <option value="Core Engineering">Core Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Analytics">Analytics</option>
                  </select>
                </div>

                <div>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="All">All Job Types</option>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Job Cards Grid */}
            {filteredJobs.length === 0 ? (
              <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-slate-500">
                <AlertCircle className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                <p className="font-semibold text-sm">No job openings found matching your criteria.</p>
                <button
                  onClick={() => { setJobSearch(""); setSelectedCategory("All"); setSelectedType("All"); }}
                  className="mt-3 px-4 py-1.5 bg-blue-50 dark:bg-blue-950 text-blue-600 rounded-xl text-xs font-semibold"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredJobs.map(job => {
                  const isApplied = applications.some(a => a.jobId === job.id && a.studentEmail === currentUser?.email);
                  return (
                    <div
                      key={job.id}
                      className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-lg transition-all flex flex-col justify-between group"
                    >
                      <div>
                        {/* Header Badge */}
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center space-x-2">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300">
                              {job.type}
                            </span>
                            {job.badge && (
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                job.badge === "Super Dream" ? "bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300" :
                                job.badge === "Dream" ? "bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300" :
                                "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                              }`}>
                                {job.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-xl flex items-center">
                            <DollarSign className="h-3 w-3 mr-0.5" />
                            {job.salary}
                          </span>
                        </div>

                        {/* Title & Company */}
                        <h3 className="text-base font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {job.role}
                        </h3>
                        <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-0.5">
                          {job.company} • <span className="text-slate-400 font-normal">{job.location}</span>
                        </p>

                        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                          {job.description}
                        </p>

                        {/* Requirements pills */}
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {job.requirements.slice(0, 2).map((req, idx) => (
                            <span key={idx} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md text-[10px]">
                              {req}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                        <div className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>Deadline: {job.deadline}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setSelectedJobDetails(job)}
                            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                          >
                            Details
                          </button>
                          <button
                            onClick={() => handleApplyJob(job)}
                            disabled={isApplied}
                            className={`px-4 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition ${
                              isApplied
                                ? "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20"
                            }`}
                          >
                            {isApplied ? (
                              <>
                                <CheckCircle className="h-3.5 w-3.5" /> Applied
                              </>
                            ) : (
                              <>
                                Apply <ArrowRight className="h-3.5 w-3.5" />
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ==================== 4. COMPANIES TAB ==================== */}
        {activeTab === "companies" && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-blue-600" />
                    Partner Recruiting Companies ({filteredCompanies.length})
                  </h2>
                  <p className="text-xs text-slate-500">Corporate hiring partners, eligibility criteria, visiting schedule & package statistics</p>
                </div>

                {/* Search */}
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search company or industry..."
                    value={companySearch}
                    onChange={(e) => setCompanySearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Tier Filters */}
              <div className="flex flex-wrap gap-2 pt-1">
                {["All", "Super Dream", "Dream", "Regular"].map(tier => (
                  <button
                    key={tier}
                    onClick={() => setSelectedCompanyTier(tier)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                      selectedCompanyTier === tier
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                    }`}
                  >
                    {tier === "All" ? "All Tiers" : tier}
                  </button>
                ))}
              </div>
            </div>

            {/* Companies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCompanies.map(comp => {
                const companyJobs = jobs.filter(j => j.company.toLowerCase().includes(comp.name.toLowerCase()));
                const companyPlaced = placedStudents.filter(p => p.company.toLowerCase().includes(comp.name.toLowerCase()));
                return (
                  <div
                    key={comp.id}
                    className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between hover:shadow-lg transition-all"
                  >
                    <div>
                      {/* Top Header */}
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${comp.color} text-white flex items-center justify-center font-black text-xl shadow-md`}>
                          {comp.logoText}
                        </div>
                        <div>
                          <h3 className="font-bold text-base">{comp.name}</h3>
                          <span className="text-[11px] text-slate-500">{comp.industry}</span>
                        </div>
                      </div>

                      {/* Tier Badge */}
                      <div className="mb-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300">
                          {comp.tier}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                        {comp.description}
                      </p>

                      {/* Specifications */}
                      <div className="space-y-2 text-xs py-3 border-y border-slate-100 dark:border-slate-800/80">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Average CTC:</span>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">{comp.avgPackage}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Campus Drive Date:</span>
                          <span className="font-semibold">{comp.visitingDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Eligible Branches:</span>
                          <span className="font-semibold truncate max-w-[150px]">{comp.eligibleBranches.join(", ")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Class of '26 Selected:</span>
                          <span className="font-bold text-blue-600">{companyPlaced.length} Students</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-2 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setSelectedPlacedCompany(comp.name);
                          setActiveTab("placed");
                        }}
                        className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline"
                      >
                        View Selected ({companyPlaced.length})
                      </button>

                      <button
                        onClick={() => {
                          setJobSearch(comp.name);
                          setActiveTab("jobs");
                        }}
                        className="px-3 py-1.5 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-300 rounded-xl text-xs font-bold hover:bg-blue-100 transition"
                      >
                        Open Jobs ({companyJobs.length})
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================== 5. ROLES & DOMAINS TAB ==================== */}
        {activeTab === "roles" && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
              <div className="max-w-2xl">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs font-bold rounded-full">
                  Career Tracks & Roadmaps
                </span>
                <h2 className="text-2xl font-black mt-2">Specialized Hiring Roles & Skill Expectations</h2>
                <p className="text-xs text-slate-500 mt-1">Detailed breakdown of career domains, skill requirements, compensation packages, and active vacancies.</p>
              </div>

              {/* Roles Breakdown Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {roles.map(role => (
                  <div
                    key={role.id}
                    className="p-6 rounded-3xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/50 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-sm">
                            <Compass className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-bold text-base">{role.title}</h3>
                            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">Typical CTC: {role.averageSalary}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2 mb-4">
                        {role.description}
                      </p>

                      <div className="space-y-2">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Key Skill Matrix</span>
                        <div className="flex flex-wrap gap-1.5">
                          {role.skills.map((skill, idx) => (
                            <span key={idx} className="px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium">
                              ✓ {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-500">{role.openingsCount} Active Openings</span>
                      <button
                        onClick={() => {
                          setSelectedCategory(role.title.includes("Software") ? "Software" : role.title.includes("AI") ? "Data & AI" : "All");
                          setActiveTab("jobs");
                        }}
                        className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm"
                      >
                        Browse {role.title.split(" ")[0]} Jobs <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== 6. APPLIER TRACK (APPLICATION TRACKER) ==================== */}
        {activeTab === "tracker" && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    Applier Live Status Tracker ({filteredTrackerApps.length})
                  </h2>
                  <p className="text-xs text-slate-500">Real-time stage timeline from resume screening to final offer dispatch</p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-1.5">
                  {["All", "In-Progress", "Selected", "Rejected"].map(filter => (
                    <button
                      key={filter}
                      onClick={() => setTrackerFilter(filter)}
                      className={`px-3 py-1 rounded-xl text-xs font-semibold transition ${
                        trackerFilter === filter
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Applications List */}
            {filteredTrackerApps.length === 0 ? (
              <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-slate-500">
                <FileText className="h-10 w-10 mx-auto mb-3 text-slate-400" />
                <p className="font-bold text-sm">No applications found in this category.</p>
                <p className="text-xs text-slate-400 mt-1">Browse available campus jobs and click "Apply" to start tracking.</p>
                <button
                  onClick={() => setActiveTab("jobs")}
                  className="mt-4 px-5 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Explore Jobs Now
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTrackerApps.map(app => (
                  <div
                    key={app.id}
                    className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5"
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-bold text-base">{app.role}</h3>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                            {app.company}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Candidate: <span className="font-semibold text-slate-700 dark:text-slate-200">{app.studentName} ({app.rollNo})</span> • Applied on {app.appliedDate}
                        </p>
                      </div>

                      <div className="flex items-center space-x-3">
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-xl">
                          {app.salary}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          app.stage === "Selected" ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300" :
                          app.stage === "Rejected" ? "bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-300" :
                          "bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300"
                        }`}>
                          {app.stage}
                        </span>
                      </div>
                    </div>

                    {/* Multi-stage Progress Stepper */}
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Recruitment Pipeline Stages</p>
                      <div className="grid grid-cols-5 gap-2 text-center text-[10px] sm:text-xs">
                        {[
                          { step: 1, label: "Applied" },
                          { step: 2, label: "Assessment" },
                          { step: 3, label: "Technical" },
                          { step: 4, label: "HR Round" },
                          { step: 5, label: "Offer / Result" },
                        ].map(st => {
                          const isPassed = app.stageStep > st.step || (app.stageStep === 5 && app.stage === "Selected");
                          const isCurrent = app.stageStep === st.step && app.stage !== "Rejected";
                          const isFailed = app.stage === "Rejected" && app.stageStep === st.step;

                          return (
                            <div key={st.step} className="flex flex-col items-center">
                              <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold mb-1.5 transition-all ${
                                isPassed ? "bg-emerald-600 text-white shadow-sm" :
                                isCurrent ? "bg-blue-600 text-white ring-4 ring-blue-100 dark:ring-blue-900/50" :
                                isFailed ? "bg-rose-600 text-white" :
                                "bg-slate-100 dark:bg-slate-800 text-slate-400"
                              }`}>
                                {isPassed ? "✓" : st.step}
                              </div>
                              <span className={`font-semibold ${
                                isCurrent ? "text-blue-600 dark:text-blue-400" :
                                isPassed ? "text-emerald-600 dark:text-emerald-400" :
                                "text-slate-400"
                              }`}>
                                {st.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Feedback and Schedule Alert */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 flex flex-col sm:flex-row justify-between gap-3 text-xs">
                      <div>
                        <span className="font-bold text-slate-700 dark:text-slate-200 block mb-0.5">Recruiter Update & Feedback:</span>
                        <p className="text-slate-500">{app.feedback || "Under progressive evaluation by recruitment committee."}</p>
                      </div>
                      {app.nextSchedule && (
                        <div className="sm:text-right shrink-0">
                          <span className="font-bold text-blue-600 dark:text-blue-400 block mb-0.5">Next Scheduled Activity:</span>
                          <span className="text-slate-600 dark:text-slate-300 font-medium">{app.nextSchedule}</span>
                        </div>
                      )}
                    </div>

                    {/* Admin Stage Controls */}
                    {currentUser?.role === "admin" && (
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                        <span className="text-[11px] font-bold text-amber-600">Admin Pipeline Controls:</span>
                        <div className="flex flex-wrap gap-1.5">
                          <button
                            onClick={() => handleUpdateApplicantStage(app.id, "Online Assessment", 2, "Assessment link scheduled for candidate.")}
                            className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-700 text-[10px] font-bold"
                          >
                            Set Assessment (Step 2)
                          </button>
                          <button
                            onClick={() => handleUpdateApplicantStage(app.id, "Technical Interview", 3, "Technical interview invite sent.")}
                            className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-700 text-[10px] font-bold"
                          >
                            Set Tech Round (Step 3)
                          </button>
                          <button
                            onClick={() => handleUpdateApplicantStage(app.id, "Selected", 5, "🎉 Selected! Full time placement offer issued.")}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[10px] font-bold shadow-sm"
                          >
                            Mark Selected (Offer)
                          </button>
                          <button
                            onClick={() => handleUpdateApplicantStage(app.id, "Rejected", app.stageStep, "Not shortlisted in this recruitment drive.")}
                            className="px-2.5 py-1 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-700 text-[10px] font-bold"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ==================== 7. PLACED STUDENTS TAB (GROUPED BY COMPANY) ==================== */}
        {activeTab === "placed" && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-blue-600" />
                    Placed Students Hall of Fame ({filteredPlaced.length})
                  </h2>
                  <p className="text-xs text-slate-500">Company-wise selections, student roll numbers, branches, and compensation details</p>
                </div>

                {/* Search */}
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search student, roll no, branch..."
                    value={placedSearch}
                    onChange={(e) => setPlacedSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Company Selection Tabs */}
              <div className="flex flex-wrap gap-2 pt-1 overflow-x-auto no-scrollbar">
                <button
                  onClick={() => setSelectedPlacedCompany("All")}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition shrink-0 ${
                    selectedPlacedCompany === "All"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                  }`}
                >
                  All Companies ({placedStudents.length})
                </button>
                {uniquePlacedCompanies.map(cName => {
                  const count = placedStudents.filter(p => p.company === cName).length;
                  return (
                    <button
                      key={cName}
                      onClick={() => setSelectedPlacedCompany(cName)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition shrink-0 ${
                        selectedPlacedCompany === cName
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                      }`}
                    >
                      {cName} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Placed Students Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPlaced.map(student => (
                <div
                  key={student.id}
                  className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                        {student.name.charAt(0)}
                      </div>
                      <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-xl">
                        {student.packageLpa} LPA
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">{student.name}</h3>
                    <p className="text-[11px] font-mono text-slate-500">{student.rollNo} • {student.branch}</p>
                    
                    <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Company:</span>
                        <span className="font-bold text-blue-600 dark:text-blue-400">{student.company}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Designation:</span>
                        <span className="font-medium text-slate-700 dark:text-slate-300 truncate max-w-[140px]">{student.role}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">CGPA:</span>
                        <span className="font-semibold">{student.cgpa} / 10.0</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Verified Placement
                    </span>
                    <span>Batch of {student.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== 8. ADMIN PANEL TAB ==================== */}
        {activeTab === "admin" && (
          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-amber-600" />
                  Placement Cell Administrative Console
                </h2>
                <p className="text-xs text-slate-500">Coordinate placement drives, add job postings, verify candidate selections</p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowAddJobModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded-xl flex items-center gap-1.5 shadow-md"
                >
                  <Plus className="h-4 w-4" /> Post New Job
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                <p className="text-xs text-slate-400 font-semibold">Active Job Posts</p>
                <h3 className="text-2xl font-black mt-1">{jobs.length} Positions</h3>
              </div>
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                <p className="text-xs text-slate-400 font-semibold">Total Application Submissions</p>
                <h3 className="text-2xl font-black mt-1 text-blue-600">{applications.length} Submissions</h3>
              </div>
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                <p className="text-xs text-slate-400 font-semibold">Confirmed Placed Students</p>
                <h3 className="text-2xl font-black mt-1 text-emerald-600">{placedStudents.length} Students</h3>
              </div>
            </div>

            {/* Manage Existing Job Openings Table */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
              <div className="p-5 border-b border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-sm">Active Campus Drives Management</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 uppercase font-semibold">
                    <tr>
                      <th className="px-5 py-3">Role</th>
                      <th className="px-5 py-3">Company</th>
                      <th className="px-5 py-3">Package</th>
                      <th className="px-5 py-3">Applicants</th>
                      <th className="px-5 py-3">Deadline</th>
                      <th className="px-5 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {jobs.map(j => (
                      <tr key={j.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                        <td className="px-5 py-3.5 font-bold">{j.role}</td>
                        <td className="px-5 py-3.5">{j.company}</td>
                        <td className="px-5 py-3.5 font-semibold text-emerald-600">{j.salary}</td>
                        <td className="px-5 py-3.5">{j.applicants} Candidates</td>
                        <td className="px-5 py-3.5 text-slate-400">{j.deadline}</td>
                        <td className="px-5 py-3.5 text-right">
                          <button
                            onClick={() => {
                              setJobs(jobs.filter(item => item.id !== j.id));
                              alert("Job posting removed.");
                            }}
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
          </div>
        )}
      </main>

      {/* ================= MODAL: JOB DETAILS ================= */}
      {selectedJobDetails && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative space-y-6">
            
            <div className="flex justify-between items-start">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300">
                  {selectedJobDetails.type} • {selectedJobDetails.category}
                </span>
                <h2 className="text-xl font-black mt-2">{selectedJobDetails.role}</h2>
                <p className="text-sm font-bold text-slate-600 dark:text-slate-300">{selectedJobDetails.company} • {selectedJobDetails.location}</p>
              </div>

              <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-xl">
                {selectedJobDetails.salary}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                <span className="text-slate-400 block text-[10px]">Min CGPA</span>
                <span className="font-bold">{selectedJobDetails.minCgpa} / 10</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                <span className="text-slate-400 block text-[10px]">Eligible Branches</span>
                <span className="font-bold truncate block">{selectedJobDetails.department}</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                <span className="text-slate-400 block text-[10px]">Deadline</span>
                <span className="font-bold">{selectedJobDetails.deadline}</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                <span className="text-slate-400 block text-[10px]">Applicants</span>
                <span className="font-bold">{selectedJobDetails.applicants}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">Role Overview</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedJobDetails.description}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">Key Qualifications & Skills</h4>
              <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-300">
                {selectedJobDetails.requirements.map((req, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">Selection Process</h4>
              <div className="flex flex-wrap gap-2 text-xs">
                {selectedJobDetails.rounds.map((round, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg font-medium">
                    Round {i+1}: {round}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-3">
              <button
                type="button"
                onClick={() => setSelectedJobDetails(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  handleApplyJob(selectedJobDetails);
                  setSelectedJobDetails(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md"
              >
                Apply for this Position
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: AUTH (LOGIN & REGISTER) ================= */}
      {authModal !== "none" && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative space-y-5">
            
            {/* Modal Header */}
            <div className="text-center space-y-1">
              <div className="h-12 w-12 rounded-2xl bg-blue-600 text-white mx-auto flex items-center justify-center font-black text-xl shadow-md mb-2">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold">
                {authModal === "login" ? "Sign in to ApexPlacement" : "Create New Account"}
              </h3>
              <p className="text-xs text-slate-500">
                {authModal === "login" ? "Enter your credentials or use 1-click demo login" : "Register with your student details"}
              </p>
            </div>

            {/* Role Switcher (Student vs Admin) */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
              <button
                type="button"
                onClick={() => setAuthTab("student")}
                className={`py-1.5 text-xs font-bold rounded-lg transition ${
                  authTab === "student" ? "bg-white dark:bg-slate-900 text-blue-600 shadow-sm" : "text-slate-500"
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setAuthTab("admin")}
                className={`py-1.5 text-xs font-bold rounded-lg transition ${
                  authTab === "admin" ? "bg-white dark:bg-slate-900 text-amber-600 shadow-sm" : "text-slate-500"
                }`}
              >
                Placement Officer (Admin)
              </button>
            </div>

            {/* 1-Click Instant Demo Login Button */}
            <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/40 text-center">
              <span className="text-[11px] text-blue-700 dark:text-blue-300 font-semibold block mb-2">
                ⚡ Quick 1-Click Demo Login
              </span>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin(authTab)}
                className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm"
              >
                Sign In Instantly as {authTab === "student" ? "Demo Student (CS26099)" : "Placement Director"}
              </button>
            </div>

            {/* Forms */}
            {authModal === "login" ? (
              <form onSubmit={handleLogin} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Email / Roll Number</label>
                  <input
                    type="text"
                    required
                    placeholder={authTab === "student" ? "student@apexplacement.edu" : "placement.head@apexplacement.edu"}
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setAuthModal("none")}
                    className="flex-1 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aravind Kumar"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Roll Number</label>
                    <input
                      type="text"
                      placeholder="e.g. CS26012"
                      value={regRollNo}
                      onChange={(e) => setRegRollNo(e.target.value)}
                      className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">CGPA</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="8.5"
                      value={regCgpa}
                      onChange={(e) => setRegCgpa(e.target.value)}
                      className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Department / Branch</label>
                  <select
                    value={regBranch}
                    onChange={(e) => setRegBranch(e.target.value)}
                    className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="Computer Science (CSE)">Computer Science (CSE)</option>
                    <option value="Information Technology (IT)">Information Technology (IT)</option>
                    <option value="Electronics & Comm (ECE)">Electronics & Comm (ECE)</option>
                    <option value="Electrical & Electronics (EEE)">Electrical & Electronics (EEE)</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="your.email@apexplacement.edu"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setAuthModal("none")}
                    className="flex-1 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                  >
                    Register Account
                  </button>
                </div>
              </form>
            )}

            {/* Switch between Login and Register */}
            <div className="text-center pt-2 text-xs text-slate-500">
              {authModal === "login" ? (
                <p>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setAuthModal("register")}
                    className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
                  >
                    Register here
                  </button>
                </p>
              ) : (
                <p>
                  Already registered?{" "}
                  <button
                    type="button"
                    onClick={() => setAuthModal("login")}
                    className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD JOB BY ADMIN ================= */}
      {showAddJobModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl relative space-y-4">
            <h3 className="text-lg font-bold">Post a New Campus Placement Drive</h3>
            <form onSubmit={handleAddJobSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Microsoft"
                  value={newJob.company}
                  onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                  className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Job Role Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Software Engineer"
                  value={newJob.role}
                  onChange={(e) => setNewJob({ ...newJob, role: e.target.value })}
                  className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Location</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bangalore"
                    value={newJob.location}
                    onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                    className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Salary / CTC</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 18 - 22 LPA"
                    value={newJob.salary}
                    onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                    className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Category</label>
                  <select
                    value={newJob.category}
                    onChange={(e) => setNewJob({ ...newJob, category: e.target.value as "Software" | "Data & AI" | "Core Engineering" | "Design" | "Analytics" })}
                    className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                  >
                    <option value="Software">Software</option>
                    <option value="Data & AI">Data & AI</option>
                    <option value="Core Engineering">Core Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Analytics">Analytics</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Drive Tier</label>
                  <select
                    value={newJob.badge}
                    onChange={(e) => setNewJob({ ...newJob, badge: e.target.value as "Super Dream" | "Dream" | "Regular" })}
                    className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                  >
                    <option value="Super Dream">Super Dream (20+ LPA)</option>
                    <option value="Dream">Dream (10 - 20 LPA)</option>
                    <option value="Regular">Regular (&lt;10 LPA)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Role Description</label>
                <textarea
                  rows={3}
                  placeholder="Enter key responsibilities and requirements..."
                  value={newJob.description}
                  onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                  className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddJobModal(false)}
                  className="flex-1 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                >
                  Publish Job Drive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= FOOTER ================= */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-8 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <div className="flex items-center justify-center space-x-2 font-bold text-slate-700 dark:text-slate-300">
            <Award className="h-4 w-4 text-blue-600" />
            <span>ApexPlacement Portal • Campus Recruitment & Training Directorate</span>
          </div>
          <p>© 2026 ApexPlacement. All rights reserved. Connecting students with industry-leading careers.</p>
        </div>
      </footer>
    </div>
  );
}
