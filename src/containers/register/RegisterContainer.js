import React from 'react';
import RegisterComponent from '../../components/register/RegisterComponent';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { isAlphanumeric, isEmail } from 'validator';
import { set_username, set_password, set_email } from '../../actions/registration.actions';

const isValidPassword = (password) => password.length > 6;
const usernameErr = (username) => isAlphanumeric(username) ? "" : "Username must be Alphanumeric";
const passwordErr = (password) => isValidPassword(password) ? "" : "Password must be greater than 8 characters";
const emailErr = (email) => isEmail(email) ? "" : "Please enter valid Email id";
class _RegisterContainer extends React.Component {

    constructor() {
        super();

        this.state = {
            username: undefined,
            usernameError: undefined,
            submitError: undefined,
            isLoading: false,
            disableSubmit: true,

            /**
             * Register Fileds
             */
            first_name: undefined,
            last_name: undefined,
            email: undefined,
            secondary_email: undefined,
            password: undefined,
            confirm_password: undefined,

            first_name_error: undefined,
            last_name_error: undefined,
            password_error: undefined,
            secondary_email_error: undefined,
            confirm_password_error: undefined,
            email_error: undefined
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        const { first_name, last_name, secondary_email, confirm_password, password, email } = prevState;
        const isDefined = (param) => param !== undefined;
        const valid =
            isDefined(password) && isValidPassword(password) &&
            isDefined(email) && isEmail(email)

        const inputError = {
            first_name_error: first_name && usernameErr(first_name),
            last_name_error: last_name && usernameErr(last_name),
            secondary_email_error: secondary_email && emailErr(secondary_email),
            password_error: password && passwordErr(password),
            confirm_password_error: confirm_password && passwordErr(confirm_password),
            email_error: email && emailErr(email),
        }

        return {
            ...prevState,
            ...inputError,
            disableSubmit: !valid
        }
    }

    onRedirect = (e) => {
        e.preventDefault();
        const link = e.target.attributes.to.value;
        this.props.history.push(link);
    }

    onInputChange = (e) => {
        const id = e.target.id;

        this.setState({
            [id]: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        if (this.state.disableSubmit) {
            return;
        }

        this.setState({
            isLoading: true
        });

        const form = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            secondary_email: this.state.secondary_email,
            password: this.state.password,
            confirm_password: this.state.confirm_password
        }

        this.props.client_manager.service.register(form,
            (response) => {
                // this.props.client_manager.auth.saveToken(token)
                this.setState({
                    isLoading: false,
                    submitError: undefined
                })

                // Update State in Redux Store
                this.props.dispatch(set_username(this.state.username));
                this.props.dispatch(set_email(this.state.email));
                this.props.dispatch(set_password(this.state.password));

                this.props.history.push('/verifyUser');
            },
            (error) => {
                this.setState({
                    isLoading: false,
                    submitError: error.response.data.payload.message
                })
            }
        );
    }

    render() {

        return <RegisterComponent
            onRedirect={this.onRedirect}
            onInputChange={this.onInputChange}
            onSubmit={this.onSubmit}
            {...this.state}
        />
    }
}

export const RegisterContainer = withRouter(connect()(_RegisterContainer));
