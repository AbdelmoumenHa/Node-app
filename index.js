const path = require("path");
const express = require("express");
const multer = require("multer");
const csv = require("csvtojson");
const { Sales } = require("./models/sales");
require("./db/database");

const app = express();
const PORT = process.env.PORT || 3030;

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./public/assets");
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage });

app.use(express.json()).use(express.static(path.resolve(__dirname, "public")));

// stockge des donnees dans un server base de donnees mongodb

app.post("/", uploads.single("csvFile"), (req, res) => {
  csv()
    .fromFile(req.file.path)
    .then((response) => Sales.insertMany(response));

  res.end("file successfully submitted");
});

//Revenue brut ( Gross volume ) par catégorie ( Product Line )
app.get("/categorie_revenue", (req, res) => {
  Sales.find((_, data) => {
    const result = {};

    data.forEach((item) => {
      if (item["Product line"] in result)
        result[item["Product line"]] += item["gross income"];
      else result[item["Product line"]] = item["gross income"];
    });

    res.end(JSON.stringify(result));
  });
});

//Nombre total des achats par type de client
app.get("/achats_type_client", (req, res) => {
  Sales.find((_, data) => {
    const result = {
      Member: {
        Female: 0,
        Male: 0,
      },
      Normal: {
        Female: 0,
        Male: 0,
      },
    };

    data.forEach(
      (item) => (result[item["Customer type"]][item["Gender"]] += 1)
    );

    res.end(JSON.stringify(result));
  });
});

//Moyenne de rating par sexe.

app.get("/moyen_rating_par_sexe", (req, res) => {
  Sales.find((_, data) => {
    const result = {
      Female: 0,
      Male: 0,
    };

    data.forEach((item) => {
      result[item["Gender"]] += item["Rating"] / data.length;
    });

    res.end(JSON.stringify(result));
  });
});

app.listen(PORT, () => console.log(`listening on port ${PORT}...`));
