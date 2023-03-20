import React from "react";
import { useHistory } from "react-router-dom";
import LoginForm from "pages/LoginPage/components/LoginForm";
import api from "api";

const LoginPage = (props) => {
  const history = useHistory();

  const submit = (user) =>
    api.users.login(user).then((token) => {
      props.login(token);
      history.push("/films");
    });
  return (
    <div className="ui grid">
      <div className="eight wide column">
        <LoginForm submit={submit} />
      </div>
    </div>
  );
};

export default LoginPage;
