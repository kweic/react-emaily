import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux'; //give certain components the ability to call action creators
import * as actions from '../actions'; //pull out all

import Header from './Header';
import Landing from './Landing';
// const Dashboard = () => <h2>Dashboard</h2>
import Dashboard from './Dashboard';
const SurveyNew = () => <h2>SurveyNew</h2>


//functional component that returns JSX
//browserRouter can only have 1 child

//made a class based component for lifecycle methods
class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render () {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Header />
                        <div className="container">
                            <Route exact path="/" component={Landing} />
                            <Route exact path="/surveys" component={Dashboard} />
                            <Route path="/surveys/new" component={SurveyNew} />
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

export default connect(null, actions)(App);