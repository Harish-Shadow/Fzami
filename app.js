const express = require("express");
const app = express();
const PORT = process.env.PORT || 3017;
const { sendEnquiry } = require("./services/mail.service");
const bodyParser = require("body-parser")
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", express.static(__dirname + "/public"));
app.use("/cities", express.static(__dirname + "/public"));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/hc", (req, res) => {
  res.send("OK");
});

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/ContactUs", (req, res) => res.render("ContactUs"));
app.get("/index", (req, res) => res.render("index"));
app.get("/about", (req, res) => res.render("about"));
app.get("/DigitalTransformation", (req, res) => res.render("DigitalTransformation"));
app.get("/AcademicTraining", (req, res) => res.render("AcademicTraining"));
app.get("/EClassroomSolutions", (req, res) => res.render("EClassroomSolutions"));
app.get("/Gallery", (req, res) => res.render("Gallery"));
app.get("/Gen_AI", (req, res) => res.render("Gen_AI"));
app.get("/IndustrySolutions", (req, res) => res.render("IndustrySolutions"));
app.get("/InformationTechnology", (req, res) => res.render("InformationTechnology"));
app.get("/services", (req, res) => res.render("services"));
app.get("/privecy", (req, res) => res.render("privacey"));
app.get("/404", (req, res) => res.render("404"));

app.use(bodyParser.urlencoded({ extended: true }));
app.post("/contact1", async (req, res) => {
  try {
    console.log("Form Data: ", req.body); // Log form data to ensure it's being received
    const result = await sendEnquiry(req.body);
    if (result.status === 200) {
      res.status(200).send("Form submitted successfully.");
    } else {
      res.status(500).send("Internal Server Error");
    }
  } catch (err) {
    console.error("Error: ", err.message);
    res.status(500).send("Internal Server Error");
  }
});



app.get("/test", (req, res) => {
  res.send("Test");
});

app.get("#", (req, res) => {
  res.render("404");
});

app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
