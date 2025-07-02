import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./style.css";
import "./move.css";
import Navbar from "./Navbar";

export default function NovostId() {
  const { id } = useParams();
  const [novost, setNovost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/novosti/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setNovost(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

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
        

        <br />

        <div className="containerMove">
          <div className="move">
            <img src={`http://localhost:3000/${novost.slika_path}`} alt={novost.naslov} />
          </div>
          <div>
            <p className="naslovNovosti">{novost.naslov}</p>
          </div>
        </div>

        <div className="OpisNovosti">
          <h2><b>OPIS</b></h2>
          <p id="TeskstOpisa">{novost.sadrzaj}</p>
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