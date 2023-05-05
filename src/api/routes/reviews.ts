import { Router } from 'express'
import verifyToken from '../../middlewares/admin-auth'

const reviewsRouter = Router()

reviewsRouter.get('/', () => {
  // fetch reviews
})

reviewsRouter.post('/', verifyToken, () => {
  // create review
})

reviewsRouter.get('/:slug', () => {
  // fetch review
})

reviewsRouter.put('/:id', verifyToken, () => {
  // update review
})

reviewsRouter.delete('/:id', verifyToken, () => {
  // delete review
})

reviewsRouter.post('/:id/publish', verifyToken, () => {
  // publish review
})

reviewsRouter.post('/:id/unpublish', verifyToken, () => {
  // unpublish review
})

export default reviewsRouter

