const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(port, () => console.log("Server Running, ",port));


const contactEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
      user: "rudhramsaraswat1112@gmail.com",
      pass : "password"
  }
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

router.post("/", (req, res) => {
  console.log("sending...");
  
  const name = req.body.firstName + " " +  req.body.lastName;
  const email = req.body.email;
  const message = req.body.message;
  const phone = req.body.phone;
  const mail = {
    from: "rudhramsaraswat1112@gmail.com",
    to: "rudhramsaraswat2770@gmail.com",
    subject: "Contact Form Submission - Portfolio",
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Phone: ${phone}</p>
           <p>Message: ${message}</p>`,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json(error);
    } else {
      res.json({ code: 200, status: "Message Sent" });
    }
  });
});
