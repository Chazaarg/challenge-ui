import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import { Container, Row, Col, Spinner } from "reactstrap";

import Auth from "./Auth";
/*================== Rutas y Esilo==================*/
import NotFound from "../components/pages/NotFound";
import Home from "../components/pages/home";
import Login from "../components/pages/login";
import Wrapper from "../components/layout/Wrapper";

class Routes extends Component {
  componentDidMount() {
    this.props.getSession();
  }

  state = {
    isAuthenticated: false //El login
  };

  static getDerivedStateFromProps(props, state) {
    const { session } = props;
    if (session === "anonymous") {
      return { isAuthenticated: false };
    } else {
      return { isAuthenticated: true };
    }
  }

  private = (Component, props) => {
    if (this.state.isAuthenticated) {
      return <Component {...props} />;
    }
    return <Redirect to="/login" />;
  };

  render() {
    const { isAuthenticated } = this.state;
    const { session } = this.props;
    const privateRoute = Component => props => {
      if (this.state.isAuthenticated) {
        return <Component {...props} />;
      }
      return <Redirect to="/login" />;
    };

    const AnonymousRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          isAuthenticated === false ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
    );
    //Espero a que cargue el usuario.
    if (session !== "anonymous" && !session.id) {
      return (
        <Container>
          <Row>
            <Col
              md={12}
              xs={12}
              lg={12}
              className="text-center"
              style={{ marginTop: 30 }}
            >
              <Spinner type="grow" color="primary" />
            </Col>
          </Row>
        </Container>
      );
    }

    return (
      <Router>
        {
          <Wrapper session={session} logout={this.props.logout}>
            <Switch>
              <Route exact path="/" render={privateRoute(Home)} />
              <AnonymousRoute path="/login" component={Login} />
              <Route render={privateRoute(NotFound)} />
            </Switch>
          </Wrapper>
        }
      </Router>
    );
  }
}

export default Auth(Routes);
