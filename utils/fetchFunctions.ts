export const updateUser = async (
  accessToken: string,
  commitmentLevel: string,
  industry: string,
  founderStatus: string,
  personalityTraits: string,
  skills: Array<string>,
  financialContribution: string,
  location: string,
  currentOccupation: string,
  yearsOfExperience: number,
  preferredFounderType: string,
  preferredIndustry: string,
  preferredCommitmentLevel: string,
  preferredFinancial: string,
  preferredPersonalityTraits: Array<string>,
  preferredLocation: string,
  preferredSkills: Array<string>
) => {
  try {
    const response = await fetch(
      "https://virograf-backend.onrender.com/profiles",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          commitmentLevel,
          industry,
          founderStatus,
          personalityTraits: [personalityTraits],
          skills,
          financialContribution,
          location,
          currentOccupation,
          yearsExperience: yearsOfExperience,
          preferredFounderType,
          preferredIndustry,
          preferredCommitmentLevel,
          preferredFinancial,
          preferredPersonalityTraits,
          preferredLocation,
          preferredSkills,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return data;
    }

    return data; // only successful login reaches here
  } catch (err) {
    console.error("Error updating user type by email:", err);
  }
};
