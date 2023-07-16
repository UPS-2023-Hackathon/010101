const mongoose = require('mongoose')
const {Schema} = mongoose

const FacilitySchema = new Schema({
    name: {
        type: String,
    },
    geofence: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Polygon'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [[[Number]]],
            required: true,
            index: true
        }
    },  
}, {
    collection: "facilities"
})


const FacilityModel = mongoose.model('Facility', FacilitySchema)

module.exports = FacilityModel