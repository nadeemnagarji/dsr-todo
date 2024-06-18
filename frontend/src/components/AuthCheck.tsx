import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withAuthRedirect = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const WithAuthRedirect = (props) => {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
      if (!accessToken) {
        navigate("/login");
      }
    }, [accessToken, navigate]);

    return accessToken ? <WrappedComponent {...props} /> : null;
  };

  return WithAuthRedirect;
};

export default withAuthRedirect;
