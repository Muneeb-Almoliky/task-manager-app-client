import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import { useCookies } from "react-cookie";
import styles from "./Auth.module.css";

const Auth = () => {
  const [isLogIn, setIsLogIn] = useState(true);
  const [cookie, setCookie] = useCookies();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const { auth, setAuth } = useAuth();

  const [error, setError] = useState(null);

  const viewLogin = (status) => {
    setError(null);
    setIsLogIn(status);
  };
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    // At least 8 characters, one uppercase letter, one number.
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+={}\[\]:;"'<>,.?/~`|-]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!isLogIn) {
      if (!isValidEmail(email)) {
        setError("Enter a valid email!");
        return;
      }
      if (!isValidPassword(password)) {
        setError(
          "Password must be at least 8 characters with one number and one uppercase letter!"
        );
        return;
      }
      if (password !== confirmPassword) {
        setError("Make sure passwords match");
        return;
      }
    }
    try {
      const response = await axios.post(
        `/auth/${endpoint}`,
        {
          email: email,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.data.accessToken) {
        setAuth((prev) => {
          console.log(JSON.stringify(prev));
          console.log(response.data.accessToken);
          return { ...prev, accessToken: response.data.accessToken };
        });
        setCookie("email", email, { path: "/", maxAge: 3600 * 30 }); // Max age is 1 hour, adjust as necessary
      }
    } catch (err) {
      console.log(error);
      if (!err?.response) {
        setError("No Server Response");
      } else if (err.response?.status === 400) {
        setError("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setError("Unauthorized");
      } else if (err.response?.status === 409) {
        setError("User already exists!");
      } else if (err.response?.status === 404) {
        setError("User is not found");
      } else {
        setError(`${isLogIn ? "Login" : "Signup"} Failed`);
      }
    }
  };

  useEffect(() => {
    setError("");
  }, [email, password]);

  return (
    <div className={styles.authContainer}>
      <div className={styles.authContainerBox}>
        <form>
          <h2>{isLogIn ? "Please log in" : "Please sign up"}</h2>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          {!isLogIn && (
            <input
              type="password"
              placeholder="confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <input
            type="submit"
            className="create"
            onClick={(e) => handleSubmit(e, isLogIn ? "login" : "signup")}
          ></input>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
        <div className={styles.authOptions}>
          <button
            onClick={() => viewLogin(false)}
            className={!isLogIn ? styles.active : ""}
          >
            Sign Up
          </button>
          <button
            onClick={() => viewLogin(true)}
            className={isLogIn ? styles.active : ""}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
