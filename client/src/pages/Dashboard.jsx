import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  UserCircle2,
  Upload,
  FileText,
  AlertCircle,
  X,
  Check,
  ChevronDown,
  Plus,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Loader,
} from "lucide-react";
import { SiLeetcode } from "react-icons/si";
import UserProfile from "../components/UserProfile";

function Dashboard() {
  // Get user, loading, and error status from your UserProfile component.
  const { user, loading, error } = UserProfile();

  // Default social links in case none exist
  const defaultSocials = {
    linkedin: "",
    twitter: "",
    github: "",
    website: "",
    leetcode: "",
  };

  // State for socials – initially set to default values; once user data loads, we’ll update these.
  const [socials, setSocials] = useState(defaultSocials);
  const [showSocialEdit, setShowSocialEdit] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [resumes, setResumes] = useState([
    {
      name: "Resume_2024.pdf",
      url: "#",
      type: "application/pdf",
    },
  ]);
  const [selectedResume, setSelectedResume] = useState("Resume_2024.pdf");
  const [jobDescription, setJobDescription] = useState("");
  const [additionalPrompts, setAdditionalPrompts] = useState("");
  const [outputFormat, setOutputFormat] = useState("pdf");
  const [isDraggingResume, setIsDraggingResume] = useState(false);
  const [isDraggingJob, setIsDraggingJob] = useState(false);
  const [wordCount, setWordCount] = useState({ job: 0, prompts: 0 });

  // Refs for click-outside behavior and file inputs.
  const profileMenuRef = useRef(null);
  const fileInputRef = useRef(null);

  // When the profile menu is open, close it if a click is detected outside the menu.
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
    }
    if (showProfileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileMenu]);

  // When user data loads, update the socials state with the MongoDB data.
  useEffect(() => {
    if (user && user.social) {
      setSocials(user.social);
    }
  }, [user]);

  // Helper function to calculate word count.
  const calculateWordCount = (text) => {
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  };

  // Show a loading screen, error message, or "no user" message as needed.
  if (loading)
    return (
      <div className="min-h-screen bg-[#0A0A0F] overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-blue-900/20 animate-gradient"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&q=80')] opacity-5 bg-cover bg-center"></div>
        <nav className="relative z-10 border-b border-white/5 bg-black/20 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-8 h-8 text-blue-400" />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 text-transparent bg-clip-text">
                  CoverCraft AI
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse"></div>
            </div>
          </div>
        </nav>
        <div className="flex flex-col items-center justify-center h-[calc(100vh-73px)]">
          <Loader className="w-8 h-8 text-blue-400 animate-spin mb-4" />
          <p className="text-gray-400 text-sm">Loading your dashboard...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
        <div className="text-red-400">Error: {error}</div>
      </div>
    );

  if (!user)
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
        <div className="text-gray-400">No user data available.</div>
      </div>
    );

  // Handle text changes in the job description or additional prompts.
  const handleTextChange = (e, type) => {
    const text = e.target.value;
    const count = calculateWordCount(text);
    if (count <= 1000) {
      if (type === "job") {
        setJobDescription(text);
        setWordCount((prev) => ({ ...prev, job: count }));
      } else {
        setAdditionalPrompts(text);
        setWordCount((prev) => ({ ...prev, prompts: count }));
      }
    } else {
      alert("Text cannot exceed 1000 words");
    }
  };

  // Handle resume file uploads.
  const handleResumeUpload = (files) => {
    if (files && files[0] && resumes.length < 5) {
      const file = files[0];
      if (file.size > 2 * 1024 * 1024) {
        alert("File size must be less than 2MB");
        return;
      }
      const newResume = {
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type,
      };
      setResumes([...resumes, newResume]);
      if (resumes.length === 0) setSelectedResume(newResume.name);
    }
  };

  // Handle drag & drop for resumes or job description files.
  const handleFileDrop = (e, type) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (type === "resume") {
      setIsDraggingResume(false);
      handleResumeUpload([file]);
    } else {
      setIsDraggingJob(false);
      const reader = new FileReader();
      reader.onload = (event) => {
        handleTextChange({ target: { value: event.target.result } }, "job");
      };
      reader.readAsText(file);
    }
  };

  // When the user clicks to generate a cover letter, validate input.
  const handleGenerateCoverLetter = () => {
    if (!selectedResume) {
      alert("Please select a resume");
      return;
    } else if (!jobDescription) {
      alert("Please enter job description");
      return;
    } else if (wordCount.job > 1000 || wordCount.prompts > 1000) {
      alert("Please keep text under 1000 words");
      return;
    }
    // TODO: Handle OpenAI API call to generate cover letter.
  };

  // Update local state for social fields when editing.
  const handleSocialInputChange = (platform, value) => {
    setSocials((prev) => ({
      ...prev,
      [platform]: value,
    }));
  };

  // Toggle edit mode for socials, and if finishing edit (pressing "Done"), update the database.
  const handleToggleSocialEdit = async () => {
    if (showSocialEdit) {
      // User is finishing editing; send update to backend.
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/auth/social`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          // Send the entire socials object.
          body: JSON.stringify({ socials }),
        });
        if (!response.ok) {
          console.error("Failed to update social links in the database");
        } else {
          console.log("Social links updated successfully");
        }
      } catch (error) {
        console.error("Error updating social links:", error);
      }
    }
    // Toggle edit mode.
    setShowSocialEdit((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-blue-900/20 animate-gradient"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&q=80')] opacity-5 bg-cover bg-center"></div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-white/5 bg-black/20 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 text-transparent bg-clip-text">
                CoverCraft AI
              </span>
            </div>
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-400/50 hover:border-blue-400 transition-colors duration-300"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserCircle2 className="w-full h-full text-gray-400" />
                )}
              </button>

              {/* Profile Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-80 rounded-xl bg-black/95 backdrop-blur-xl border border-white/10 shadow-xl p-4 z-50">
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt="Profile"
                        className="w-12 h-12 rounded-full"
                      />
                    ) : (
                      <UserCircle2 className="w-12 h-12 text-gray-400" />
                    )}
                    <div>
                      <h3 className="text-white font-semibold">
                        {user.username}
                      </h3>
                      <p className="text-gray-400 text-sm">{user.email}</p>
                    </div>
                  </div>

                  {/* Social Links Section */}
                  <div className="mb-4 pb-4 border-b border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-semibold">
                        Connected Accounts
                      </h4>
                      <button
                        onClick={handleToggleSocialEdit}
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        {showSocialEdit ? "Done" : "Edit"}
                      </button>
                    </div>

                    {showSocialEdit ? (
                      <div className="space-y-2">
                        {Object.entries(socials).map(([platform, url]) => (
                          <div
                            key={platform}
                            className="flex items-center gap-2"
                          >
                            <input
                              type="text"
                              value={url}
                              onChange={(e) =>
                                handleSocialInputChange(
                                  platform,
                                  e.target.value
                                )
                              }
                              placeholder={`Enter ${platform} URL`}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500/50"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-5 gap-2">
                        {Object.entries(socials).map(
                          ([platform, url]) =>
                            url && (
                              <a
                                key={platform}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300"
                              >
                                {platform === "linkedin" && (
                                  <Linkedin className="w-5 h-5 text-blue-400" />
                                )}
                                {platform === "github" && (
                                  <Github className="w-5 h-5 text-gray-400" />
                                )}
                                {platform === "twitter" && (
                                  <Twitter className="w-5 h-5 text-blue-400" />
                                )}
                                {platform === "website" && (
                                  <Globe className="w-5 h-5 text-green-400" />
                                )}
                                {platform === "leetcode" && (
                                  <SiLeetcode className="w-5 h-5 text-amber-500" />
                                )}
                              </a>
                            )
                        )}
                      </div>
                    )}
                  </div>

                  {/* Resumes Section */}
                  <div className="mb-4">
                    <h4 className="text-white font-semibold mb-2">
                      Your Resumes
                    </h4>
                    <div className="space-y-2">
                      {resumes.map((resume, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-white/5 rounded-lg p-2"
                        >
                          <span className="text-gray-300 text-sm truncate">
                            {resume.name}
                          </span>
                          <button
                            onClick={() =>
                              setResumes(resumes.filter((_, i) => i !== index))
                            }
                            className="text-gray-400 hover:text-red-400"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Upload Resume Button */}
                  {resumes.length < 5 && (
                    <div>
                      <label className="block">
                        <span className="sr-only">Choose resume</span>
                        <input
                          type="file"
                          className="hidden"
                          ref={fileInputRef}
                          accept=".pdf,.docx,.png,.jpg,image/jpeg"
                          onChange={(e) => handleResumeUpload(e.target.files)}
                        />
                        <div className="flex items-center gap-2 justify-center w-full py-2 px-4 text-sm font-medium text-white bg-blue-500/20 hover:bg-blue-500/30 rounded-lg cursor-pointer transition-colors duration-300">
                          <Upload className="w-4 h-4" />
                          Add Resume
                        </div>
                      </label>
                      <p className="text-gray-400 text-xs mt-2">
                        Accepted: PDF, DOCX, PNG, JPG (max 2MB)
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative container mx-auto px-4 py-8">
        {/* Resume Selection */}
        <div className="mb-8">
          {resumes.length > 0 ? (
            <div className="flex gap-4 overflow-x-auto pb-4">
              {resumes.map((resume, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedResume(resume.name)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 whitespace-nowrap ${
                    selectedResume === resume.name
                      ? "bg-blue-500/20 border-blue-500/50 text-white"
                      : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  {resume.name}
                </button>
              ))}
              {resumes.length < 5 && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-dashed border-blue-400/50 text-blue-400 hover:bg-blue-500/10 transition-colors duration-300"
                >
                  <Plus className="w-4 h-4" />
                  Add Resume
                </button>
              )}
            </div>
          ) : (
            <div className="text-center bg-white/5 rounded-xl p-8 backdrop-blur-sm border border-white/10">
              <AlertCircle className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                No Resume Found
              </h3>
              <p className="text-gray-400 mb-4">
                Please add a resume to begin creating your cover letter
              </p>
              <label className="inline-block">
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.docx,.png,.jpg,image/jpeg"
                  onChange={(e) => handleResumeUpload(e.target.files)}
                />
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer transition-colors duration-300">
                  <Upload className="w-4 h-4" />
                  Upload Resume
                </div>
              </label>
            </div>
          )}
        </div>

        {/* Main Work Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Job Description */}
          <div className="relative">
            <div
              className={`absolute inset-0 rounded-xl transition-colors duration-300 ${
                isDraggingJob
                  ? "bg-blue-500/20 border-2 border-dashed border-blue-500/50"
                  : ""
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDraggingJob(true);
              }}
              onDragLeave={() => setIsDraggingJob(false)}
              onDrop={(e) => handleFileDrop(e, "job")}
            ></div>
            <div className="bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">
                  Job Description
                </h2>
                <span
                  className={`text-sm ${
                    wordCount.job > 900 ? "text-red-400" : "text-gray-400"
                  }`}
                >
                  {wordCount.job}/1000 words
                </span>
              </div>
              <textarea
                value={jobDescription}
                onChange={(e) => handleTextChange(e, "job")}
                placeholder="Paste job description here or drag & drop a file..."
                className="w-full h-64 bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors duration-300"
              />
              <div className="mt-2 flex items-center gap-2">
                <label className="inline-block">
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.docx,.png,.jpg,image/jpeg"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file)
                        handleFileDrop(
                          {
                            preventDefault: () => {},
                            dataTransfer: { files: [file] },
                          },
                          "job"
                        );
                    }}
                  />
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg cursor-pointer transition-colors duration-300">
                    <Upload className="w-4 h-4" />
                    Upload File
                  </div>
                </label>
                <span className="text-gray-500 text-sm">
                  PDF, DOCX, PNG, JPG (max 2MB)
                </span>
              </div>
            </div>
          </div>

          {/* Additional Prompts */}
          <div className="bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">
                Customize Your Cover Letter
              </h2>
              <span
                className={`text-sm ${
                  wordCount.prompts > 900 ? "text-red-400" : "text-gray-400"
                }`}
              >
                {wordCount.prompts}/1000 words
              </span>
            </div>
            <textarea
              value={additionalPrompts}
              onChange={(e) => handleTextChange(e, "prompts")}
              placeholder="Add any specific requirements or preferences for your cover letter..."
              className="w-full h-64 bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors duration-300"
            />
          </div>
        </div>

        {/* Generate Button Section */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="relative">
            <select
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value)}
              className="appearance-none bg-black/40 border border-white/10 text-white rounded-lg px-4 py-2 pr-10 focus:outline-none focus:border-blue-500/50 transition-colors duration-300"
            >
              <option value="pdf" className="bg-gray-900">
                PDF Format
              </option>
              <option value="docx" className="bg-gray-900">
                DOCX Format
              </option>
              <option value="text" className="bg-gray-900">
                Text Format
              </option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          <button
            onClick={handleGenerateCoverLetter}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-colors duration-300"
          >
            Generate Cover Letter
          </button>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
