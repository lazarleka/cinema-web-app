import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [ulogovan, setUlogovan] = useState(false);
  const [open, setOpen] = useState(false);
  const [tip, setTip] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userTip = localStorage.getItem("tip"); 
    setUlogovan(!!token);
    setTip(userTip);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("Id");
    localStorage.removeItem("korisnicko");
    localStorage.removeItem("tip");
    setUlogovan(false);
    setTip(null);
    navigate(0); 
    //navigate(-1);
  };

  return (
    <>
      <div className="navbar">
        <div className="start">
          <Link to="/"><img id="DomKulture" src="http://localhost:3000/Kulturni-centar-bar-LOGO-FOOTER-NOVO.png" alt="Logo" /></Link>
          <Link to="/" className="Hoverclass">Filmovi</Link>
          <Link to="/novosti" className="Hoverclass">Novosti</Link>
          <Link to="/onama" className="Hoverclass">O nama</Link>
        </div>
        <div className="end">
          {ulogovan ? (
            <>
              {tip !== "2" && (
                <Link to="/rezervacije"><i className="fa fa-user"></i> Moje rezervacije</Link>
              )}

              {tip === "2" && (
                <>
                  <Link to="/admin/filmovi" className="Hoverclass">Upravljanje filmovima</Link>
                  <Link to="/admin/prikazivanja" className="Hoverclass">Upravljanje prikazivanjima</Link>
                  <Link to="/admin/novosti" className="Hoverclass">Upravljanje novostima</Link>
                </>
              )}

              <a onClick={handleLogout} className="Hoverclass">Log out</a>
            </>
          ) : (
            <Link to="/login"><i className="fa fa-user"></i> Prijavi se</Link>
          )}
        </div>
      </div>

      {/* Responsive Top Navigation */}
      <div className="topnav">
        <Link to="/">
          <img id="DomKulture2" src="http://localhost:3000/Kulturni-centar-bar-LOGO-FOOTER-NOVO.png" alt="Logo" />
        </Link>
        <div id="myLinks" style={{ display: open ? "block" : "none" }}>
          <Link to="/" className="Hoverclass">Filmovi</Link>
          <Link to="/novosti" className="Hoverclass">Novosti</Link>
          <Link to="/onama" className="Hoverclass">O nama</Link>

          {ulogovan ? (
            <>
              {tip !== "2" && (
                <Link to="/rezervacije"><i className="fa fa-user"></i> Moje rezervacije</Link>
              )}

              {tip === "2" && (
                <>
                  <Link to="/admin/filmovi" className="Hoverclass">Upravljanje filmovima</Link>
                  <Link to="/admin/prikazivanja" className="Hoverclass">Upravljanje prikazivanjima</Link>
                  <Link to="/admin/novosti" className="Hoverclass">Upravljanje novostima</Link>
                </>
              )}

              <a className="Hoverclass" onClick={() => { handleLogout(); setOpen(false); }}>Log out</a>
            </>
          ) : (
            <Link to="/login">
              <i className="fa fa-user"></i> Prijavi se
            </Link>
          )}
        </div>
        <a
          href="#"
          className="icon"
          onClick={e => {
            e.preventDefault();
            setOpen(!open);
          }}
        >
          <i className="fa fa-bars"></i>
        </a>
      </div>
    </>
  );
}
