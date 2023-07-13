const express = require('express')
const { default: mongoose } = require('mongoose')
const Equipment = require('./models/Equipment')
const EquipmentGeolocation = require('./models/EquipmentGeolocation')
const _ = require('lodash')
const config = require('./config')


const router = express.Router()
const {httpCodes} = config

// Locate Equipment
router.get('/equipment.locate', async (req, res, next) => { 
    const {q: query, id} = req.query
    let eqp
    try { 

        if (id) {
            if (!mongoose.Types.ObjectId.isValid(id))
                return next(new Error('Invalid identifier'))

            eqp = await Equipment.findById(id)
        } else { 
            eqp = await Equipment.findOne({
                eqpNum: query
            })
        }

        if (_.isEmpty(eqp)) { 
            return res
                .status(httpCodes.notFound)
                .json({
                    message: "Equipment not found"
                })
        }

        // Check if equipment document contains geolocation data
        // If it doesn't, look in the geolocation collection to find its last recorded location
        // If geolocation found in the log, update the document with the last geolocation data found
        if (eqp.geolocation) {
            res.json({
                location: eqp.geolocation,
                timestamp: eqp.geolocationTimestamp
            })             
        } else { 
            const lastRecordFound = await EquipmentGeolocation
                .find({equipId: eqp.eqpNum})
                .sort('-createdAt')
                .limit(1)

            // Not found geolocation data
            if (_.isEmpty(lastRecordFound)) {                
                return res.status(httpCodes.successNoContent).end()
            }

            // TODO: UPdate the location here
            eqp.geolocation = { 
                // UPdate the location here
            }
            await eqp.save()

            // Success
            res.json({
                location: lastRecordFound.loc,
                timestamp: lastRecordFound.createdAt
            })

        }

       
    } catch (e) { 
        next(e)
    }
    
})

// Query the Equipment details
router.get('/equipment.queryDetails', async (req, res, next) => { 
    const {q: query, id} = req.query
    let eqp
    try { 
        if (id) {
            if (!mongoose.Types.ObjectId.isValid(id))
                return next(new Error('Invalid identifier'))

            eqp = await Equipment.findById(id)
        } else { 
            eqp = await Equipment.findOne({
                eqpNum: query
            })
        }
       
        if (_.isEmpty(eqp)) { 
            return res.status(httpCodes.notFound)
            .json({
                message: "Equipment not found"
            })
        }
        res.json({
            data: eqp
        })
    } catch (e) { 
        next(e)
    }
    
})

module.exports = router