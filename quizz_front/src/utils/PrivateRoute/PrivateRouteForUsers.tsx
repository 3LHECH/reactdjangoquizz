import {useAppSelector } from "../../app/hooks";
import { Navigate,Outlet  } from 'react-router-dom';

const PrivateRouteForUsers = () => {
    const user = useAppSelector((state)=> state.user);
    return user.exist ?  <Navigate to="/" />:<Outlet /> ;
};
export default PrivateRouteForUsers;