import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const json = await response.json();

      if (json.success) {
        // ✅ Save token
        localStorage.setItem("token", json.authtoken);

        // ✅ Save email for sidebar display
        localStorage.setItem("userEmail", credentials.email);

        // Go to home
        navigate("/home");
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      alert("Server error. Please try again.");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-page">
      <video className="bg-video" autoPlay muted loop>
        <source src="/assets/videos/ebook2-bg.mp4" type="video/mp4" />
      </video>

      <div className="video-overlay"></div>

      <div className="login-wrapper">
        <div className="login-left">
          <h1>Welcome Back</h1>
          <p>Access your notes securely from anywhere.</p>

          <ul>
            <li>✔ Secure Login</li>
            <li>✔ Cloud Sync</li>
            <li>✔ Easy Access</li>
          </ul>
        </div>

        <div className="login-right">
          <h2>User Login</h2>

          <form onSubmit={handleSubmit}>
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
            />

            <button type="submit">Login</button>

            <p className="switch">
              Don’t have an account? <Link to="/signup">Sign up</Link>
            </p>
          </form>
        </div>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Poppins", sans-serif;
        }

        .login-page {
          min-height: 100vh;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .bg-video {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -2;
        }

        .video-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          z-index: -1;
        }

        .login-wrapper {
          width: 90%;
          max-width: 850px;
          display: flex;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
          background: transparent;
        }

        .login-left {
          flex: 1;
          background: linear-gradient(135deg, #6c73ff, #7b4dbb);
          color: #fff;
          padding: 50px 45px;
        }

        .login-left h1 {
          font-size: 32px;
          margin-bottom: 15px;
        }

        .login-left p {
          opacity: 0.9;
          margin-bottom: 25px;
        }

        .login-left ul {
          list-style: none;
        }

        .login-left li {
          margin-bottom: 12px;
        }

        .login-right {
          flex: 1;
          background: #f7f8ff;
          padding: 45px 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .login-right h2 {
          text-align: center;
          margin-bottom: 25px;
          color: #2d2f5e;
        }

        .login-right input {
          width: 100%;
          padding: 13px 15px;
          margin-bottom: 18px;
          border-radius: 10px;
          border: 1px solid #ddd;
          background: #fff;
          font-size: 14px;
        }

        .login-right input:focus {
          outline: none;
          border-color: #6c73ff;
        }

        .login-right button {
          width: 100%;
          padding: 13px;
          border: none;
          border-radius: 25px;
          background: linear-gradient(135deg, #6c73ff, #7b4dbb);
          color: #fff;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 10px;
        }

        .switch {
          text-align: center;
          margin-top: 18px;
          font-size: 14px;
        }

        .switch a {
          color: #6c73ff;
          text-decoration: none;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .login-wrapper {
            flex-direction: column;
            max-width: 380px;
          }

          .login-left {
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
