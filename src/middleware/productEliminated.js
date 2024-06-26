import transporter from '../utils/nodemailer.js';
import dotenv from 'dotenv';
dotenv.config();
const emailUser = process.env.EMAIL_USER;


async function sendProduct(productOwner) {
    return new Promise((resolve, reject) => {
        const mailOptions = {
            from: emailUser,
            to: productOwner,
            subject: 'Eliminación del producto creado',
            html: `
            <div>
                <h1>Hola</h1>
                <br><br>
                <p>Hemos tenido que eliminar tu producto, por distintas razones</p>
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

export default sendProduct