"use client";
import { useState } from "react";
import Image from "next/image";
import startup from "@/public/startup.svg";
import { useRouter } from "next/navigation";
import { updateUser } from "@/utils/fetchFunctions";
import {
  industries,
  locationArray,
  financialContributionArray,
  founderStatusArray,
  skills,
} from "@/utils/Data";

function About() {
  const [industriesChosen, setIndustriesChosen] = useState<string>("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [skillsOpen, setSkillsOpen] = useState<boolean>(false);
  const [location, setLocation] = useState<string>("");
  const [founderStatus, setFounderStatus] = useState<string>("");
  const [experience, setExperience] = useState<string>("");
  const [AreaOfSpecialization, setAreaOfSpecialization] = useState<string>("");
  const [financialContribution, setFinancialContribution] =
    useState<string>("");
  const [date, setDate] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else if (selectedSkills.length < 3) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      alert("Session expired. Please login again.");
      setLoading(false);
      return;
    }
    localStorage.setItem("industry", industriesChosen);
    localStorage.setItem("location", location);
    localStorage.setItem("financialContribution", financialContribution);
    localStorage.setItem("founderStatus", founderStatus);
    localStorage.setItem("skills", JSON.stringify(selectedSkills));
    router.push("/co-founder");

    //     // 3. Send the profile to the API
    //     const response = await updateUser(
    //       accessToken,
    //       fullProfile.commitmentLevel,
    //       fullProfile.industry,
    //       fullProfile.founderStatus,
    //       fullProfile.personalityTraits,
    //       fullProfile.skills,
    //       fullProfile.financialContribution,
    //       fullProfile.location,
    //       fullProfile.currentOccupation,
    //       fullProfile.yearsOfExperience,
    //       fullProfile.preferredFounderType,
    //       fullProfile.preferredIndustry,
    //       fullProfile.preferredCommitmentLevel,
    //       fullProfile.preferredFinancial,
    //       fullProfile.preferredPersonalityTraits,
    //       fullProfile.preferredLocation,
    //       fullProfile.preferredSkills
    //     );
    //     if (response.success === false) {
    //       setError(response.message || "Failed to submit profile.");
    //       setShowError(true);
    //       setTimeout(() => setShowError(false), 10000); // disappears after 10 seconds
    //     } else {
    //       alert("Profile submitted successfully!");
    //       router.push("/co-founder");
    //     }
    //   } catch (error: any) {
    //     console.error("Error submitting profile:", error);
    //     alert(error.message || "Failed to submit profile. Please try again.");
    //   } finally {
    //     setLoading(false);
    //   }
  };
  return (
    <div>
      <section className="flex justify-between p-2 items-start">
        <section>
          <p>Virofund</p>
          <div className="flex gap-2 w-[150px]">
            <div className="bg-[#10b981] h-[5px] w-[20%] rounded-2xl"></div>
            <div className="bg-[#10b981] h-[5px] w-[20%] rounded-2xl"></div>
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
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className={`w-full mt-1 p-2 border border-[#A1A1A1] rounded-md appearance-none focus:outline-none ${
                    gender ? "text-black" : "text-gray-400"
                  }`}
                >
                  <option value="" disabled hidden>
                    select one
                  </option>
                  <option value="Male" className="text-black">
                    Male
                  </option>
                  <option value="Female" className="text-black">
                    Female
                  </option>
                </select>
              </div>
            </div>

            {/* Date Input */}
            <div className="flex flex-col gap-2">
              <div className="relative w-full overflow-hidden">
                <label htmlFor="Date" className="text-[1em] font-semibold">
                  Date of birth
                </label>
                <input
                  type="date"
                  id="Date"
                  name="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={`w-full mt-1 p-2 border border-[#A1A1A1] rounded-md appearance-none focus:outline-none ${
                    date ? "text-black" : "text-gray-400"
                  }`}
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
                  value={location}
                  // defaultValue="select a location"
                  onChange={(e) => setLocation(e.target.value)}
                  className={`w-full mt-1 p-2 border border-[#A1A1A1] rounded-md appearance-none focus:outline-none ${
                    location ? "text-black" : "text-gray-400"
                  }`}
                >
                  <option value="" disabled hidden>
                    select one
                  </option>
                  {locationArray.map((location) => (
                    <option
                      className="text-black"
                      key={location}
                      value={location}
                    >
                      {location}
                    </option>
                  ))}
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
                  How do you intend to gather funds for your startup?
                </label>
                <select
                  id="FirstTimeFounder"
                  name="FirstTimeFounder"
                  value={financialContribution}
                  onChange={(e) => setFinancialContribution(e.target.value)}
                  className={`w-full mt-1 p-2 border border-[#A1A1A1] rounded-md appearance-none focus:outline-none ${
                    financialContribution ? "text-black" : "text-gray-400"
                  }`}
                >
                  <option value="" disabled hidden>
                    select one
                  </option>
                  {financialContributionArray.map((option) => (
                    <option className="text-black" key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Industry Multi-Select */}
            <div className="flex flex-col gap-2">
              <div className="relative w-full">
                <label htmlFor="industry" className="text-[1em] font-semibold">
                  What industry are you working in?
                </label>
                <select
                  id="FirstTimeFounder"
                  name="FirstTimeFounder"
                  value={industriesChosen}
                  onChange={(e) => setIndustriesChosen(e.target.value)}
                  className={`w-full mt-1 p-2 border border-[#A1A1A1] rounded-md appearance-none focus:outline-none ${
                    industriesChosen ? "text-black" : "text-gray-400"
                  }`}
                >
                  <option value="" disabled hidden>
                    select one
                  </option>
                  {industries.map((industry, index) => {
                    return (
                      <option
                        key={industry}
                        value={industry}
                        className="w-full mt-1 p-2 border border-[#A1A1A1] rounded-md appearance-none focus:outline-none text-black"
                      >
                        {industry}
                      </option>
                    );
                  })}
                </select>
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
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className={`w-full mt-1 p-2 border border-[#A1A1A1] rounded-md appearance-none focus:outline-none ${
                  experience ? "text-black" : "text-gray-400"
                }`}
              >
                <option value="" disabled hidden>
                  select one
                </option>
                <option value="Less than 1 year" className="text-black">
                  Less than 1 year
                </option>
                <option value="1-3 years" className="text-black">
                  1-3 years
                </option>
                <option value="4-6 years" className="text-black">
                  4-6 years
                </option>
                <option value="7+ years" className="text-black">
                  7+ years
                </option>
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
                value={founderStatus}
                onChange={(e) => setFounderStatus(e.target.value)}
                className={`w-full mt-1 p-2 border border-[#A1A1A1] rounded-md appearance-none focus:outline-none ${
                  founderStatus ? "text-black" : "text-gray-400"
                }`}
              >
                <option value="" disabled hidden>
                  select one
                </option>
                {founderStatusArray.map((status) => (
                  <option className="text-black" key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative w-full overflow-hidden">
              <label htmlFor="role" className="text-[1em] font-semibold">
                What best describes your role?
              </label>
              <select
                id="role"
                name="role"
                value={AreaOfSpecialization}
                onChange={(e) => setAreaOfSpecialization(e.target.value)}
                className={`w-full mt-1 p-2 border border-[#A1A1A1] rounded-md appearance-none focus:outline-none ${
                  AreaOfSpecialization ? "text-black" : "text-gray-400"
                }`}
              >
                <option value="" disabled hidden>
                  select one
                </option>
                <option className="text-black" value="Technical">
                  Technical (e.g., Developer, Engineer, Data Scientist)
                </option>
                <option className="text-black" value="Business/Operations">
                  Business/Operations (e.g., CEO, Project Manager)
                </option>
                <option className="text-black" value="Creative">
                  Creative (e.g., UI/UX Designer, Marketing, Product Designer)
                </option>
                <option className="text-black" value="Other">
                  Other
                </option>
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
            className="bg-[#10b981] max-w-[400px] font-semibold text-white p-2  min-w-[200px] rounded-[13px] m-auto"
          >
            <p className="text-[1.2em]">
              {loading ? "Loading..." : "Continue"}
            </p>
          </button>
        </form>
      </section>
    </div>
  );
}

export default About;
