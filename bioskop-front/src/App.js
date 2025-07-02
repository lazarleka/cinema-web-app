import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Move from "./pages/Move";
import MoveId from "./pages/MoveId"; 
import Novosti from "./pages/Novosti";
import NovostiId from "./pages/NovostId";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Rezervacije from "./pages/Rezervacije";
import Onama from "./pages/Onama";
import PrikazivanjeId from "./pages/PrikazivanjeId";
import FilmoviAdmin from "./pages/admin/Filmovi";
import PrikazivanjaAdmin from "./pages/admin/Prikazivanja";
import NovostiAdmin from "./pages/admin/Novosti";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Move />} />
         <Route path="/move/:id" element={<MoveId />} />
        <Route path="/novosti" element={<Novosti />} />
        <Route path="/novosti/:id" element={<NovostiId />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/rezervacije" element={<Rezervacije />} />
        <Route path="/onama" element={<Onama />} />
        <Route path="/prikazivanje/:id" element={<PrikazivanjeId />} />
        <Route path="/admin/filmovi" element={<FilmoviAdmin />} />
        <Route path="/admin/prikazivanja" element={<PrikazivanjaAdmin />} />
        <Route path="/admin/novosti" element={<NovostiAdmin />} />
        
        
      </Routes>
    </Router>
  );
}

export default App;