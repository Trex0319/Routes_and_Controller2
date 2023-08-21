const express = require("express");
const app = express();

let parks = [
  {
    id: 1,
    name: "Yellowstone National Park",
    facilities: ["campgrounds", "visitor-center", "trails"],
  },
  {
    id: 2,
    name: "Zion National Park",
    facilities: ["trails", "visitor-center"],
  },
];

let visitors = [
  { id: 1, name: "John Doe", pastReservations: [1], upcomingReservations: [2] },
  { id: 2, name: "Jane Smith", pastReservations: [], upcomingReservations: [] },
];

let reservations = [
  { id: 1, parkId: 1, visitorId: 1, date: "2023-09-01" },
  { id: 2, parkId: 2, visitorId: 1, date: "2023-10-01" },
];

// Your routing, authentication, and controller code goes here
app.get("/parks", (req, res) => {
  const { facilities } = req.query;
  let filteredParks = parks;

  if (facilities) {
    const facilitiesArray = facilities.split(",");
    filteredParks = parks.filter((park) =>
      facilitiesArray.every((facility) => park.facilities.includes(facility))
    );
  }

  res.json(filteredParks);
});

app.get("/parks/:id", (req, res) => {
  const parkId = parseInt(req.params.id);
  const park = parks.find((park) => park.id === parkId);

  if (!park) {
    return res.status(404).json({ message: "Park not found" });
  }

  res.json(park);
});

app.get("/visitors", (req, res) => {
  res.json(visitors);
});

app.get("/visitors/:id", (req, res) => {
  const visitorId = parseInt(req.params.id);
  const visitor = visitors.find((visitor) => visitor.id === visitorId);

  if (!visitor) {
    return res.status(404).json({ message: "Visitor not found" });
  }

  const pastReservations = reservations.filter((reservation) =>
    visitor.pastReservations.includes(reservation.id)
  );
  const upcomingReservations = reservations.filter((reservation) =>
    visitor.upcomingReservations.includes(reservation.id)
  );

  res.json({ ...visitor, pastReservations, upcomingReservations });
});

app.get("/reservations", (req, res) => {
  res.json(reservations);
});

app.get("/reservations/:id", (req, res) => {
  const reservationId = parseInt(req.params.id);
  const reservation = reservations.find(
    (reservation) => reservation.id === reservationId
  );

  if (!reservation) {
    return res.status(404).json({ message: "Reservation not found" });
  }

  res.json(reservation);
});

app.get("/", (req, res) => {
  res.send(
    '<a href="/parks">parks</a><a href="/visitors">visitors</a><a href="/reservations">reservations</a>'
  );
});

app.listen(8000, () => {
  console.log(
    "National Park Visitor System is running on port http://localhost:8000"
  );
});
