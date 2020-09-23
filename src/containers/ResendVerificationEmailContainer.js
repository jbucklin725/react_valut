import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import  ResendVerificationEmailComponent  from '../components/ForgotPassword/resendVerificationEmailComponent';

class _ResendVerificationContainer extends React.Component {

    constructor() {
        super();

        this.state = {
            email: undefined,
            error: undefined,
            responseMsg: undefined,
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
            this.props.client_manager.service.resend_verification_email(form,
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

    render() {
        
        return <ResendVerificationEmailComponent
            onRedirect={this.onRedirect}
            onInputChange={this.onInputChange}
            onSubmit={this.onSubmit}
            {...this.state}
        />
    }
}

function mapStatestoProps(state) {
    return {
        qrData: state.registration.qrData
    }
}

export const ResendVerificationContainer = withRouter(connect(mapStatestoProps)(_ResendVerificationContainer));