import { useUser } from '../context/userContext';
import React from 'react';
import { Navigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { Button } from 'react-bootstrap';

export default function AdminProtectedRoute({ children, location, ...rest }) {
    const { isLoggedIn, isAdminLogin, isDataLoading } = useUser();
    const [redirectToDefault, setRedirectToDefault] = React.useState(false);
    if (isDataLoading) {
        // Data is loading
        return <Spinner loading={true} size={100} />;
    }
    const handleRedirect = () => {
        setRedirectToDefault(true);
    };

    if (redirectToDefault) {
        return <Navigate to="/" />;
    }
    if(!isLoggedIn){
        return <Navigate to={"/login"}></Navigate>
    }
    if (!isAdminLogin) {
        // User is not an admin
        return (
            <div>
                <h1 className='text-danger'>401</h1>
                <h3>Unauthorized Access</h3>
                <p>You need admin privileges to access this page.</p>
                <Button onClick={handleRedirect}>
                    Go To Default Page
                </Button>
            </div>
        );
    }

    // User is logged in as an admin
    return children;
}
