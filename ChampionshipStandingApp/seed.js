// seed.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/championship');

const Team = mongoose.model('Team', { name: String, points: Number });

const teams = [
  { name: "svs", points: 49 },
  { name: "fornovo", points: 42 },
  { name: "gioco", points: 0 },
  { name: "lasalle", points: 39 },
  { name: "bss", points: 0 },
  { name: "pgs", points: 39 },
  { name: "sanpolo", points: 39 },
  { name: "noi", points: 32 },
  { name: "alga", points: 27 },
  { name: "inzani", points: 32 }
];

Team.insertMany(teams).then(() => {
  console.log("Teams seeded");
  mongoose.disconnect();
});
