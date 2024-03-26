import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
mongoose.pluralize(null)

const collection = 'Ticket';

const schema = new mongoose.Schema({
    code: { type: String, default: () => bcrypt.genSaltSync(8) },
    purchase_datetime: { type: String, default: new Date().toISOString() },
    amount: { type: Number, default: 0 },
    purchaser: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' },
    products: [{
        title: { type: String },
        price: { type: Number },
        quantity: { type: Number }
    }]
});

export default mongoose.model(collection, schema);