"use client";
import { auth } from "../Firebase";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
function Welcome() {
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

  return (
    <div className="h-screen">
      <section className="font-bold text-[2rem] border p-3 ">Virofund</section>
      <section className="py-6 px-3 flex flex-col gap-4 h-[80%] justify-center max-w-[500px] m-auto lets-go ">
        <h1 className="font-bold text-[1.5rem]">Welcome to Virofund!</h1>
        <p className=" text-[1.2rem] max-w-[450px]">
          We’ll like to know you better in order to give you the{" "}
          <span className="text-[#09F104]">best results</span>
        </p>
        <button
          onClick={() => router.push("/welcome/selection")}
          className="bg-[#09F104] text-black font-bold p-2 rounded-[13px]"
        >
          Let's Go!
        </button>
      </section>
    </div>
  );
}

export default Welcome;
