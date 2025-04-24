"use client";
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "@/app/Firebase";
import Image from "next/image";
import startup from "@/public/startup.svg";
import { useRouter } from "next/navigation";

const industries = ["Tech", "Finance", "Healthcare", "Education", "Media"];

const skills = [
  "Software Development",
  "Marketing and Growth",
  "Sales & Business Development",
  "Product management",
  "Design & UX",
  "Operations & Logistics",
  "Legal & Compliance",
  "Other",
];

function About() {
  const [industriesChosen, setIndustriesChosen] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [skillsOpen, setSkillsOpen] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const toggleIndustry = (industry: string) => {
    setIndustriesChosen((prev) =>
      prev.includes(industry)
        ? prev.filter((item) => item !== industry)
        : [...prev, industry]
    );
  };

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else if (selectedSkills.length < 3) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/co-founder");
  };

  return (
    <div>
      <section className="flex justify-between p-2 items-start">
        <section>
          <p>Virofund</p>
          <div className="flex gap-2 w-[150px]">
            <div className="bg-[#09F104] h-[5px] w-[20%] rounded-2xl"></div>
            <div className="bg-[#09F104] h-[5px] w-[20%] rounded-2xl"></div>
            <div className="bg-[#C6C6C8] h-[5px] w-[20%] rounded-2xl"></div>
            <div className="bg-[#C6C6C8] h-[5px] w-[20%] rounded-2xl"></div>
            <div className="bg-[#C6C6C8] h-[5px] w-[20%] rounded-2xl"></div>
          </div>
          <p className="text-[0.5em] text-[#3C3C43C4] font-normal">
            step 2 of 5
          </p>
        </section>
        <section>
          <Image src={startup} alt="startup" width={50} height={50} />
        </section>
      </section>

      <section>
        <form
          action=""
          className="w-[90%] max-w-[500px] m-auto py-8 flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          {/* Personal Information Section */}
          <div className="flex flex-col gap-4">
            <p className="font-bold text-[1.3em]">Tell us About Yourself</p>

            {/* Gender Select */}
            <div className="flex flex-col gap-2">
              <div className="relative w-full overflow-hidden">
                <label htmlFor="Gender" className="text-[1em] font-semibold">
                  Gender
                </label>
                <select
                  id="Gender"
                  name="Gender"
                  className="w-full mt-1 p-2 border border-[#A1A1A1] rounded-md appearance-none focus:outline-none"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            {/* Date Input */}
            <div className="flex flex-col gap-2">
              <div className="relative w-full overflow-hidden">
                <label htmlFor="Date" className="text-[1em] font-semibold">
                  Date
                </label>
                <input
                  type="date"
                  id="Date"
                  name="date"
                  className="w-full mt-1 p-2 border border-[#A1A1A1] rounded-md appearance-none focus:outline-none"
                />
              </div>
            </div>

            {/* Location Select */}
            <div className="flex flex-col gap-2">
              <div className="relative w-full overflow-hidden">
                <label htmlFor="Location" className="text-[1em] font-semibold">
                  Location
                </label>
                <select
                  id="Location"
                  name="Location"
                  className="w-full mt-1 p-2 border border-[#A1A1A1] rounded-md appearance-none focus:outline-none"
                >
                  <option value="Edo">Edo</option>
                  <option value="Lagos">Lagos</option>
                  <option value="Ogun">Ogun</option>
                  <option value="Port Harcourt">Port Harcourt</option>
                  <option value="Abuja">Abuja</option>
                </select>
              </div>
            </div>
          </div>

          {/* Industry & Experience Section */}
          <div className="flex flex-col gap-4">
            <p className="font-bold text-[1.3em]">Industry & Experience</p>

            {/* First Time Founder Select */}
            <div className="flex flex-col gap-2">
              <div className="relative w-full overflow-hidden">
                <label
                  htmlFor="FirstTimeFounder"
                  className="text-[1em] font-semibold"
                >
                  Are you a first time founder?
                </label>
                <select
                  id="FirstTimeFounder"
                  name="FirstTimeFounder"
                  className="w-full mt-1 p-2 border border-[#A1A1A1] rounded-md appearance-none focus:outline-none"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No, I have some experience</option>
                </select>
              </div>
            </div>

            {/* Industry Multi-Select */}
            <div className="flex flex-col gap-2">
              <div className="relative w-full">
                <label htmlFor="industry" className="text-[1em] font-semibold">
                  What industry are you working in?
                </label>

                {/* Input area */}
                <div
                  onClick={() => setOpen(!open)}
                  className="w-full mt-1 p-2 border border-[#A1A1A1] rounded-md bg-white cursor-pointer flex flex-wrap gap-2 min-h-[48px] items-center"
                >
                  {industriesChosen.length === 0 ? (
                    <span className="text-gray-400">Select industries...</span>
                  ) : (
                    industriesChosen.map((industry) => (
                      <span
                        key={industry}
                        className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm"
                      >
                        {industry}
                      </span>
                    ))
                  )}
                </div>

                {/* Dropdown */}
                {open && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {industries.map((industry) => (
                      <div
                        key={industry}
                        onClick={() => toggleIndustry(industry)}
                        className={`p-2 hover:bg-green-100 cursor-pointer ${
                          industriesChosen.includes(industry)
                            ? "bg-green-50"
                            : ""
                        }`}
                      >
                        {industry}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {/* founder status section */}
            <p className="font-bold text-[1.3em]">Industry & Experience</p>
            <div className="relative w-full overflow-hidden">
              <label htmlFor="Experience" className="text-[1em] font-semibold">
                How many years of experience do you have in your field?
              </label>
              <select
                id="Experience"
                name="Experience"
                className="w-full mt-1 p-2 border border-[#A1A1A1] rounded-md appearance-none focus:outline-none"
              >
                <option value="Less than 1 year">Less than 1 year</option>
                <option value="1-3 years">1-3 years</option>
                <option value="4-6 years">4-6 years</option>
                <option value="7+ years">7+ years</option>
              </select>
            </div>
            <div className="relative w-full overflow-hidden">
              <label
                htmlFor="PreviousStartupOwner"
                className="text-[1em] font-semibold"
              >
                Have you founded a startup before?
              </label>
              <select
                id="PreviousStartupOwner"
                name="PreviousStartupOwner"
                className="w-full mt-1 p-2 border border-[#A1A1A1] rounded-md appearance-none focus:outline-none"
              >
                <option value="Yes, successfully exited">
                  Yes, successfully exited
                </option>
                <option value="Yes, but it failed">Yes, but it failed</option>
                <option value="Currently running a startup">
                  Currently running a startup
                </option>
                <option value="No, this is my first time">
                  No, this is my first time
                </option>
              </select>
            </div>
            <div className="relative w-full overflow-hidden">
              <label htmlFor="role" className="text-[1em] font-semibold">
                What best describes your role?
              </label>
              <select
                id="role"
                name="role"
                className="w-full mt-1 p-2 border border-[#A1A1A1] rounded-md appearance-none focus:outline-none"
              >
                <option value="Technical">
                  Technical (e.g., Developer, Engineer, Data Scientist)
                </option>
                <option value="Business/Operations">
                  Business/Operations (e.g., CEO, Project Manager)
                </option>
                <option value="Creative">
                  Creative (e.g., UI/UX Designer, Marketing, Product Designer)
                </option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="font-bold text-[1.3em]">Skills & Role Expectations</p>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-lg">
                What are your top 3 skills?
              </label>

              <div className="relative">
                {/* Selected skills area */}
                <div
                  className="border border-gray-300 rounded-lg p-3 bg-white cursor-pointer flex flex-wrap gap-2 min-h-[48px] items-center"
                  onClick={() => setSkillsOpen(!skillsOpen)}
                >
                  {selectedSkills.length === 0 ? (
                    <span className="text-gray-400">Select up to three</span>
                  ) : (
                    selectedSkills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))
                  )}
                </div>

                {/* Dropdown options */}
                {skillsOpen && (
                  <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-md max-h-60 overflow-auto">
                    {skills.map((skill) => (
                      <div
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={`p-3 hover:bg-gray-100 cursor-pointer ${
                          selectedSkills.includes(skill) ? "bg-gray-50" : ""
                        }`}
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <p className="font-bold text-[1.3em]">LinkedIn Profile</p>
            <input
              type="text"
              placeholder="https://www.linkedin.com/in/..."
              name=""
              id=""
              className="w-full mt-1 p-2 border border-[#A1A1A1] rounded-md appearance-none focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-[#09F104] max-w-[400px] font-semibold text-white p-2  min-w-[200px] rounded-[13px] m-auto"
          >
            <p className="text-[1.2em]">Next</p>
          </button>
        </form>
      </section>
    </div>
  );
}

export default About;
