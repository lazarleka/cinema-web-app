const moveRepository = require('./../repositories/move-repositories');

const getMoves = async (req, res) => {
    const moves = await moveRepository.getMoves();
    res.send(moves);
};

const getMoveById = async (req, res) => {
    const id = req.params.id;
    const move = await moveRepository.getMoveById(id);
   
    res.send(move);
   
};

const insertMove = async (req, res) => {
  const { naziv, trajanje, zanr, opis, reziser, glumci, pocetak_prikazivanja, iframe_url } = req.body;
  const files = req.files;

  const glavna_slika = "/" + files.glavna_slika[0].filename;
  const slika1 = "/" + files.slika1[0].filename;
  const slika2 = "/" + files.slika2[0].filename;
  const slika3 = "/" + files.slika3[0].filename;
  const slika4 = "/" + files.slika4[0].filename;
  const slika5 = "/" + files.slika5[0].filename;

 
    const noviFilm = await moveRepository.createMove({
      naziv,
      trajanje,
      zanr,
      opis,
      reziser,
      glumci,
      pocetak_prikazivanja,
      glavna_slika,
      slika1,
      slika2,
      slika3,
      slika4,
      slika5,
      iframe_url
    });
    res.json(noviFilm);
 
};
const updateMove = async (req, res) => {
  const id = req.params.id;
  
  const { naziv, trajanje, zanr, opis, reziser, glumci, pocetak_prikazivanja, iframe_url } = req.body;
  const files = req.files;

  const glavna_slika = "/" + files.glavna_slika[0].filename;
  const slika1 = "/" + files.slika1[0].filename;
  const slika2 = "/" + files.slika2[0].filename;
  const slika3 = "/" + files.slika3[0].filename;
  const slika4 = "/" + files.slika4[0].filename;
  const slika5 = "/" + files.slika5[0].filename;

  const move = {
    naziv,
    trajanje,
    zanr,
    opis,
    reziser,
    glumci,
    pocetak_prikazivanja,
    iframe_url,
    glavna_slika,
    slika1,
    slika2,
    slika3,
    slika4,
    slika5
  };

  const updatedMove = await moveRepository.updateMove(id, move);
  res.send(updatedMove);
};

const deleteMove = async (req, res) => {
    const id = req.params.id;
    const deletedMove = await moveRepository.deleteMove(id);
   
    res.send(deletedMove);
   
};

module.exports = {
    getMoves,
    getMoveById,
    insertMove,
    updateMove,
    deleteMove
};
