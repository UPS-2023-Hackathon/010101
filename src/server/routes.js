const express = require('express')
const mongoose = require('mongoose')
const Equipment = require('./models/Equipment')
const User = require('./models/User')
const EquipmentGeolocation = require('./models/EquipmentGeolocation')
const _ = require('lodash')
const config = require('./config')


const router = express.Router()
const {httpCodes} = config

router.post('/auth.login', async (req, res, next) => { 
    const {username, password} = req.body
    console.log(username, password)
    try { 
        const user = await User.findOne({username})
        if (_.isEmpty(user)) { 
            return res.status(httpCodes.notFound).end()
        }
        if (user.password === password) { 
            res.json({success: true})
        } else { 
            res.status(httpCodes.unauthorized).end()
        }
    } catch (err) { 
        next(err)
    }
})

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
        if (!_.isEmpty(eqp.geolocation) && !_.isEmpty(eqp.geolocation.coordinates)) {
            res.json({
                location: eqp.geolocation,
                timestamp: eqp.geolocationTimestamp
            })             
        } else { 
            const lastRecordFound = await EquipmentGeolocation
                .findOne({equipId: eqp.eqpNum})
                .sort('-createdAt')

            // Not found geolocation data
            if (_.isEmpty(lastRecordFound)) {                
                return res.status(httpCodes.successNoContent).end()
            }

            // Patch the equipment document with the geolocation here
            eqp.geolocation = lastRecordFound.loc
            eqp.geolocationTimestamp = lastRecordFound.createdAt
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
router.get('/equipment.query', async (req, res, next) => { 
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


// Report the equipment is missing
router.post('/equipment.reportMissing', async (req, res, next) => { 
    const {eqpId, username, location} = req.body
    const [lat, long] = location || []
    try { 

        if (!mongoose.Types.ObjectId.isValid(eqpId))
                return next(new Error('Invalid identifier'))

        const eqpUpdated = await Equipment.findByIdAndUpdate(eqpId, { 
            $set: {
                reportedMissing: true,
                reportedMissingDate: new Date(),
                reportedMissingByUser: username,
                "geolocation.coordinates": [long, lat],
                geolocationTimestamp: new Date(),
                lastUpdated: new Date()
            }
        }, {new: true})

        if (_.isEmpty(eqpUpdated)) { 
            return res.status(httpCodes.notFound)
                    .json({
                        message: "Equipment not found"
                    })
        }

        res.json({
            success: true,
            message: "Succesfully reported equipment missing"
        })

    } catch (e) { 
        next(e)
    }    
})

module.exports = router