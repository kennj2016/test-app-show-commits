import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import LayoutMaster from './components/Layout/LayoutMaster'

import Home from './components/Home/Home'

import {connect} from  'react-redux'



class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reload:false
        }

        this.props.history.listen((location, action) => {
            this.setState({reload:true})
        });
    }


    generateLayout = (props, Layout, Component) => (<Layout {...props}><Component  {...props}  /></Layout>)

    render() {
        return (
            <div>
                <Switch>
                    <Route path="/" render={(props)=> this.generateLayout(props,LayoutMaster,Home)} />
                    <Redirect to="/"/>

                </Switch>
            </div>

        );
    }
}

const mapStateToProps = (state)=>{
    return {

    }
}

export default connect(mapStateToProps,{})(App)

