import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import UserModel from './user.model';
import { generateUserId } from './user.utils';

const createUser = async (user: IUser): Promise<IUser | null> => {
    const created_User = new UserModel(user);
    if (!created_User) {
        throw new Error('Failed to create user');
    }
    if (!user.password) {
        created_User.password = config.default_student_pass as string;
    }
    const autoIncrementalId = await generateUserId();
    created_User.id = autoIncrementalId;
    await created_User.save();
    if (!created_User) {
        throw new ApiError(500, 'Failed to create user');
    }
    return created_User;
};

const userServices = {
    createUser,
};

export default userServices;
