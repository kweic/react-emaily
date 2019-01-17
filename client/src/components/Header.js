import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';


//this.props.auth is created by the authReducer
class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return <li><a href="/auth/google">Login With Google</a></li>;
            default:
                return [
                    <li key="1"><Payments/></li>,
                    <li key="3" style={{ margin: '0 10px'}}>
                        Credits: {this.props.auth.credits}
                    </li>,
                    <li key="2"><a href="/api/logout">Logout</a></li>
                ];
        }
    }

    render() {
        console.log(this.props)
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link 
                        to={this.props.auth ? '/surveys' : '/'} 
                        className="left brand-logo"
                    >
                        Emaily
                    </Link>
                    
                    <ul className="right">
                        { this.renderContent() }
                    </ul>
                </div>
            </nav>
        );
    }
}

//this gets called with entire state object out of redux store
function mapStateToProps({ auth }) { //writing it like this takes only the property 'auth' from the state object
    return { auth }; //because key and value will be the same it can be written like this equivalant to { auth: auth }
}

export default connect(mapStateToProps)(Header);