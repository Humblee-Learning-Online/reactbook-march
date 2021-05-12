import React, { Component } from 'react'

export default class Home extends Component {
    render() {
        const user = this.props.user;

        return (
            <React.Fragment>
                <h4>Hello, {user.name} ({user.age}) from: {user.location}</h4>
                {user.something}
                <hr />
                
            </React.Fragment>
        )
    }
}
