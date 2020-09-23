import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as qs from 'query-string';
import { toast } from "react-toastify";
import LoginComponent from '../components/login/LoginComponent';
import { set_logout_session } from '../actions/registration.actions';
const message = require('../constants/messages');

class _LogInContainer extends React.Component {

    constructor() {
        super();

        this.state = {
            username: undefined,
            password: undefined,
            error: undefined,
            errors: {
                username: undefined,
                password: undefined
            },
            isLoading: false,
            isShow: false,
            modal: false,
            fade: false,
            token: undefined,
            isGAuthLoading: false
        }
        this.toggle = this.toggle.bind(this);
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

    onSubmit = (e) => {
        e.preventDefault()

        if (this.state.username === undefined) {
            this.setState({
                errors: {
                    username: "Please enter username"
                }
            })
        } else if (this.state.password === undefined) {
            this.setState({
                errors: {
                    password: "Please enter username"
                }
            })
        } else {
            const params = qs.parse(this.props.location.search);
            this.setState({
                isLoading: true
            })
            const form = {
                email: this.state.username,
                password: this.state.password
            }
            this.props.client_manager.auth.isLogout()
            this.props.dispatch(set_logout_session());
            this.props.client_manager.service.login(form,
                (res) => {
                    if((params.signerEmail !== undefined) && (this.state.username !== params.signerEmail)) {
                        toast.error('Sorry you are not allowed to accept withdraw transaction from this account, Please try with the coSinger Email',
                            {
                                position: toast.POSITION.TOP_RIGHT
                            });
                            this.setState({
                                isLoading: false,
                            })
                    } else {   
                        this.props.client_manager.auth.saveToken(res.data.token)
                        this.getTFAType()
                    }
                },
                (error) => {
                    toast.error(error.response.data.payload.message,
                    {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    this.setState({
                        error: error.response.data.payload.message,
                        isLoading: false
                    })
                })
        }
    }

    // getUserTFA
    getTFAType() {
        const header = this.props.client_manager.auth.getHeader();
        this.props.client_manager.service.getUserTFA(
            header,
            (data) => {
                if (!data.data.tfa_type) {
                    this.props.history.push('/options_2fa')
                } else {
                    if (data.data.tfa_type === 'GAuthy') {
                        this.toggle();
                    } else {
                        this.props.history.push('/raindrop_2fa')
                    }
                }
                this.setState({
                    isLoading: false
                })
            },
            (error) => {
                this.setState({
                    isLoading: false
                })
            });
    }

    onRedirect = (e) => {
        e.preventDefault()
        const link = e.target.attributes.to.value
        this.props.history.push(link)
    }

    onSubmitGoogleAuthToken = (e) => {
        e.preventDefault()
        this.setState({
            isGAuthLoading: true
        })
        const form = {
            token: this.state.token
        }

        const params = qs.parse(this.props.location.search);

        const header = this.props.client_manager.auth.getHeader();
        
        this.props.client_manager.service.confirmGoogleAuthToken(header, form,
            (res) => {
                if (params.status === 'withdraw' || params.signerEmail !== undefined) {
                    toast.success('Please accept or reject the withdraw transaction',
                        {
                            position: toast.POSITION.TOP_RIGHT
                        });
    
                    this.props.client_manager.auth.isLoggedIn()
                    this.props.history.push(`/coSignerTxnVerification?shared_transaction_id=${params.shared_transaction_id}&shared_vault_id=${params.shared_vault_id}&signerEmail=${params.signerEmail}&vault_name=${params.vault_name}&init=${params.init}`)
                } else {
                    toast.success(message.USER_LOGIN_SUCCESS,
                        {
                            position: toast.POSITION.TOP_RIGHT
                        });
    
                    this.props.client_manager.auth.isLoggedIn()
                    this.props.history.push('/dashboard')
                }
            },
            (error) => {
                toast.error(message.GAUTH_ERROR,
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

        return <LoginComponent
            onRedirect={this.onRedirect}
            onInputChange={this.onInputChange}
            onSubmit={this.onSubmit}
            onSubmitGoogleAuthToken={this.onSubmitGoogleAuthToken}
            toggle={this.toggle}
            {...this.state}
        />
    }
}

function mapStatestoProps(state) {
    return {
        qrData: state.registration.qrData
    }
}

export const LogInContainer = withRouter(connect(mapStatestoProps)(_LogInContainer));
