import React from 'react';
import { withRouter } from 'react-router-dom';
import VerifyUserComponent from '../../components/register/VerifyUserComponent';
import { connect } from 'react-redux';

class _VerifyUserContainer extends React.Component {

    constructor() {
        super();
        this.state = {
            input: undefined,
            disableSubmit: true,
            error: undefined
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        if (!prevState.input) {
            return { ...prevState, disableSubmit: true }
        }

        return { ...prevState, disableSubmit: false }

    }

    onInputChange = (e) => {
        const { value } = e.target;

        this.setState({
            input: value
        });
    }

    onSubmit = (e) => {
        this.props.client_manager.service.confirmUser(this.props.username, this.props.password, this.props.email, this.state.input,
            (token) => {
                this.props.history.push('/home')
            },
            (message) => {
                if (message === 'Required Params Not Found: username') {
                    this.setState({
                        error: 'User is not recognize, please register again'
                    })
                    this.props.client_manager.auth.isLogout()
                } else {
                    this.setState({
                        error: message
                    })
                }
            })
    }
    onResendCode = (e) => {
        /**
         * Call /auth/users?action=resend
         *
         */

    }
    render() {
        return (
            <VerifyUserComponent
                onInputChange={this.onInputChange}
                onSubmit={this.onSubmit}
                onResendCode={this.onResendCode}
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

export const VerifyUserContainer = withRouter(connect(mapStatestoProps)(_VerifyUserContainer))