const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'a08761396@gmail.com', // Your Gmail address
        pass: 'palo zxxd kbbz picc'              // The app password you generated
    }
});

const sendBloodRequestEmail = async (donorEmail, hospitalName, bloodGroup, bloodUnit) => {
    const mailOptions = {
        from: 'a08761396@gmail.com',
        to: donorEmail,
        subject: 'Urgent Blood Donation Request',
        html: `
            <p>Dear Blood Donor,</p>
            <p>An urgent request for blood has been made by ${hospitalName}.</p>
            <p>Details of the request:</p>
            <ul>
                <li><strong>Blood Group:</strong> ${bloodGroup}</li>
                <li><strong>Blood Unit(s):</strong> ${bloodUnit}</li>
            </ul>
            <p>Your blood type and location match this urgent need. Please consider donating if you are able.</p>
            <p>Thank you for being a hero!</p>
            <p>The Smart Blood Donation Team</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${donorEmail}`);
        return true;
    } catch (error) {
        console.error(`Error sending email to ${donorEmail}:`, error);
        return false;
    }
};

module.exports = sendBloodRequestEmail;