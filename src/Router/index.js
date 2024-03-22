import { createBrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../screen/auth/Login";
import ForgetPassword from "../screen/auth/ForgetPassword";
import NotFound from "../screen/NotFound";
import { Suspense, lazy } from "react";
import CustomLoader from "../components/common/CustomLoader";
import PostManagement from "../screen/PostManagement";
import ProfileScreen from "../screen/Profile";
import { PostEditView } from "../components/PostMangement/PostEditView";
import Register from "../screen/auth/Register";
import ProtectedRouter from "./protectedRoutes";




const LoginLayout = lazy(() => import('../components/LoginAdminLayout'));
const HomeLayout = lazy(() => import('../components/HomeAdminLayout'));

export const router = createBrowserRouter([
    {
        errorElement: <NotFound />,
        path: "/login",
        element: <Suspense fallback={<CustomLoader text="Loading..." />}><LoginLayout /></Suspense>,
        children: [
            {
                index: true,
                element: <Login />,
            },
        ],
    },
    {
        errorElement: <NotFound />,
        path: "/forgetpassword",
        element: <Suspense fallback={<CustomLoader text="Loading..." />}><LoginLayout /></Suspense>,
        children: [
            {
                index: true,
                element: <ForgetPassword />,
            },
        ],
    },
    {
        errorElement: <NotFound />,
        path: "/register",
        element: <Suspense fallback={<CustomLoader text="Loading..." />}><LoginLayout /></Suspense>,
        children: [
            {
                index: true,
                element: <Register />,
            },
        ],
    },
    {
        errorElement: <NotFound />,
        path: "/",
        element: (
            <Suspense fallback={<CustomLoader text="Loading..." />}>
                <ProtectedRouter>
                    <HomeLayout />
                </ProtectedRouter>
            </Suspense>
        ),
        children: [
            {
                index: true,
                element: <PostManagement />,
            },
            {
                path: 'postadd',
                element: <PostEditView />,
            },
            {
                path: 'postEdit/:postId',
                element: <PostEditView />,
            },
            {
                path: 'postView/:postId',
                element: <PostEditView />,
            },
            {
                path: 'profile',
                element: <ProfileScreen />,
            },
        ],
    }
]);
