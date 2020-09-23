import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import  VaultConfigComponent  from '../components/vault-config/VaultConfigComponent';

class _VaultConfigContainer extends React.Component {

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
        
        return <VaultConfigComponent
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

export const VaultConfigContainer = withRouter(connect(mapStatestoProps)(_VaultConfigContainer));