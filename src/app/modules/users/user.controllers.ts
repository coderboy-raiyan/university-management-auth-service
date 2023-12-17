import { Request, Response } from 'express'
import userServices from './user.services'

const createUserController = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    const result = await userServices.createUser(user)
    return res.status(200).json({
      success: true,
      message: 'User created successfully',
      user: result,
    })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ success: false, message: 'Internal server error' })
  }
}

export default {
  createUserController,
}
