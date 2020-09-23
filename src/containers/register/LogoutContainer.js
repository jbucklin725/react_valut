import React from 'react';
import { withRouter } from 'react-router-dom';
import LogoutComponent from '../../components/register/LogoutComponent';
import { connect } from 'react-redux';
import { set_logout_session } from '../../actions/registration.actions';

class _LogoutContainer extends React.Component {

    constructor() {
        super();
        this.state = {
            input: undefined,
            disableSubmit: true,
            error: undefined
        }
    }

    componentDidMount() {
        this.props.client_manager.auth.isLogout()
        this.props.dispatch(set_logout_session());
        this.props.history.push('/')
    }
    onInputChange = (e) => {
        const { value } = e.target;

        this.setState({
            input: value
        });
    }

    render() {
        return (
            <LogoutComponent
                {...this.state}
            />
        );
    }
}

const mapStatestoProps = (states) => ({
    username: states.registration.username,
    password: states.registration.password,
    email: states.registration.email
})

export const LogoutContainer = withRouter(connect(mapStatestoProps)(_LogoutContainer))