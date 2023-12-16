import mongoose from 'mongoose'
import { IUser, IUserMethods, IUserModel } from './users.interface'

const userSchema = new mongoose.Schema<IUser, IUserModel, IUserMethods>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    roll: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

const UserModel = mongoose.model<IUser, IUserModel>('User', userSchema)

export default UserModel
