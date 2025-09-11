const Registration = require('../models/registration');
const transporter = require('../utils/email');

const registerUser = async (req, res) => {
  const { name, email, message } = req.body;
  let newReg;

  try {
    // Save to DB first
    newReg = new Registration({ name, email, message, emailStatus: "pending" });
    await newReg.save();

    // Send Email
    await transporter.sendMail({
      from: `"Registration Bot" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "New Registration Received",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    });

    // Update email status
    newReg.emailStatus = "sent";
    await newReg.save();

    res.status(201).json({ success: true, msg: "Registration saved & email sent!" });
    }catch (err) {
    console.error(err);

    if (newReg) {
      newReg.emailStatus = "failed";
      await newReg.save();
    }

    res.status(500).json({ success: false, msg: "Error saving registration or sending email" });
  }
};

module.exports = { registerUser };
