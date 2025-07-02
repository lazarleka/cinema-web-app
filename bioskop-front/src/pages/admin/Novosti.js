import React, { useEffect, useState } from "react";
import axios from "axios";
import "./admin.css";
import Navbar from "../Navbar";
import "../style.css";
import { Link } from "react-router-dom";

export default function Novosti() {
  const [novosti, setNovosti] = useState([]);
  const [editNovostId, setEditNovostId] = useState(null);

  useEffect(() => {
    fetchNovosti();
  }, []);

  const fetchNovosti = async () => {
    try {
      const res = await axios.get("http://localhost:3000/novosti");
      setNovosti(res.data);
    } catch (err) {
      console.error("Greška pri dohvatu novosti:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    try {
      if (editNovostId) {
        await axios.put(`http://localhost:3000/novosti/${editNovostId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Novost uspešno izmenjena!");
        setEditNovostId(null);
      } else {
        await axios.post("http://localhost:3000/novosti", formData);
        alert("Novost uspešno dodata!");
      }

      fetchNovosti();
      form.reset();
    } catch (err) {
      console.error("Greška pri slanju novosti:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Da li ste sigurni da želite da obrišete ovu novost?")) {
      try {
        await axios.delete(`http://localhost:3000/novosti/${id}`);
        alert("Novost obrisana!");
        fetchNovosti();
      } catch (err) {
        console.error("Greška pri brisanju novosti:", err);
      }
    }
  };

  const handleEdit = (novost) => {
    setEditNovostId(novost.id);
    const form = document.querySelector(".admin-form");
    form.naslov.value = novost.naslov;
    form.sadrzaj.value = novost.sadrzaj;
  };

  return (
    <div className="meni">
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

      <div className="admin-container">
        <h2 className="admin-title">Novosti</h2>

        <form className="admin-form" onSubmit={handleSubmit} encType="multipart/form-data">
          <label>Naslov:</label>
          <input type="text" name="naslov" placeholder="Naslov novosti" required />

         
          <textarea name="sadrzaj" placeholder="Tekst novosti" required></textarea>

         
          <input type="file" name="slika_path" accept="image/*" />

          <button type="submit">{editNovostId ? "Sačuvaj izmene" : "Dodaj novost"}</button>
        </form>

        <h2 className="admin-title">Sve novosti</h2>
        <div className="filmovi-lista">
          {novosti.map((novost) => (
            <div key={novost.id} className="film-item">
              {novost.slika_path && (
                <img
                  src={`http://localhost:3000/${novost.slika_path}`}
                  alt={novost.naslov}
                  className="film-slika"
                />
              )}
              <div className="film-info">
                <h3>{novost.naslov}</h3>
                <p>{novost.sadrzaj}</p>
                <button className="edit-button" onClick={() => handleEdit(novost)}>Izmeni</button>
                <button className="delete-button" onClick={() => handleDelete(novost.id)}>Obriši</button>
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
                <p>&copy; It projekat-Bioskop Bar</p>
              </div>
    </div>
  );
}
