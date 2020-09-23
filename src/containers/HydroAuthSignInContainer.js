import React from 'react';
import HydroAuthSignIn from '../components/authentication-component/hydro-auth-signin/HydroAuthSignIn';
import { withRouter } from 'react-router-dom';

class _HydroAuthSignInContainer extends React.Component {

    constructor() {
        super();

        this.state = {
            username: undefined,
            password: undefined,
            hydroId: undefined,
            hydroUniqId: undefined,
            error: undefined,
            isHydroIDGenrated: false
        }
        this.onSubmit = this.onSubmit.bind(this)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return { ...prevState }
    }

    onInputChange = (e) => {
        const key = e.target.id
        this.setState({
            [key]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        if (this.state.hydroId === undefined) {
            this.setState({
                error: "Please enter hydroId"
            })

        } else {
            const form = {
                hydroID: this.state.hydroId
            }

            this.props.client_manager.service.raindropRegister(form,
                (res) => {
                    this.getUniqRaniDropID()
                },
                (error) => {

                    this.setState({
                        error: error
                    })
                })
        }
    }

    onHydroAuthnticate = (e) => {
        e.preventDefault()
        this.props.history.push('/dashboard')
    }

    getUniqRaniDropID = () => {
        const header = this.props.client_manager.auth.getHeader();
        this.props.client_manager.service.raindropGetMessage(header,
            (res) => {
                this.setState({
                    hydroUniqId: '12333',
                    isHydroIDGenrated: true
                })
                // this.props.history.push('/dashboard')
            },
            (error) => {

                this.setState({
                    error: error
                })
            })
    }

    onRedirect = (e) => {
        e.preventDefault()
        const link = e.target.attributes.to.value
        this.props.history.push(link)
    }


    render() {

        return <HydroAuthSignIn
            onRedirect={this.onRedirect}
            onInputChange={this.onInputChange}
            onSubmit={this.onSubmit}
            onHydroAuthnticate={this.onHydroAuthnticate}
            {...this.state}
        />
    }
}


export const HydroAuthSignInContainer = withRouter(_HydroAuthSignInContainer)