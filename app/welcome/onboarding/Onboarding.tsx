"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import startup from "@/public/startup.svg";
import { useRouter } from "next/navigation";
import plus from "@/public/plus.svg";
import emptyImage from "@/public/empty-image.svg";
import { handleImageUpload } from "@/utils/functions";

function Onboarding() {
  const [userName, setUserName] = useState<string>(""); // for founderStatus
  const [workPreference, setWorkPreference] = useState<string>("Remote"); // * irrelevant for now
  const [commitmentLevel, setCommitmentLevel] = useState<string>("Full-time"); // ! relevant
  const [personalityTraits, setPersonalityTraits] =
    useState<string>("Visionary"); // ! relevant
  const [riskManagement, setRiskManagement] = useState<string>(
    "I take calculated risks"
  ); // for personalityTraits
  const [role, setRole] = useState<string>("Frontend dev"); // for skills
  const [occupation, setOccupation] = useState<string>("Data Scientist");
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
      !personalityTraits ||
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
      localStorage.setItem("personalityTraits", personalityTraits);
      localStorage.setItem("currentOccupation", occupation);
      router.push("/welcome/about-you");
    } catch (error) {
      console.error("Error saving partial profile:", error);
      alert("Error saving your profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="font-bold text-[2rem] border p-3 flex justify-between gap-2 items-center">
        <section>
          <p>Virofund</p>
          <div className="flex gap-2  w-[150px]">
            <div className={`bg-[#09F104] h-[5px] w-[20%] rounded-2xl`}></div>
            <div
              className={`${
                userName.length > 0 ? "bg-[#09F104]" : "bg-[#C6C6C8]"
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
                {""}
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
                name=""
                id="startupName"
                className="border border-[#A1A1A1] px-2"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <section className="py-4 flex flex-col gap-3">
              <p className="font-bold text-[1.3em] py-2">
                Work Style & Commitment
              </p>
              <div className="flex flex-col gap-2">
                <div className="relative w-full overflow-hidden">
                  <label
                    htmlFor="workStyle"
                    className="text-[1em] font-semibold"
                  >
                    which one of these BEST escribes your personality?
                  </label>
                  <select
                    id="workStyle"
                    name="workStyle"
                    value={workPreference}
                    onChange={(e) => setWorkPreference(e.target.value)}
                    className="w-full mt-1 p-2 border border-[#A1A1A1] rounded-md  appearance-none focus:outline-none"
                  >
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On site">On site</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="relative w-full overflow-hidden">
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
                    className="w-full mt-1 p-2 border border-[#A1A1A1] rounded-md  appearance-none focus:outline-none"
                  >
                    {LevelsOfCommitment.map((level, index) => (
                      <option key={index} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            <section className="py-4 flex flex-col gap-3">
              <p className="font-bold text-[1.3em] py-2">
                Personality & Work Approach
              </p>
              <div className="flex flex-col gap-2">
                <div className="relative w-full overflow-hidden">
                  <label
                    htmlFor="workStyle"
                    className="text-[1em] font-semibold"
                  >
                    Which one of these BEST describes you as a person?
                  </label>
                  <select
                    id="workStyle"
                    name="workStyle"
                    value={personalityTraits}
                    onChange={(e) => setPersonalityTraits(e.target.value)}
                    // onChange={(e) => setWorkStyle(e.target.value)}
                    className="w-[100%] mt-1 p-2 border border-[#A1A1A1] rounded-md  appearance-none focus:outline-none"
                  >
                    {traitsOfPersonality.map((trait, index) => (
                      <option key={index} value={trait}>
                        {trait}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="relative w-full overflow-hidden">
                  <label htmlFor="risk" className="text-[1em] font-semibold">
                    How do you handle risk in a startup?
                  </label>
                  <select
                    id="risk"
                    name="risk"
                    value={riskManagement}
                    onChange={(e) => setRiskManagement(e.target.value)}
                    className="w-full mt-1 p-2 border border-[#A1A1A1] rounded-md  appearance-none focus:outline-none"
                  >
                    <option value="I take calculated risks">
                      I take calculated risks
                    </option>
                    <option value="I prefer stability before making big moves">
                      I prefer stability before making big moves
                    </option>
                    <option value="I’m very risk-averse">
                      I’m very risk-averse
                    </option>
                  </select>
                </div>
              </div>
            </section>

            <section className="py-4 flex flex-col gap-3">
              <p className="font-bold text-[1.3em] py-2">
                Additional Information
              </p>
              <div className="flex flex-col gap-2">
                <div className="relative w-full overflow-hidden">
                  <label htmlFor="role" className="text-[1em] font-semibold">
                    What do you do?
                  </label>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    name="role"
                    className="w-full mt-1 p-2 border border-[#A1A1A1] rounded-md  appearance-none focus:outline-none"
                  >
                    <option value="Frontend dev">Frontend dev</option>
                    <option value="Backend dev">Backend dev</option>
                    <option value="Sales and Marketing">
                      Sales and Marketing
                    </option>
                    <option value="UI Design">UI Design</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="relative w-full overflow-hidden">
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
                    className="w-full mt-1 p-2 border border-[#A1A1A1] rounded-md  appearance-none focus:outline-none"
                  >
                    <option value="Student">Student</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </section>
            <button
              type="submit"
              className="bg-[#09F104] max-w-[400px] font-semibold text-white p-2  min-w-[200px] rounded-[13px] m-auto"
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
