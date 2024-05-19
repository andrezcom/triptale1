import express from 'express'
import * as placesController from '../controllers/placesController'

const placesRoutes = express.Router()

placesRoutes.get('/', placesController.getAllPlacesController)
placesRoutes.get('/:id', placesController.getPlaceByIdController)
placesRoutes.delete('/:id', placesController.deletePlaceController)
placesRoutes.post('/newplace', placesController.createPlaceController)
placesRoutes.put('/editplace', placesController.editPlaceController)
placesRoutes.post('/nearestplaces', placesController.nearestPlacesServiceController)
placesRoutes.get('/memoryplaces', placesController.memoryPlaceController)

export default placesRoutes
