import express from 'express';
import ticketModel from '../dao/models/ticket.model.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const userId = req.session.user; 
        if (!userId) {
            return res.status(400).json({ success: false, message: 'Se requiere el ID del comprador' });
        }

        const tickets = await ticketModel.find({ purchaser: userId });

        if (!tickets || tickets.length === 0) {
            return res.status(404).json({ success: false, message: 'No se encontraron tickets para este comprador' });
        }
        const simplifiedTickets = tickets.map(ticket => ({
            _id: ticket._id,
            purchase_datetime: ticket.purchase_datetime,
            amount: ticket.amount,
            products: ticket.products.map(product => ({
                title: product.title,
                price: product.price,
                quantity: product.quantity
                
            })),
            code: ticket.code
        }));
        res.render('myshopping', { tickets: simplifiedTickets });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Error al obtener los tickets del comprador' });
    }
});


export default router;
