const mongoose = require('mongoose')
const {Schema} = mongoose

const EquipmentGeolocationSchema = new Schema({
    equipId: {
        type: String,
        index: true
    },
    manuallyRecorder: {
        type: Boolean
    },
    isDirty: {
        type: Boolean,
        index: true
    },
    facilityCode: {
        type: String,
        index: true
    },
    loc: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true,
            index: true
        }
    },  
    createdAt: {
        type: Date,
        default: Date.now,
        index: true
    }
}, {
    collection: "equipment_geolocation"
})


const EquipmentGeolocationModel = mongoose.model('EquipmentGeolocation', EquipmentGeolocationSchema)

module.exports = EquipmentGeolocationModel