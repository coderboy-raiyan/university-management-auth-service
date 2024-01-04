import { RequestHandler } from 'express';
import academicSemesterServices from './academicSemester.services';

const createSemesterController: RequestHandler = async (req, res, next) => {
    try {
        const { ...academicSemesterData } = req.body;
        const result = await academicSemesterServices.createSemester(academicSemesterData);
        return res.status(200).json({
            success: true,
            message: 'Academic semester is created successfully',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const academicSemesterControllers = {
    createSemesterController,
};

export default academicSemesterControllers;
