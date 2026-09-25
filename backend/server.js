const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const USERS_FILE = path.join(__dirname, "data", "users.json");
const RESERVATIONS_FILE = path.join(__dirname, "data", "reservations.json");

function readJSON(filePath) {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

let products = [
  { id: 1, name: "Pantalon", price: 450, image: "https://i.pinimg.com/originals/c4/aa/cb/c4aacb3135856c9be89e6d9af24868d6.jpg" },
  { id: 2, name: "Dress", price: 300, image: "https://thumbs.dreamstime.com/b/elegant-formal-gown-dress-310463490.jpg" },
  { id: 3, name: "Student Uniform", price: 1200, image: "https://jhs.addu.edu.ph/wp-content/uploads/2023/08/2.png" },
  { id: 4, name: "Formal Outfit", price: 1500, image: "https://reenasidhu.com/wp-content/uploads/2023/09/Unveiling-the-Elegance.jpg" },
  { id: 5, name: "Sofa Cover", price: 12000, image: "https://i.ytimg.com/vi/pAk3P9QpZO4/maxresdefault.jpg" },
  { id: 6, name: "Kurtina", price: 150, image: "https://tse1.mm.bing.net/th/id/OIP.bEYPCjLcx8Qzy3o4XfK15gHaHg" }
];

app.get("/", (req, res) => {
  res.send("Backend is running! Use /api/products, /api/register, /api/login, /api/reservations");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

// REGISTER
app.post("/api/register", (req, res) => {
  const { username, password, name } = req.body;

  if (!username || !password || !name) {
    return res.status(400).json({ error: "Kailangan ang pangalan, username, at password." });
  }

  const users = readJSON(USERS_FILE);

  const existing = users.find((u) => u.username === username);
  if (existing) {
    return res.status(400).json({ error: "Kinuha na ang username na iyan. Pumili ng iba." });
  }

  const newUser = {
    id: Date.now(),
    username,
    password,
    name,
  };

  users.push(newUser);
  writeJSON(USERS_FILE, users);

  const { password: _, ...userWithoutPassword } = newUser;
  res.json(userWithoutPassword);
});

// LOGIN
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const users = readJSON(USERS_FILE);
  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: "Maling username o password." });
  }

  const { password: _, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

// GET reservations ng isang customer lang
app.get("/api/reservations/:userId", (req, res) => {
  const reservations = readJSON(RESERVATIONS_FILE);
  const userReservations = reservations.filter(
    (r) => String(r.userId) === req.params.userId
  );
  res.json(userReservations);
});

// GET lahat ng reservations (para sa admin)
app.get("/api/reservations", (req, res) => {
  const reservations = readJSON(RESERVATIONS_FILE);
  res.json(reservations);
});

// POST bagong reservation
app.post("/api/reservations", (req, res) => {
  const reservations = readJSON(RESERVATIONS_FILE);

  const newReservation = {
    ...req.body,
    id: Date.now(),
    status: "Pending",
  };

  reservations.push(newReservation);
  writeJSON(RESERVATIONS_FILE, reservations);

  res.json(newReservation);
});

// PATCH i-update ang status ng reservation
app.patch("/api/reservations/:id", (req, res) => {
  const reservations = readJSON(RESERVATIONS_FILE);
  const index = reservations.findIndex((r) => String(r.id) === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Hindi nahanap ang reservation." });
  }

  reservations[index] = { ...reservations[index], ...req.body };
  writeJSON(RESERVATIONS_FILE, reservations);

  res.json(reservations[index]);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});