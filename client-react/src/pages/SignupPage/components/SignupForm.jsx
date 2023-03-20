import { Component } from "react";
import { Link } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import equals from "validator/lib/equals";
import FormMessage from "components/FormMessage";

const initialData = {
  email: "",
  password: "",
  passwordConfirmation: "",
};

class SignupForm extends Component {
  state = {
    data: initialData,
    errors: {},
    loading: false,
  };
  handleChange = (e) =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
      errors: { ...this.state.errors, [e.target.name]: "" },
    });

  validate(data) {
    const errors = {};
    if (!isEmail(data.email)) errors.email = "Wrong email";
    if (!data.password) errors.password = "Password cannot be blank";

    if (!equals(data.password, data.passwordConfirmation))
      errors.password = "Password is not equals confirmation";
    return errors;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch((error) =>
          this.setState({ errors: error.response.data.errors, loading: false })
        );
    }
  };

  render() {
    const { data, errors, loading } = this.state;
    const cls = loading ? "ui form loading" : "ui form";
    return (
      <form className={cls} onSubmit={this.handleSubmit}>
        <div className={errors.email ? "error field" : "field"}>
          <label htmlFor="email">Email</label>
          <input
            value={data.email}
            onChange={this.handleChange}
            type="text"
            name="email"
            id="email"
            placeholder="Email"
          />
          {errors.email && <FormMessage>{errors.email}</FormMessage>}
        </div>

        <div className={errors.password ? "error field" : "field"}>
          <label htmlFor="password">Password</label>
          <input
            value={data.password}
            onChange={this.handleChange}
            type="text"
            name="password"
            id="password"
            placeholder="password"
          />
          {errors.password && <FormMessage>{errors.password}</FormMessage>}
        </div>

        <div className={errors.passwordConfirmation ? "error field" : "field"}>
          <label htmlFor="passwordConfirmation">Password Confirmation</label>
          <input
            value={data.passwordConfirmation}
            onChange={this.handleChange}
            type="text"
            name="passwordConfirmation"
            id="passwordConfirmation"
            placeholder="password confirmation"
          />
          {errors.passwordConfirmation && (
            <FormMessage>{errors.passwordConfirmation}</FormMessage>
          )}
        </div>

        <div className="ui fluid buttons">
          <button className="ui button primary">Sing Up</button>
          <div className="or" />
          <Link to="/" className="ui button">
            Cancel
          </Link>
        </div>
      </form>
    );
  }
}

export default SignupForm;
