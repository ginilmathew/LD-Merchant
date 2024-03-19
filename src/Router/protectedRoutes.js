import { useEffect, useState } from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';


export const ProtectedRoute = ({  children }) => {

    const [user, setUser] = useState(true)

       if(!user){}
       return <Navigate/>
    return children;
};
