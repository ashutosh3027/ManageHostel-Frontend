import { useUser } from '../context/userContext';
import React, {useState} from 'react'
import { Navigate } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import Spinner from '../components/Spinner';
export default function ProtectedRoute({ children, location, ...rest }) {
  const { isLoggedIn, isDataLoading, isAdminLogin } = useUser();
  const [redirectToDefault, setRedirectToDefault] = useState(false);
  if (isDataLoading) return <Spinner loading={isLoggedIn} size={100} />;
  const handleRedirect = () => {
    setRedirectToDefault(true);
  };
  if (redirectToDefault) {
    return <Navigate to="/" />;
  }
  if (isAdminLogin) {
    // User is not an admin
    return (
      <div>
        <h1 className='text-danger'>401</h1>
        <h3>Unauthorized Access</h3>
        <p>You need user privileges to access this page.</p>
        <Button onClick={handleRedirect}>
          Go To Default Page
        </Button>
      </div>
    );
  }

  return (
    isLoggedIn ? (children) : (<Navigate to={{ pathname: "/Login", state: { from: location } }} />)

  )
}
