// import React, { Children } from 'react'
import { Navigate } from 'react-router-dom'
import { UserAuth } from './AuthContext'
import { ReactNode } from 'react';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute:React.FC<ProtectedRouteProps> = ({children}) => {
const {user}:any = UserAuth()

if(!user){
    return <Navigate to='/signup' />
}else{
    return <>{children}</>;
}
}

export default ProtectedRoute
