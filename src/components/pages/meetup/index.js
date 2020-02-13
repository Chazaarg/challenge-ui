import React, { Component } from "react";
import {
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  Alert,
  ListGroup,
  ListGroupItem,
  Spinner
} from "reactstrap";
import axios from "axios";
import moment from "moment";
import "moment/locale/es";
export default class Meetup extends Component {
  state = {
    meetup: {},
    loading: true,
    notFound: false
  };
  handleInscribe = async () => {
    let res = await axios.post(
      `http://localhost:3002/meetups/${this.state.meetup.id}/inscriptions`,
      {
        headers: {
          Authorization: this.props.auth.getToken()
        }
      }
    );
    this.setState({
      meetup: {
        ...this.state.meetup,
        inscripted: true
      }
    });
  };
  componentDidMount = async () => {
    const token = this.props.auth.getToken();
    let meetup_id = this.props.match.params.meetup_id;
    let meetup = {};
    try {
      meetup = await axios.get(`http://localhost:3002/meetups/${meetup_id}`, {
        headers: { Authorization: token }
      });
      meetup = meetup.data;
    } catch (error) {
      this.setState({ notFound: true });
      return;
    }
    let res = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/e04a6cf97f5c67d1d77db985546d31f6/-34.603683,-58.381557,${meetup.date}T${meetup.time}?lang=es&units=auto`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      }
    );

    meetup.temperature = res.data.currently.temperature;
    this.setState({ meetup, loading: false });
  };

  getBirras = () => {
    const { meetup } = this.state;
    let birras = 0;
    if (meetup.temperature < 20) {
      birras = 0.75;
    } else if (meetup.temperature >= 20 && meetup.temperature <= 24) {
      birras = 1;
    } else {
      birras = 2;
    }
    birras *= meetup.inscripted_users;
    return Math.ceil(birras / 6);
  };
  render() {
    const { session } = this.props.auth;
    const { loading, meetup, notFound } = this.state;
    if (notFound) {
      return <h1>Página no encontrada</h1>;
    }
    if (loading) {
      return (
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
      );
    }

    return (
      <div>
        <Card body>
          <CardTitle>
            <h2>{meetup.title} </h2>
          </CardTitle>
          <CardText>
            <ListGroup>
              <ListGroupItem>
                {meetup.status}{" "}
                {moment(meetup.start_time)
                  .locale("es")
                  .calendar()}
              </ListGroupItem>
              <ListGroupItem>
                {meetup.status === "Finalizó" ? "Hizo" : "Hará"} aproximadamente{" "}
                {Math.trunc(meetup.temperature)}°C
              </ListGroupItem>
              <ListGroupItem>
                Usuarios inscriptos: {meetup.inscripted_users}
              </ListGroupItem>
              {session.sector === "admin" && (
                <ListGroupItem>
                  Cajas de birras necesarias: {this.getBirras()}
                </ListGroupItem>
              )}
            </ListGroup>
          </CardText>
          {meetup.inscripted ? (
            <Alert color="success" className="text-center">
              ¡Te has inscripto con éxito!
            </Alert>
          ) : (
            <Button onClick={this.handleInscribe}>Inscribirme</Button>
          )}
        </Card>
      </div>
    );
  }
}
