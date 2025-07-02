import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import "./onama.css";
import "./move.css";
import Navbar from "./Navbar";

export default function Onama() {
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
        <br />
        <h1>O nama</h1>
        <br />
        <div className="container-onamaa">
          <div className="sadrzajj">
            <img src="http://localhost:3000/onama1.jpg" alt="Kulturni centar Bar Logo" />
          </div>
          <div className="sadrzajj">
            <h2>Osnivanje</h2>
            <p>Kulturni centar Bar osnovan je 30. jula 1976. godine kao radna organizacija od javnog interesa u oblasti kulture, i to integracijom tadašnje tri ustanove kulture: Narodne biblioteke i čitaonice ”Ivo Vučković”, Zavičajnog muzeja i bioskopa ”Pobjeda”.</p>
          </div>
          <div className="sadrzajj">
            <h2>Scenski prostori i objekti</h2>
            <p>Centar raspolaže salama i pozornicama (zatvorenog i otvorenog tipa) kapaciteta:</p>
            <br />
            <ul>
              <li>Velika sala Doma kulture – 560 mjesta</li>
              <li>Ljetnja pozornica Doma kulture – 900 mjesta</li>
              <li>“Balska dvorana” u Dvorcu kralja Nikole – 80 mjesta</li>
              <li>Ljetnja pozornica u Starom gradu Baru – 250 mjesta</li>
            </ul>
            <br />
            <p>JU Kulturni centar Bar raspolaže izložbenim, edukativnim, konferencijskim, poslovnim i drugim pratećim i tehničkim prostorima, zavisno od svrhe i funkcije, u Domu kulture,  Domu revolucije, Galeriji,  Muzeju i Starom gradu.
              Uprava JU Kulturni centar Bar je smještena u zgradi Doma revolucije, koja svojim interesantnim savremenim arhitektonskim rješenjem i atraktivnom lokacijom zauzima dominantno mjesto u Baru.</p>
          </div>
          <div className="sadrzajj">
            <img src="http://localhost:3000/onama2.jpg" alt="Kulturni centar Bar Logo" />
          </div>
          <div className="sadrzajj">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2505.499210174173!2d19.0927192!3d42.1001097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134e77b7a446e4dd%3A0xaca833786ccad7cd!2sBioskop%20Bar%20(Cinema%20Bar)!5e1!3m2!1sen!2s!4v1745853520425!5m2!1sen!2s"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google mapa Bioskop Bar"
            ></iframe>
          </div>
          <div className="sadrzajj">
            <h2>Adresa</h2>
            <p>Ulica 13. jula bb, 85000 Bar, Crna Gora</p>
            <p>Tel: +382 30 311 111</p>
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