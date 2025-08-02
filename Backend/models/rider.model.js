const mongoose = require('mongoose');




const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Captain',
    },
    pickup: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    fare:{
        type: Number,
        required: false
    },
    status:{
        type: String,
        enum: ['pending', 'accepted', 'in-progress', 'completed', 'cancelled'],
        default: 'pending'
    },
    duration:{
        type: Number,
        required: false
    },
    distance:{
        type: Number,
        required: false
    },
    paymentID: {
        type: String,
    
    },
    orderID:{
        type: String,
    },
    sinature:{
        type: String,
    },
    otp:{
        type: Number,
        select:false,
    }
});
module.exports = mongoose.model('Ride', rideSchema);