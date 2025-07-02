import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import "./login.css";
import Navbar from "./Navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [lozinka, setLozinka] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, lozinka }),
      });

      const data = await res.json();
      console.log("Login response:", data);

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("Id", data.user.id);
        localStorage.setItem("korisnicko", data.user.ime);
        localStorage.setItem("tip", data.user.tip);

        navigate(-1); 
      } 
    } catch (err) {
      console.error( err);
      

      setError("Email ili lozinka nisu ispravni");
    }
  };

  return (
    <div>
      <div className="meni">
        <div className="linkovi">
          <a href="https://www.youtube.com/@jpkcbar9213" target="_blank" rel="noopener noreferrer">
            <img id="yt" src="http://localhost:3000/youtube.png" alt="YouTube" />
          </a>
          <a href="https://www.facebook.com/KulturnicentarBar/?locale=cy_GB" target="_blank" rel="noopener noreferrer">
            <img id="fb" src="http://localhost:3000/facebook.png" alt="Facebook" />
          </a>
          <a href="https://www.instagram.com/kulturni_centar_bar/" target="_blank" rel="noopener noreferrer">
            <img id="ig" src="http://localhost:3000/instagram-167_1.png" alt="Instagram" />
          </a>
        </div>
      </div>

      <div className="container">
        <Navbar />
        <div className="loginmenu">
          <img src="http://localhost:3000/pozadina.jpg" alt="slika" id="pozadina" />
          <div className="login">
            <h1 style={{ fontSize: "25px" }}>PRIJAVI SE</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <input
                type="password"
                name="lozinka"
                placeholder="Lozinka"
                required
                value={lozinka}
                onChange={e => setLozinka(e.target.value)}
              />
              <button type="submit">Prijavi se</button>
            </form>
            {error && (
              <p style={{ color: "red", marginTop: "10px", fontWeight: "bold",textAlign:"left" }}>{error}</p>
            )}
            <Link to="/register" className="register-link">Registrujte se</Link>
          </div>
        </div>

        <div className="sidebar">
          <a href="https://bar.me/" target="_blank" rel="noopener noreferrer">
            <img src="http://localhost:3000/grb_bar.png" alt="Grb Bara" />
          </a>
          <Link to="/">
            <img src="http://localhost:3000/Kulturni-centar-bar-LOGO-FOOTER-NOVO.png" alt="Kulturni Centar Bar" />
          </Link>
        </div>
        <div className="footer">
          <br />
          <br />
          <p>&copy; IT projekat - Bioskop Bar</p>
        </div>
      </div>
    </div>
  );
}
