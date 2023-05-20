import { ServerError, BadRequestError, UnauthenticatedError, NotFoundError } from '../errors'

type Controller = (...args: any[]) => Promise<void>

const asyncWrapper = (controller: Controller) => {
  return async (...args: any[]) => {
    try {
      await controller(...args)
    } catch (error) {
      if (error instanceof BadRequestError || error instanceof UnauthenticatedError || error instanceof NotFoundError) {
        throw error
      } else {
        throw new ServerError('Server Error')
      }
    }
  }
}

export default asyncWrapper
