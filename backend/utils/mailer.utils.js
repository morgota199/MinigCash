const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
        user: 'lessie.mante@ethereal.email',
        pass: 'mndkSdZzUXn7ARcBuR'
    }
}, {
    from: `MiningCash <lessie.mante@ethereal.email>`,
});

const mailer = message => {
    transporter.sendMail(message, (err, info) => {
        if(err) console.log(err);

        console.log("Email.info: ", info)
    })
}

module.exports = mailer;