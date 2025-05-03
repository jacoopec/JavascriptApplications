const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

mongoose.connect('mongodb://localhost:27017/championship', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Team = mongoose.model('Team', {
  name: String,
  points: Number
});

const Match = mongoose.model('Match', {
  team1: String,
  score1: Number,
  team2: String,
  score2: Number
});

app.use(cors());
app.use(express.json());

// Get team standings
app.get('/teams', async (req, res) => {
  const teams = await Team.find();
  res.json(teams);
});

// Save match result and update scores
app.post('/matches', async (req, res) => {
  const { team1, score1, team2, score2 } = req.body;

  await Match.create({ team1, score1, team2, score2 });

  await Team.updateOne({ name: team1 }, { $inc: { points: score1 } });
  await Team.updateOne({ name: team2 }, { $inc: { points: score2 } });

  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
