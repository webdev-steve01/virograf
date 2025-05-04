export const updateUser = async (
  accessToken: string,
  commitmentLevel: string,
  industry: string,
  founderStatus: string,
  personalityTraits: Array<string>,
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
          personalityTraits,
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

    // ✅ Check for server-level error
    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        message: data.message || "Something went wrong on the server",
      };
    }

    return {
      success: true,
      status: response.status,
      data,
    };
  } catch (error: any) {
    // ✅ Network error (e.g., no internet, fetch failure)
    return {
      success: false,
      status: 0,
      message: error.message || "Network error: failed to reach server",
    };
  }
};
