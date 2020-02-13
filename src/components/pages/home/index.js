import React, { Component } from "react";
import {
  Card,
  Col,
  CardText,
  Row,
  CardTitle,
  ListGroup,
  Spinner,
  Button
} from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
export default class Home extends Component {
  state = {
    meetups: [],
    loading: true
  };
  componentDidMount = async () => {
    let res = await axios.get("http://localhost:3002/meetups", {
      headers: {
        Authorization: this.props.auth.getToken()
      }
    });
    this.setState({ meetups: res.data, loading: false });
  };
  render() {
    const { meetups, loading } = this.state;

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
      <Row>
        {meetups.map(meetup => {
          return (
            <Col sm="6" className="mt-5 mb-5">
              <Card body>
                <CardTitle>{meetup.title}</CardTitle>
                <CardText>
                  <ListGroup>
                    {meetup.status}{" "}
                    {moment(meetup.start_time)
                      .locale("es")
                      .calendar()}
                  </ListGroup>
                </CardText>
                <Button tag={Link} to={`/meetups/${meetup.id}`}>
                  Ver más
                </Button>
              </Card>
            </Col>
          );
        })}
      </Row>
    );
  }
}
