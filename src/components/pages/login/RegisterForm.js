import React, { Component } from "react";
import withValidation from "../../../helpers/withValidation";
import axios from "axios";
import { Input, FormText, Button } from "reactstrap";

class RegisterForm extends Component {
  state = {
    email: "",
    name: "",
    lastname: "",
    password: "",
    loading: false
  };
  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    const res = await axios.post(
      "https://meetapp-challenge.herokuapp.com/users",
      this.state
    );
    this.setState({ loading: false });
    if (res.data.type === "error") {
      this.props.validation.throwErrors(res.data.errors);
      return;
    } else if (res.data.type === "success")
      return this.props.getSession(res.data.token);

    return;
  };
  handleChange = ({ target }) => {
    this.props.validation.clearInput(target.name);
    this.setState({ [target.name]: target.value });
  };
  render() {
    const { prevStep } = this.props;
    const { errors } = this.props.validation;
    const { password, email, lastname, name } = this.state;
    return (
      <React.Fragment>
        <div className="pt-5 pb-5">
          <img
            className="rounded mx-auto d-block"
            src="https://freelogovector.net/wp-content/uploads/logo-images-13/microsoft-cortana-logo-vector-73233.png"
            alt=""
            style={{ width: "70px", height: "70px" }}
          />
          <p className="text-center text-uppercase mt-3">Registrarme</p>
          <form
            noValidate
            className="form text-center"
            onSubmit={this.handleSubmit}
          >
            <div className="form-group input-group-md">
              <Input
                type="email"
                className="form-control"
                value={email}
                onChange={this.handleChange}
                id="email"
                invalid={errors.email.invalid}
                name="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />

              {errors.email.invalid && (
                <FormText color="danger">{errors.email.message}</FormText>
              )}
            </div>
            <div className="form-group input-group-md">
              <Input
                type="name"
                className="form-control"
                onChange={this.handleChange}
                invalid={errors.name.invalid}
                value={name}
                id="name"
                name="name"
                aria-describedby="nameHelp"
                placeholder="Ingresar nombre"
              />
              {errors.name.invalid && (
                <FormText color="danger">{errors.name.message}</FormText>
              )}
            </div>
            <div className="form-group input-group-md">
              <Input
                type="lastname"
                className="form-control"
                invalid={errors.lastname.invalid}
                value={lastname}
                id="lastname"
                name="lastname"
                onChange={this.handleChange}
                aria-describedby="lastnameHelp"
                placeholder="Ingresar apellido"
              />
              {errors.name.invalid && (
                <FormText color="danger">{errors.lastname.message}</FormText>
              )}
            </div>
            <div className="form-group input-group-md">
              <Input
                type="password"
                name="password"
                invalid={errors.password.invalid}
                onChange={this.handleChange}
                className="form-control"
                value={password}
                id="password"
                placeholder="Contraseña"
              />
              {errors.password.invalid && (
                <FormText color="danger">{errors.password.message}</FormText>
              )}
            </div>
            <Button
              className="btn btn-lg btn-block btn-primary mt-4"
              type="submit"
              disabled={this.state.loading}
            >
              Registrarme
            </Button>
          </form>
        </div>
        <p
          className="text-center d-block mt-2 text-primary"
          style={{ cursor: "pointer" }}
          onClick={() => prevStep()}
        >
          Volver
        </p>
      </React.Fragment>
    );
  }
}
let form = ["password", "email", "name", "lastname"];

export default withValidation(form, RegisterForm);
