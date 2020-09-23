import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as qs from 'query-string';
import { toast } from "react-toastify";
import CoSignerVerificationComponent from '../components/coSignerVerificationVault/CoSignerVerificationVaultComponent';

class _CoSignerVerificationVaultContainer extends React.Component {

    constructor() {
        super();

        this.state = {
            email: '',
            vault_name: '',
            shared_vault_id: '',
            i_a: '',
            isLoading: false
        }
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        const params = qs.parse(this.props.location.search);
        this.setState({
            email: params.email,
            vault_name: params.vault,
            shared_vault_id: params.sharedVaultId,
            i_a: params.i_a
        })
    }

    onInputChange = (e) => {
        const key = e.target.id
        this.setState({
            [key]: e.target.value
        })
    }

    toggle() {
        this.setState({
            modal: !this.state.modal,
            fade: !this.state.fade

        });
    }

    onRedirect = (e) => {
        e.preventDefault()
        const link = e.target.attributes.to.value
        this.props.history.push(link)
    }

    onCoSignerVerification = (e, status) => {
        e.preventDefault()
        this.setState({
            isLoading: true
        })
        const { email, vault_name, shared_vault_id, i_a } = this.state;

        const form = {
            email: email,
            vault_name: vault_name,
            accept: status,
            shared_vault_id: shared_vault_id,
            i_a: i_a
        };
        
        const header = this.props.client_manager.auth.getHeader();
        this.props.client_manager.service.coSignerVerificationAPI(header, form,
            (res) => {
                toast.success("Verified Successfully!",
                    {
                        position: toast.POSITION.TOP_RIGHT
                    });
                this.props.history.push('/login')
            },
            (error) => {
                toast.error("Sorry Verification fail!",
                    {
                        position: toast.POSITION.TOP_RIGHT
                    });
                this.setState({
                    error: error.response.data.payload.message,
                    isGAuthLoading: false
                })
            })

    }

    render() {

        return <CoSignerVerificationComponent
            onRedirect={this.onRedirect}
            onCoSignerVerification={this.onCoSignerVerification}
            {...this.state}
        />
    }
}

function mapStatestoProps(state) {
    return {
        qrData: state.registration.qrData
    }
}

export const CoSignerVerificationVaultContainer = withRouter(connect(mapStatestoProps)(_CoSignerVerificationVaultContainer));
