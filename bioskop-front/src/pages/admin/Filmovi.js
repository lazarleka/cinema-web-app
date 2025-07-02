import React, { useEffect, useState } from "react";
import axios from "axios";
import "./admin.css";
import Navbar from "../Navbar";
import "../style.css";
import { Link } from "react-router-dom";

export default function Filmovi() {
  const [filmovi, setFilmovi] = useState([]);
  const [editFilmId, setEditFilmId] = useState(null);

  useEffect(() => {
    fetchFilmovi();
  }, []);

  const fetchFilmovi = async () => {
    try {
      const res = await axios.get("http://localhost:3000/move");
      setFilmovi(res.data);
    } catch (err) {
      console.error("Greška pri dohvatu filmova:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    try {
      if (editFilmId) {
        await axios.put(`http://localhost:3000/move/${editFilmId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Film uspešno izmenjen!");
        setEditFilmId(null);
      } else {
        await axios.post("http://localhost:3000/move", formData);
        alert("Film uspešno dodat!");
      }

      fetchFilmovi();
      form.reset();
    } catch (err) {
      console.error("Greška pri slanju podataka:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Da li ste sigurni da želite da obrišete ovaj film?")) {
      try {
        await axios.delete(`http://localhost:3000/move/${id}`);
        alert("Film obrisan!");
        fetchFilmovi();
      } catch (err) {
        console.error("Greška pri brisanju filma:", err);
      }
    }
  };

  const handleEdit = (film) => {
    setEditFilmId(film.id);
    const form = document.querySelector(".admin-form");
    form.naziv.value = film.naziv;
    form.trajanje.value = film.trajanje;
    form.zanr.value = film.zanr;
    form.opis.value = film.opis;
    form.reziser.value = film.reziser;
    form.glumci.value = film.glumci;
    form.pocetak_prikazivanja.value = film.pocetak_prikazivanja;
    form.iframe_url.value = film.iframe_url;
  };

  return (
    <div className="meni">
      <div className="linkovi">
        <a href="https://www.youtube.com/@jpkcbar9213" target="_blank" rel="noopener noreferrer">
          <img id="yt" src="http://localhost:3000/youtube.png" alt="YouTube" />
        </a>
        <a href="https://www.facebook.com/KulturnicentarBar/" target="_blank" rel="noopener noreferrer">
          <img id="fb" src="http://localhost:3000/facebook.png" alt="Facebook" />
        </a>
        <a href="https://www.instagram.com/kulturni_centar_bar/" target="_blank" rel="noopener noreferrer">
          <img id="ig" src="http://localhost:3000/instagram-167_1.png" alt="Instagram" />
        </a>
      </div>

      <Navbar />

      <div className="admin-container">
        <h2 className="admin-title">Filmovi</h2>
        <form className="admin-form" onSubmit={handleSubmit} encType="multipart/form-data">
          <input type="text" name="naziv" placeholder="Naziv filma" required />
          <input type="number" name="trajanje" placeholder="Trajanje (min)" required />
          <input type="text" name="zanr" placeholder="Žanr" />
          <textarea name="opis" placeholder="Opis"></textarea>
          <input type="text" name="reziser" placeholder="Režiser" />
          <input type="text" name="glumci" placeholder="Glumci" />
          <label>Početak prikazivanja (datum):</label>
          <input type="date" name="pocetak_prikazivanja" required />
          <label>YouTube iframe URL (za trejler):</label>
          <input type="text" name="iframe_url" placeholder="YouTube iframe URL" />

          <label>Glavna slika:</label>
          <input type="file" name="glavna_slika" accept="image/*" required />
          <label>Slika 1:</label>
          <input type="file" name="slika1" accept="image/*" required />
          <label>Slika 2:</label>
          <input type="file" name="slika2" accept="image/*" required />
          <label>Slika 3:</label>
          <input type="file" name="slika3" accept="image/*" required />
          <label>Slika 4:</label>
          <input type="file" name="slika4" accept="image/*" required />
          <label>Slika 5:</label>
          <input type="file" name="slika5" accept="image/*" required />

          <button type="submit">{editFilmId ? "Sačuvaj izmene" : "Dodaj film"}</button>
        </form>

        <h2 className="admin-title">Lista filmova</h2>
        <div className="filmovi-lista">
          {filmovi.map((film) => (
            <div key={film.id} className="film-item">
              <img src={`http://localhost:3000/${film.glavna_slika}`} alt={film.naziv} className="film-slika" />
              <div className="film-info">
                <h3>{film.naziv}</h3>
                <p><strong>Trajanje:</strong> {film.trajanje} min</p>
                <p><strong>Žanr:</strong> {film.zanr}</p>
                <p><strong>Režiser:</strong> {film.reziser}</p>
                <p><strong>Glumci:</strong> {film.glumci}</p>
                <button className="edit-button" onClick={() => handleEdit(film)}>Izmeni</button>
                <button className="delete-button" onClick={() => handleDelete(film.id)}>Obriši</button>
              </div>
            </div>
          ))}
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
        <p>&copy; IT projekat – Bioskop Bar</p>
      </div>
    </div>
  );
}
