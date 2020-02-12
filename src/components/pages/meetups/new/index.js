import React, { Component } from "react";
import { Card, CardText, CardTitle, Button } from "reactstrap";
export default class NewMeetup extends Component {
  render() {
    return (
      <div>
        <Card body>
          <CardTitle>Special Title Treatment</CardTitle>
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
