let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

let userSchema = new Schema({
    fullname: String,
    age:      Number,
    createAt: { type: Date, default: Date.now },
    /**
     * false: inActive
     * true: active
     */
    isActive: { type: Boolean, default: false }
});

// transaction_buy_pricing
// category => categories
let User = mongoose.model('user', userSchema);
exports.USER_MODEL = User;