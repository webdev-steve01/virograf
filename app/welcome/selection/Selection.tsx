"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import startup from "@/public/startup.svg";
import Angel from "@/public/investor.svg";
import accelerator from "@/public/accelerator.svg";
import venture from "@/public/venture.svg";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "@/utils/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

// Function to add the `type` field to an existing user or create a new user
const updateUserTypeByEmail = async (email: string, type: string) => {
  try {
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      await updateDoc(userDoc.ref, {
        type: type,
      });
      console.log("User type updated!");
    } else {
      console.log("No user found with that email.");
    }
  } catch (err) {
    console.error("Error updating user type by email:", err);
  }
};

function Selection() {
  const [type, setType] = useState("");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (type !== "") {
      console.log(type);
    }
  }, [type]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser?.email) {
        setId(currentUser.email); // Set UID as document ID
      } else {
        setId("");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (type && id) {
      updateUserTypeByEmail(id, type); // Pass email instead of uid
    }
  }, [id, type]);

  if (id) console.log(id);

  const handleNext = () => {
    if (type) {
      router.push("/welcome/onboarding"); // Replace with your next step route
      setLoading(true);
    } else {
      alert("Please select a type before proceeding.");
    }
  };

  return (
    <div>
      <section className="font-bold text-[2rem] border p-3">
        <p>Virofund</p>
        <div className="flex gap-2">
          <div
            className={`${
              type !== "" ? "bg-[#10b981]" : "bg-[#C6C6C8]"
            } h-[5px] w-[50px] rounded-2xl`}
          ></div>
          <div className="bg-[#C6C6C8] h-[5px] w-[50px] rounded-2xl"></div>
          <div className="bg-[#C6C6C8] h-[5px] w-[50px] rounded-2xl"></div>
          <div className="bg-[#C6C6C8] h-[5px] w-[50px] rounded-2xl"></div>
          <div className="bg-[#C6C6C8] h-[5px] w-[50px] rounded-2xl"></div>
        </div>
        <p className="text-[0.5em] text-[#3C3C43C4] font-normal">step 2 of 5</p>
      </section>

      <section className="p-3">
        <h1 className="text-[2em]">How would you like to get started?</h1>
        <p className="text-[#3C3C43E5]">
          Help us understand your role so we can tailor the experience to your
          needs.
        </p>

        <section className="flex flex-col gap-8 py-4 selection">
          <div
            onClick={() => setType("startup")}
            className={`flex flex-col items-center gap-2 cursor-pointer p-3 rounded-lg ${
              type === "startup"
                ? "border-2 border-black"
                : "border border-transparent"
            }`}
          >
            <Image src={startup} width={100} height={100} alt="startup" />
            <p>Startup</p>
          </div>

          <div
            onClick={() => setType("angel investor")}
            className={`flex flex-col items-center gap-2 cursor-pointer p-3 rounded-lg ${
              type === "angel investor"
                ? "border-2 border-black"
                : "border border-transparent"
            }`}
          >
            <Image src={Angel} width={100} height={100} alt="angel" />
            <p>Angel Investor</p>
          </div>

          <div
            onClick={() => setType("accelerator")}
            className={`flex flex-col items-center gap-2 cursor-pointer p-3 rounded-lg ${
              type === "accelerator"
                ? "border-2 border-black"
                : "border border-transparent"
            }`}
          >
            <Image
              src={accelerator}
              width={100}
              height={100}
              alt="accelerator"
            />
            <p>Accelerator</p>
          </div>

          <div
            onClick={() => setType("venture capitalist")}
            className={`flex flex-col items-center gap-2 cursor-pointer p-3 rounded-lg ${
              type === "venture capitalist"
                ? "border-2 border-black"
                : "border border-transparent"
            }`}
          >
            <Image src={venture} width={100} height={100} alt="venture" />
            <p>Venture Capitalist</p>
          </div>
        </section>
        <div className="flex justify-center items-center">
          <button
            type="button"
            onClick={handleNext}
            id="next"
            className="font-bold bg-[#10b981] w-[200px] py-3 rounded-full"
          >
            {loading ? "Loading..." : "Next"}
          </button>
        </div>
      </section>
    </div>
  );
}

export default Selection;
