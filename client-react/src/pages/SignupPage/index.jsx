import React from "react";
import { useHistory } from "react-router-dom";
import SignupForm from "pages/SignupPage/components/SignupForm";
import api from "api";

const SignupPage = (props) => {
  const history = useHistory();

  const submit = (user) =>
    api.users.create(user).then(() => {
      props.setMessage("User has been created");
      history.push("/login");
    });

  return (
    <div className="ui grid">
      <div className="eight wide column">
        <SignupForm submit={submit} />
      </div>
    </div>
  );
};

export default SignupPage;
