import React, { Component } from "react";
import {
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  Spinner
} from "reactstrap";
import axios from "axios";
export default class Meetup extends Component {
  state = {
    meetup: {},
    loading: true
  };
  componentDidMount = async () => {
    const token = this.props.auth.getToken();
    let meetup_id = this.props.match.params.meetup_id;
    let meetup = await axios.get(`http://localhost:3002/meetups/${meetup_id}`, {
      headers: { Authorization: token }
    });
    meetup = meetup.data;
    console.log(meetup);
    let res = await axios.get(
      `https://api.darksky.net/forecast/e04a6cf97f5c67d1d77db985546d31f6/-34.603683,-58.381557,${meetup.date}T${meetup.time}?lang=es&units=auto`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      }
    );
    let Newevento = {
      temperatura: res.data.currently.temperature
    };
    console.log(Newevento);
    this.setState({ meetup, loading: false });
  };
  render() {
    const { loading, meetup } = this.state;
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
          <CardTitle>{meetup.title}</CardTitle>
          <CardText>
            With supporting text below as a natural lead-in to additional
            content.
          </CardText>
          <Button>Go somewhere</Button>
        </Card>
      </div>
    );
  }
}
