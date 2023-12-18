import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import loginUser from "../redux/authSlice/loginUser";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const { status, error } = useSelector((state) => state.auth);
  // console.log(error,status,'this is login error')

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let userCredential = { email, password };
    console.log(userCredential);
 
    dispatch(loginUser(userCredential))
    .then((result) => {
      const { token } = result.payload;
      if (result.payload.token) {
        console.log(result.type, "this is status");
        console.log(token, "this is token");
        localStorage.setItem('user', (result.payload.token));
        setEmail("");
        setPassword("");
        navigate("/List");
      }
    });
  };

  return (
    <>
      <section
        className="border-red-500 login-form min-h-screen flex items-center justify-center bg-img"
        style={{ backgroundImage: "url('/assets/image/bbblurry.svg')" }}
      >
        <div className="container mx-auto">
          <div className="flex justify-center px-6 my-12">
            <div className="w-96 flex">
              <div className="w-full bg-login p-6  rounded-lg">
                <div className="heading-1 pt-10 m-auto ">
                  <img
                    src="https://i.pinimg.com/originals/0a/5f/ea/0a5feae400fc816c4ca2aca8bd67a168.jpg"
                    alt="login-img"
                    className="rounded-full m-auto p-1 border"
                    width="100px"
                    height="100px"
                  />
                  <h3 className="pt-8 font-bold text-4xl text-center tracking-wider text-white">
                    Login
                  </h3>
                </div>
                <form className=" pt-8  rounded" onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <input
                      className="w-full px-3 py-3 text-sm leading-normal text-gray-50 border-0 bg-[#ffffff1a]  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mb-4 md:mr-2 ">
                    <input
                      className="w-full px-3 py-3  text-sm  leading-normal  text-gray-50 border-0  bg-[#ffffff1a]  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                  <button
                    className="mb-6 text-center w-full px-4 py-3 font-bold tracking-wider text-[#000] rounded-lg bg-white focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    {/* <Link
                      to="/List"
                      
                      className="w-full px-4 py-3 font-bold tracking-wider text-[#000] rounded-lg bg-white focus:outline-none focus:shadow-outline"
                      
                    >
                      {" "} */}
                    {/* {loading ? "Loading..." : "Login"} */}
                    <div className="fill-one"></div>
                    {/* </Link>  */}
                  </button>
                  {/* {error && <div role="alert">{error}</div>} */}
                </form>

                {/* <div className="pt-8 font-bold text-4xl text-center tracking-wider text-white">{email}</div>
                <div className="pt-8 font-bold text-4xl text-center tracking-wider text-white">{password}</div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Login;
