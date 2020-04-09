import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { Collapse, Container, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import '@fortawesome/fontawesome-free/css/all.css';

function UserAvatar(props) {
    // Have avatar available
    if (props.user.avatar) {
        return <img src={props.user.avatar} alt="user" className="rounded-circle align-self-center mr-2" style={{ width: '32px' }} />;
    }

    // No avatar available
    return <i className="far fa-user-circle fa-lg rounded-circle align-self-center mr-2" style={{ width: '32px' }} />
}

function AuthNavItem(props) {
    // If authed, return dropdown with user info and sign out button
    if (props.isAuthenticated) {
        return (
            <UncontrolledDropdown>
                <DropdownToggle nav caret>
                    <UserAvatar user={props.user} />
                </DropdownToggle>
                <DropdownMenu right>
                    <h5 className="dropdown-item-text mb-0">{props.user.displayName}</h5>
                    <p className="dropdown-item-text text-muted mb-0">{props.user.email}</p>
                    <DropdownItem divider />
                    <DropdownItem onClick={props.authButtonMethod}>Sign Out</DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    }

    // Not authed, return a sign in link
    return (<NavItem><NavLink onClick={props.authButtonMethod}>Sign In</NavLink></NavItem>)
}

export default class NavBar extends React.Component {
    constructor(props) {
      super(props);
  
      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false
      };
    }
  
    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
  
    render() {
      // Only show calendar nav item if logged in
      let calendarLink = null;
      if (this.props.isAuthenticated) {
        calendarLink = (
          <NavItem>
            <RouterNavLink to="/calendar" className="nav-link" exact>Calendar</RouterNavLink>
          </NavItem>
        );
      }
  
      return (
        <div>
          <Navbar color="dark" dark expand="md" fixed="top">
            <Container>
              <NavbarBrand href="/">React Graph Tutorial</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="mr-auto" navbar>
                  <NavItem>
                    <RouterNavLink to="/" className="nav-link" exact>Home</RouterNavLink>
                  </NavItem>
                  {calendarLink}
                </Nav>
                <Nav className="justify-content-end" navbar>
                  <NavItem>
                    <NavLink href="https://developer.microsoft.com/graph/docs/concepts/overview" target="_blank">
                      <i className="fas fa-external-link-alt mr-1"></i>
                      Docs
                    </NavLink>
                  </NavItem>
                  <AuthNavItem
                    isAuthenticated={this.props.isAuthenticated}
                    authButtonMethod={this.props.authButtonMethod}
                    user={this.props.user} />
                </Nav>
              </Collapse>
            </Container>
          </Navbar>
        </div>
      );
    }
  }