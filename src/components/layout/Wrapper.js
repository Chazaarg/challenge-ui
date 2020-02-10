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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
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
          <NavbarBrand href="/">MeetApp</NavbarBrand>
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
                  <NavLink tag={Link} to="/meetups">
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
            <NavbarText
              style={{ marginRight: "5rem", cursor: "poiner" }}
              onClick={logout}
            >
              Cerrar Sesión
            </NavbarText>
          </Collapse>
        </Navbar>
      </header>
      {children}
    </React.Fragment>
  );
}
