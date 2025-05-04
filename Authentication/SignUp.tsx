"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import SmileyGuy from "@/public/smiling-man.svg";
import eye from "@/public/eye.svg";
import eyeOff from "@/public/eye-off-svgrepo-com.svg";
import Google from "@/public/google.svg";
import apple from "@/public/apple.svg";
import { useRouter } from "next/navigation";
import { auth, provider, db } from "@/utils/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { newUser } from "../app/(interface)/Interface";
import Link from "next/link";

const registerUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  try {
    const response = await fetch(
      "https://virograf-backend.onrender.com/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (err) {
    console.error("Registration failed:", err);
    throw err;
  }
};

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // * handling all my use sates
  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // * I am using firebase to check if the user is already logged in

  // * my sign in functions
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCreatingAccount(true);

    if (!isChecked) {
      alert("Please agree to the terms and conditions");
      setIsCreatingAccount(false);
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      setIsCreatingAccount(false);
      return;
    }

    if (!firstName || !lastName) {
      alert("Please enter first name and last name");
      setIsCreatingAccount(false);
      return;
    }

    if (!email || !password) {
      alert("Please enter email and password");
      setIsCreatingAccount(false);
      return;
    }

    try {
      await registerUser(firstName, lastName, email, password)
        .then((data: newUser) => {
          localStorage.setItem("token", data.accessToken);
          router.push("/login");
        })
        .catch((error) => {
          setError(error.message); // This will show the backend error like password requirements
          console.log(error.message);
        });
    } catch (err: any) {
      console.log(err); // This will show the backend error like password requirements
    } finally {
      setIsCreatingAccount(false);
    }
  };

  const logIn = () => {
    router.push("/login");
  };

  // * I am using firebase to sign in with google
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider)
      .then(() => {
        router.push("/welcome");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

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
    <section className="p-3 flex flex-col main">
      <section className="sided"></section>
      <section className="max-w-[700px] m-auto">
        <section>
          {error !== "" ? (
            <div>
              <p className="text-red-600 font-bold text-center max-w-[500px]">
                {error}
              </p>
            </div>
          ) : (
            ""
          )}
        </section>
        <section className="flex justify-between items-center">
          <article>
            <h1 className="text-[1.5em] font-bold create-account">
              Create an account
            </h1>
            <p>
              Already have an account?{" "}
              <span
                onClick={logIn}
                className="text-[#10b981] underline cursor-pointer"
              >
                {" "}
                Sign in
              </span>
            </p>
          </article>
          <div>
            <Image src={SmileyGuy} height={100} width={100} alt="smiley" />
          </div>
        </section>

        <section>
          <form
            action=""
            className="py-8 flex flex-col gap-4"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="flex flex-col gap-4 w-[100%]">
              <div className="flex flex-col w-full  gap-2 first-name-and-last-name">
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => handleFirstNameChange(e)}
                  name=""
                  id=""
                  className="border border-[#A1A1A1] px-2"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => handleLastNameChange(e)}
                  name=""
                  id=""
                  className="border border-[#A1A1A1] px-2"
                />
              </div>
              <div className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => handleEmailChange(e)}
                  name=""
                  id=""
                  className="border border-[#A1A1A1] px-2"
                />
                <div className="flex items-center border border-[#A1A1A1] rounded-[13px] px-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => handlePasswordChange(e)}
                    className="border-none w-full "
                    name=""
                    id=""
                  />
                  <div onClick={() => setShowPassword(!showPassword)}>
                    <Image
                      src={showPassword ? eyeOff : eye}
                      height={20}
                      width={20}
                      alt="eye"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                  name=""
                  id="agree"
                  className="border border-[#A1A1A1]"
                />
                <label htmlFor="agree">
                  I agree to the{" "}
                  <span className="text-[#007AFF]">terms and conditions</span>
                </label>
              </div>
              <button
                type="submit"
                className="bg-[#10b981] text-white p-2 rounded-[13px]"
              >
                {isCreatingAccount ? (
                  <p>Creating Account...</p>
                ) : (
                  <p>Create Account</p>
                )}
              </button>
            </div>

            <div className="flex items-center justify-center gap-2">
              <div className="border border-[#a1a1a1] w-[80%]"></div>
              <p>or</p>
              <div className="border border-[#a1a1a1] w-[80%]"></div>
            </div>

            <div className="flex gap-4 flex-col font-semibold text-[1.2em] auth">
              <div
                className="border flex justify-center cursor-default items-center gap-2 p-2 rounded-[13px]"
                onClick={signInWithGoogle}
              >
                <Image src={Google} height={40} width={40} alt="google" />
                <p>Google</p>
              </div>
              <div className="border flex justify-center cursor-default items-center gap-2 p-2 rounded-[13px]">
                <Image src={apple} height={30} width={30} alt="google" />
                <p>Apple</p>
              </div>
            </div>
          </form>
        </section>
      </section>
    </section>
  );
}

export default SignUp;
