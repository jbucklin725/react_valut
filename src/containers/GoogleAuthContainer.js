import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import  GoogleAuth  from '../components/authentication-component/google-auth/GoogleAuth';

class _GoogleAuthContainer extends React.Component {

    constructor() {
        super();

        this.state = {
            qrUrl: undefined,
            secret: undefined,
            uri: undefined,
            token: undefined,
            isLoading: false
        }
    }

    componentDidMount() {
        this.getUserQrData();
    }

    onInputChange = (e) => {
        const key = e.target.id
        this.setState({
            [key]: e.target.value
        })
    }

    getUserQrData = () => {
        const qrData = this.props.qrData;
        if(this.props.qrData) {
            this.setState({
                qrUrl: qrData.qr,
                secret: qrData.secret,
                uri: qrData.uri
            })
        }
    }

    onSubmit = (e) => {
        e.preventDefault()
            this.setState({
                isLoading: true
            })
            const form = {
                token: this.state.token
            }

            const header = this.props.client_manager.auth.getHeader();
            this.props.client_manager.service.confirmGoogleAuthToken(header, form,
                (res) => {
                    this.props.client_manager.auth.isLoggedIn()
                    this.props.history.push('/dashboard')
                },
                (error) => {
                    this.setState({
                        error: error.response.data.payload.message,
                        isLoading: false
                    })
                })
        
    }

    onRedirect = (e) => {
        e.preventDefault()
        const link = e.target.attributes.to.value
        this.props.history.push(link)
    }

    render() {
        
        return <GoogleAuth
            onRedirect={this.onRedirect}
            onInputChange={this.onInputChange}
            onSubmit={this.onSubmit}
            {...this.state}
            {...this.props}
        />
    }
}

function mapStatestoProps(state) {
    return {
        qrData: state.registration.qrData
    }
}

export const GoogleAuthContainer = withRouter(connect(mapStatestoProps)(_GoogleAuthContainer));