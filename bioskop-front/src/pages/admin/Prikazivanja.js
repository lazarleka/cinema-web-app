import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import "../style.css";
import "./admin.css";
import { Link } from "react-router-dom";

export default function Prikazivanja() {
  const [prikazivanja, setPrikazivanja] = useState([]);
  const [filmovi, setFilmovi] = useState([]);
  const [sale, setSale] = useState([]);
  const [editId, setEditId] = useState(null);
  const [filterFilmId, setFilterFilmId] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res1 = await axios.get("http://localhost:3000/prikazivanje");
    console.log(res1.data);
    setPrikazivanja(res1.data);

    const res2 = await axios.get("http://localhost:3000/move");
    console.log(res2.data);
    setFilmovi(res2.data);

    const res3 = await axios.get("http://localhost:3000/sala");
    console.log(res3.data);
    setSale(res3.data);
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = {
    film_id: form.film_id.value,
    datum: form.datum.value,
    vrijeme: form.vrijeme.value,
    sala_id: form.sala_id.value,
    cijena: form.cijena.value,
  };

  try {
    if (editId) {
      await axios.put(`http://localhost:3000/prikazivanje/${editId}`, data);
      alert("Prikazivanje uspešno izmenjeno!");
      setEditId(null);
    } else {
      await axios.post("http://localhost:3000/prikazivanje", data);
      alert("Prikazivanje uspešno dodato!");
    }
    form.reset();
    fetchData();
  } catch (err) {
    alert("Greška prilikom slanja podataka.");
    console.error(err);
  }
};

const handleDelete = async (id) => {
  if (window.confirm("Obrisati prikazivanje?")) {
    try {
      await axios.delete(`http://localhost:3000/prikazivanje/${id}`);
      alert("Prikazivanje uspešno obrisano!");
      fetchData();
    } catch (err) {
      alert("Greška prilikom brisanja.");
      console.error(err);
    }
  }
};

 const handleEdit = (p) => {
  setEditId(p.id);
  const form = document.querySelector(".admin-form");
  form.film_id.value = p.film_id;
  form.datum.value = p.datum;
  form.vrijeme.value = p.vrijeme;
  form.sala_id.value = p.sala_id;
  form.cijena.value = p.cijena;
};


 

  const filtered = filterFilmId
    ? prikazivanja.filter((p) => p.film_id == filterFilmId)
    : prikazivanja;

  return (
    <div className="meni">
      <div className="linkovi">
        <a href="https://www.youtube.com/@jpkcbar9213" target="_blank" rel="noopener noreferrer">
          <img id="yt" src="https://www.svgrepo.com/show/521051/youtube.svg" alt="YouTube" />
        </a>
        <a href="https://www.facebook.com/KulturnicentarBar/" target="_blank" rel="noopener noreferrer">
          <img id="fb" src="https://www.svgrepo.com/show/521654/facebook.svg" alt="Facebook" />
        </a>
        <a href="https://www.instagram.com/kulturni_centar_bar/" target="_blank" rel="noopener noreferrer">
          <img id="ig" src="https://www.svgrepo.com/show/512399/instagram-167.svg" alt="Instagram" />
        </a>
      </div>

      <Navbar />

      <div className="admin-container">
        <h2 className="admin-title">Dodaj / Izmeni Prikazivanje</h2>
        <form className="admin-form" onSubmit={handleSubmit}>
          <label>Film:</label>
          <select name="film_id" required>
            <option value="">Odaberi film</option>
            {filmovi.map((f) => (
              <option value={f.id} key={f.id}>{f.naziv}</option>
            ))}
          </select>

          <label>Datum:</label>
          <input type="date" name="datum" required />

          <label>Vrijeme:</label>
          <input type="time" name="vrijeme" required />

          <label>Sala:</label>
          <select name="sala_id" required>
            <option value="">Odaberi salu</option>
            {sale.map((s) => (
              <option value={s.id} key={s.id}>{s.naziv}</option>
            ))}
          </select>

          <label>Cijena karte (€):</label>
          <input type="number" name="cijena" placeholder="Cijena" step="0.01" required />

          <button type="submit">{editId ? "Izmeni" : "Dodaj"}</button>
        </form>

        <h2 className="admin-title">Filtriraj po filmu</h2>
        <select onChange={(e) => setFilterFilmId(e.target.value)} value={filterFilmId}>
          <option value="">Prikaži sve</option>
          {filmovi.map((f) => (
            <option value={f.id} key={f.id}>{f.naziv}</option>
          ))}
        </select>

        <h2 className="admin-title">Lista prikazivanja</h2>
        <div className="filmovi-lista">
          {filtered.map((p) => {
            const film = filmovi.find((f) => f.id === p.film_id);
            const sala = sale.find((s) => s.id === p.sala_id);
            return (
              <div key={p.id} className="film-item">
                <div className="film-info">
                  <h3>{film?.naziv}</h3>
                  <p><strong>Datum:</strong> {p.datum}</p>
                  <p><strong>Vrijeme:</strong> {p.vrijeme}</p>
                  <p><strong>Sala:</strong> {sala?.naziv}</p>
                  <p><strong>Cijena:</strong> {p.cijena} €</p>
                  <button className="edit-button" onClick={() => handleEdit(p)}>Izmeni</button>
                  <button className="delete-button" onClick={() => handleDelete(p.id)}>Obriši</button>
                </div>
              </div>
            );
          })}
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
