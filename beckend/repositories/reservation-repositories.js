const {Model}=require('sequelize');
const dbConnection = require('./../config/db-config'); 

const getReservations=async()=>{
    const[results]=await dbConnection.query("SELECT * FROM rezervacije");
    return results;
}
const getReservationById = async (id) => {
  const [results] = await dbConnection.query(
    `
    SELECT 
      r.id AS Rezervacija,
      sr.id,
      sr.sjediste_id,
      s.red,
      s.broj,
      sa.naziv AS sala,
      p.datum,
      p.vrijeme,
      p.cijena,
      f.naziv
    FROM rezervacija r
    INNER JOIN sjediste_rezervacija sr ON sr.rezervacija_id = r.id
    INNER JOIN sjediste s ON s.id = sr.sjediste_id
    INNER JOIN prikazivanje p ON p.id = r.prikazivanje_id
    INNER JOIN sala sa ON sa.id = p.sala_id
    INNER JOIN film f ON p.film_id = f.id
    WHERE r.korisnik_id = ?
    ORDER BY r.id 
    `,
    { replacements: [Number(id)] }
  );
  return results;
};

const insertReservation=async(novost)=>{
    const[results]=await dbConnection.query("INSERT INTO resrezervacije (naslov,sadrzaj,slika_path) VALUES (?,?,?)",
    {replacements:[novost.naslov,novost.sadrzaj,novost.slika_path]});
    return results;
}
const updateReservationt=async(id,novost)=>{
    const[results]=await dbConnection.query("UPDATE novosti SET naslov=?, sadrzaj=?, slika_path=? WHERE id=?",
    {replacements:[novost.naslov,novost.sadrzaj,novost.slika_path,id]});
    return results;
}
const deleteReservation=async(id)=>{
    const[results]=await dbConnection.query("DELETE FROM novosti WHERE id=?", {replacements:[id]});
    return results;
}


module.exports={
    getReservations
    ,getReservationById
    ,insertReservation
    ,updateReservationt
    ,deleteReservation,
   
    
}