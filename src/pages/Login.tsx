import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../components/AuthContext";
import login_bg from "../assets/login_bg.webp";
import google from "../assets/google.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { logIn, googleSignIn }  = UserAuth();
  
  // const authContext = UserAuth();
  // // const user: User | undefined = authContext?.user;
  // const logIn: (() => Promise<void>) | undefined = authContext?.logOut;
  // const googleSignIn: (() => Promise<void>) | undefined = authContext?.logOut;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/");
    } catch (error) {
      // console.log(error);
      // setError(error.message);
      if (error instanceof Error) {
        console.log(error);
        setError(error.message);
      } else {
        console.log('An unexpected error occurred:', error);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="h-full w-full overflow-y-scroll no-scrollbar ">
        <img
          src={login_bg}
          alt="/"
          className="absolute  h-[40%] w-full object-cover "
        />
        <div className="fixed left-0 top-0 min-h-screen w-full bg-black/65"></div>
        <div className=" z-10 w-full px-4 pt-7 ">
          <div className="  mx-auto  max-w-[450px] rounded-xl bg-black/40 text-white backdrop-blur-md">
            <div className="mx-auto flex w-[320px] flex-col px-5 pb-5 pt-12 sm:px-0  ">
              <h1 className="text-3xl font-bold">Log In</h1>

              {error ? (
                <p className="mt-2 rounded bg-red-400 p-3">{error}</p>
              ) : null}
              <form
                onSubmit={handleSubmit}
                className="flex w-full flex-col py-4"
              >
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="my-2 rounded bg-gray-700 p-3"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="my-2 rounded bg-gray-700 p-3"
                  type="password"
                  placeholder="Password"
                  minLength={6}
                  required
                  autoComplete="current-password"
                />
                <button className="mt-6 rounded bg-[#e50914] py-3 font-bold">
                  Log In
                </button>
              </form>
              <button
                className="mb-4 flex w-full overflow-hidden rounded  bg-[#4285f4] font-bold"
                onClick={handleGoogleSignIn}
              >
                <img src={google} alt="" className="w-12 bg-white p-3" />
                <p className="grow py-3 text-center ">Sign in with google</p>
              </button>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <p>
                  <input type="checkbox" className="mr-2 " />
                  Remember me
                </p>
                <p>Need Help?</p>
              </div>
              <p className="py-8">
                <span className="text-gray-600">New to Netflix?</span>{" "}
                <Link to="/signup"> Let's Create Account</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
