const { Model } = require('sequelize');
const dbConnection = require('./../config/db-config'); 
const getMoves= async()=>{
    const[results]= await dbConnection.query(`(SELECT * FROM film 
    )  order by pocetak_prikazivanja desc
        `);
    return results;
}
const getMoveById= async(id)=>{
    const [filmResults] = await dbConnection.query(
        "SELECT * FROM film WHERE id = ?",
        { replacements: [id] }
    );
    // where id in(
    //     select film_id from prikazivanje where datum_vreme>=now()
        
    const film = filmResults[0];

    const [prikazivanja] = await dbConnection.query(
        `SELECT p.id, p.datum, p.vrijeme, s.naziv
            FROM prikazivanje p INNER JOIN sala s ON p.sala_id = s.id WHERE p.film_id = ? AND p.datum >= CURDATE()
            ORDER BY p.datum, p.vrijeme;
`,
        { replacements: [id] }
    );

    return {
        film,
        prikazivanja
    };
}
const createMove = async (move) => {
  console.log(move);
  const [results] = await dbConnection.query(
    `INSERT INTO film 
    (naziv, trajanje, zanr, opis, reziser, glumci, pocetak_prikazivanja, glavna_slika, slika1, slika2, slika3, slika4, slika5, iframe_url) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    {
      replacements: [
        move.naziv,
        move.trajanje,
        move.zanr,
        move.opis,
        move.reziser,
        move.glumci,
        move.pocetak_prikazivanja,
        move.glavna_slika,
        move.slika1,
        move.slika2,
        move.slika3,
        move.slika4,
        move.slika5,
        move.iframe_url
      ]
    }
  );
  return results;
};
const updateMove = async (id, move) => {
  const [results, metadata] = await dbConnection.query(
    `UPDATE film 
     SET naziv = ?, trajanje = ?, zanr = ?, opis = ?, reziser = ?, glumci = ?, iframe_url = ?, 
         glavna_slika = ?, slika1 = ?, slika2 = ?, slika3 = ?, slika4 = ?, slika5 = ?, pocetak_prikazivanja = ?
     WHERE id = ?`,
    {
      replacements: [
        move.naziv,
        move.trajanje,
        move.zanr,
        move.opis,
        move.reziser,
        move.glumci,
        move.iframe_url,
        move.glavna_slika,
        move.slika1,
        move.slika2,
        move.slika3,
        move.slika4,
        move.slika5,
        move.pocetak_prikazivanja,
        id
      ]
    }
  );
  return results;
};

const deleteMove= async(id)=>{
    const[results,metadata]= await dbConnection.query("DELETE FROM film WHERE id=?", {replacements:[id]});
    return results;
}

module.exports={
    getMoves
    ,getMoveById
    ,createMove
    ,updateMove
    ,deleteMove
}