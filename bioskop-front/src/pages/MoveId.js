import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./style.css";
import "./move.css";
import Navbar from "./Navbar";

export default function MoveId() {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [datumFilter, setDatumFilter] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/move/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFilm(data);
        setLoading(false);
        console.log(data);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="loading-spinner">
        <p>Učitavanje...</p>
      </div>
    );

  if (!film) return <div>Film nije pronađen.</div>;

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
        <div className="containerMove">
          <div className="move">
            <img
              src={`http://localhost:3000/${film.film.glavna_slika}`}
              alt={film.naziv}
              key={"SlikaFilma"}
            />
          </div>
          <div className="opis">
            <h3>Naziv: {film.film.naziv}</h3>
            <p>Zanr: {film.film.zanr}</p>
            <p>Trajanje: {film.film.trajanje} min</p>
          </div>
          <div>

          </div>

          <iframe
            src={film.film.iframe_url}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            className="trailer"
            allowFullScreen
          />
        </div>

        <div className="slike">
          {[film.film.slika1, film.film.slika2, film.film.slika3, film.film.slika4, film.film.slika5].map(
            (slika, index) =>
               (
                <div className="slika" key={index}>
                  <img src={`http://localhost:3000/${slika}`} alt={`Slika ${index + 1}`} />
                </div>
              )
          )}
        </div>

        <div className="kraj">
          <div className="OpisFilma">
            <div className="kartica">
              <h4>Naslov</h4>
              <p id="naslov">{film.film.naziv}</p>
            </div>
            <div className="kartica">
              <h4>Dužina trajanja filma</h4>
              <p id="trajanje">{film.film.trajanje || "N/A"} min</p>
            </div>
            <div className="kartica">
              <h4>Kratak opis:</h4>
              <p id="opis">{film.film.opis}</p>
            </div>
            <div className="kartica">
              <h4>Glumci</h4>
              <p id="glumci">{film.film.glumci}</p>
            </div>
            <div className="kartica">
              <h4>Režiser</h4>
              <p id="reziser">{film.film.reziser}</p>
            </div>
          </div>

          <div className="prikazivanja">
            <div className="zaglavlje">
              <h3>Prikazivanja</h3>
            <div className="filter-datum">
              <label htmlFor="datum">Pretraži po datumu:  </label>
              <input
                type="date"
                id="datum"
                value={datumFilter}
                onChange={(e) => setDatumFilter(e.target.value)}
              />
            </div>  
            </div>

            

            <div className="tabelaPrikazivanja">
              {film.prikazivanja
                .filter((prikazivanje) =>
                  datumFilter ? prikazivanje.datum === datumFilter : true
                )
                .map((prikazivanje) => {
                  const [godina, mesec, dan] = prikazivanje.datum.split("-");
                  const [sat, minut] = prikazivanje.vrijeme.split(":");
                  console.log(prikazivanje)
                  return (
                    <div className="prikazvanje" key={prikazivanje.id}>
                      <Link to={`/prikazivanje/${prikazivanje.id}`}>
                        <p>Datum: {`${dan}.${mesec}.`}</p>
                        <p>Vrijeme: {`${sat}:${minut}`}</p>
                        <p>Sala: {prikazivanje.naziv}</p>
                      </Link>
                    </div>
                  );
                })}
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
