// React library import
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// CSS import
import "./Signup.css";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://dashboard-backend-trcc.onrender.com/api/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      });

      const json = await response.json();

      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        alert("Signup successful!");
        navigate("/home");
      } else {
        alert("Signup failed: " + json.error);
      }
    } catch (err) {
      alert("Something went wrong. Please try again.");
    }
  };

  const onChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="auth-page">

      {/* 🎥 VIDEO BACKGROUND */}
      <video className="bg-video" autoPlay muted loop playsInline>
        <source src="/assets/videos/ebook2-bg.mp4" type="video/mp4" />
      </video>

      {/* DARK OVERLAY */}
      <div className="video-overlay"></div>

      {/* 🔥 CARD WRAPPER */}
      <div className="auth-container">

        {/* LEFT CONTENT */}
        <div className="auth-left">
          <h1>Create Your Notes</h1>
          <p>
            Join us to store, manage and access your notes
            securely from anywhere.
          </p>
          <ul>
            <li>✔ Free Account</li>
            <li>✔ Secure Storage</li>
            <li>✔ Easy Access</li>
          </ul>
        </div>

        {/* RIGHT SIGNUP FORM */}
        <div className="auth-right">
          <h2>User Signup</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={credentials.name}
              onChange={onChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={onChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={onChange}
              required
              minLength={5}
            />

            <button type="submit">Sign Up</button>

            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Signup;
