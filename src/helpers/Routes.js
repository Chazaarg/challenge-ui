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
import NewMeetup from "../components/pages/meetups/new";
import Wrapper from "../components/layout/Wrapper";
import Meetup from "../components/pages/meetup";

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

  render() {
    const { isAuthenticated } = this.state;
    const { session } = this.props;
    const privateRoute = Component => props => {
      if (this.state.isAuthenticated) {
        return <Component {...props} auth={{ ...this.props }} />;
      }
      return <Redirect to="/login" />;
    };

    const AnonymousRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          isAuthenticated === false ? (
            <Component {...props} auth={{ ...this.props }} />
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
              <Route
                exact
                path="/meetups/new"
                render={privateRoute(NewMeetup)}
              />
              <Route
                exact
                path="/meetups/:meetup_id"
                render={privateRoute(Meetup)}
              />

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
