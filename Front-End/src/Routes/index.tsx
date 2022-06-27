import { lazy } from 'react';

//Pages
const LandingPage = lazy(() => import('../Pages/LandingPage'))
const Registration = lazy(() => import('../Pages/Registration'));
const Login = lazy(() => import('../Pages/Login'));
const Dashboard = lazy(() => import('../Pages/Dashboard'));
const TaskManagement =  lazy(() => import('../Pages/TaskManagement'));

export type IRoutes = {
    path: string,
    element: JSX.Element
}

const routes: IRoutes[] = [
    {
        path: "/task-management",
        element: < TaskManagement />
    },
    {
        path: "/dashboard",
        element: < Dashboard />
    },
    {
        path: "/signIn",
        element: < Login />
    },
    {
        path: "/register",
        element: < Registration />
    },
    {
        path: "/landing-page",
        element: <LandingPage />
    },
    {
        path: "/",
        element: <LandingPage />
    },
];

export default routes;