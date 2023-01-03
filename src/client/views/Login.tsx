import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../utilities/apiService";

const Login = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigate();

  const handleSighupSignin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    //checking to see if they have email and password
    if (!email || !password) {
      alert("Hey you need to have an email and password inputted to proceed. Do that.");
      return;
    }

    //checking to see if when registering they have a name inputted
    if (!isLoggingIn && !name) {
      alert("This one needs to know your name if you want to register. Please enter your name.");
      return;
    }

    let url = isLoggingIn ? "/auth/login" : "/auth/register";

    apiService(url, "POST", { name, email, password })
      .then((data) => {
        localStorage.setItem("token", data.token);
      })
      .catch((err) => console.log(err));

    nav(`/Blogs`);
  };
  //at this point email, password and name(if user is registering) are inputted

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <form>
            <h3>
              {isLoggingIn ? "Loggin in!" : "Registering!"}{" "}
              <span onClick={() => setIsLoggingIn(!isLoggingIn)} className="btn btn-success">
                Need to {isLoggingIn ? "Register" : "Login"}
              </span>
            </h3>
            {!isLoggingIn && (
              <>
                <label>Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} />
              </>
            )}
            <label>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSighupSignin}>{isLoggingIn ? "Login" : "Register"}</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
