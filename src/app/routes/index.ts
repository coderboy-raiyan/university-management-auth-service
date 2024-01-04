import { Router } from 'express';
import academicSemesterRoutes from '../modules/academic_semester/academicSemester.route';
import userRoutes from '../modules/user/user.routes';

const routes = Router();

const moduleRoutes = [
    {
        path: '/users',
        route: userRoutes,
    },
    {
        path: '/academic-semesters',
        route: academicSemesterRoutes,
    },
];

moduleRoutes.forEach(router => {
    routes.use(router.path, router.route);
});

export default routes;
