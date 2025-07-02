import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./rezvervacija.css";
import Navbar from "./Navbar";

export default function PrikazivanjeId() {
  const { id } = useParams();
  const [prikazivanje, setPrikazivanje] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [alertText, setAlertText] = useState("");

  const userId = localStorage.getItem("Id");
  const isLoggedIn = !!userId;

  useEffect(() => {
    fetch(`http://localhost:3000/prikazivanje/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setPrikazivanje(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const showAlert = (text) => {
    setAlertText(text);
    setTimeout(() => setAlertText(""), 3000);
  };

  const rezervisi = async () => {
    if (!isLoggedIn) {
      showAlert("Prijavite se da biste rezervisali.");
      return;
    }

    if (selectedSeats.length === 0) {
      showAlert("Niste odabrali nijedno sjediste.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/prikazivanje/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prikazivanjeId: Number(id),
          sjedista: selectedSeats,
          userId: Number(userId),
        }),
      });

      if (res.ok) {
        showAlert("Uspješno rezervisana sjedista!");
        setSelectedSeats([]);
        setTimeout(() => window.location.reload(), 1000);
      } else {
        showAlert("Greška pri rezervaciji.");
      }
    } catch {
      showAlert("Greška na serveru.");
    }
  };

  if (loading)
    return (
      <div className="loading-spinner">
        <p>Učitavanje...</p>
      </div>
    );

  if (!prikazivanje) return <div>Prikazivanje nije pronađeno.</div>;
  const [godina, mesec, dan] = prikazivanje.prikazivanje.datum.split("-");
  const [sat, minut] = prikazivanje.prikazivanje.vrijeme.split(":");
  const sjedistaPoRedu = {};
  prikazivanje.allSeats.forEach((s) => {
    if (!sjedistaPoRedu[s.red]){ 
      sjedistaPoRedu[s.red] = [];

    }
    sjedistaPoRedu[s.red].push(s);
  });
  
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
        <h1>Rezervacija</h1>

        {alertText && <div className="custom-alert">{alertText}</div>}

        <div className="sadrzaj">
          <div className="rezervacija">
            <div className="platno">
              <p>Platno</p>
            </div>
            <br /><br />

            <div className="sjedista">
              {Object.keys(sjedistaPoRedu).map((red) => (
               
                <div className="red" key={red}>
                  <div className="redBrojj">
                    <p className="redBroj">{`Red ${red}`}</p>
                  </div>
                  {sjedistaPoRedu[red].map((sjediste) => (
                    <div
                      key={sjediste.id}
                      className={`sjediste ${
                        prikazivanje.reserved.includes(sjediste.id)
                          ? "rezervisana"
                          : selectedSeats.includes(sjediste.id)
                          ? "selektovana"
                          : ""
                      }`}
                      onClick={() => {
                       
                        setSelectedSeats((prev) =>
                          prev.includes(sjediste.id)
                            ? prev.filter((id) => id !== sjediste.id)
                            : prev.concat(sjediste.id)
                        );
                      }}
                    >
                      {sjediste.broj}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="rezervacijaDetalji">
            <div className="ofilmu">
              <div className="film">
                <img
                  src={`http://localhost:3000/${prikazivanje.prikazivanje.glavna_slika}`}
                  alt="Film"
                  id="filmSlika"
                />
              </div>
              <div className="opis">
                <h1>{prikazivanje.prikazivanje.naziv}</h1>
                <p>Datum:</p>
                <p>{dan}.{mesec} {godina}</p>
                <p>Vrijeme:</p>
                <p>{sat}:{minut}</p>
                <p>Cijena karte:</p>
                <p>{prikazivanje.prikazivanje.cijena} €</p>
              </div>
            </div>

            <div className="rezervacijaInfo">
              <p>Odabrana sjedista:</p>
              <p>
                {selectedSeats.length === 0
                  ? "Nijedno"
                  : selectedSeats.map((id) => {
                        const s = prikazivanje.allSeats.find((seat) => seat.id === id);
                        return `Red ${s.red} - ${s.broj}, `;
                      })
                      }
              </p>
              <p>Ukupna cijena: {Math.round(selectedSeats.length * prikazivanje.prikazivanje.cijena*100)/100} €</p>
            </div>

            <div className="rezervisiDIV">
              <button className="rezervisi" onClick={rezervisi}>
                Rezervisi
              </button>
              {!isLoggedIn && (
                <p className="login-upozorenje">* Prijavite se da biste mogli rezervisati</p>
              )}
            </div>
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