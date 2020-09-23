import React from 'react';
import { withRouter } from 'react-router-dom';
import * as qs from 'query-string';
import ConfirmUserComponent from '../../components/register/ConfirmUserComponent';
import { connect } from 'react-redux';

class _ConfirmUserContainer extends React.Component {

    constructor() {
        super();
        this.state = {
            input: undefined,
            disableSubmit: true,
            error: undefined,
            isLoading: false,
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        if (!prevState.input) {
            return { ...prevState, disableSubmit: true }
        }

        return { ...prevState, disableSubmit: false }

    }

    componentDidMount() {
        const verifyToken = this.props.match.params.id;
        const params = qs.parse(this.props.location.search);

        this.setState({
            isLoading: true
        })
        this.props.client_manager.service.confirmUser(verifyToken, params.email,
            (token) => {
                this.setState({
                    isLoading: false
                })

                // this.props.history.push('/login')
            },
            (error) => {
                this.setState({
                    error: 'Invalid Token Please try again with vaild token',
                    isLoading: false
                })
            })
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
            <ConfirmUserComponent
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

export const ConfirmUserContainer = withRouter(connect(mapStatestoProps)(_ConfirmUserContainer))