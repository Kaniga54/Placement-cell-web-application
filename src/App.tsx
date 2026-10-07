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
  UserCheck,
  Shield,
  FileCheck,
  Edit3,
  ExternalLink,
  Trash2,
  Sliders,
  Sparkles
} from "lucide-react";

// ================= DATA MODELS & TYPES =================
export type UserRole = "student" | "staff" | "admin" | "super_admin";

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  rollNo?: string;
  branch?: string;
  cgpa?: number;
  department?: string;
  designation?: string;
  resumeUrl?: string;
  resumeStatus?: "Pending Review" | "Approved" | "Needs Revision";
  resumeFeedback?: string;
  skills?: string[];
}

export interface Job {
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

export interface Company {
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

export interface RoleCategory {
  id: string;
  title: string;
  description: string;
  averageSalary: string;
  skills: string[];
  openingsCount: number;
}

export interface StudentPlaced {
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

export interface ApplicationTrack {
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
  resumeUrl?: string;
  nextSchedule?: string;
  feedback?: string;
}

// ================= PRE-SEEDED USERS FOR 4 ROLES =================
const SEED_USERS: UserAccount[] = [
  {
    id: "usr-1",
    name: "Aravind Kumar",
    email: "student@campus.edu",
    password: "student123",
    role: "student",
    rollNo: "CS23001",
    branch: "Computer Science (CSE)",
    cgpa: 9.2,
    resumeUrl: "https://drive.google.com/file/d/demo-resume-aravind/view",
    resumeStatus: "Approved",
    resumeFeedback: "Strong DSA, distributed systems projects and AWS fundamentals. Approved for Super Dream drives.",
    skills: ["Java", "Python", "Data Structures", "AWS", "React"],
  },
  {
    id: "usr-2",
    name: "Dr. K. Senthil Nathan",
    email: "staff@campus.edu",
    password: "staff123",
    role: "staff",
    department: "Computer Science & Engineering",
    designation: "Associate Professor & Faculty Placement Coordinator",
  },
  {
    id: "usr-3",
    name: "Prof. Ramachandran K",
    email: "admin@placement.edu",
    password: "admin123",
    role: "admin",
    designation: "Director - Campus Relations & Placement",
    department: "University Directorate of Training & Placement",
  },
  {
    id: "usr-4",
    name: "Super Admin Chancellor",
    email: "superadmin@apexplacement.edu",
    password: "superadmin123",
    role: "super_admin",
    designation: "Chief Information Officer & Master Administrator",
  },
];

// ================= EXACTLY 5 CLEAN CURATED JOBS =================
const INITIAL_5_JOBS: Job[] = [
  {
    id: 1,
    role: "Software Development Engineer (SDE-1)",
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
    studentEmail: "student@campus.edu",
    rollNo: "CS23001",
    company: "Google",
    role: "Software Development Engineer (SDE-1)",
    appliedDate: "2026-10-01",
    salary: "24 - 28 LPA",
    stage: "Selected",
    stageStep: 5,
    resumeUrl: "https://drive.google.com/file/d/demo-resume-aravind/view",
    nextSchedule: "Offer Letter Dispatched. Joining July 2026.",
    feedback: "Cleared all technical coding rounds and Googliness fitment round.",
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
    resumeUrl: "https://drive.google.com/file/d/demo-resume-divya/view",
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
  const [users, setUsers] = useState<UserAccount[]>(() => {
    const saved = localStorage.getItem("registered_users");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {
        return SEED_USERS;
      }
    }
    return SEED_USERS;
  });

  useEffect(() => {
    localStorage.setItem("registered_users", JSON.stringify(users));
  }, [users]);

  // Current logged in user (null by default for standalone login gate)
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

  // Auth View State
  const [authView, setAuthView] = useState<"login" | "register">("login");
  const [authNotification, setAuthNotification] = useState<string | null>(null);

  // Form Fields - Login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Form Fields - Register
  const [regRole, setRegRole] = useState<UserRole>("student");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regRollNo, setRegRollNo] = useState("");
  const [regBranch, setRegBranch] = useState("Computer Science (CSE)");
  const [regCgpa, setRegCgpa] = useState("");
  const [regResumeUrl, setRegResumeUrl] = useState("");
  const [regDepartment, setRegDepartment] = useState("Computer Science & Engineering");
  const [regDesignation, setRegDesignation] = useState("Assistant Professor");
  const [regSuperKey, setRegSuperKey] = useState("");

  // Navigation Tabs: "home" | "about" | "jobs" | "companies" | "roles" | "tracker" | "placed" | "resume_panel" | "admin_panel" | "super_admin"
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

  // Resume Review Modal / State for Staff
  const [reviewingStudent, setReviewingStudent] = useState<UserAccount | null>(null);
  const [reviewFeedbackInput, setReviewFeedbackInput] = useState("");

  // Student Resume Edit Modal
  const [showResumeEditModal, setShowResumeEditModal] = useState(false);
  const [resumeEditLink, setResumeEditLink] = useState("");

  // Admin New Job Modal
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

  // Action: Handle Registration -> Automatically transitions to Login screen
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword) {
      alert("Please fill in all mandatory fields.");
      return;
    }

    if (regRole === "super_admin" && regSuperKey !== "APEX2026") {
      alert("Invalid Super Admin Key. Please use 'APEX2026' or select a different role.");
      return;
    }

    const existing = users.find(u => u.email.toLowerCase() === regEmail.toLowerCase());
    if (existing) {
      alert("An account with this email is already registered. Please sign in.");
      setAuthView("login");
      setLoginEmail(regEmail);
      return;
    }

    const newUser: UserAccount = {
      id: "usr-" + Date.now(),
      name: regName,
      email: regEmail,
      password: regPassword,
      role: regRole,
      rollNo: regRole === "student" ? (regRollNo || "CS" + Math.floor(10000 + Math.random() * 90000)) : undefined,
      branch: regRole === "student" ? regBranch : undefined,
      cgpa: regRole === "student" ? (parseFloat(regCgpa) || 8.0) : undefined,
      resumeUrl: regRole === "student" ? (regResumeUrl || "https://drive.google.com/file/d/student-resume/view") : undefined,
      resumeStatus: regRole === "student" ? "Pending Review" : undefined,
      department: (regRole === "staff" || regRole === "admin") ? regDepartment : undefined,
      designation: regRole === "staff" ? regDesignation : regRole === "admin" ? "Placement Officer" : regRole === "super_admin" ? "Master Administrator" : undefined,
      skills: regRole === "student" ? ["Problem Solving", "Core Engineering", "Communication"] : undefined,
    };

    const updated = [...users, newUser];
    setUsers(updated);

    // Reset register inputs
    setRegName("");
    setRegEmail("");
    setRegPassword("");
    setRegRollNo("");
    setRegCgpa("");
    setRegResumeUrl("");
    setRegSuperKey("");

    // Set prefilled email and switch to Login
    setLoginEmail(newUser.email);
    setLoginPassword("");
    setAuthNotification(`Account created for ${newUser.name} (${newUser.role.toUpperCase()})! Enter password to sign in.`);
    setAuthView("login");
  };

  // Action: Handle Login -> Enters Application
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      alert("Please enter email and password.");
      return;
    }

    const foundUser = users.find(
      u => u.email.toLowerCase() === loginEmail.toLowerCase() && u.password === loginPassword
    );

    if (foundUser) {
      setCurrentUser(foundUser);
      localStorage.setItem("current_user", JSON.stringify(foundUser));
      setAuthNotification(null);
      setLoginPassword("");
      setActiveTab("home");
    } else {
      alert("Invalid credentials. Please verify your email and password or use one of the Quick Test Accounts.");
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

  // Action: Student applies to Job with their Resume
  const handleApplyJob = (job: Job) => {
    if (!currentUser) return;

    if (currentUser.role !== "student") {
      alert("Only candidates registered as Students can submit job applications.");
      return;
    }

    const alreadyApplied = applications.some(a => a.jobId === job.id && a.studentEmail === currentUser.email);
    if (alreadyApplied) {
      alert("You have already submitted an application for this position. View status in 'Applier Track'.");
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
      resumeUrl: currentUser.resumeUrl || "https://drive.google.com/file/d/student-resume/view",
      nextSchedule: "Awaiting recruiter screening",
      feedback: "Application submitted with verified candidate credentials. Profile is under review.",
    };

    setApplications([newApp, ...applications]);
    setJobs(jobs.map(j => j.id === job.id ? { ...j, applicants: j.applicants + 1 } : j));
    if (selectedJobDetails?.id === job.id) {
      setSelectedJobDetails({ ...selectedJobDetails, applicants: selectedJobDetails.applicants + 1 });
    }

    alert(`🎉 Application successfully submitted for ${job.role} at ${job.company}!`);
  };

  // Action: Staff reviews student resume
  const handleStaffResumeReview = (studentId: string, status: "Approved" | "Needs Revision", feedback: string) => {
    setUsers(users.map(u => {
      if (u.id === studentId) {
        return {
          ...u,
          resumeStatus: status,
          resumeFeedback: feedback,
        };
      }
      return u;
    }));

    if (currentUser?.id === studentId) {
      const updatedCurr = { ...currentUser, resumeStatus: status, resumeFeedback: feedback };
      setCurrentUser(updatedCurr);
      localStorage.setItem("current_user", JSON.stringify(updatedCurr));
    }

    setReviewingStudent(null);
    setReviewFeedbackInput("");
    alert(`Resume for student updated to "${status}". Feedback saved.`);
  };

  // Action: Student updates their own resume URL
  const handleStudentResumeUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeEditLink) return;

    if (currentUser) {
      const updated = { ...currentUser, resumeUrl: resumeEditLink, resumeStatus: "Pending Review" as const };
      setCurrentUser(updated);
      localStorage.setItem("current_user", JSON.stringify(updated));

      setUsers(users.map(u => u.id === currentUser.id ? updated : u));
      setShowResumeEditModal(false);
      alert("Resume link updated! Your faculty mentor will review it shortly.");
    }
  };

  // Action: Admin/Placement Officer progresses application stage
  const handleAdminUpdateAppStage = (
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

    // If marked as selected, automatically add to placed students list
    if (newStage === "Selected") {
      const targetApp = applications.find(a => a.id === appId);
      if (targetApp) {
        const alreadyPlaced = placedStudents.some(p => p.name === targetApp.studentName && p.company === targetApp.company);
        if (!alreadyPlaced) {
          const newPlaced: StudentPlaced = {
            id: Date.now(),
            name: targetApp.studentName,
            rollNo: targetApp.rollNo,
            branch: "CSE",
            cgpa: 9.0,
            company: targetApp.company,
            packageLpa: parseFloat(targetApp.salary) || 18.0,
            role: targetApp.role,
            year: 2026,
          };
          setPlacedStudents([newPlaced, ...placedStudents]);
        }
      }
    }
  };

  // Action: Admin posts new Job
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
    alert(`New drive for ${newJob.role} at ${newJob.company} has been published!`);
  };

  // Action: Super Admin deletes user
  const handleDeleteUser = (userId: string) => {
    if (userId === currentUser?.id) {
      alert("You cannot delete your own active Super Admin account.");
      return;
    }
    if (confirm("Are you sure you want to remove this user from the system?")) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  // Filtered lists
  const filteredJobs = jobs.filter(j =>
    j.role.toLowerCase().includes(jobSearch.toLowerCase()) ||
    j.company.toLowerCase().includes(jobSearch.toLowerCase()) ||
    j.location.toLowerCase().includes(jobSearch.toLowerCase())
  );

  const filteredCompanies = companies.filter(c =>
    c.name.toLowerCase().includes(companySearch.toLowerCase()) ||
    c.industry.toLowerCase().includes(companySearch.toLowerCase())
  );

  const filteredPlaced = placedStudents.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(placedSearch.toLowerCase()) ||
      p.rollNo.toLowerCase().includes(placedSearch.toLowerCase()) ||
      p.company.toLowerCase().includes(placedSearch.toLowerCase());
    const matchComp = selectedPlacedCompany === "All" || p.company === selectedPlacedCompany;
    return matchSearch && matchComp;
  });

  const uniquePlacedCompanies = Array.from(new Set(placedStudents.map(p => p.company)));

  // Role filtered user subsets
  const studentUsers = users.filter(u => u.role === "student");
  const staffUsers = users.filter(u => u.role === "staff");
  const adminUsers = users.filter(u => u.role === "admin" || u.role === "super_admin");

  // Filtered applications for current student vs admin/super_admin
  const myApplications = (currentUser?.role === "student")
    ? applications.filter(a => a.studentEmail === currentUser.email || a.studentName === currentUser.name)
    : applications;

  // =========================================================================
  // 1. STANDALONE LOGIN / REGISTER GATE (When user is NOT logged in)
  // =========================================================================
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col justify-center items-center p-4 transition-colors duration-200 font-sans">
        
        {/* Dark Mode Toggle */}
        <div className="absolute top-6 right-6">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-[12px] bg-[var(--surface)] border border-[var(--border)] text-[var(--text-soft)] hover:text-[var(--text)] shadow-[var(--shadow-sm)] transition-all cursor-pointer"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>

        {/* Center Standalone Card */}
        <div className="w-full max-w-lg bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-7 sm:p-9 shadow-[var(--shadow-lg)] space-y-6">
          
          {/* Brand Header */}
          <div className="text-center space-y-1.5">
            <div className="w-[44px] h-[44px] rounded-[12px] bg-[var(--text)] text-white mx-auto flex items-center justify-center font-extrabold text-sm shadow-[var(--shadow-sm)]">
              AP
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-[var(--text)] tracking-tight">ApexPlacement Portal</h1>
              <span className="text-[10px] font-bold text-[var(--text-muted)] tracking-wider uppercase">
                4-Tier Multi-Role Campus Recruitment System
              </span>
            </div>
          </div>

          {/* Quick 1-Click Test Login Selector */}
          <div className="p-3.5 rounded-[var(--radius-md)] bg-[var(--surface-soft)] border border-[var(--border)] space-y-2">
            <span className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider block text-center">
              ⚡ Quick 1-Click Account Presets
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[11px]">
              <button
                type="button"
                onClick={() => { setLoginEmail("student@campus.edu"); setLoginPassword("student123"); setAuthView("login"); }}
                className="p-2 rounded-[8px] bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] text-[var(--text)] font-bold transition flex flex-col items-center gap-1 cursor-pointer"
              >
                <GraduationCap className="h-3.5 w-3.5 text-[var(--accent)]" />
                <span>Student</span>
              </button>
              <button
                type="button"
                onClick={() => { setLoginEmail("staff@campus.edu"); setLoginPassword("staff123"); setAuthView("login"); }}
                className="p-2 rounded-[8px] bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--green)] text-[var(--text)] font-bold transition flex flex-col items-center gap-1 cursor-pointer"
              >
                <UserCheck className="h-3.5 w-3.5 text-[var(--green)]" />
                <span>Staff Mentor</span>
              </button>
              <button
                type="button"
                onClick={() => { setLoginEmail("admin@placement.edu"); setLoginPassword("admin123"); setAuthView("login"); }}
                className="p-2 rounded-[8px] bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--yellow)] text-[var(--text)] font-bold transition flex flex-col items-center gap-1 cursor-pointer"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-[var(--yellow)]" />
                <span>Placement Admin</span>
              </button>
              <button
                type="button"
                onClick={() => { setLoginEmail("superadmin@apexplacement.edu"); setLoginPassword("superadmin123"); setAuthView("login"); }}
                className="p-2 rounded-[8px] bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] text-[var(--text)] font-bold transition flex flex-col items-center gap-1 cursor-pointer"
              >
                <Shield className="h-3.5 w-3.5 text-[var(--accent)]" />
                <span>Super Admin</span>
              </button>
            </div>
          </div>

          {/* Clean Segment Tabs */}
          <div className="flex border-b border-[var(--border)]">
            <button
              onClick={() => { setAuthView("login"); setAuthNotification(null); }}
              className={`flex-1 pb-3 text-xs font-bold transition-all border-b-2 cursor-pointer ${
                authView === "login"
                  ? "border-[var(--accent)] text-[var(--accent)] font-extrabold"
                  : "border-transparent text-[var(--text-soft)] hover:text-[var(--text)]"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setAuthView("register"); setAuthNotification(null); }}
              className={`flex-1 pb-3 text-xs font-bold transition-all border-b-2 cursor-pointer ${
                authView === "register"
                  ? "border-[var(--accent)] text-[var(--accent)] font-extrabold"
                  : "border-transparent text-[var(--text-soft)] hover:text-[var(--text)]"
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Toast Notification */}
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
                <label className="block text-[11px] font-bold text-[var(--text-soft)] mb-1.5 uppercase tracking-wider">Email Address</label>
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
                    className="absolute right-3.5 top-3.5 text-[var(--text-muted)] hover:text-[var(--text)] cursor-pointer"
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
            </form>
          ) : (
            /* ================= REGISTER FORM WITH 4 ROLES ================= */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Select User Role</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 p-1 bg-[var(--surface-soft)] rounded-[10px] text-xs font-semibold">
                  {(["student", "staff", "admin", "super_admin"] as UserRole[]).map(role => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setRegRole(role)}
                      className={`py-1.5 rounded-[8px] transition cursor-pointer text-center text-[10px] font-bold ${
                        regRole === role ? "bg-[var(--surface)] text-[var(--accent)] shadow-[var(--shadow-sm)]" : "text-[var(--text-soft)]"
                      }`}
                    >
                      {role === "student" ? "Student" : role === "staff" ? "Staff" : role === "admin" ? "Admin" : "Super Admin"}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Prof. / Dr. / Student Name"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-[10px] bg-[var(--surface-soft)] border border-[var(--border)] text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
                />
              </div>

              {/* Student Specific Fields */}
              {regRole === "student" && (
                <>
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
                  <div>
                    <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Branch / Discipline</label>
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
                  <div>
                    <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Resume / Portfolio Link</label>
                    <input
                      type="url"
                      placeholder="https://drive.google.com/file/d/your-resume"
                      value={regResumeUrl}
                      onChange={(e) => setRegResumeUrl(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-[10px] bg-[var(--surface-soft)] border border-[var(--border)] text-[var(--text)]"
                    />
                  </div>
                </>
              )}

              {/* Staff & Admin Specific Fields */}
              {(regRole === "staff" || regRole === "admin") && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Department</label>
                    <input
                      type="text"
                      placeholder="e.g. CSE / ECE"
                      value={regDepartment}
                      onChange={(e) => setRegDepartment(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-[10px] bg-[var(--surface-soft)] border border-[var(--border)] text-[var(--text)]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Designation</label>
                    <input
                      type="text"
                      placeholder="e.g. Mentor / Placement Officer"
                      value={regDesignation}
                      onChange={(e) => setRegDesignation(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-[10px] bg-[var(--surface-soft)] border border-[var(--border)] text-[var(--text)]"
                    />
                  </div>
                </div>
              )}

              {/* Super Admin Security Key */}
              {regRole === "super_admin" && (
                <div>
                  <label className="block text-[10px] font-bold text-[var(--accent)] uppercase tracking-wider mb-1">Super Admin Passcode (Hint: APEX2026)</label>
                  <input
                    type="password"
                    placeholder="Enter master authorization key"
                    value={regSuperKey}
                    onChange={(e) => setRegSuperKey(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-[10px] bg-[var(--surface-soft)] border border-[var(--accent)] text-[var(--text)]"
                  />
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="user@campus.edu"
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
                  placeholder="Create a secure password"
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
            </form>
          )}
        </div>

        {/* Footer */}
        <p className="mt-8 text-xs text-[var(--text-muted)]">© 2026 ApexPlacement Portal • Multi-Role Access Control</p>
      </div>
    );
  }

  // =========================================================================
  // 2. MAIN APPLICATION SHELL (Role-Based Permissions)
  // =========================================================================
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-200 flex flex-col font-sans">
      
      {/* ================= HEADER / NAVBAR ================= */}
      <header className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[rgba(247,245,241,0.92)] dark:bg-[rgba(20,20,19,0.92)] backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[74px] flex items-center justify-between">
          
          {/* Brand Mark */}
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
                {currentUser.role === "student" && "🎓 Student Portal"}
                {currentUser.role === "staff" && "👨‍🏫 Staff Review Portal"}
                {currentUser.role === "admin" && "👔 Placement Officer Console"}
                {currentUser.role === "super_admin" && "🛡️ Super Admin Master Control"}
              </span>
            </div>
          </div>

          {/* Navigation Links (Role-Adaptive) */}
          <nav className="hidden xl:flex items-center space-x-5">
            {[
              { id: "home", label: "Home" },
              { id: "about", label: "About" },
              { id: "jobs", label: "Jobs (5)" },
              { id: "companies", label: "Companies" },
              { id: "roles", label: "Roles" },
              { id: "placed", label: "Placed Students" },
            ].map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`text-xs font-semibold relative py-1 transition-colors cursor-pointer ${
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

            {/* Student Specific Nav Links */}
            {currentUser.role === "student" && (
              <>
                <button
                  onClick={() => setActiveTab("tracker")}
                  className={`text-xs font-bold transition-all cursor-pointer ${
                    activeTab === "tracker" ? "text-[var(--accent)] font-extrabold" : "text-[var(--text-soft)] hover:text-[var(--text)]"
                  }`}
                >
                  My Applications ({myApplications.length})
                </button>
                <button
                  onClick={() => setActiveTab("student_resume")}
                  className={`px-3 py-1 rounded-[8px] text-xs font-bold transition-all cursor-pointer ${
                    activeTab === "student_resume"
                      ? "bg-[var(--accent)] text-white shadow-sm"
                      : "bg-[var(--surface-soft)] text-[var(--text)] border border-[var(--border)] hover:border-[var(--accent)]"
                  }`}
                >
                  My Resume
                </button>
              </>
            )}

            {/* Staff Specific Nav Links (Resume Review Panel) */}
            {currentUser.role === "staff" && (
              <button
                onClick={() => setActiveTab("staff_reviews")}
                className={`px-3.5 py-1.5 rounded-[8px] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === "staff_reviews"
                    ? "bg-[var(--green)] text-white shadow-sm"
                    : "bg-[var(--green-light)] text-[var(--green)] hover:bg-[var(--green)] hover:text-white"
                }`}
              >
                <FileCheck className="h-3.5 w-3.5" />
                Resume Review Panel ({studentUsers.length})
              </button>
            )}

            {/* Admin / Placement Officer Nav Links */}
            {currentUser.role === "admin" && (
              <button
                onClick={() => setActiveTab("admin_drives")}
                className={`px-3.5 py-1.5 rounded-[8px] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === "admin_drives"
                    ? "bg-[var(--accent)] text-white shadow-[0_4px_12px_rgba(201,71,40,0.2)]"
                    : "bg-[var(--accent-light)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white"
                }`}
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                Placement Drives & Applicants ({applications.length})
              </button>
            )}

            {/* Super Admin Master Nav Link */}
            {currentUser.role === "super_admin" && (
              <button
                onClick={() => setActiveTab("super_admin")}
                className={`px-3.5 py-1.5 rounded-[8px] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === "super_admin"
                    ? "bg-[var(--text)] text-white shadow-sm"
                    : "bg-[var(--surface-soft)] text-[var(--text)] border border-[var(--border)] hover:bg-[var(--text)] hover:text-white"
                }`}
              >
                <Shield className="h-3.5 w-3.5 text-[var(--accent)]" />
                Master Admin Center ({users.length} Users)
              </button>
            )}
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center space-x-3">
            {/* Role Badge Indicator */}
            <span className={`hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
              currentUser.role === "super_admin" ? "bg-[var(--text)] text-white" :
              currentUser.role === "admin" ? "bg-[var(--accent-light)] text-[var(--accent)]" :
              currentUser.role === "staff" ? "bg-[var(--green-light)] text-[var(--green)]" :
              "bg-[var(--surface-soft)] text-[var(--text-soft)] border border-[var(--border)]"
            }`}>
              {currentUser.role.replace("_", " ")}
            </span>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-[10px] bg-[var(--surface)] border border-[var(--border)] text-[var(--text-soft)] hover:text-[var(--text)] transition cursor-pointer"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* User Profile & Logout */}
            <div className="flex items-center space-x-2">
              <div className="hidden md:flex flex-col text-right">
                <span className="text-xs font-bold text-[var(--text)] leading-tight">{currentUser.name}</span>
                <span className="text-[10px] text-[var(--text-muted)] truncate max-w-[140px]">{currentUser.email}</span>
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

        {/* Mobile Navigation Strip */}
        <div className="xl:hidden border-t border-[var(--border)] px-4 py-2 flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: "home", label: "Home" },
            { id: "jobs", label: "Jobs" },
            { id: "companies", label: "Companies" },
            { id: "placed", label: "Placed" },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1 rounded-[8px] text-xs font-semibold shrink-0 cursor-pointer ${
                activeTab === item.id ? "bg-[var(--accent)] text-white" : "bg-[var(--surface)] text-[var(--text-soft)] border border-[var(--border)]"
              }`}
            >
              {item.label}
            </button>
          ))}
          {currentUser.role === "student" && (
            <>
              <button onClick={() => setActiveTab("tracker")} className="px-3 py-1 rounded-[8px] text-xs font-semibold bg-[var(--surface-soft)] shrink-0">Track</button>
              <button onClick={() => setActiveTab("student_resume")} className="px-3 py-1 rounded-[8px] text-xs font-semibold bg-[var(--surface-soft)] shrink-0">Resume</button>
            </>
          )}
          {currentUser.role === "staff" && (
            <button onClick={() => setActiveTab("staff_reviews")} className="px-3 py-1 rounded-[8px] text-xs font-bold bg-[var(--green-light)] text-[var(--green)] shrink-0">Review Resumes</button>
          )}
          {currentUser.role === "admin" && (
            <button onClick={() => setActiveTab("admin_drives")} className="px-3 py-1 rounded-[8px] text-xs font-bold bg-[var(--accent-light)] text-[var(--accent)] shrink-0">Placement Officer</button>
          )}
          {currentUser.role === "super_admin" && (
            <button onClick={() => setActiveTab("super_admin")} className="px-3 py-1 rounded-[8px] text-xs font-bold bg-[var(--text)] text-white shrink-0">Master Admin</button>
          )}
        </div>
      </header>

      {/* ================= MAIN BODY ================= */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ==================== 1. HOME TAB ==================== */}
        {activeTab === "home" && (
          <div className="space-y-8">
            
            {/* Hero Card */}
            <div className="p-8 sm:p-10 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--border)] shadow-[var(--shadow-md)] space-y-5">
              <div className="inline-flex items-center space-x-2 text-[var(--accent)] text-[10px] font-extrabold tracking-[2px] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></span>
                <span>Active Session: {currentUser.name} ({currentUser.role.toUpperCase()})</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-[-2px] text-[var(--text)] leading-[1.05]">
                Campus Recruitment & Placement Directorate
              </h1>

              <p className="text-xs sm:text-sm text-[var(--text-soft)] leading-relaxed max-w-3xl">
                Connecting students, faculty mentors, and corporate recruitment teams in a unified career advancement system.
              </p>

              {/* Dynamic Quick Actions based on Role */}
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => setActiveTab("jobs")}
                  className="px-5 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white font-bold text-xs rounded-[10px] shadow-[0_8px_20px_rgba(201,71,40,0.2)] hover:-translate-y-0.5 flex items-center gap-2 transition cursor-pointer"
                >
                  <Briefcase className="h-3.5 w-3.5" /> Explore Openings (5)
                </button>

                {currentUser.role === "student" && (
                  <button
                    onClick={() => setActiveTab("student_resume")}
                    className="px-5 py-2.5 bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] text-[var(--text)] font-semibold text-xs rounded-[10px] shadow-[var(--shadow-sm)] hover:-translate-y-0.5 transition flex items-center gap-2 cursor-pointer"
                  >
                    <FileText className="h-3.5 w-3.5" /> My Resume Status ({currentUser.resumeStatus || "Pending"})
                  </button>
                )}

                {currentUser.role === "staff" && (
                  <button
                    onClick={() => setActiveTab("staff_reviews")}
                    className="px-5 py-2.5 bg-[var(--green)] hover:opacity-90 text-white font-bold text-xs rounded-[10px] shadow-sm hover:-translate-y-0.5 transition flex items-center gap-2 cursor-pointer"
                  >
                    <FileCheck className="h-3.5 w-3.5" /> Review Student Resumes ({studentUsers.length})
                  </button>
                )}

                {currentUser.role === "admin" && (
                  <button
                    onClick={() => setActiveTab("admin_drives")}
                    className="px-5 py-2.5 bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] text-[var(--text)] font-bold text-xs rounded-[10px] shadow-sm hover:-translate-y-0.5 transition flex items-center gap-2 cursor-pointer"
                  >
                    <ShieldCheck className="h-3.5 w-3.5 text-[var(--accent)]" /> Manage Placement Drives
                  </button>
                )}

                {currentUser.role === "super_admin" && (
                  <button
                    onClick={() => setActiveTab("super_admin")}
                    className="px-5 py-2.5 bg-[var(--text)] hover:opacity-90 text-white font-bold text-xs rounded-[10px] shadow-sm hover:-translate-y-0.5 transition flex items-center gap-2 cursor-pointer"
                  >
                    <Shield className="h-3.5 w-3.5 text-[var(--accent)]" /> Master Control Panel
                  </button>
                )}
              </div>
            </div>

            {/* Placement Statistics */}
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
                <span className="text-[9px] font-extrabold tracking-[1.5px] text-[var(--text-muted)] uppercase block">Placed Students</span>
                <strong className="text-3xl font-extrabold text-[var(--text)] tracking-[-1px] block mt-2">{placedStudents.length} Offers</strong>
                <span className="text-[10px] font-bold text-[var(--text-soft)] block mt-2">Class of 2026</span>
              </div>
              <div className="p-6 rounded-[var(--radius-md)] bg-[var(--surface)] border border-[var(--border)] shadow-[var(--shadow-sm)] hover:-translate-y-1 transition-all">
                <span className="text-[9px] font-extrabold tracking-[1.5px] text-[var(--text-muted)] uppercase block">Active Drives</span>
                <strong className="text-3xl font-extrabold text-[var(--text)] tracking-[-1px] block mt-2">{jobs.length} Positions</strong>
                <span className="text-[10px] font-bold text-[var(--yellow)] block mt-2">Verified MNCs</span>
              </div>
            </div>

            {/* Featured Jobs Preview */}
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
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="p-8 sm:p-12 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--border)] shadow-[var(--shadow-md)] space-y-6">
              <div>
                <span className="text-[10px] font-extrabold tracking-[2px] text-[var(--accent)] uppercase block">
                  Institutional Career Services & Corporate Relations
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--text)] tracking-tight mt-1.5">
                  Centre for Career Advancement & Placements
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-soft)] leading-relaxed mt-3">
                  The Centre for Career Advancement & Corporate Relations serves as the strategic interface between university talent and leading global enterprises. We curate comprehensive career development initiatives—encompassing advanced algorithmic problem-solving, full-stack architecture bootcamps, executive leadership coaching, and domain-specific technical research—empowering graduating scholars to create immediate organizational impact.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                <div className="p-6 rounded-[var(--radius-md)] bg-[var(--surface-soft)] border border-[var(--border)] space-y-2">
                  <div className="flex items-center space-x-2 text-[var(--accent)]">
                    <ShieldCheck className="h-4 w-4" />
                    <h4 className="font-extrabold text-xs uppercase tracking-wider text-[var(--text)]">Placement Charter & Policy</h4>
                  </div>
                  <p className="text-xs text-[var(--text-soft)] leading-relaxed">
                    Our merit-driven <em>Universal Opportunity Protocol</em> balances competitive excellence with equitable access across all engineering disciplines. Tiered recruitment structures (Super Dream 20+ LPA, Dream, and Core Sector) ensure every candidate realizes their peak professional aspirations while democratizing tier-1 corporate access.
                  </p>
                </div>

                <div className="p-6 rounded-[var(--radius-md)] bg-[var(--surface-soft)] border border-[var(--border)] space-y-2">
                  <div className="flex items-center space-x-2 text-[var(--accent)]">
                    <Building2 className="h-4 w-4" />
                    <h4 className="font-extrabold text-xs uppercase tracking-wider text-[var(--text)]">Global Corporate Alliances</h4>
                  </div>
                  <p className="text-xs text-[var(--text-soft)] leading-relaxed">
                    Anchored by 60+ active Memorandums of Understanding (MoUs) with Fortune 500 multinationals and frontier deep-tech innovators. We facilitate year-round industrial immersion, credit-bearing capstone internships, co-developed curriculum labs, and executive mentorship pipelines.
                  </p>
                </div>

                <div className="p-6 rounded-[var(--radius-md)] bg-[var(--surface-soft)] border border-[var(--border)] space-y-2">
                  <div className="flex items-center space-x-2 text-[var(--accent)]">
                    <Compass className="h-4 w-4" />
                    <h4 className="font-extrabold text-xs uppercase tracking-wider text-[var(--text)]">Industry Readiness & Skill Labs</h4>
                  </div>
                  <p className="text-xs text-[var(--text-soft)] leading-relaxed">
                    Continuous multi-tiered capability development covering Distributed Computing, Large Language Models & AI Systems, Semiconductor VLSI, and Product Engineering, backed by automated aptitude benchmarking and live mock technical panel assessments.
                  </p>
                </div>

                <div className="p-6 rounded-[var(--radius-md)] bg-[var(--surface-soft)] border border-[var(--border)] space-y-2">
                  <div className="flex items-center space-x-2 text-[var(--accent)]">
                    <Award className="h-4 w-4" />
                    <h4 className="font-extrabold text-xs uppercase tracking-wider text-[var(--text)]">Alumni Career Mentorship</h4>
                  </div>
                  <p className="text-xs text-[var(--text-soft)] leading-relaxed">
                    A global alumni network spanning Google, Amazon, Microsoft, and leading Silicon Valley enterprises actively delivers technical guidance, system design review sessions, and resume alignment workshops for pre-final and final year candidates.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
                <div>
                  <h4 className="font-bold text-xs text-[var(--text)]">Office of Corporate Relations & Placements</h4>
                  <p className="text-[var(--text-muted)] text-[11px] mt-0.5">Central Academic Complex, Apex Directorate • Phone: +91 (044) 2899-4400</p>
                </div>
                <div className="px-4 py-2 rounded-[8px] bg-[var(--surface-soft)] border border-[var(--border)] text-[var(--text)] font-mono text-[11px]">
                  placement.directorate@apexplacement.edu
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 3. JOBS TAB ==================== */}
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
                {(currentUser.role === "admin" || currentUser.role === "super_admin") && (
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
                          {isApplied ? "Applied" : "Apply with Resume"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================== 4. STUDENT RESUME & PROFILE (STUDENT ROLE) ==================== */}
        {activeTab === "student_resume" && currentUser.role === "student" && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="p-8 sm:p-10 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--border)] shadow-[var(--shadow-md)] space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 border-b border-[var(--border)]">
                <div>
                  <span className="text-[9px] font-extrabold tracking-[1.5px] text-[var(--accent)] uppercase block">Candidate Profile</span>
                  <h2 className="text-2xl font-extrabold text-[var(--text)] tracking-tight mt-0.5">{currentUser.name}</h2>
                  <p className="text-xs text-[var(--text-soft)]">{currentUser.rollNo} • {currentUser.branch} • CGPA: {currentUser.cgpa}</p>
                </div>
                <button
                  onClick={() => { setResumeEditLink(currentUser.resumeUrl || ""); setShowResumeEditModal(true); }}
                  className="px-4 py-2 bg-[var(--accent)] text-white text-xs font-bold rounded-[8px] shadow-sm hover:bg-[var(--accent-dark)] transition cursor-pointer flex items-center gap-1.5"
                >
                  <Edit3 className="h-3.5 w-3.5" /> Update Resume URL
                </button>
              </div>

              {/* Resume Review Status Box */}
              <div className="p-6 rounded-[var(--radius-md)] bg-[var(--surface-soft)] border border-[var(--border)] space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-[var(--accent)]" />
                    <span className="font-extrabold text-sm text-[var(--text)]">Faculty Mentor Review Status</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                    currentUser.resumeStatus === "Approved" ? "bg-[var(--green-light)] text-[var(--green)]" :
                    currentUser.resumeStatus === "Needs Revision" ? "bg-[var(--red-light)] text-[var(--red)]" :
                    "bg-[var(--yellow-light)] text-[var(--yellow)]"
                  }`}>
                    {currentUser.resumeStatus || "Pending Review"}
                  </span>
                </div>

                <div className="text-xs space-y-1">
                  <span className="font-bold text-[var(--text)] block">Current Resume Document:</span>
                  <a
                    href={currentUser.resumeUrl || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--accent)] font-mono hover:underline flex items-center gap-1 break-all"
                  >
                    {currentUser.resumeUrl || "No resume link uploaded yet."} <ExternalLink className="h-3 w-3 shrink-0" />
                  </a>
                </div>

                <div className="pt-2 text-xs">
                  <span className="font-bold text-[var(--text)] block mb-0.5">Faculty Feedback:</span>
                  <p className="text-[var(--text-soft)] italic">
                    {currentUser.resumeFeedback || "Your faculty mentor has not provided feedback notes yet. Resumes are reviewed weekly."}
                  </p>
                </div>
              </div>

              {/* Candidate Skills Tags */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">Verified Skills Matrix</span>
                <div className="flex flex-wrap gap-2">
                  {(currentUser.skills || ["Problem Solving", "Java", "Python", "SQL"]).map((s, i) => (
                    <span key={i} className="px-3 py-1 bg-[var(--surface-soft)] border border-[var(--border)] rounded-[8px] text-xs font-semibold text-[var(--text)]">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 5. STAFF RESUME REVIEW PANEL (STAFF ROLE) ==================== */}
        {activeTab === "staff_reviews" && currentUser.role === "staff" && (
          <div className="space-y-6">
            <div className="p-6 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--border)] shadow-[var(--shadow-sm)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-[9px] font-extrabold tracking-[1.5px] text-[var(--green)] uppercase block">Faculty Mentor Portal</span>
                <h2 className="text-xl font-extrabold text-[var(--text)] tracking-tight">Student Resumes & Review Console ({studentUsers.length})</h2>
                <p className="text-xs text-[var(--text-soft)]">Review candidate resumes, verify academic credentials, and issue feedback notes</p>
              </div>
            </div>

            {/* Students List for Staff Review */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {studentUsers.map(stu => (
                <div
                  key={stu.id}
                  className="p-6 rounded-[var(--radius-md)] bg-[var(--surface)] border border-[var(--border)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] space-y-4 transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-extrabold text-base text-[var(--text)]">{stu.name}</h3>
                      <p className="text-[11px] text-[var(--text-muted)] font-mono">{stu.rollNo} • {stu.branch}</p>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                      stu.resumeStatus === "Approved" ? "bg-[var(--green-light)] text-[var(--green)]" :
                      stu.resumeStatus === "Needs Revision" ? "bg-[var(--red-light)] text-[var(--red)]" :
                      "bg-[var(--yellow-light)] text-[var(--yellow)]"
                    }`}>
                      {stu.resumeStatus || "Pending Review"}
                    </span>
                  </div>

                  <div className="p-3 bg-[var(--surface-soft)] rounded-[8px] border border-[var(--border)] text-xs space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-[var(--text-muted)]">Academic CGPA:</span>
                      <span className="font-bold text-[var(--text)]">{stu.cgpa || 8.5} / 10</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[var(--text-muted)]">Resume URL:</span>
                      {stu.resumeUrl ? (
                        <a
                          href={stu.resumeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[var(--accent)] font-bold hover:underline flex items-center gap-1"
                        >
                          View Document <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : (
                        <span className="text-slate-400">Not Uploaded</span>
                      )}
                    </div>
                  </div>

                  {stu.resumeFeedback && (
                    <div className="text-xs">
                      <span className="font-bold text-[var(--text)] block text-[11px]">Saved Feedback:</span>
                      <p className="text-[var(--text-soft)] italic text-[11px]">{stu.resumeFeedback}</p>
                    </div>
                  )}

                  {/* Staff Review Action Buttons */}
                  <div className="pt-2 border-t border-[var(--border)] flex gap-2">
                    <button
                      onClick={() => {
                        setReviewingStudent(stu);
                        setReviewFeedbackInput(stu.resumeFeedback || "");
                      }}
                      className="flex-1 py-1.5 bg-[var(--surface-soft)] hover:bg-[var(--surface)] text-[var(--text)] border border-[var(--border)] rounded-[8px] text-xs font-bold transition cursor-pointer"
                    >
                      Review & Give Feedback
                    </button>
                    <button
                      onClick={() => handleStaffResumeReview(stu.id, "Approved", "Verified by faculty mentor. Cleared for all campus placement drives.")}
                      className="px-3.5 py-1.5 bg-[var(--green)] hover:opacity-90 text-white rounded-[8px] text-xs font-bold transition cursor-pointer"
                    >
                      Quick Approve
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== 6. ADMIN PLACEMENT DRIVES & PIPELINE (ADMIN ROLE) ==================== */}
        {activeTab === "admin_drives" && (currentUser.role === "admin" || currentUser.role === "super_admin") && (
          <div className="space-y-8">
            <div className="p-6 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--border)] shadow-[var(--shadow-sm)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-[9px] font-extrabold tracking-[1.5px] text-[var(--accent)] uppercase block">Placement Directorate Console</span>
                <h2 className="text-xl font-extrabold text-[var(--text)] tracking-tight">Placement Drives & Candidate Pipeline Management</h2>
                <p className="text-xs text-[var(--text-soft)]">Post job drives, evaluate applicants, and progress candidates through interview rounds</p>
              </div>

              <button
                onClick={() => setShowAddJobModal(true)}
                className="px-4 py-2 bg-[var(--accent)] text-white text-xs font-bold rounded-[10px] shadow-[0_4px_12px_rgba(201,71,40,0.2)] hover:bg-[var(--accent-dark)] transition cursor-pointer"
              >
                + Post New Drive
              </button>
            </div>

            {/* Applicant Pipeline Manager Table */}
            <div className="bg-[var(--surface)] rounded-[var(--radius-md)] border border-[var(--border)] overflow-hidden shadow-[var(--shadow-sm)]">
              <div className="p-5 border-b border-[var(--border)]">
                <h3 className="font-extrabold text-sm text-[var(--text)]">Applicant Interview Pipeline ({applications.length} Submissions)</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[var(--surface-soft)] text-[var(--text-muted)] uppercase font-extrabold tracking-wider text-[10px]">
                    <tr>
                      <th className="px-6 py-4">Student</th>
                      <th className="px-6 py-4">Role & Company</th>
                      <th className="px-6 py-4">Current Stage</th>
                      <th className="px-6 py-4">Resume</th>
                      <th className="px-6 py-4 text-right">Progress Stage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {applications.map(app => (
                      <tr key={app.id} className="hover:bg-[var(--surface-soft)] transition">
                        <td className="px-6 py-4">
                          <span className="font-bold text-[var(--text)] block">{app.studentName}</span>
                          <span className="text-[11px] text-[var(--text-muted)] font-mono">{app.rollNo}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-[var(--text)] block">{app.role}</span>
                          <span className="text-[11px] text-[var(--accent)] font-bold">{app.company} • {app.salary}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                            app.stage === "Selected" ? "bg-[var(--green-light)] text-[var(--green)]" :
                            app.stage === "Rejected" ? "bg-[var(--red-light)] text-[var(--red)]" :
                            "bg-[var(--yellow-light)] text-[var(--yellow)]"
                          }`}>
                            {app.stage}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {app.resumeUrl ? (
                            <a href={app.resumeUrl} target="_blank" rel="noreferrer" className="text-[var(--accent)] font-bold hover:underline flex items-center gap-1">
                              Resume <ExternalLink className="h-3 w-3" />
                            </a>
                          ) : (
                            <span className="text-slate-400">Attached</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-1.5">
                            <button
                              onClick={() => handleAdminUpdateAppStage(app.id, "Online Assessment", 2, "Scheduled for online technical assessment.")}
                              className="px-2 py-1 bg-[var(--surface-soft)] hover:bg-[var(--surface)] border border-[var(--border)] rounded text-[10px] font-bold text-[var(--text)]"
                            >
                              Assessment
                            </button>
                            <button
                              onClick={() => handleAdminUpdateAppStage(app.id, "Technical Interview", 3, "Invited for Round 1 Technical Interview.")}
                              className="px-2 py-1 bg-[var(--surface-soft)] hover:bg-[var(--surface)] border border-[var(--border)] rounded text-[10px] font-bold text-[var(--text)]"
                            >
                              Tech Round
                            </button>
                            <button
                              onClick={() => handleAdminUpdateAppStage(app.id, "Selected", 5, "🎉 Selected! Full-time offer letter dispatched.")}
                              className="px-2.5 py-1 bg-[var(--green)] hover:opacity-90 text-white rounded text-[10px] font-bold shadow-sm"
                            >
                              Issue Offer
                            </button>
                            <button
                              onClick={() => handleAdminUpdateAppStage(app.id, "Rejected", app.stageStep, "Not shortlisted in current drive.")}
                              className="px-2 py-1 bg-[var(--red-light)] text-[var(--red)] rounded text-[10px] font-bold"
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 7. SUPER ADMIN MASTER CONSOLE (SUPER ADMIN ROLE) ==================== */}
        {activeTab === "super_admin" && currentUser.role === "super_admin" && (
          <div className="space-y-8">
            <div className="p-6 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--border)] shadow-[var(--shadow-sm)] flex justify-between items-center">
              <div>
                <span className="text-[9px] font-extrabold tracking-[1.5px] text-[var(--accent)] uppercase block">Master Administrator</span>
                <h2 className="text-xl font-extrabold text-[var(--text)] tracking-tight">Super Admin Master System Control</h2>
                <p className="text-xs text-[var(--text-soft)]">Global oversight across all Students, Faculty Mentors, and Placement Officers</p>
              </div>
            </div>

            {/* Global User Management Directory */}
            <div className="bg-[var(--surface)] rounded-[var(--radius-md)] border border-[var(--border)] overflow-hidden shadow-[var(--shadow-sm)] space-y-4 p-6">
              <div className="flex justify-between items-center">
                <h3 className="font-extrabold text-sm text-[var(--text)]">All Registered Users ({users.length} Total)</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[var(--surface-soft)] text-[var(--text-muted)] uppercase font-extrabold tracking-wider text-[10px]">
                    <tr>
                      <th className="px-5 py-3">User Name</th>
                      <th className="px-5 py-3">Email Address</th>
                      <th className="px-5 py-3">System Role</th>
                      <th className="px-5 py-3">Details</th>
                      <th className="px-5 py-3 text-right">Master Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {users.map(u => (
                      <tr key={u.id} className="hover:bg-[var(--surface-soft)] transition">
                        <td className="px-5 py-3.5 font-bold text-[var(--text)]">{u.name}</td>
                        <td className="px-5 py-3.5 text-[var(--text-soft)] font-mono">{u.email}</td>
                        <td className="px-5 py-3.5">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                            u.role === "super_admin" ? "bg-[var(--text)] text-white" :
                            u.role === "admin" ? "bg-[var(--accent-light)] text-[var(--accent)]" :
                            u.role === "staff" ? "bg-[var(--green-light)] text-[var(--green)]" :
                            "bg-[var(--surface-soft)] text-[var(--text-soft)] border border-[var(--border)]"
                          }`}>
                            {u.role.replace("_", " ")}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-[11px] text-[var(--text-soft)]">
                          {u.role === "student" && `${u.rollNo || "CS"} • ${u.branch || "CSE"} • CGPA: ${u.cgpa || 8.5}`}
                          {u.role === "staff" && `${u.department || "Engineering"} • ${u.designation || "Faculty"}`}
                          {u.role === "admin" && `${u.designation || "Placement Officer"}`}
                          {u.role === "super_admin" && "Master System Access"}
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <button
                            onClick={() => handleDeleteUser(u.id)}
                            className="text-[var(--red)] font-bold hover:underline cursor-pointer flex items-center gap-1 ml-auto"
                          >
                            <Trash2 className="h-3.5 w-3.5" /> Remove
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

        {/* ==================== 8. APPLIER TRACK (FOR STUDENTS & SHARED VIEW) ==================== */}
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

        {/* ==================== 9. COMPANIES TAB ==================== */}
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

        {/* ==================== 10. ROLES TAB ==================== */}
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

        {/* ==================== 11. PLACED STUDENTS TAB ==================== */}
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

              {/* Company Tabs */}
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
      </main>

      {/* ================= MODAL: STAFF REVIEW RESUME ================= */}
      {reviewingStudent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-7 w-full max-w-lg shadow-[var(--shadow-lg)] space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">Faculty Resume Evaluation</span>
                <h3 className="text-lg font-extrabold text-[var(--text)] mt-1">{reviewingStudent.name}</h3>
                <p className="text-xs text-[var(--text-soft)]">{reviewingStudent.rollNo} • {reviewingStudent.branch}</p>
              </div>
              <span className="text-xs font-bold text-[var(--text-muted)]">CGPA: {reviewingStudent.cgpa || 8.5}</span>
            </div>

            <div className="p-3 bg-[var(--surface-soft)] rounded-[8px] border border-[var(--border)] text-xs">
              <span className="font-bold text-[var(--text)] block mb-1">Resume Link:</span>
              <a
                href={reviewingStudent.resumeUrl || "#"}
                target="_blank"
                rel="noreferrer"
                className="text-[var(--accent)] font-mono hover:underline flex items-center gap-1 break-all"
              >
                {reviewingStudent.resumeUrl || "No resume link provided"} <ExternalLink className="h-3.5 w-3.5 shrink-0" />
              </a>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[var(--text)] mb-1">Faculty Feedback & Recommendations</label>
              <textarea
                rows={3}
                placeholder="Enter feedback notes, project improvements, or approval comments..."
                value={reviewFeedbackInput}
                onChange={(e) => setReviewFeedbackInput(e.target.value)}
                className="w-full p-2.5 text-xs rounded-[10px] bg-[var(--surface-soft)] border border-[var(--border)] text-[var(--text)] resize-none"
              />
            </div>

            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setReviewingStudent(null)}
                className="flex-1 py-2.5 rounded-[10px] border border-[var(--border)] text-xs font-bold text-[var(--text)] hover:bg-[var(--surface-soft)]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleStaffResumeReview(reviewingStudent.id, "Needs Revision", reviewFeedbackInput || "Please update project details and format.")}
                className="flex-1 py-2.5 bg-[var(--red-light)] text-[var(--red)] border border-[#f8e6e4] rounded-[10px] text-xs font-bold hover:bg-[var(--red)] hover:text-white transition"
              >
                Request Revision
              </button>
              <button
                type="button"
                onClick={() => handleStaffResumeReview(reviewingStudent.id, "Approved", reviewFeedbackInput || "Resume verified and approved for all campus drives.")}
                className="flex-1 py-2.5 bg-[var(--green)] hover:opacity-90 text-white rounded-[10px] text-xs font-bold shadow-sm transition"
              >
                Approve Resume
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: STUDENT EDIT RESUME ================= */}
      {showResumeEditModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-7 w-full max-w-md shadow-[var(--shadow-lg)] space-y-4">
            <h3 className="text-base font-extrabold text-[var(--text)]">Update Your Resume Document URL</h3>
            <form onSubmit={handleStudentResumeUpdate} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold text-[var(--text-muted)] mb-1 uppercase tracking-wider">
                  Google Drive / Cloud Resume Link
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://drive.google.com/file/d/your-resume-link/view"
                  value={resumeEditLink}
                  onChange={(e) => setResumeEditLink(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-[10px] bg-[var(--surface-soft)] border border-[var(--border)] text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowResumeEditModal(false)}
                  className="flex-1 py-2.5 rounded-[10px] border border-[var(--border)] text-xs font-bold text-[var(--text)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white rounded-[10px] text-xs font-bold shadow-[0_4px_12px_rgba(201,71,40,0.2)]"
                >
                  Save & Request Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                Apply with Resume
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADMIN ADD JOB ================= */}
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
        <p>© 2026 ApexPlacement • Multi-Role Campus Recruitment System</p>
      </footer>
    </div>
  );
}
