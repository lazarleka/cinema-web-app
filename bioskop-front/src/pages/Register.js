import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import "./login.css";
import "./register.css";
import Navbar from "./Navbar";

export default function Register() {
  const [ime, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [lozinka, setLozinka] = useState("");
  const [ponoviLozinku, setPotvrda] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");
  setLoading(true);

  if (lozinka !== ponoviLozinku) {
    setLoading(false);
    setError("Lozinke se ne poklapaju!");
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ime,
        email,
        lozinka,
        ponoviLozinku,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      setSuccess("Uspešno ste se registrovali!");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } else {
      setError( "Greška prilikom registracije.");
    }
  } catch (error) {
    
    setError( "Email ili korisničko ime već postoji.");
  } finally {
    setLoading(false);
  }
};

if (loading)
    return (
      <div className="loading-spinner">
        <p>Učitavanje...</p>
      </div>
    );

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
      <Navbar />
      <div className="container">
        <div className="loginmenu">
          <img src="http://localhost:3000/pozadina.jpg" alt="Background" id="pozadina" />
          <div className="login">
            <h1 style={{ fontSize: "25px" }}>REGISTRUJ SE</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <input
                  type="text"
                  name="username"
                  placeholder="Korisničko ime"
                  required
                  value={ime}
                  onChange={e => setUsername(e.target.value)}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="form-row">
                <input
                  type="password"
                  name="password"
                  placeholder="Lozinka"
                  required
                  value={lozinka}
                  onChange={e => setLozinka(e.target.value)}
                />
                <input
                  type="password"
                  name="confirm_password"
                  placeholder="Potvrdite lozinku"
                  required
                  value={ponoviLozinku}
                  onChange={e => setPotvrda(e.target.value)}
                />
              </div>
              <button type="submit">Registrujte se</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <Link to="/login" className="register-link">Već imate nalog? Prijavite se</Link>
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
              <p>&copy; It projekat-Bioskop Bar</p>
            </div>
      </div>
    </div>
  );
}