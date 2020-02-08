import React, { Component } from "react";

export default class Login extends Component {
  state = {
    step: 1
  };

  displayScreen = () => {
    switch (this.state.step) {
      case 1:
        return <LoginForm nextStep={this.nextStep}></LoginForm>;

      default:
        break;
    }
  };
  nextStep = () => {
    this.setState({
      step: this.state.step + 1
    });
  };
  render() {
    return this.displayScreen();
  }
}

const LoginForm = ({ nextStep }) => {
  return (
    <div class="container mt-2">
      <div class="row justify-content-center align-items-center text-center p-2">
        <div class="m-1 col-sm-8 col-md-6 col-lg-4 shadow-sm p-3 mb-5 bg-white border rounded">
          <div class="pt-5 pb-5">
            <img
              class="rounded mx-auto d-block"
              src="https://freelogovector.net/wp-content/uploads/logo-images-13/microsoft-cortana-logo-vector-73233.png"
              alt=""
              style={{ width: "70px", height: "70px" }}
            />
            <p class="text-center text-uppercase mt-3">Login</p>
            <form class="form text-center" action="#" method="POST">
              <div class="form-group input-group-md">
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
                <div class="invalid-feedback">
                  Errors in email during form validation, also add .is-invalid
                  class to the input fields
                </div>
              </div>
              <div class="form-group input-group-md">
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="Password"
                />
                <div class="invalid-feedback">
                  Errors in password during form validation, also add
                  .is-invalid class to the input fields
                </div>
              </div>
              <button
                class="btn btn-lg btn-block btn-primary mt-4"
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
          <p
            class="text-center d-block mt-2 text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => nextStep()}
          >
            Create an account?{" "}
          </p>
        </div>
      </div>
    </div>
  );
};
