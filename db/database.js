const mongoose = require("mongoose");

// JCXWB498YvEs8cWV
// mongodb+srv://root:<password>@cluster0.kurjpnm.mongodb.net/?retryWrites=true&w=majority
mongoose.connect(
  "mongodb+srv://root:JCXWB498YvEs8cWV@cluster0.kurjpnm.mongodb.net/?retryWrites=true&w=majority/test",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.connection
  .on("connected", () => console.log("connection successfully established."))
  .on("disconnected", () =>
    console.log("successfully disconnected from the database.")
  )
  .on("error", () => console.error.bind(console, "connection error: "));
