// import React, { Children } from 'react'
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from './AuthContext';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute:React.FC<ProtectedRouteProps> = ({children}) => {
    
const {user} = UserAuth()

    
if(!user  ){
    return <Navigate to='/signup' />
}else{
    return <>{children}</>;
}
}

export default ProtectedRoute
