'use strict';

import React from 'react';
import {connect} from 'react-redux';

class App extends React.Component {
    render() {
        return (
            <div>
                Hello {this.props.name}!
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        name: 'my friend'
    };
}

export default connect(mapStateToProps)(App);