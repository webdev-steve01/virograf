"use client";
import startup from "@/public/startup.svg";
import Image from "next/image";
import { useState, useEffect } from "react";
import { founderStatusArray } from "@/utils/Data";

const traitsOfPersonality = [
  "Visionary",
  "Detail-oriented",
  "Risk-taker",
  "Analytical",
  "Creative",
  "Persistent",
  "Methodical",
  "Adaptable",
  "Collaborative",
  "Independent",
  "Growth-oriented",
  "Process-driven",
  "People-focused",
  "Execution-focused",
  "Strategic thinker",
  "Tactical executor",
];

function PageOne() {
  const [error, setError] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);
  const [workStyle, setWorkStyle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [traitsOpen, setTraitsOpen] = useState<boolean>(false);
  const [ageRange, setAgeRange] = useState<string>("");
  const [preferredWorkStyle, setPreferredWorkStyle] = useState<string>("");
  const [preferredGender, setPreferredGender] = useState<string>("");
  const [preferredPersonalityTraits, setPreferredPersonalityTraits] = useState<
    string[]
  >([]);
  const [equitySplit, setEquitySplit] = useState<string>("");
  const [preferredFounderType, setPreferredFounderType] = useState<string>("");

  const toggleTrait = (trait: string) => {
    if (preferredPersonalityTraits.includes(trait)) {
      setPreferredPersonalityTraits(
        preferredPersonalityTraits.filter((t) => t !== trait)
      );
    } else if (preferredPersonalityTraits.length < 3) {
      setPreferredPersonalityTraits([...preferredPersonalityTraits, trait]);
    }
  };
  useEffect(() => {
    // 1. Get the saved partial profile from localStorage
    const CommitmentLevel = localStorage.getItem("commitmentLevel");
    const PersonalityTraits = localStorage.getItem("personalityTraits");
    const currentOccupation = localStorage.getItem("currentOccupation");
    const founderStatus = localStorage.getItem("founderStatus");
    const selectedSkills = JSON.parse(
      localStorage.getItem("selectedSkills") || "[]"
    );
    const financialContribution = localStorage.getItem("financialContribution");
    const yourLocation = localStorage.getItem("location");

    // 2. Build the final profile using data from this page + stored data
    const fullProfile = {
      commitmentLevel: CommitmentLevel || "",
      industry: "Healthcare",
      founderStatus: founderStatus || "",
      personalityTraits: PersonalityTraits
        ? JSON.parse(PersonalityTraits)
        : [""],
      skills: selectedSkills,
      financialContribution: financialContribution,
      location: yourLocation,
      currentOccupation: currentOccupation || "",
      yearsOfExperience: 3,
      preferredFounderType: "Experienced Founder (1 previous venture)",
      preferredIndustry: "Healthcare",
      preferredCommitmentLevel: "Full-time",
      preferredFinancial: "Can invest $25K-$100K personally",
      preferredPersonalityTraits: ["Risk-taker", "Visionary"],
      preferredLocation: "US - West Coast",
      preferredSkills: ["Operations", "Finance"],
    };
  }, []);

  return (
    <div>
      {showError && error && (
        <div className="bg-red-600 border border-red-400 text-black px-4 py-3 rounded fixed top-[20px] left-1/2 transform -translate-x-1/2 w-[90%] max-w-[500px] transition-all duration-500 ease-in-out animate-slide-down shadow-md z-50">
          <strong className="font-bold">Error:</strong> {error}
        </div>
      )}
      <section className="font-bold text-[2rem] border p-3 flex justify-between gap-2 items-center">
        <section>
          <p>Virofund</p>
          <div className="flex gap-2  w-[150px]">
            <div className={`bg-[#10b981] h-[5px] w-[20%] rounded-2xl`}></div>
            <div className="bg-[#C6C6C8] h-[5px] w-[20%] rounded-2xl"></div>
            <div className="bg-[#C6C6C8] h-[5px] w-[20%] rounded-2xl"></div>
            <div className="bg-[#C6C6C8] h-[5px] w-[20%] rounded-2xl"></div>
            <div className="bg-[#C6C6C8] h-[5px] w-[20%] rounded-2xl"></div>
          </div>
          <p className="text-[0.5em] text-[#3C3C43C4] font-normal">
            step 2 of 5
          </p>
        </section>
        <section>
          <Image src={startup} alt="startup" width={100} height={100} />
        </section>
      </section>

      <form
        action=""
        className="w-[90%] max-w-[500px] m-auto py-8 flex flex-col gap-4"
      >
        <section>
          <label
            htmlFor="current-co-founder"
            className="text-[1em] font-semibold"
          >
            Do you currently have a co-founder?
          </label>
          <select
            id="current-co-founder"
            name="current-co-founder"
            value={workStyle}
            onChange={(e) => setWorkStyle(e.target.value)}
            className={`w-full mt-1 p-2 border border-[#A1A1A1] rounded-md appearance-none focus:outline-none ${
              workStyle === "" ? "text-gray-400" : "text-black"
            }`}
          >
            <option value="" disabled hidden className="text-gray-400">
              Select one
            </option>
            <option value="Yes" className="text-black">
              Yes, but I’m looking for an additional one
            </option>
            <option value="No" className="text-black">
              No, I’m looking for my first co-founder
            </option>
            <option
              value="I had a co-founder before, but we parted ways"
              className="text-black"
            >
              I had a co-founder before, but we parted ways
            </option>
          </select>
        </section>

        <section>
          <label htmlFor="past-success" className="text-[1em] font-semibold">
            What past successes or failures (if any) have you had in startups or
            business?
          </label>
          <textarea
            id="past-success"
            name="message"
            rows={4}
            placeholder="Type your message here..."
            className="w-full p-3 border border-[#A1A1A1] rounded-md focus:outline-none resize-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </section>

        <section className="relative">
          <label
            htmlFor="preferredPersonalityTraits"
            className="text-[1em] font-semibold"
          >
            What personality traits would you prefer in a co-founder?
          </label>
          <button
            type="button"
            className="w-full relative mt-1 p-2 border border-[#A1A1A1] rounded-md bg-white cursor-pointer flex flex-wrap gap-2 min-h-[48px] items-center"
            onClick={() => setTraitsOpen(!traitsOpen)}
          >
            {preferredPersonalityTraits.length === 0 ? (
              <span className="text-gray-400">Select up to 3 traits...</span>
            ) : (
              preferredPersonalityTraits.map((trait) => (
                <span
                  key={trait}
                  className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm"
                >
                  {trait}
                </span>
              ))
            )}
          </button>

          {/* Dropdown options */}
          {traitsOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
              {traitsOfPersonality.map((trait) => (
                <div
                  key={trait}
                  onClick={() => toggleTrait(trait)}
                  className={`p-2 hover:bg-blue-100 cursor-pointer ${
                    preferredPersonalityTraits.includes(trait)
                      ? "bg-blue-50"
                      : ""
                  }`}
                >
                  {trait}
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <label htmlFor="age-preference" className="text-[1em] font-semibold">
            What is your age range preference for a co-founder? (Optional)
          </label>
          <select
            id="age-preference"
            name="age-preference"
            value={ageRange}
            onChange={(e) => setAgeRange(e.target.value)}
            className={`w-full mt-1 p-2 border border-[#A1A1A1] rounded-md  appearance-none focus:outline-none ${
              ageRange ? "text-black" : "text-gray-400"
            }`}
          >
            <option value="" disabled hidden className="text-gray-400">
              Optionally select
            </option>
            <option value="No preference" className="text-black">
              No preference
            </option>
            <option value="18–25 " className="text-black">
              18–25
            </option>
            <option value="26–35" className="text-black">
              26–35
            </option>
            <option value="36–45" className="text-black">
              36–45
            </option>
            <option value="46+" className="text-black">
              46+
            </option>
          </select>
        </section>

        <section>
          <label
            htmlFor="gender-preference"
            className="text-[1em] font-semibold"
          >
            Do you have any preference for your co-founder's gender? (Optional)
          </label>
          <select
            id="gender-preference"
            name="gender-preference"
            value={preferredGender}
            onChange={(e) => setPreferredGender(e.target.value)}
            className={`w-full mt-1 p-2 border border-[#A1A1A1] rounded-md  appearance-none focus:outline-none ${
              preferredGender ? "text-black" : "text-gray-400"
            }`}
          >
            <option value="" disabled hidden className="text-gray-400">
              Optionally select
            </option>
            <option value="No preference" className="text-black">
              No preference
            </option>
            <option value="Male" className="text-black">
              Male
            </option>
            <option value="Female" className="text-black">
              Female
            </option>
          </select>
        </section>
        <section>
          <label
            htmlFor="preferredFounderType"
            className="text-[1em] font-semibold"
          >
            What level of experience should your co-founder have?
          </label>
          <select
            id="preferredFounderType"
            name="preferredFounderType"
            value={preferredFounderType}
            onChange={(e) => setPreferredFounderType(e.target.value)}
            className={`w-full mt-1 p-2 border border-[#A1A1A1] rounded-md  appearance-none focus:outline-none ${
              preferredFounderType ? "text-black" : "text-gray-400"
            }`}
          >
            <option value="" disabled hidden className="text-gray-400">
              select one
            </option>
            {founderStatusArray.map((status) => (
              <option key={status} value={status} className="text-black">
                {status}
              </option>
            ))}
          </select>
        </section>
        <section>
          <label htmlFor="work-style" className="text-[1em] font-semibold">
            What work style should your co-founder have?
          </label>
          <select
            id="work-style"
            name="work-style"
            value={preferredWorkStyle}
            onChange={(e) => setPreferredWorkStyle(e.target.value)}
            className={`w-full mt-1 p-2 border border-[#A1A1A1] rounded-md  appearance-none focus:outline-none ${
              preferredWorkStyle ? "text-black" : "text-gray-400"
            }`}
          >
            <option value="" disabled hidden className="text-gray-400">
              select one
            </option>
            <option value="Similar to mine " className="text-black">
              Similar to mine
            </option>
            <option value="Complementary to mine" className="text-black">
              Complementary to mine
            </option>
            <option value="A mix of both" className="text-black">
              A mix of both
            </option>
          </select>
        </section>
        <section>
          <label htmlFor="financial" className="text-[1em] font-semibold">
            How do you plan to share equity with your co-founder?
          </label>
          <select
            id="financial"
            name="financial"
            value={equitySplit}
            onChange={(e) => setEquitySplit(e.target.value)}
            className={`w-full mt-1 p-2 border border-[#A1A1A1] rounded-md  appearance-none focus:outline-none ${
              equitySplit ? "text-black" : "text-gray-400"
            }`}
          >
            <option value="" disabled hidden className="text-gray-400">
              select one
            </option>
            <option value="Equal" className="text-black">
              Equal split (50/50)
            </option>
            <option value="Cloud computing" className="text-black">
              Based on contributions (time, skills, investment, etc.)
            </option>
            <option value="Cybersecurity" className="text-black">
              I expect my co-founder to invest financially
            </option>
            <option value="Cybersecurity" className="text-black">
              I am open to discussing financial contributions
            </option>
          </select>
        </section>
        <div className="flex m-auto gap-2 items-center justify-center mt-4">
          <div className="w-[200px] bg-gray-400 h-[10px] rounded-2xl ">
            <div className="w-[50%] h-[100%] rounded-2xl bg-green-500"></div>
          </div>
          <p>page 1 of 2</p>
        </div>
      </form>
    </div>
  );
}

export default PageOne;
