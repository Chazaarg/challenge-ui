import React from "react";
import axios from "axios";

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();

  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export default function Auth(WrappedComponent) {
  return class extends React.Component {
    state = {
      session: {},
      token: getCookie("token")
    };
    getSession = async () => {
      try {
        const res = await axios.get("http://localhost:3002/session", {
          headers: {
            Authorization: this.state.token
          }
        });
        this.setState({ session: res.data });
        let session = {
          id: 1,
          name: "admin",
          lastname: "admin",
          email: "admin@admin.com"
        };
      } catch (error) {
        this.setState({ session: "anonymous" });
      }
    };

    login = async credentials => {
      try {
        const loginResponse = await axios.post(
          "http://localhost:3002/login",
          credentials
        );
        setCookie("token", loginResponse.data.token, 1);

        const res = await axios.get("http://localhost:3002/session", {
          headers: {
            Authorization: loginResponse.data.token
          }
        });

        this.setState({ session: res.data });
        return {
          type: "success",
          message: "Ingresó con éxito."
        };
      } catch (error) {
        if (error.request.status === 401) {
          return {
            type: "error",
            message: error.response.data.message
          };
        }
        return {
          type: "error",
          message: "Ha habido un error."
        };
      }
    };
    logout = () => {
      setCookie("token", null);

      this.setState({
        session: "anonymous"
      });
    };
    render() {
      const { session } = this.state;
      return (
        <WrappedComponent
          session={session}
          getSession={this.getSession}
          login={this.login}
          {...this.props}
        />
      );
    }
  };
}
