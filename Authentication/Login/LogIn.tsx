"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import google from "@/public/google-svgrepo-com.svg";
import apple from "@/public/apple-173-svgrepo-com.svg";
import Link from "next/link";
import eye from "@/public/eye.svg";
import eye_off from "@/public/eye-off-svgrepo-com.svg";

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
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
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
      setError(error.message); // set error to state
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 5000); // 5 seconds

      return () => clearTimeout(timer); // Clear timeout on component unmount or error change
    }
  }, [error]);

  return (
    <div className="flex justify-between">
      {error && (
        <div
          className="bg-red-100 border absolute border-red-400 text-red-700 px-4 py-3 rounded mb-4 w-[90%] mx-auto flex items-center justify-between left-0 right-0 top-[10px] z-50 max-w-[600px]"
          onClick={() => setError("")}
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <section className="flex flex-col justify-center w-full h-screen  px-4 max-w-[900px] mx-auto">
        <section className="max-w-[600px] mx-auto">
          <p className="py-4 text-[2em] text-[#10b981] font-bold">Virofund</p>
          <form
            action=""
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col gap-8 log-in"
          >
            <div>
              <h1 className="text-[1.8em]">Log in to your Account</h1>
              <p className="text-[#242424]">
                welcome back! select method to log in
              </p>
              <p>
                New to virofund?{" "}
                <Link
                  href="/"
                  className="text-[#10b981] underline cursor-pointer"
                >
                  sign up
                </Link>
              </p>
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
              <div className="border border-[#00000033] flex items-center px-2 rounded-[10px]">
                <input
                  type={showPassword ? "text" : "password"}
                  className="border-none w-full outline-none"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Enter your password"
                />
                <Image
                  src={showPassword ? eye : eye_off}
                  alt="eye"
                  width={20}
                  height={20}
                  className="curser-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-1 items-center">
                <input id="Remember me" type="checkbox" />
                <label htmlFor="Remember me">Remember me</label>
              </div>
              <p className="text-[#10b981] underline cursor-pointer">
                Forgot Password
              </p>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#10b981] rounded-[10px] text-center text-white font-semibold w-full py-2"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>
        </section>
      </section>
      <section className="other-side text-white text-[2.5em] font-bold flex flex-col gap-4 justify-center items-center w-full h-screen ] bg-cover bg-no-repeat bg-center relative">
        <p>Great ideas need great partners.</p>
        <p>Find your co-founder</p>
        <p className="text-[#10b981]">Build the future</p>
      </section>
      {loading && (
        <div className="h-screen w-screen bg-[#00000066] absolute top-0 left-0 flex items-center justify-center z-50">
          <svg viewBox="25 25 50 50">
            <circle r="20" cy="50" cx="50"></circle>
          </svg>
        </div>
      )}
    </div>
  );
}

export default LogIn;
