//Requeridos para el envío de correo electrónico en el formulario de contacto
const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");

//Setea servidor en el puerto 5000 para el envío del email del formulario (?)
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(5000, () => console.log("Server Running"));

//Configura el mail que va a recibir el formulario
const contactEmail = nodemailer.createTransport({
    host: "smtp.ionos.es",
    port: 587,
    auth: {
      user: "info@quizroyale.es",
      pass: "$SuperSkinny2021",
    },
  });
  
  contactEmail.verify((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Ready to Send");
    }
  });

//Setea el router y envía el mail
router.post("/contact", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const issue = req.body.issue;
    const message = req.body.message; 
    const mail = {
      from: email,
      to: "info@quizroyale.es",
      subject: `${issue}`,
      html: `<p>Name: ${name}</p>
             <p>Email: ${email}</p>
             <p>Message: ${message}</p>`,
    };
    contactEmail.sendMail(mail, (error) => {
      if (error) {
        res.json({ status: "ERROR" });
      } else {
        res.json({ status: "Message Sent" });
      }
    });
  });
