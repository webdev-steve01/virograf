"use client";
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "@/app/Firebase";
import Image from "next/image";
import startup from "@/public/startup.svg";
import { useRouter } from "next/navigation";
import plus from "@/public/plus.svg";
import emptyImage from "@/public/empty-image.svg";
// import Angel from "@/public/investor.svg";
// import accelerator from "@/public/accelerator.svg";
// import venture from "@/public/venture.svg";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";

type extraInfo = {
  workPreference: string;
  commitmentLevel: string;
  workStyle: string;
  riskManagement: string;
  role: string;
  occupation: string;
  employmentStatus: string;
  image?: string;
  userName: string;
};

const getUserByEmail = async (email: string) => {
  try {
    const q = query(collection(db, "users"), where("email", "==", email));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No user found with that email.");
      return null;
    }

    // Assuming emails are unique, return the first match
    const userDoc = querySnapshot.docs[0];
    return { id: userDoc.id, ...userDoc.data() };
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }
};

const updateUserTypeByEmail = async (email: string, ExtraInfo: extraInfo) => {
  try {
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      await updateDoc(userDoc.ref, {
        ...ExtraInfo,
      });
      console.log("User type updated!");
    } else {
      console.log("No user found with that email.");
    }
  } catch (err) {
    console.error("Error updating user type by email:", err);
  }
};

function Onboarding() {
  const [userName, setUserName] = useState<string>("");
  const [workPreference, setWorkPreference] = useState<string>("Remote");
  const [commitmentLevel, setCommitmentLevel] = useState<string>("Full Time");
  const [workStyle, setWorkStyle] = useState<string>("Structured & strategic");
  const [riskManagement, setRiskManagement] = useState<string>(
    "I take calculated risks"
  );
  const [role, setRole] = useState<string>("Frontend dev");
  const [occupation, setOccupation] = useState<string>("Student");
  const [employmentStatus, setEmploymentStatus] = useState<string>("Yes");
  const [loading, setLoading] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string>("");

  const ExtraInfo: extraInfo = {
    workPreference,
    commitmentLevel,
    workStyle,
    riskManagement,
    role,
    occupation,
    employmentStatus,
    image: imageUrl,
    userName,
  };

  // function to handle profile picture upload
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];

    // ✅ Validate file is an image
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "virofund"); // Replace with your Cloudinary preset

    try {
      // Upload to Cloudinary
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dlpty7kky/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.secure_url) {
        setImageUrl(data.secure_url); // Update imageUrl state
        console.log("Image URL:", data.secure_url); // ✅ Log the actual uploaded URL
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser?.email) {
        setEmail(currentUser.email); // Set UID as document ID
      } else {
        setEmail("");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (email) {
      // Call the function to create a startup
      getUserByEmail(email).then((user) => {
        if (user) {
          setUserId(user.id); // Set the user ID from the fetched user data
        }
      });
    }
  }, [email]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setLoading(true);
    // if (userName.length > 0 && email.length > 0) {
    //   updateUserTypeByEmail(email, ExtraInfo)
    //     .then(() => {
    //       console.log("User type updated successfully!");
    //       router.push("/welcome/about-you");
    //     })
    //     .catch((error) => {
    //       console.error("Error updating user type:", error);
    //       setLoading(false);
    //     });
    // } else {
    //   alert("Please fill in all fields before proceeding.");
    //   setLoading(false);
    // }
    router.push("/welcome/about-you");
  };

  const signOutNow = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
        router.push("/"); // Redirect to the home page or login page after sign-out
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
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
                onChange={(e) => handleImageUpload(e)}
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
                    How do you prefer to work?
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
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Just Exploring For Now">
                      Just Exploring For Now
                    </option>
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
                    What best describes your work style?
                  </label>
                  <select
                    id="workStyle"
                    name="workStyle"
                    value={workStyle}
                    onChange={(e) => setWorkStyle(e.target.value)}
                    className="w-[100%] mt-1 p-2 border border-[#A1A1A1] rounded-md  appearance-none focus:outline-none"
                  >
                    <option value="Structured & strategic">
                      Structured & strategic
                    </option>
                    <option value="Fast-paced & adaptable">
                      Fast-paced & adaptable
                    </option>
                    <option value="Collaborative & team-oriented">
                      Collaborative & team-oriented
                    </option>
                    <option value="Independent & self-driven">
                      Independent & self-driven
                    </option>
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
              <div className="flex flex-col gap-2">
                <div className="relative w-full overflow-hidden">
                  <label
                    htmlFor="currentlyEmployed"
                    className="text-[1em] font-semibold"
                  >
                    Are you a current employee at any Organization?
                  </label>
                  <select
                    id="currentlyEmployed"
                    value={employmentStatus}
                    onChange={(e) => setEmploymentStatus(e.target.value)}
                    name="currentlyEmployed"
                    className="w-full mt-1 p-2 border border-[#A1A1A1] rounded-md  appearance-none focus:outline-none"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
              </div>
            </section>
            <button
              type="submit"
              className="bg-[#09F104] max-w-[400px] font-semibold text-white p-2  min-w-[200px] rounded-[13px] m-auto"
            >
              <p className="text-[1.2em]">Next</p>
            </button>
          </form>
          <button type="button" onClick={signOutNow}>
            Sign out
          </button>
        </div>
      </section>
    </div>
  );
}

export default Onboarding;
