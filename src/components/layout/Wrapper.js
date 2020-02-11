import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from "reactstrap";
export default function Wrapper({ children, session, logout }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  if (session === "anonymous") return children;

  return (
    <React.Fragment>
      <header>
        <Navbar color="light" light expand="md">
          <NavbarBrand tag={Link} to="/">
            MeetApp
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/">
                  Inicio
                </NavLink>
              </NavItem>
              {session.sector === "admin" && (
                <NavItem>
                  <NavLink tag={Link} to="/meetups/new">
                    Crear Meetup
                  </NavLink>
                </NavItem>
              )}
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">
                  GitHub
                </NavLink>
              </NavItem>
            </Nav>
            <NavbarText style={{ marginRight: "5rem" }}>
              {session.name}
            </NavbarText>
            <NavbarText
              style={{ marginRight: "5rem", cursor: "pointer" }}
              onClick={logout}
            >
              Cerrar Sesión
            </NavbarText>
          </Collapse>
        </Navbar>
      </header>
      <div className="container mt-4">{children}</div>
    </React.Fragment>
  );
}
