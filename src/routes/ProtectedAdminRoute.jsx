import { Navigate } from "react-router-dom";
import useAdminAuth from "../hooks/useAdminAuth";

const ProtectedAdminRoute = ({
  children,
}) => {

  const {
    loading,
    isAuthenticated,
  } = useAdminAuth();

  // LOADING
  if (loading) {

    return (
      <div>
        Loading...
      </div>
    );
  }

  // NOT LOGGED IN
  if (!isAuthenticated) {

    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  // AUTHORIZED
  return children;
};

export default ProtectedAdminRoute;