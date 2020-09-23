import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as qs from 'query-string';
import { toast } from "react-toastify";
import CoSignerVerificationWithdrawComponent from '../components/CoSignerVerificationWithdrawComponent/CoSignerVerificationWithdrawComponent';

class _CoSignerVerificationWithdrawContainer extends React.Component {

    constructor() {
        super();

        this.state = {
            email: '',
            vault_name: '',
            shared_vault_id: '',
            isLoading: false,
            shared_transaction_id: '',
            
        }
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        const params = qs.parse(this.props.location.search);
        const userDeatils = this.props.client_manager.auth.getUserDetails();
        if((userDeatils.user_email !== null) && (params.signerEmail !== userDeatils.user_email)) {
            this.props.history.push(`/login?status=withdraw&shared_transaction_id=${params.shared_transaction_id}&shared_vault_id=${params.shared_vault_id}&signerEmail=${params.signerEmail}&vault_name=${params.vault_name}&init=${params.init}`)
        } else {
            this.setState({
                shared_transaction_id: params.shared_transaction_id,
                shared_vault_id: params.shared_vault_id,
                signerEmail: params.signerEmail,
                intiEmail: params.init,
                vault_name: params.vault_name
            })
        }
       
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
        const {shared_vault_id, shared_transaction_id } = this.state;

        const form = {
            approve: status,
            shared_transaction_id: shared_transaction_id
        };
        
        const header = this.props.client_manager.auth.getHeader();
        this.props.client_manager.service.coSignerTxnsVerificationAPI(header, shared_vault_id, form,
            (res) => {
                this.props.history.push('/dashboard')
            },
            (error) => {
                toast.error(error.response.data.payload.message,
                    {
                        position: toast.POSITION.TOP_RIGHT
                    });
                this.setState({
                    error: error.response.data.payload.message,
                    isGAuthLoading: false,
                    isLoading: false
                })
            })
    }

    render() {
        
        return <CoSignerVerificationWithdrawComponent
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

export const CoSignerVerificationWithdrawContainer = withRouter(connect(mapStatestoProps)(_CoSignerVerificationWithdrawContainer));