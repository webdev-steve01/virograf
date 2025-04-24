import { useState } from "react";

const industries = ["Tech", "Finance", "Healthcare", "Education", "Media"];

export default function MultiSelectDropdown() {
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const toggleIndustry = (industry: string) => {
    if (selectedIndustries.includes(industry)) {
      setSelectedIndustries(
        selectedIndustries.filter((item) => item !== industry)
      );
    } else {
      setSelectedIndustries([...selectedIndustries, industry]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="relative w-full">
        <label htmlFor="industry" className="text-[1em] font-semibold">
          What industry are you working in?
        </label>
        <div
          onClick={() => setOpen(!open)}
          className="w-full mt-1 p-2 border border-[#A1A1A1] rounded-md bg-white cursor-pointer flex flex-wrap gap-2 min-h-[48px] items-center"
        >
          {selectedIndustries.length === 0 ? (
            <span className="text-gray-400">Select industries...</span>
          ) : (
            selectedIndustries.map((industry) => (
              <span
                key={industry}
                className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm"
              >
                {industry}
              </span>
            ))
          )}
        </div>

        {open && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            {industries.map((industry) => (
              <div
                key={industry}
                onClick={() => toggleIndustry(industry)}
                className={`p-2 hover:bg-green-100 cursor-pointer ${
                  selectedIndustries.includes(industry) ? "bg-green-50" : ""
                }`}
              >
                {industry}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
