const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/user-repository');

const SECRET = "spuske"; 

const register = async (req, res) => {
    const { ime, email, lozinka, ponoviLozinku } = req.body;

    if (!ime || !email || !lozinka || !ponoviLozinku) {
        return res.send('Sva polja su obavezna!');
    }

    if (lozinka !== ponoviLozinku) {
        return res.send('Lozinke se ne poklapaju!');
    }

    
        const existsEmail = await userRepository.findByEmail(email);
        if (existsEmail) return res.send('Email već postoji!');

        const existsUsername = await userRepository.findByUsername(ime);
        if (existsUsername) return res.send('Korisničko ime već postoji!');

        const hashedPassword = await bcrypt.hash(lozinka, 10);
        const user = await userRepository.createUser(ime, email, hashedPassword);

        res.send({ id: user.id, ime: user.ime, email: user.email });
    
};

const login = async (req, res) => {
    const { email, lozinka,tip_korisnika } = req.body;

    if (!email || !lozinka) {
        return res.send('Email i lozinka su obavezni!');
    }

    
        const user = await userRepository.findByEmail(email);
        if (!user) return res.send('Pogrešan email ili lozinka!');

        const isMatch = await bcrypt.compare(lozinka, user.lozinka_hash);
        if (!isMatch) return res.send('Pogrešan email ili lozinka!');

        const token = jwt.sign(
            { id: user.id, ime: user.ime, email: user.email ,tip:user.tip_id},
            SECRET,
            { expiresIn: '1h' }
        );

        res.send({ token, user: { id: user.id, ime: user.ime, email: user.email, tip: user.tip_id } });

    
};

module.exports = {
    register,
    login
};