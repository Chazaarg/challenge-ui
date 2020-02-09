import React, { Component } from "react";

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
    password: ""
  };
  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };
  handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.login({ email, password });
  };
  render() {
    const { nextStep } = this.props;
    const { email, password } = this.state;
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
          <form
            className="form text-center"
            onSubmit={this.handleSubmit}
            method="POST"
          >
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
              <div className="invalid-feedback">
                Errors in password during form validation, also add .is-invalid
                class to the input fields
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
    password: ""
  };
  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };
  render() {
    const { prevStep } = this.props;
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
          <form className="form text-center" action="#" method="POST">
            <div className="form-group input-group-md">
              <input
                type="email"
                className="form-control"
                id="email"
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
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
              />
              <div className="invalid-feedback">
                Errors in password during form validation, also add .is-invalid
                class to the input fields
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
