import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./style.css";
import "./move.css";

export default function Move() {
  const [filmovi, setFilmovi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pretraga, setPretraga] = useState("");
  const [zanr, setZanr] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/move")
      .then((res) => res.json())
      .then((data) => {
        setFilmovi(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);


  const filtrirani = filmovi.filter(film =>
    film.naziv.toLowerCase().includes(pretraga.toLowerCase()) &&
    ( film.zanr.includes( zanr))
  );

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
        <h1>Filmovi</h1>
        <div className="filter">
          <div className="search-input">
          <input
            type="text"
            placeholder="Pretraži po imenu filma"
            value={pretraga}
            onChange={e => setPretraga(e.target.value)}
            className="search-inputt"
          />
          </div>
          <div>
          <select
            value={zanr}
            onChange={e => setZanr(e.target.value)}
            className="select-genre"
          >
            <option value="">Svi žanrovi</option>
            <option value="Akcija">Akcija</option>
            <option value="Komedija">Komedija</option>
            <option value="Drama">Drama</option>
            <option value="Triler">Triler</option>
            <option value="Horor">Horor</option>
            <option value="Animirani">Animirani</option>
            <option value="Avantura">Avantura</option>
            <option value="Romansa">Romansa</option>
            <option value="Naučna fantastika">Naučna fantastika</option>
            <option value="Porodični">Porodični</option>
            <option value="Dokumentarni">Dokumentarni</option>
          </select>
        </div>
        </div>
        <div className="container2">
          {filtrirani.map((film) => (
            <Link to={`/move/${film.id}`} key={film.id} className="movie">
              <img src={`http://localhost:3000/${film.glavna_slika}`} alt={film.naziv} />
              <div className="film-info">
                <h3>{film.naziv}</h3>
                <p>{film.opis}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="sidebar">
        <a href="https://bar.me/" >
          <img src="http://localhost:3000/grb_bar.png" alt="Grb Bara" id="grbBar" />
        </a>
          <Link to="/">
            <img src="http://localhost:3000/Kulturni-centar-bar-LOGO-FOOTER-NOVO.png" alt="Kulturni Centar Bar" id="dom" />

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