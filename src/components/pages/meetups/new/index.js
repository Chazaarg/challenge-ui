import React, { Component } from "react";
import {
  Card,
  CardText,
  Row,
  Col,
  FormGroup,
  Input,
  Label,
  CardLink,
  FormText,
  Button,
  CardTitle
} from "reactstrap";
import withValidation from "../../../../helpers/withValidation";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
//Today as default time

let date = new Date();
date.setDate(date.getDate());

let dd = date.getDate();
let mm = date.getMonth() + 1;
let yyyy = date.getFullYear();

if (dd < 10) {
  dd = "0" + dd;
}
if (mm < 10) {
  mm = "0" + mm;
}

class NewMeetup extends Component {
  state = {
    title: "",
    start_time: "12:00",
    end_time: "13:00",
    date: yyyy + "-" + mm + "-" + dd
  };

  handleSubmit = async e => {
    e.preventDefault();
    const res = await axios.post("http://localhost:3002/meetups", this.state, {
      headers: {
        Authorization: this.props.auth.getToken()
      }
    });
    if (res.data.type === "error") {
      this.props.validation.throwErrors(res.data.errors);
      return;
    }

    this.setState({ redirect: "/meetups/" + res.data.id });
    return;
  };

  handleChange = ({ target }) => {
    this.props.validation.clearInput(target.name);
    this.setState({ [target.name]: target.value });
  };
  render() {
    const { title, start_time, end_time, date, redirect } = this.state;
    const { errors } = this.props.validation;
    if (redirect) {
      return <Redirect to={redirect}></Redirect>;
    }
    return (
      <div>
        <Card body>
          <CardTitle>
            <h2>Crear Meetup</h2>
          </CardTitle>
          <hr className="mt-4 mb-4"></hr>
          <Row form>
            <Col md={8}>
              <FormGroup>
                <Label for="exampleEmail">Título</Label>
                <Input
                  type="title"
                  name="title"
                  onChange={this.handleChange}
                  value={title}
                  placeholder="Ingrese un título..."
                  invalid={errors.title.invalid}
                />

                {errors.title.invalid && (
                  <FormText color="danger">{errors.title.message}</FormText>
                )}
              </FormGroup>
            </Col>
          </Row>
          <hr className="mt-4 mb-4"></hr>
          <Row>
            <Col sm={12} md={6}>
              <FormGroup>
                <Label for="exampleDate">Fecha de inicio</Label>
                <Input
                  onChange={this.handleChange}
                  type="date"
                  invalid={errors.date.invalid}
                  name="date"
                  value={date}
                  placeholder="Fecha de inicio"
                />
                {errors.date.invalid && (
                  <FormText color="danger">{errors.date.message}</FormText>
                )}
              </FormGroup>
            </Col>
            <Col sm={6} md={3}>
              <FormGroup>
                <Label for="exampleTime">Hora Inicio</Label>
                <Input
                  type="time"
                  onChange={this.handleChange}
                  value={start_time}
                  invalid={errors.start_time.invalid}
                  name="start_time"
                  placeholder="Hora inicio"
                />
                {errors.start_time.invalid && (
                  <FormText color="danger">
                    {errors.start_time.message}
                  </FormText>
                )}
              </FormGroup>
            </Col>
            <Col sm={6} md={3}>
              <FormGroup>
                <Label for="exampleTime">Hora Fin</Label>
                <Input
                  type="time"
                  value={end_time}
                  invalid={errors.end_time.invalid}
                  onChange={this.handleChange}
                  name="end_time"
                  placeholder="Hora fin"
                />
                {errors.end_time.invalid && (
                  <FormText color="danger">{errors.end_time.message}</FormText>
                )}
              </FormGroup>
            </Col>
          </Row>
          <hr className="mt-4 mb-4"></hr>
          <Row>
            <Col className="d-flex" style={{ flexDirection: "column" }}>
              <Button
                color="primary"
                style={{ width: "50%" }}
                className="m-auto"
                onClick={this.handleSubmit}
              >
                Aceptar
              </Button>
              <CardText className="m-auto">
                <small className="text-muted ">
                  El evento se creará para que cualquier usuario pueda asistir.
                </small>
              </CardText>
            </Col>
          </Row>
          <CardLink tag={Link} to="/">
            Volver
          </CardLink>
        </Card>
      </div>
    );
  }
}
let form = ["title", "start_time", "end_time", "date"];
export default withValidation(form, NewMeetup);
