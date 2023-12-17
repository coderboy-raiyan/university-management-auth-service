import config from '../../../config'
import { generateUserId } from './user.utils'
import { IUser } from './users.interface'
import UserModel from './users.model'

const createUser = async (user: IUser): Promise<IUser | null> => {
  const created_User = new UserModel(user)
  if (!created_User) {
    throw new Error('Failed to create user')
  }
  if (!user.password) {
    created_User.password = config.default_student_pass as string
  }
  const autoIncrementalId = await generateUserId()
  created_User.id = autoIncrementalId
  await created_User.save()
  return created_User
}

export default {
  createUser,
}
