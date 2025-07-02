import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import "./move.css";
import Navbar from "./Navbar";

export default function Rezervacije() {
  const [karte, setKarte] = useState([]);
  const [loading, setLoading] = useState(true);

  const id = localStorage.getItem("Id");
  const korisnicko = localStorage.getItem("korisnicko");

  useEffect(() => {
    

    fetch(`http://localhost:3000/reservation/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setKarte(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);
    const SveRezervacije={};
    karte.forEach(karta=>{
     if(!SveRezervacije[karta.Rezervacija]){
        SveRezervacije[karta.Rezervacija]=[]
     }
     SveRezervacije[karta.Rezervacija].push(karta);
    })
    if (loading) {
    return (
      <div className="loading-spinner">
        <p>Učitavanje...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="meni">
        <div className="linkovi">
          <a
            href="https://www.youtube.com/@jpkcbar9213"
            
          >
         <img id="yt" src="http://localhost:3000/youtube.png" alt="YouTube" />

          </a>
          <a
            href="https://www.facebook.com/KulturnicentarBar/?locale=cy_GB"
            target="_blank"
            rel="noopener noreferrer"
          >
             <img id="fb" src="http://localhost:3000/facebook.png" alt="Facebook" />
          </a>
          <a
            href="https://www.instagram.com/kulturni_centar_bar/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img id="ig" src="http://localhost:3000/instagram-167_1.png" alt="Instagram" />
           
          </a>
        </div>
      </div>

      <Navbar />

      <div className="container">
        <br></br>
        <div className="containerKorisnik">
          <div className="Korisnik">
            <p className="naslovNovosti">Korisničko ime: {korisnicko}</p>
            <p className="naslovNovosti">ID: {id}</p>
          </div>
        </div>

        
          {karte.length === 0 ? (
            <div className="rezervacijeLista">
              <div className="rezervacija">
              <p><strong>Nema rezervacija.</strong></p>
              </div>
            </div>
          ) : (
            <div className="rezervacijeLista">
              {
                Object.keys(SveRezervacije).reverse().map((rezId, index) => {
                  const karteRez = SveRezervacije[rezId];
                  const prvaKarta = karteRez[0]; 
                  const ukupnaCijena = karteRez.length * prvaKarta.cijena;

                  return (
                    <div key={index} className="rezervacija">
                      <p><strong>Rezervacija: {prvaKarta.Rezervacija}</strong></p>
                      <p><strong>Film:</strong> {prvaKarta.naziv}</p>
                      <p><strong>Datum:</strong> {prvaKarta.datum}</p>
                      <p><strong>Vrijeme:</strong> {prvaKarta.vrijeme}</p>
                      <p><strong>Sala:</strong> {prvaKarta.sala}</p>
                      <p><strong>Sjedista:</strong></p>
                     
                        {karteRez.map((karta, i) => (
                          <p key={i}>
                            Red {karta.red}, Broj {karta.broj}
                          </p>
                        ))}
                      
                      <p><strong>Ukupna cijena:</strong> {ukupnaCijena} €</p>
                      <hr />
                    </div>
                  );
                })
              }


            </div>
          )}

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
    
  );
}
