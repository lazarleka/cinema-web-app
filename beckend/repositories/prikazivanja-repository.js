const {Model}=require('sequelize');
const dbConnection = require('./../config/db-config'); 
const getPrikazivanja = async () => {
  const [results] = await dbConnection.query(`
    SELECT 
      p.*,
      f.naziv AS film_naziv,
      s.naziv AS sala_naziv
    FROM prikazivanje p
    JOIN film f ON f.id = p.film_id
    JOIN sala s ON s.id = p.sala_id
    ORDER BY p.datum DESC, p.vrijeme DESC
  `);
  return results;
};

const getPrikazivanjeById = async (id) => {
    
    const [prikazivanjeResults] = await dbConnection.query(
        "SELECT * FROM prikazivanje p inner join film f  on f.id=p.film_id  WHERE p.id = ? order by datum ",
        { replacements: [id] }
    );
    const prikazivanje = prikazivanjeResults[0];
    

    
   const [allSeats] = await dbConnection.query(
    "SELECT * FROM sjediste WHERE sala_id = ? ORDER BY red ASC, broj ASC",
    { replacements: [prikazivanje.sala_id] }
  );


   const [reservedRows] = await dbConnection.query(
  `SELECT sr.sjediste_id 
   FROM sjediste_rezervacija sr
   JOIN rezervacija r ON sr.rezervacija_id = r.id
   WHERE r.prikazivanje_id = ?`,
  { replacements: [id] }
);

    const reserved = reservedRows.map(r => r.sjediste_id);

    return {
        prikazivanje,
        allSeats,
        reserved
    };
};
const createPrikazivanje = async (prikazivanje) => {
  const [results] = await dbConnection.query(
    `INSERT INTO prikazivanje (film_id, datum, vrijeme, sala_id, cijena)
     VALUES (?, ?, ?, ?, ?)`,
    {
      replacements: [
        prikazivanje.film_id,
        prikazivanje.datum,
        prikazivanje.vrijeme,
        prikazivanje.sala_id,
        prikazivanje.cijena,
      ]
    }
  );
  return results;
};

const updatePrikazivanje = async (id, prikazivanje) => {
  const [results] = await dbConnection.query(
    `UPDATE prikazivanje SET film_id=?, datum=?, vrijeme=?, sala_id=?, cijena=? WHERE id=?`,
    {
      replacements: [
        prikazivanje.film_id,
        prikazivanje.datum,
        prikazivanje.vrijeme,
        prikazivanje.sala_id,
        prikazivanje.cijena,
        id
      ]
    }
  );
  return results;
};

const deletePrikazivanje = async (id) => {
    const [results, metadata] = await dbConnection.query("DELETE FROM prikazivanje WHERE id=?", { replacements: [id] });
    return results;
};
const kreirajRezervaciju = async (prikazivanjeId, sjedista, userId) => {
 
    const [insertResult] = await dbConnection.query(
      "INSERT INTO rezervacija (korisnik_id, prikazivanje_id) VALUES (?, ?)",
      {
        replacements: [userId, prikazivanjeId]
      }
    );

    const rezervacijaId =   insertResult; 

    for (const sjedisteId of sjedista) {
      await dbConnection.query(
        "INSERT INTO sjediste_rezervacija (rezervacija_id, sjediste_id) VALUES (?, ?)",
        {
          replacements: [rezervacijaId, sjedisteId]
        }
      );
    }

    return rezervacijaId;
  
};



module.exports = {
    getPrikazivanja,
    getPrikazivanjeById,
    createPrikazivanje,
    updatePrikazivanje,
    deletePrikazivanje,
    kreirajRezervaciju
};