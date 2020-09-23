import React from 'react';
import  NotFoundComponent  from '../components/NotFoundComponent/NotFoundComponent';
import { withRouter } from 'react-router-dom';

class _NotFoundComponentContainer extends React.Component {

    constructor() {
        super();
    }

    render() {

        return <NotFoundComponent
            {...this.state}
        />
    }
}

export const NotFoundComponentContainer = withRouter(_NotFoundComponentContainer)