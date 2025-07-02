const db = require('../config/db-config');


const findByEmail = async (email) => {
    const [results] = await db.query(
        "SELECT * FROM korisnik WHERE email = ?",
        { replacements: [email] }
    );
    return results[0];
};


const findByUsername = async (ime) => {
    const [results] = await db.query(
        "SELECT * FROM korisnik WHERE ime = ?",
        { replacements: [ime] }
    );
    return results[0];
};


const createUser = async (ime, email, lozinka_hash) => {
    const [result] = await db.query(
        "INSERT INTO korisnik (ime, email, lozinka_hash) VALUES (?, ?, ?)",
        { replacements: [ime, email, lozinka_hash] }
    );
    return { id: result.insertId, ime, email };
};



module.exports = { findByEmail, findByUsername, createUser };