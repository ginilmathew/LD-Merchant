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
import { ProtectedRoute } from "./protectedRoutes";



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
                <ProtectedRoute>
                    <HomeLayout/>
                </ProtectedRoute>
            </Suspense>
        ),
        children: [
            {
                index: true,
                element: <ProtectedRoute> <PostManagement /></ProtectedRoute>,
            },
            {
                path: 'postadd',
                element: <ProtectedRoute><PostEditView /></ProtectedRoute>,
            },
            {
                path: 'postEdit/:postId',
                element: <ProtectedRoute><PostEditView /></ProtectedRoute>,
            },
            {
                path: 'postView/:postId',
                element: <ProtectedRoute> <PostEditView /></ProtectedRoute>,
            },
            {
                path: 'profile',
                element: <ProtectedRoute> <ProfileScreen /></ProtectedRoute>,
            },
        ],
    }
]);
