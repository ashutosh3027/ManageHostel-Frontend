import { useUser } from '../context/userContext';
import React from 'react'
import {Navigate} from 'react-router-dom'
import Spinner from '../components/Spinner';
export default function ProtectedRoute({children, location, ...rest}) {
  const {isLoggedIn} = useUser();
  if(!isLoggedIn) return <Spinner loading={!isLoggedIn} size={100}/>;
  // if(!isLoggedIn) return null;
  return (
   isLoggedIn?(children):(<Navigate to={{pathname:"/Login", state:{from:location}}}/>)
    
  )
}
