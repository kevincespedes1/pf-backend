import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

mongoose.pluralize(null)

const collection = 'users'

const schema = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String, unique: true },
    age: { type: Number },
    gender: { type: String },
    password: { type: String },
    cart: { type: [ { productId: mongoose.Schema.Types.ObjectId, quantity: Number } ], ref: 'products' },
    rol: { type: String,enum: ['usuario', 'premium', 'admin'], default: 'usuario' },
    documents: {
        identification: {
            name: String,
            reference: String
        },
        proof_of_address: {
            name: String,
            reference: String
        },
        bank_statement: {
            name: String,
            reference: String
        }
    },    last_connection: { type: String, default: Date.now } 
});

schema.pre('save', function(next) {
    if (!this.cart || !Array.isArray(this.cart)) {
        this.cart = []; 
    }
    next();
});

schema.pre("findOne", function () {
    this.populate("cart.productId");
});
schema.plugin(mongoosePaginate)

export default mongoose.model(collection, schema)
