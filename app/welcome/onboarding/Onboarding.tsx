"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import startup from "@/public/startup.svg";
import { useRouter } from "next/navigation";
import plus from "@/public/plus.svg";
import emptyImage from "@/public/empty-image.svg";
import { handleImageUpload } from "@/utils/functions";

function Onboarding() {
  const [userName, setUserName] = useState<string>("");
  const [workPreference, setWorkPreference] = useState<string>("");
  const [commitmentLevel, setCommitmentLevel] = useState<string>("");
  const [personalityTraits, setPersonalityTraits] = useState<string[]>([]);
  const [traitsOpen, setTraitsOpen] = useState<boolean>(false);

  const [riskManagement, setRiskManagement] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [occupation, setOccupation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string>("");

  const LevelsOfCommitment = [
    "Full-time",
    "Part-time (20+ hours/week)",
    "Part-time (10-20 hours/week)",
    "Nights & Weekends",
    "Flexible, increasing over time",
    "Full-time after funding",
  ];

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

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    setAccessToken(accessToken);
    console.log("Access Token:", accessToken);
    if (!accessToken) {
      router.push("/");
    }
  }, [accessToken, router]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (
      !userName ||
      !imageUrl ||
      !workPreference ||
      !commitmentLevel ||
      personalityTraits.length === 0 ||
      !riskManagement ||
      !role ||
      !occupation ||
      !accessToken
    ) {
      alert("Please fill all fields properly.");
      setLoading(false);
      return;
    }

    try {
      localStorage.setItem("commitmentLevel", commitmentLevel);
      localStorage.setItem(
        "personalityTraits",
        JSON.stringify(personalityTraits)
      );
      localStorage.setItem("currentOccupation", occupation);
      router.push("/welcome/about-you");
    } catch (error) {
      console.error("Error saving partial profile:", error);
      alert("Error saving your profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleTrait = (trait: string) => {
    if (personalityTraits.includes(trait)) {
      setPersonalityTraits(personalityTraits.filter((t) => t !== trait));
    } else if (personalityTraits.length < 3) {
      setPersonalityTraits([...personalityTraits, trait]);
    }
  };

  return (
    <div>
      <section className="font-bold text-[2rem] border p-3 flex justify-between gap-2 items-center">
        <section>
          <p>Virofund</p>
          <div className="flex gap-2  w-[150px]">
            <div className={`bg-[#10b981] h-[5px] w-[20%] rounded-2xl`}></div>
            <div
              className={`${
                userName.length > 0 ? "bg-[#10b981]" : "bg-[#C6C6C8]"
              } h-[5px] w-[20%] rounded-2xl`}
            ></div>
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
      <section>
        <div>
          <form
            action=""
            className="w-[90%] max-w-[500px] m-auto py-8 flex flex-col gap-4"
            onSubmit={(e) => handleSubmit(e)}
          >
            <h1 className="text-[1.5em]  px-4 font-bold">
              Let's set up your profile
            </h1>
            <div className="flex items-center justify-start ">
              <input
                type="file"
                id="fileUpload"
                className="hidden"
                onChange={(e) => handleImageUpload(e, setImageUrl)}
              />
              <label
                htmlFor="fileUpload"
                className="w-32 h-32 flex items-center justify-center rounded-full bg-[#D9D9D9] text-white cursor-pointer text-center relative"
                style={
                  imageUrl
                    ? {
                        backgroundImage: `url(${imageUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }
                    : {}
                }
              >
                {imageUrl ? (
                  ""
                ) : (
                  <Image
                    src={emptyImage}
                    width={100}
                    height={100}
                    alt="empty"
                  />
                )}
                <div className="absolute bottom-0 right-0 flex items-center justify-center w-8 h-8 bg-[#1573E1] rounded-full cursor-pointer">
                  <Image src={plus} width={20} height={20} alt="plus" />
                </div>
              </label>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="startupName"
                className="text-[1.3em] font-semibold"
              >
                Enter a User Name
              </label>
              <input
                type="text"
                placeholder="Enter startup name"
                id="startupName"
                className="border border-[#A1A1A1] px-2"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            {/* Work Style & Commitment */}
            <section className="py-4 flex flex-col gap-3">
              <p className="font-bold text-[1.3em] py-2">
                Work Style & Commitment
              </p>
              <div className="flex flex-col gap-2">
                <label htmlFor="workStyle" className="text-[1em] font-semibold">
                  which one of these describes your work preference?
                </label>
                <select
                  id="workStyle"
                  name="workStyle"
                  value={workPreference}
                  onChange={(e) => setWorkPreference(e.target.value)}
                  className={`w-full mt-1 p-2 border border-[#A1A1A1] rounded-md appearance-none focus:outline-none ${
                    workPreference ? "text-black" : "text-gray-400"
                  }`}
                >
                  <option value="" disabled hidden>
                    select one
                  </option>
                  <option className="text-black" value="Remote">
                    Remote
                  </option>
                  <option className="text-black" value="Hybrid">
                    Hybrid
                  </option>
                  <option className="text-black" value="On site">
                    On site
                  </option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="commitment"
                  className="text-[1em] font-semibold"
                >
                  How much time can you commit to the startup?
                </label>
                <select
                  id="commitment"
                  name="commitment"
                  value={commitmentLevel}
                  onChange={(e) => setCommitmentLevel(e.target.value)}
                  className={`w-full mt-1 p-2 border border-[#A1A1A1] rounded-md appearance-none focus:outline-none ${
                    commitmentLevel ? "text-black" : "text-gray-400"
                  }`}
                >
                  <option value="" disabled hidden>
                    select one
                  </option>
                  {LevelsOfCommitment.map((level, index) => (
                    <option className="text-black" key={index} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </section>

            {/* Personality */}
            <section className="py-4 flex flex-col gap-3">
              <p className="font-bold text-[1.3em] py-2">
                Personality & Work Approach
              </p>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="personalityTraits"
                  className="text-[1em] font-semibold"
                >
                  Which of these best describes your personality?
                </label>
                <button
                  type="button"
                  className="w-full relative mt-1 p-2 border border-[#A1A1A1] rounded-md bg-white cursor-pointer flex flex-wrap gap-2 min-h-[48px] items-center"
                  onClick={() => setTraitsOpen(!traitsOpen)}
                >
                  {personalityTraits.length === 0 ? (
                    <span className="text-gray-400">
                      Select up to 3 traits...
                    </span>
                  ) : (
                    personalityTraits.map((trait) => (
                      <span
                        key={trait}
                        className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm"
                      >
                        {trait}
                      </span>
                    ))
                  )}

                  {traitsOpen && (
                    <div className="absolute z-10 top-[50px] mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                      {traitsOfPersonality.map((trait) => (
                        <div
                          key={trait}
                          onClick={(e) => {
                            e.stopPropagation(); // avoid bubbling to button
                            toggleTrait(trait);
                          }}
                          className={`p-2 hover:bg-blue-100 cursor-pointer ${
                            personalityTraits.includes(trait)
                              ? "bg-blue-50"
                              : ""
                          }`}
                        >
                          {trait}
                        </div>
                      ))}
                    </div>
                  )}
                </button>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="risk" className="text-[1em] font-semibold">
                  How do you handle risk in a startup?
                </label>
                <select
                  id="risk"
                  name="risk"
                  value={riskManagement}
                  onChange={(e) => setRiskManagement(e.target.value)}
                  className={`w-full mt-1 p-2 border border-[#A1A1A1] rounded-md appearance-none focus:outline-none ${
                    riskManagement ? "text-black" : "text-gray-400"
                  }`}
                >
                  <option value="" disabled hidden>
                    select one
                  </option>
                  <option
                    className="text-black"
                    value="I take calculated risks"
                  >
                    I take calculated risks
                  </option>
                  <option
                    className="text-black"
                    value="I prefer stability before making big moves"
                  >
                    I prefer stability before making big moves
                  </option>
                  <option value="I’m very risk-averse" className="text-black">
                    I’m very risk-averse
                  </option>
                </select>
              </div>
            </section>

            {/* Additional Info */}
            <section className="py-4 flex flex-col gap-3">
              <p className="font-bold text-[1.3em] py-2">
                Additional Information
              </p>

              <div className="flex flex-col gap-2">
                <label htmlFor="role" className="text-[1em] font-semibold">
                  What do you do?
                </label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  name="role"
                  className={`w-full mt-1 p-2 border border-[#A1A1A1] rounded-md appearance-none focus:outline-none ${
                    role ? "text-black" : "text-gray-400"
                  }`}
                >
                  <option value="" disabled hidden>
                    select one
                  </option>
                  <option value="Frontend dev" className="text-black">
                    Frontend dev
                  </option>
                  <option value="Backend dev" className="text-black">
                    Backend dev
                  </option>
                  <option value="Sales and Marketing" className="text-black">
                    Sales and Marketing
                  </option>
                  <option value="UI Design" className="text-black">
                    UI Design
                  </option>
                  <option value="Other" className="text-black">
                    Other
                  </option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="occupation"
                  className="text-[1em] font-semibold"
                >
                  Current Occupation
                </label>
                <select
                  id="occupation"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  name="occupation"
                  className={`w-full mt-1 p-2 border border-[#A1A1A1] rounded-md appearance-none focus:outline-none ${
                    occupation ? "text-black" : "text-gray-400"
                  }`}
                >
                  <option value="" disabled hidden>
                    select one
                  </option>
                  <option value="Student" className="text-black">
                    Student
                  </option>
                  <option value="Other" className="text-black">
                    Other
                  </option>
                </select>
              </div>
            </section>

            <button
              type="submit"
              className="bg-[#10b981] max-w-[400px] font-semibold text-white p-2  min-w-[200px] rounded-[13px] m-auto"
            >
              <p className="text-[1.2em]">{loading ? "Saving..." : "Save"}</p>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Onboarding;
