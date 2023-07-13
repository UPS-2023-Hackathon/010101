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
    // loc: {
    //     type: "Point",
    // },  
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