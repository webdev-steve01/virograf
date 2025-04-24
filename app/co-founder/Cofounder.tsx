"use client";
import { auth } from "../Firebase";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
function Cofounder() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/");
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        {/* < !--From Uiverse.io by alexruix-- >  */}

        <div className="loader">
          <span className="loader-text">loading</span>
          <span className="load"></span>
        </div>
      </div>
    );
  }
  const move = () => {
    router.push("/Page-one");
  };

  return (
    <div className="h-screen">
      <section className="font-bold text-[2rem] border p-3 ">Virofund</section>
      <section className="py-6 px-3 flex flex-col gap-4 h-[80%] justify-center max-w-[500px] m-auto lets-go ">
        <h1 className="font-bold text-[1.5rem]">Co-Founder Preferences</h1>
        <p className=" text-[1.2rem] max-w-[450px]">
          This section is crucial to finding the right co-founder, as the
          information you provide here will significantly influence your
          matches. Be open and honest—there’s no need to impress anyone. The
          more accurately you represent yourself, the better your chances of
          finding a co-founder who truly aligns with your vision and working
          style.
        </p>
        <button
          onClick={() => router.push("/co-founder/Page-one")}
          className="bg-[#09F104] text-black font-bold p-2 rounded-[13px]"
        >
          Proceed
        </button>
      </section>
    </div>
  );
}

export default Cofounder;
