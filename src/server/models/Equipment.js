const mongoose = require('mongoose')
const {Schema} = mongoose

const EquipmentSchema = new Schema({
    eqpNum: {
        type: String,
        index: true,
        unique: true
    },
    eqpModelYear: {
        type: Number
    },
    eqpMake: {
        type: String,
    },
    eqpEngine: { 
        type: String
    },
    eqpTypeCode: {
        type: String
    },
    facilityCode: { 
        type: String,
        index: true,
    },
    // geolocation: {

    // },
    geolocationTimestamp: {
        type: Date
    },
    reportedMissing: {
        type: Boolean
    },
    reportedMissingDate: {
        type: Date,
    },
    updatedAt: {
        type: Date
    },    
}, {
    collection: "equipment"
})


const EquipmentModel = mongoose.model('Equipment', EquipmentSchema)

module.exports = EquipmentModel