import React, { useState, useEffect } from "react";
import { 
  Briefcase, 
  Users, 
  Building, 
  Award, 
  Search, 
  MapPin, 
  DollarSign, 
  Calendar, 
  User, 
  CheckCircle, 
  XCircle, 
  Clock, 
  TrendingUp,
  Moon,
  Sun,
  Plus,
  ArrowRight
} from "lucide-react";

// Types
interface Job {
  id: number;
  role: string;
  company: string;
  location: string;
  salary: string;
  status: "Active" | "Closed";
  type: string;
  description: string;
  applicants: number;
}

interface Student {
  id: number;
  name: string;
  rollNo: string;
  branch: string;
  cgpa: number;
  placedStatus: "Placed" | "Unplaced" | "In-Progress";
  company?: string;
}

interface Application {
  id: number;
  studentName: string;
  company: string;
  role: string;
  status: "Applied" | "Shortlisted" | "Selected" | "Rejected";
  date: string;
}

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("theme") === "dark";
  });

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

  // Active view: "student" | "admin"
  const [viewMode, setViewMode] = useState<"student" | "admin">("student");

  // Mock database state
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: 1,
      role: "Software Engineer",
      company: "Google",
      location: "Bangalore, India",
      salary: "18 - 22 LPA",
      status: "Active",
      type: "Full-Time",
      description: "Develop scalable and resilient web applications using modern stacks.",
      applicants: 124,
    },
    {
      id: 2,
      role: "Backend Developer",
      company: "Amazon",
      location: "Hyderabad, India",
      salary: "16 - 20 LPA",
      status: "Active",
      type: "Full-Time",
      description: "Design microservices, high-performance database schemas, and robust APIs.",
      applicants: 89,
    },
    {
      id: 3,
      role: "Product Designer",
      company: "Adobe",
      location: "Noida, India",
      salary: "12 - 15 LPA",
      status: "Active",
      type: "Full-Time",
      description: "Create user journeys, design wireframes, high-fidelity prototypes, and design systems.",
      applicants: 45,
    },
    {
      id: 4,
      role: "Data Analyst",
      company: "TCS",
      location: "Chennai, India",
      salary: "6 - 8 LPA",
      status: "Active",
      type: "Full-Time",
      description: "Synthesize business insights from massive datasets, build automated dashboards.",
      applicants: 312,
    },
  ]);

  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: "Aravind Kumar", rollNo: "CS23001", branch: "CSE", cgpa: 9.2, placedStatus: "Placed", company: "Google" },
    { id: 2, name: "Divya Sharma", rollNo: "EC23024", branch: "ECE", cgpa: 8.7, placedStatus: "In-Progress" },
    { id: 3, name: "Manoj Prasanna", rollNo: "CS23045", branch: "CSE", cgpa: 7.9, placedStatus: "Unplaced" },
    { id: 4, name: "Harish R", rollNo: "IT23012", branch: "IT", cgpa: 8.5, placedStatus: "Placed", company: "TCS" },
    { id: 5, name: "Sneha G", rollNo: "EC23055", branch: "ECE", cgpa: 9.0, placedStatus: "In-Progress" },
  ]);

  const [applications, setApplications] = useState<Application[]>([
    { id: 1, studentName: "Aravind Kumar", company: "Google", role: "Software Engineer", status: "Selected", date: "2026-07-28" },
    { id: 2, studentName: "Divya Sharma", company: "Amazon", role: "Backend Developer", status: "Shortlisted", date: "2026-07-29" },
    { id: 3, studentName: "Harish R", company: "TCS", role: "Data Analyst", status: "Selected", date: "2026-07-26" },
  ]);

  const [appliedJobIds, setAppliedJobIds] = useState<number[]>([4]); // Pre-apply for Harish simulation

  // Search & Filter state
  const [jobSearch, setJobSearch] = useState("");
  const [studentSearch, setStudentSearch] = useState("");

  // Modals / Form states
  const [showAddJobModal, setShowAddJobModal] = useState(false);
  const [newJob, setNewJob] = useState({
    role: "",
    company: "",
    location: "",
    salary: "",
    type: "Full-Time",
    description: "",
  });

  // Action: Apply to job
  const handleApply = (jobId: number) => {
    if (appliedJobIds.includes(jobId)) return;
    
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;

    // Add to applied IDs
    setAppliedJobIds([...appliedJobIds, jobId]);

    // Update job applicant count
    setJobs(jobs.map(j => j.id === jobId ? { ...j, applicants: j.applicants + 1 } : j));

    // Add new application entry
    const newApp: Application = {
      id: Date.now(),
      studentName: "Demo Student", // Default logged-in mock student
      company: job.company,
      role: job.role,
      status: "Applied",
      date: new Date().toISOString().split("T")[0]
    };
    setApplications([newApp, ...applications]);

    alert(`Successfully applied for the ${job.role} position at ${job.company}!`);
  };

  // Action: Add new job
  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJob.role || !newJob.company || !newJob.location || !newJob.salary) {
      alert("Please fill in all required fields.");
      return;
    }

    const jobToAdd: Job = {
      id: Date.now(),
      ...newJob,
      status: "Active",
      applicants: 0,
    };

    setJobs([jobToAdd, ...jobs]);
    setNewJob({
      role: "",
      company: "",
      location: "",
      salary: "",
      type: "Full-Time",
      description: "",
    });
    setShowAddJobModal(false);
  };

  // Action: Update Student placement status
  const handleUpdateStatus = (studentId: number, newStatus: "Placed" | "Unplaced" | "In-Progress", companyName?: string) => {
    setStudents(students.map(s => {
      if (s.id === studentId) {
        return { 
          ...s, 
          placedStatus: newStatus,
          company: newStatus === "Placed" ? (companyName || "Partner Company") : undefined
        };
      }
      return s;
    }));
  };

  // Stats calculation
  const totalStudents = students.length;
  const placedCount = students.filter(s => s.placedStatus === "Placed").length;
  const inProgressCount = students.filter(s => s.placedStatus === "In-Progress").length;
  const placementRate = Math.round((placedCount / totalStudents) * 100);

  // Filtered lists
  const filteredJobs = jobs.filter(job => 
    job.role.toLowerCase().includes(jobSearch.toLowerCase()) ||
    job.company.toLowerCase().includes(jobSearch.toLowerCase()) ||
    job.location.toLowerCase().includes(jobSearch.toLowerCase())
  );

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(studentSearch.toLowerCase()) ||
    student.branch.toLowerCase().includes(studentSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                ApexPlacement
              </span>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Campus Career Portal</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* View Mode Toggle Switch */}
            <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-lg flex space-x-1">
              <button
                onClick={() => setViewMode("student")}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                  viewMode === "student"
                    ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                Student View
              </button>
              <button
                onClick={() => setViewMode("admin")}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                  viewMode === "admin"
                    ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                Admin View
              </button>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Banner Section */}
        <div className="mb-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-600/10 via-indigo-600/5 to-transparent border border-blue-500/10 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
          <div>
            <div className="inline-flex items-center space-x-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-semibold mb-3">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>Drive Season 2026 Active</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              {viewMode === "student" ? "Welcome back, Demo Student!" : "Placement Officer Panel"}
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-2xl text-sm sm:text-base">
              {viewMode === "student" 
                ? "Browse premium job openings from leading companies, submit applications, and track scheduled interviews." 
                : "Manage company profiles, track student hiring pipeline metrics, add placements, and coordinate hiring stats."}
            </p>
          </div>
          <div>
            <div className="bg-white dark:bg-slate-900 shadow-xl border border-slate-100 dark:border-slate-800/80 px-6 py-4 rounded-2xl flex items-center space-x-4">
              <div className="h-12 w-12 rounded-lg bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-medium">Placement Ratio</span>
                <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">{placementRate}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards Dashboard Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center space-x-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-xl">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Registered</p>
              <h3 className="text-xl font-bold">{totalStudents} Students</h3>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center space-x-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <CheckCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Placed</p>
              <h3 className="text-xl font-bold">{placedCount} Students</h3>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center space-x-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 rounded-xl">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">In Recruitment</p>
              <h3 className="text-xl font-bold">{inProgressCount} Students</h3>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center space-x-4">
            <div className="p-3 bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 rounded-xl">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Active Jobs</p>
              <h3 className="text-xl font-bold">{jobs.length} Positions</h3>
            </div>
          </div>
        </div>

        {/* Dynamic Views */}
        {viewMode === "student" ? (
          /* ================================= STUDENT VIEW ================================= */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Job listings */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Building className="h-5 w-5 text-blue-600" />
                  Available Positions
                </h2>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by company or role..."
                    value={jobSearch}
                    onChange={(e) => setJobSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              {filteredJobs.length === 0 ? (
                <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-500">
                  No matching jobs found.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {filteredJobs.map((job) => {
                    const isApplied = appliedJobIds.includes(job.id);
                    return (
                      <div 
                        key={job.id} 
                        className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all group"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {job.role}
                              </span>
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                                {job.type}
                              </span>
                            </div>
                            <span className="text-sm font-semibold text-slate-600 dark:text-slate-300 mt-1 block">
                              {job.company}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100/50 dark:bg-emerald-950/30 px-3 py-1 rounded-xl flex items-center">
                            <DollarSign className="h-3.5 w-3.5 mr-0.5" />
                            {job.salary}
                          </span>
                        </div>

                        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                          {job.description}
                        </p>

                        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            {job.location}
                          </span>
                          <button
                            onClick={() => handleApply(job.id)}
                            disabled={isApplied}
                            className={`px-4 py-1.5 rounded-xl font-medium flex items-center gap-1 transition ${
                              isApplied
                                ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/10"
                            }`}
                          >
                            {isApplied ? "Applied" : "Apply Now"}
                            {!isApplied && <ArrowRight className="h-3.5 w-3.5" />}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right: Mock profile and application status */}
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-blue-500/0 rounded-bl-full"></div>
                <h3 className="text-base font-semibold flex items-center gap-2 mb-4">
                  <User className="h-5 w-5 text-blue-600" />
                  Your Profile Details
                </h3>
                <div className="space-y-3.5 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800/60">
                    <span className="text-slate-500">Name</span>
                    <span className="font-semibold">Demo Student</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800/60">
                    <span className="text-slate-500">Roll No</span>
                    <span className="font-semibold font-mono">CS26099</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800/60">
                    <span className="text-slate-500">CGPA</span>
                    <span className="font-semibold">8.92 / 10.0</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-500">Branch</span>
                    <span className="font-semibold">Computer Science (CSE)</span>
                  </div>
                </div>
              </div>

              {/* Real-time Status Card */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                <h3 className="text-base font-semibold flex items-center gap-2 mb-4">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Application Status
                </h3>
                <div className="space-y-4">
                  {applications.map((app) => (
                    <div key={app.id} className="flex items-start space-x-3 text-xs">
                      {app.status === "Selected" && (
                        <div className="h-6 w-6 rounded-full bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                      )}
                      {app.status === "Rejected" && (
                        <div className="h-6 w-6 rounded-full bg-rose-100 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                          <XCircle className="h-4 w-4" />
                        </div>
                      )}
                      {app.status !== "Selected" && app.status !== "Rejected" && (
                        <div className="h-6 w-6 rounded-full bg-amber-100 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Clock className="h-4 w-4" />
                        </div>
                      )}
                      <div className="flex-1 border-b border-slate-100 dark:border-slate-800/60 pb-3">
                        <div className="flex justify-between">
                          <span className="font-semibold">{app.company}</span>
                          <span className="text-[10px] text-slate-400">{app.date}</span>
                        </div>
                        <p className="text-slate-500 mt-0.5">{app.role}</p>
                        <span className={`inline-block mt-2 px-2 py-0.5 rounded-md text-[9px] font-semibold ${
                          app.status === "Selected" ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300" :
                          app.status === "Rejected" ? "bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-300" :
                          "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300"
                        }`}>
                          {app.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ================================= ADMIN VIEW ================================= */
          <div className="space-y-8">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Student Registry & Status Updates
              </h2>
              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by student name or roll..."
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <button
                  onClick={() => setShowAddJobModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 px-4 rounded-xl flex items-center gap-1 shadow-sm shrink-0"
                >
                  <Plus className="h-4 w-4" /> Add Job Post
                </button>
              </div>
            </div>

            {/* Students Table */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-semibold uppercase border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="px-6 py-4">Student Name</th>
                      <th className="px-6 py-4">Roll Number</th>
                      <th className="px-6 py-4">Branch</th>
                      <th className="px-6 py-4">CGPA</th>
                      <th className="px-6 py-4">Placement Status</th>
                      <th className="px-6 py-4 text-right">Quick Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                        <td className="px-6 py-4 font-semibold">{student.name}</td>
                        <td className="px-6 py-4 font-mono">{student.rollNo}</td>
                        <td className="px-6 py-4">{student.branch}</td>
                        <td className="px-6 py-4 font-semibold">{student.cgpa}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            student.placedStatus === "Placed" ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300" :
                            student.placedStatus === "Unplaced" ? "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300" :
                            "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300"
                          }`}>
                            {student.placedStatus} {student.company ? `@ ${student.company}` : ""}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            {student.placedStatus !== "Placed" && (
                              <button
                                onClick={() => {
                                  const company = prompt("Enter hiring company name:", "Google");
                                  if (company) {
                                    handleUpdateStatus(student.id, "Placed", company);
                                  }
                                }}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold py-1 px-2.5 rounded-lg transition"
                              >
                                Mark Placed
                              </button>
                            )}
                            {student.placedStatus === "Placed" && (
                              <button
                                onClick={() => handleUpdateStatus(student.id, "Unplaced")}
                                className="bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-[10px] font-bold py-1 px-2.5 rounded-lg transition"
                              >
                                Reset Status
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal to add new Job Postings */}
            {showAddJobModal && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl relative">
                  <h3 className="text-lg font-bold mb-4">Post a Campus Job Opening</h3>
                  <form onSubmit={handleAddJob} className="space-y-4">
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
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Job Role / Designation</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. SDE Intern"
                        value={newJob.role}
                        onChange={(e) => setNewJob({ ...newJob, role: e.target.value })}
                        className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Location</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Pune"
                          value={newJob.location}
                          onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                          className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Salary Range</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 10 - 12 LPA"
                          value={newJob.salary}
                          onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                          className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Job Description</label>
                      <textarea
                        rows={3}
                        placeholder="Enter primary responsibilities and requirements..."
                        value={newJob.description}
                        onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                        className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                      />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddJobModal(false)}
                        className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-xs font-semibold shadow-sm"
                      >
                        Submit Posting
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center text-xs text-slate-400 dark:text-slate-500">
        <p>© 2026 ApexPlacement - Campus Recruitment Application. All rights reserved.</p>
      </footer>
    </div>
  );
}
