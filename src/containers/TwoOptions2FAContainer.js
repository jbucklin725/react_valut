import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import TwoOptions2FAComponent from '../components/authentication-component/TwoOptions2FAComponent';
import { set_qr_data } from '../actions/registration.actions';

class _TwoOptions2FAContainer extends React.Component {

    constructor() {
        super();

        this.state = {
            email: undefined,
            username: undefined,
            password: undefined,
            error: undefined,
            responseMsg: undefined,
            errors: {
                username: undefined,
                password: undefined
            },
            isLoading: false
        }
    }

    onInputChange = (e) => {
        const key = e.target.id
        this.setState({
            [key]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()

        if (this.state.email === undefined) {
            this.setState({
                errors: {
                    email: "Please enter email"
                }
            })
        } else {
            this.setState({
                isLoading: true
            })
            const form = {
                email: this.state.email
            }

            this.props.client_manager.service.forgot_password(form,
                (res) => {
                    this.setState({
                        responseMsg: res.data.message,
                        isLoading: false
                    })
                },
                (error) => {
                    this.setState({
                        error: error.response.data.payload.message,
                        isLoading: false
                    })
                })
        }
    }

    onRedirect = (e) => {
        e.preventDefault()
        const link = e.target.attributes.to.value
        this.props.history.push(link)
    }

    onSelectTfaType = (e) => {
        e.preventDefault()
        const selectedType = e.target.id;
        if (selectedType === 'gauth') {
            this.getGAuthSecret()
        } else if(selectedType === 'raindrop') {
            this.props.history.push('/raindrop_2fa')
        }
    }

    /**
     * Get Secret After Login Success
     */
    getGAuthSecret() {

        const header = this.props.client_manager.auth.getHeader();
        this.props.client_manager.service.generateSecret(
            header,
            (data) => {
                this.props.dispatch(set_qr_data(data.data));
                this.props.history.push('/auth')
            },
            (error) => {
                this.setState({
                    isLoading: false
                })
            });
    }

    render() {

        return <TwoOptions2FAComponent
            onRedirect={this.onRedirect}
            onSelectTfaType={this.onSelectTfaType}
            {...this.state}
        />
    }
}

function mapStatestoProps(state) {
    return {
        qrData: state.registration.qrData
    }
}

export const TwoOptions2FAContainer = withRouter(connect(mapStatestoProps)(_TwoOptions2FAContainer));