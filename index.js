const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("config");
const routes = require("./routes");

const app = express();

app.use(express.json({ extended: true }));
app.use("/api", routes);
app.use(cors());

const PORT = config.get("port") || 5000;

async function start() {
  try {
    await mongoose.connect(config.get("mongoURI"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Server error", error);
    process.exit(1);
  }
}

app.get('*', function(req, res){
  res.status(404).send('Not Found');
});

start();
