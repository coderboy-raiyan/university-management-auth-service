import UserModel from './users.model'

async function findTheLastUserId() {
  const lastUserId = await UserModel.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()
  return lastUserId?.id
}

export async function generateUserId() {
  let lastId = (await findTheLastUserId()) || (0).toString().padStart(5, '0')
  lastId = (parseInt(lastId) + 1).toString().padStart(5, '0')
  return lastId
}
