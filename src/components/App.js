'use strict';

import React from 'react';
import {connect} from 'react-redux';

class App extends React.Component {
    render() {
        return (
            <div style={{position: 'relative', height: '100%', width: '100%', display: 'flex', flexDirection: 'column'}}>
                <div style={{height: '40px'}}>
                    top menu
                </div>
                <div style={{flex: 1, display: 'flex'}}>
                    <div style={{width: '200px', display: 'flex', flexDirection: 'column'}}>
                        table
                    </div>
                    <div style={{flex: 1}}>
                        Hello {this.props.name}!
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        name: state.name
    };
}

export default connect(mapStateToProps)(App);