import React, { useContext, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";

// import { useFormContext } from "react-hook-form";
// import Spinner from "../../layout/Spinner";

import AuthContext from "../../../../context/auth/authContext";

// import UserContext from "../../../context/user/userContext";

import SummaryTable from "../tables/SummaryTable";

const ConfirmForm = (props) => {
  // const { control, setValue } = useFormContext();
  const authContext = useContext(AuthContext);
  const { isAuthenticated, verifyToken, isGuest } = authContext;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated | isGuest) {
      navigate("/");
    } else {
      verifyToken();
    }
    // eslint-disable-next-line
  }, [isAuthenticated, isGuest]);
  return (
    <Fragment>
      <SummaryTable props={props.data} />
    </Fragment>
  );
};
export default ConfirmForm;
