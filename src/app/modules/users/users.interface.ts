import { HydratedDocument, Model } from 'mongoose'

export interface IUser {
  id: string
  role: string
  password: string
}

export interface IUserMethods {
  fullName(): string
}

export interface IUserModel extends Model<IUser, object, IUserMethods> {
  createWithFullName(
    name: string,
  ): Promise<HydratedDocument<IUser, IUserMethods>>
}
