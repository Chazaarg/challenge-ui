import React, { Component } from "react";

export default function withValidation(form, WrappedComponent) {
  return class extends Component {
    state = {
      isLoading: true,
      errors: {}
    };

    componentDidMount() {
      let errors = {};
      form.map(field => {
        errors = {
          ...errors,
          [field]: {
            invalid: false,
            message: ""
          }
        };
        return null;
      });
      this.setState(
        {
          errors
        },
        this.setState({
          isLoading: false
        })
      );
    }

    clearInput = name => {
      this.setState({
        errors: {
          ...this.state.errors,
          [name]: { invalid: false, message: "" }
        }
      });
    };

    clearErrors = () => {
      let errors = {};
      form.map(field => {
        errors = {
          ...errors,
          [field]: {
            invalid: false,
            message: ""
          }
        };
        return null;
      });
      this.setState({ errors });
    };
    throwErrors = errors => {
      errors.map(error => {
        this.setState({
          errors: {
            ...this.state.errors,
            [error.field]: { invalid: true, message: error.message }
          }
        });
        return null;
      });
    };

    render() {
      const { isLoading, errors } = this.state;

      return (
        !isLoading && (
          <WrappedComponent
            validation={{
              errors,
              throwErrors: this.throwErrors,
              clearErrors: this.clearErrors,
              clearInput: this.clearInput
            }}
            {...this.props}
          />
        )
      );
    }
  };
}
