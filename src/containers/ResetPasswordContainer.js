import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import  ResetPasswordComponent  from '../components/ForgotPassword/resetPassword';

class _ResetPasswordContainer extends React.Component {

    constructor() {
        super();

        this.state = {  
            reset_key: undefined,
            new_password: undefined,
            confirm_password: undefined,
            error: undefined,
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

    componentDidMount() {
        const reset_key = this.props.match.params.token;
        this.setState({
            reset_key: reset_key
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        
        if (this.state.new_password === undefined) {
            this.setState({
                errors: {
                    new_password: "Please enter new_password"
                }
            })
        } else if (this.state.confirm_password === undefined) {
            this.setState({
                errors: {
                    confirm_password: "Please enter confirm_password"
                }
            })
        } else {
            this.setState({
                isLoading: true
            })

            const form = {
                reset_key: this.state.reset_key,
                new_password: this.state.new_password,
                confirm_password: this.state.confirm_password
            }

            this.props.client_manager.service.reset_password(form,
                (res) => {
                    this.setState({
                        isLoading: false
                    })
                    this.props.history.push('/login')
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
        
        return <ResetPasswordComponent
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

export const ResetPasswordContainer = withRouter(connect(mapStatestoProps)(_ResetPasswordContainer));