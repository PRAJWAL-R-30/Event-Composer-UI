import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector} from "react-redux";

function PrivateRoute({ element: Element }) {

  // Add your own authentication on the below line.
  const {userToken} = useSelector(state => state.user);

  return userToken? <Element /> : <Navigate to="/login" state={{source: Element}} />;
}

export default PrivateRoute;