import transporter from '../utils/nodemailer.js';
import dotenv from 'dotenv';
dotenv.config();
const emailUser = process.env.EMAIL_USER;


// Función para enviar correo electrónico
async function sendEmail(userEmail) {
    return new Promise((resolve, reject) => {
        const mailOptions = {
            from: emailUser,
            to: userEmail,
            subject: 'Eliminación de cuenta por inactividad',
            html: `
            <div>
                <h1>Hola</h1>
                <br><br>
                <p>Tu cuenta ha sido eliminada debido a inactividad</p>
                <p>Disculpe las molestias</p>
                <p>kevin cespedes</p>
            </div>
            `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error al enviar el correo electrónico:', error);
                reject(error);
            } else {
                console.log('Correo electrónico enviado:', info.response);
                resolve();
            }
        });
    });
}

export default sendEmail