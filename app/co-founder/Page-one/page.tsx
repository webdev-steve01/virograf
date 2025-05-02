import React from "react";
import startup from "@/public/startup.svg";
import Image from "next/image";

function page() {
  return (
    <div>
      <section className="font-bold text-[2rem] border p-3 flex justify-between gap-2 items-center">
        <section>
          <p>Virofund</p>
          <div className="flex gap-2  w-[150px]">
            <div className={`bg-[#09F104] h-[5px] w-[20%] rounded-2xl`}></div>
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
        <p className="font-bold text-[1.3em] py-2">Work Style & Commitment</p>
        <section>
          <label htmlFor="techOrBus">
            Are you looking for a technical or business-oriented co-founder?
          </label>
          <select
            id="techOrBus"
            name="techOrBus"
            // value={workPreference}
            // onChange={(e) => setWorkPreference(e.target.value)}
            className="w-full mt-1 p-2 border border-[#A1A1A1] rounded-md  appearance-none focus:outline-none"
          >
            <option value="Technical">
              Technical (e.g., Developer, Engineer)
            </option>
            <option value="Business/Operations">
              Business/Operations (e.g., CEO, Project Manager)
            </option>
            <option value="Creative">
              Creative (e.g., UI/UX Designer, Marketing)
            </option>
            <option value="Other">Other</option>
          </select>
        </section>
        <section>
          <label htmlFor="responsibility">
            What areas would you like your co-founder to take responsibility
            for?
          </label>
          <select
            id="responsibility"
            name="responsibility"
            // value={workPreference}
            // onChange={(e) => setWorkPreference(e.target.value)}
            className="w-full mt-1 p-2 border border-[#A1A1A1] rounded-md  appearance-none focus:outline-none"
          >
            <option value="Product development">Product development</option>
            <option value="Marketing & sales">Marketing & sales</option>
            <option value="Fundraising & investor relations">
              Fundraising & investor relations
            </option>
            <option value="Strategy & business development">
              Strategy & business development
            </option>
            <option value="Other">Other</option>
          </select>
        </section>
        <section>
          <label htmlFor="Industry">What Industry is your startup in?</label>
          <select
            id="Industry"
            name="Industry"
            // value={workPreference}
            // onChange={(e) => setWorkPreference(e.target.value)}
            className="w-full mt-1 p-2 border border-[#A1A1A1] rounded-md  appearance-none focus:outline-none"
          >
            <option value="Artificial Intelligence (AI)">
              Artificial Intelligence (AI)
            </option>
            <option value="Biotech">Biotech</option>
            <option value="Ed-Tech">Ed-Tech</option>
            <option value="Fintech">Fintech</option>
            <option value="Other">Other</option>
          </select>
        </section>
        <section>
          <label htmlFor="working-arrangement">
            What is your preferred working arrangement?
          </label>
          <select
            id="working-arrangement"
            name="working-arrangement"
            // value={workPreference}
            // onChange={(e) => setWorkPreference(e.target.value)}
            className="w-full mt-1 p-2 border border-[#A1A1A1] rounded-md  appearance-none focus:outline-none"
          >
            <option value="Hybrid">Hybrid (mix of remote and physical)</option>
            <option value="Fully virtual">Fully virtual</option>
            <option value="Fully physical">Fully physical</option>
          </select>
        </section>
        <section>
          <label htmlFor="commitment-level">
            What is your commitment level?
          </label>
          <select
            id="commitment-level"
            name="commitment-level"
            // value={workPreference}
            // onChange={(e) => setWorkPreference(e.target.value)}
            className="w-full mt-1 p-2 border border-[#A1A1A1] rounded-md  appearance-none focus:outline-none"
          >
            <option value="full-time">
              Available full-time (24/7 commitment)
            </option>
            <option value="Fully virtual">
              Available for a certain number of days per week
            </option>
            <option value="Fully committed">
              Fully committed, no other job
            </option>
          </select>
        </section>
        <section>
          <label htmlFor="skills">
            What tech skills (if any) do you require from your co-founder?
          </label>
          <select
            id="skills"
            name="skills"
            // value={workPreference}
            // onChange={(e) => setWorkPreference(e.target.value)}
            className="w-full mt-1 p-2 border border-[#A1A1A1] rounded-md  appearance-none focus:outline-none"
          >
            <option value="Artificial Intelligence ">
              Artificial Intelligence (AI)
            </option>
            <option value="Cloud computing">Cloud computing</option>
            <option value="Cybersecurity">Cybersecurity</option>
            <option value="Data Analysis">Data Analysis</option>
            <option value="Other">Other</option>
          </select>
        </section>
        <section>
          <label htmlFor="idea">
            Do you prefer a co-founder who already has an idea, or are you open
            to brainstorming together?
          </label>
          <select
            id="idea"
            name="idea"
            // value={workPreference}
            // onChange={(e) => setWorkPreference(e.target.value)}
            className="w-full mt-1 p-2 border border-[#A1A1A1] rounded-md  appearance-none focus:outline-none"
          >
            <option value="Artificial Intelligence ">
              I want a co-founder who already has an idea
            </option>
            <option value="Cloud computing">
              I prefer brainstorming an idea together
            </option>
            <option value="Cybersecurity">I already have an idea</option>
          </select>
        </section>
        <section>
          <label htmlFor="financial">
            What is your current financial situation and level of financial
            commitment to the startup?
          </label>
          <select
            id="financial"
            name="financial"
            // value={workPreference}
            // onChange={(e) => setWorkPreference(e.target.value)}
            className="w-full mt-1 p-2 border border-[#A1A1A1] rounded-md  appearance-none focus:outline-none"
          >
            <option value="Artificial Intelligence ">
              I can financially invest in the startup
            </option>
            <option value="Cloud computing">
              I cannot invest financially but can contribute skills and time
            </option>
            <option value="Cybersecurity">
              I expect my co-founder to invest financially
            </option>
            <option value="Cybersecurity">
              I am open to discussing financial contributions
            </option>
          </select>
        </section>
        <section>
          <label htmlFor="financial">
            What is your current financial situation and level of financial
            commitment to the startup?
          </label>
          <select
            id="financial"
            name="financial"
            // value={workPreference}
            // onChange={(e) => setWorkPreference(e.target.value)}
            className="w-full mt-1 p-2 border border-[#A1A1A1] rounded-md  appearance-none focus:outline-none"
          >
            <option value="Artificial Intelligence ">
              I can financially invest in the startup
            </option>
            <option value="Cloud computing">
              I cannot invest financially but can contribute skills and time
            </option>
            <option value="Cybersecurity">
              I expect my co-founder to invest financially
            </option>
            <option value="Cybersecurity">
              I am open to discussing financial contributions
            </option>
          </select>
        </section>
        <section>
          <label htmlFor="financial">
            How do you plan to share equity with your co-founder?
          </label>
          <select
            id="financial"
            name="financial"
            // value={workPreference}
            // onChange={(e) => setWorkPreference(e.target.value)}
            className="w-full mt-1 p-2 border border-[#A1A1A1] rounded-md  appearance-none focus:outline-none"
          >
            <option value="Equal">Equal split (50/50)</option>
            <option value="Cloud computing">
              Based on contributions (time, skills, investment, etc.)
            </option>
            <option value="Cybersecurity">
              I expect my co-founder to invest financially
            </option>
            <option value="Cybersecurity">
              I am open to discussing financial contributions
            </option>
          </select>
        </section>
      </form>
    </div>
  );
}

export default page;
