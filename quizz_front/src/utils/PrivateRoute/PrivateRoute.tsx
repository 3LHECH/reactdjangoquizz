import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../AuthContext/AuthContext'; // adjust the path as needed

const PrivateRoute = () => {
    const { user } = useContext(AuthContext);
    console.log(user);
    return user.exist ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
