"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import SmileyGuy from "@/public/smiling-man.svg";
import eye from "@/public/eye.svg";
import eyeOff from "@/public/eye-off-svgrepo-com.svg";
import Google from "@/public/google.svg";
import apple from "@/public/apple.svg";
import { useRouter } from "next/navigation";
import { auth, provider, db } from "@/app/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

const registerUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  try {
    await fetch("https://virograf-backend.onrender.com", {
      method: "POST",
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });
  } catch (err) {
    console.log(err);
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
  const [loading, setLoading] = useState(true);
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
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/welcome");
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // * my sign in functions

  // * I am using firebase to create an account with email and password
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    setIsCreatingAccount(true);
    if (isChecked === false) {
      alert("Please agree to the terms and conditions");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }
    if (firstName === "" || lastName === "") {
      alert("Please enter first name and last name");
      return;
    }
    if (email === "" && password === "") {
      alert("Please enter email and password");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Account created successfully");
        addDoc(collection(db, "users"), {
          firstName: firstName,
          lastName: lastName,
          email: email,
        })
          .then(() => {
            alert("User added to database successfully");
            router.push("/welcome");
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => {
        setIsCreatingAccount(false);
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setIsChecked(false);
      });
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
        <section className="flex justify-between items-center">
          <article>
            <h1 className="text-[1.5em] font-bold create-account">
              Create an account
            </h1>
            <p>
              Already have an account?{" "}
              <span className="text-[#09F104] underline cursor-pointer">
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
                className="bg-[#09F104] text-white p-2 rounded-[13px]"
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
