import nodemailer from 'nodemailer'
import * as dotenv from 'dotenv'
dotenv.config()

export const transporter = nodemailer.createTransport({
    port:  process.env.MAIL_PORT,               // true for 465, false for other ports
    host: process.env.MAIL_HOST,
       auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
         }
    });

export const buildEmail = (to, subject, template) => {

     return {
        from: process.env.MAIL_EMAIL,  // sender address
        to,   // list of receivers
        subject,
        text: 'That was easy!',
        html: template
      }

}

export const buildEmailTemplate = ({screenshot, position, date}) => {
    return `
    <html>
    <body>
    <img src="${screenshot}" width="800" /></br>
    <p>Fecha: ${date}</p>
     <p>Latitud : ${position.latitude}</p>
     <p>Longitud : ${position.longitude}</p>
     </body>
     </html>
    `
}


transporter.verify((err, success) => {
    if (err) console.error(err);
    console.log('Your config is correct');
});