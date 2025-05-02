"use client";
import { auth } from "../Firebase";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import google from "@/public/google-svgrepo-com.svg";
import apple from "@/public/apple-173-svgrepo-com.svg";
import bg from "@/public/Rectangle.png";

const signInUser = async (email: string, password: string) => {
  try {
    const response = await fetch(
      "https://virograf-backend.onrender.com/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      // THROW an error so the calling function can catch it
      throw new Error(data.message || "Something went wrong");
    }

    return data; // only successful login reaches here
  } catch (error) {
    throw error; // rethrow error so handleSubmit can catch
  }
};

function LogIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) {
      alert("Please enter email and password");
      setLoading(false);
      return;
    }

    try {
      const data = await signInUser(email, password);
      if (data) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        router.push("/welcome");
      }
    } catch (error: any) {
      console.log("Error signing in:", error.message);
      setErr(error.message); // set error to state
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-between">
      <section className="flex flex-col justify-center w-full h-screen bg-[#F5F5F5] px-4 max-w-[500px]">
        <p className="py-4 text-[2em] font-bold">Virofund</p>
        <form
          action=""
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-4"
        >
          <div>
            <h1 className="text-[1.5em]">Log in to your Account</h1>
            <p>welcome back! select method to log in</p>
          </div>

          <div className="flex gap-6 justify-center text-center">
            <div className="border w-[45%] p-1 rounded-[15px] border-[#00000033] flex items-center justify-center gap-2">
              <Image src={google} width={30} height={30} alt="google" />
              <p>Google</p>
            </div>
            <div className="border w-[45%] p-1 rounded-[15px] border-[#00000033] flex items-center justify-center gap-2">
              <Image src={apple} width={30} height={30} alt="apple" />
              <p>Apple</p>
            </div>
          </div>

          <div className="flex gap-1 items-center justify-center ">
            <div className="border border-[#B3B3B3] min-w-[100px]"></div>
            <p className="text-[0.7em] text-[#B3B3B3]">
              or continue with email
            </p>
            <div className="border border-[#B3B3B3] min-w-[100px]"></div>
          </div>

          <div className="flex flex-col gap-4">
            <input
              type="email"
              className="border border-[#00000033]"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter your email"
            />
            <input
              type="password"
              className="border border-[#00000033]"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter your password"
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-1 items-center">
              <input id="Remember me" type="checkbox" />
              <label htmlFor="Remember me">Remember me</label>
            </div>
            <p className="text-blue-400">Forgot Password</p>
          </div>

          <div className="bg-[#09F104] rounded-[10px] text-center text-white font-semibold">
            <input
              type="submit"
              // onClick={}
              value={loading ? "Logging in..." : "Log in"}
            />
          </div>
        </form>
      </section>
      {/* <section
          className="border h-screen bg-green-400"
          style={{ width: "50%", height: "100%", backgroundImage: `url(${bg}))` }}
        ></section> */}
    </div>
  );
}

export default LogIn;
