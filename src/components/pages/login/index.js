import React, { Component } from "react";
import axios from "axios";
export default class Login extends Component {
  state = {
    step: 1
  };

  displayScreen = () => {
    switch (this.state.step) {
      case 1:
        return (
          <LoginForm
            login={this.props.auth.login}
            nextStep={this.nextStep}
          ></LoginForm>
        );
      case 2:
        return (
          <RegisterForm
            getSession={this.props.auth.getSession}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
          ></RegisterForm>
        );
      case 3:
        return (
          <Success nextStep={this.nextStep} prevStep={this.prevStep}></Success>
        );

      default:
        break;
    }
  };
  nextStep = () => {
    this.setState({
      step: this.state.step + 1
    });
  };
  prevStep = () => {
    this.setState({
      step: this.state.step - 1
    });
  };
  render() {
    return (
      <div className="container mt-2">
        <div className="row justify-content-center align-items-center text-center p-2">
          <div className="m-1 col-sm-8 col-md-6 col-lg-4 shadow-sm p-3 mb-5 bg-white border rounded">
            {this.displayScreen()}{" "}
          </div>
        </div>
      </div>
    );
  }
}

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    error: ""
  };
  handleChange = ({ target }) => {
    this.setState({ error: "", [target.name]: target.value });
  };
  handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    let res = await this.props.login({ email, password });
    if (res.type === "error") {
      this.setState({ error: res.message });
    }
  };
  render() {
    const { nextStep } = this.props;
    const { email, password, error } = this.state;
    return (
      <React.Fragment>
        <div className="pt-5 pb-5">
          <img
            className="rounded mx-auto d-block"
            src="https://freelogovector.net/wp-content/uploads/logo-images-13/microsoft-cortana-logo-vector-73233.png"
            alt=""
            style={{ width: "70px", height: "70px" }}
          />
          <p className="text-center text-uppercase mt-3">Login</p>
          <form className="form text-center" onSubmit={this.handleSubmit}>
            <div className="form-group input-group-md">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                aria-describedby="emailHelp"
                onChange={this.handleChange}
                placeholder="Enter email"
              />
              <div className="invalid-feedback">
                Errors in email during form validation, also add .is-invalid
                class to the input fields
              </div>
            </div>
            <div className="form-group input-group-md">
              <input
                type="password"
                name="password"
                value={password}
                className="form-control"
                onChange={this.handleChange}
                placeholder="Password"
              />
              <div className={`invalid-feedback ${error && "d-block"}`}>
                {error}
              </div>
            </div>
            <button
              className="btn btn-lg btn-block btn-primary mt-4"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
        <p
          className="text-center d-block mt-2 text-primary"
          style={{ cursor: "pointer" }}
          onClick={() => nextStep()}
        >
          ¿Crear una cuenta?
        </p>
      </React.Fragment>
    );
  }
}

class RegisterForm extends Component {
  state = {
    email: "",
    name: "",
    lastname: "",
    password: "",
    error: ""
  };
  handleSubmit = async e => {
    e.preventDefault();
    const res = await axios.post("http://localhost:3002/users", this.state);
    if (res.data.type === "error") {
      this.setState({
        error: res.data.message
      });

      return;
    } else if (res.data.type === "success")
      return this.props.getSession(res.data.token);

    this.setState({
      error: "Ha habido un error inesperado"
    });
    return;
  };
  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value, error: "" });
  };
  render() {
    const { prevStep } = this.props;
    const { password, email, lastname, name, error } = this.state;
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
          <form className="form text-center" onSubmit={this.handleSubmit}>
            <div className="form-group input-group-md">
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={this.handleChange}
                id="email"
                name="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
              <div className="invalid-feedback">
                Errors in email during form validation, also add .is-invalid
                class to the input fields
              </div>
            </div>
            <div className="form-group input-group-md">
              <input
                type="name"
                className="form-control"
                onChange={this.handleChange}
                value={name}
                id="name"
                name="name"
                aria-describedby="nameHelp"
                placeholder="Ingresar nombre"
              />
              <div className="invalid-feedback">
                Errors in email during form validation, also add .is-invalid
                class to the input fields
              </div>
            </div>
            <div className="form-group input-group-md">
              <input
                type="lastname"
                className="form-control"
                value={lastname}
                id="lastname"
                name="lastname"
                onChange={this.handleChange}
                aria-describedby="lastnameHelp"
                placeholder="Ingresar apellido"
              />
              <div className="invalid-feedback">
                Errors in email during form validation, also add .is-invalid
                class to the input fields
              </div>
            </div>
            <div className="form-group input-group-md">
              <input
                type="password"
                name="password"
                onChange={this.handleChange}
                className="form-control"
                value={password}
                id="password"
                placeholder="Contraseña"
              />
              <div className={`invalid-feedback ${error && "d-block"}`}>
                {error}
              </div>
            </div>
            <button
              className="btn btn-lg btn-block btn-primary mt-4"
              type="submit"
            >
              Registrarme
            </button>
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

function Success() {
  return <div>Registrado con exito</div>;
}
