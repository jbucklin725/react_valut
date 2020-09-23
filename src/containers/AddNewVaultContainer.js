// import React from 'react';
// import { withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';
// import AddVaultComponent from '../components/add-vault-component/AddVaultComponent';

// class _AddVaultContainer extends React.Component {

//     constructor() {
//         super();

//         this.state = {
//             qrUrl: undefined,
//             secret: undefined,
//             uri: undefined,
//             tokensList: [],
//             isLoading: false,
//             isSummaryPage: false,
//             vaultName: '',
//             cryptoAsset: '',
//             vaultType: 'single',
//             isShow: false,
//             modal: false,
//             fade: false,
//             isAddNewVault: false,
//             token: undefined,
//             isGAuthLoading: false,
//             newVaultSummary: {
//                 walletAddress: '',
//                 publicKey: '',
//                 transactionHash: '',
//                 currency: 'ETH',
//                 _id: ''
//             }
//         }
//         this.toggle = this.toggle.bind(this);
//         this.handleVaultName = this.handleVaultName.bind(this);
//         this.handleToken = this.handleToken.bind(this);
//         this.onSubmitAddVault = this.onSubmitAddVault.bind(this);
//     }

//     componentDidMount() {
//         // this.getUserQrData();
//         this.getAllTokens();
//     }
//     onCloseAction = (e) => {
//         // const { newVaultSummary } = this.state;
        
//         // const vaultData = {
//         //     address: newVaultSummary.walletAddress,
//         //     currency: newVaultSummary.currency,
//         //     _id: newVaultSummary._id ? newVaultSummary._id : ''
//         // }
//         /**
//          * Will enable when api return correct data on this
//          */
//         // this.props.dispatch(set_selected_vault(vaultData));
//         this.props.history.push('/dashboard')
//     }
//     getAllTokens() {
//         this.setState({
//             isLoadingCryptoAsset: true
//         })

//         const header = this.props.client_manager.auth.getHeader();
//         this.props.client_manager.service.getTokenList(header,
//             (data) => {
//                 if (data.data.tokens.length > 0) {
//                     let tokens = data.data.tokens.map((token) => {
//                         return {
//                             ...token,
//                             label: token.name,
//                             value: token.name
//                         }
//                     })
//                     this.setState({
//                         tokensList: tokens
//                     })
//                 }
//                 this.setState({
//                     isLoadingCryptoAsset: false,
//                 })
//             },
//             (error) => {
//                 this.setState({
//                     isLoadingCryptoAsset: false
//                 })
//             })

//     }

//     onInputChange = (e) => {
//         const key = e.target.id
//         this.setState({
//             [key]: e.target.value
//         })
//     }

//     handleToken(e) {
//         const key = e.target.id
//         this.setState({
//             [key]: e.target.value
//         })
//     }
    
//     handleVaultName(e) {
//         const key = e.target.id
//         this.setState({
//             [key]: e.target.value
//         })
//     }

//     async toggle() {
//         console.log('this.state.modal-1', this.state.modal, this.state.fade, this.state.isAddNewVault)
//         await this.setState({
//             modal: !this.state.modal,
//             fade: !this.state.fade,
//             isAddNewVault: !this.state.isAddNewVault
//         });
//         console.log('this.state.modal', this.state.modal, this.state.fade, this.state.isAddNewVault)
//     }

//     getUserQrData = () => {
//         const qrData = this.props.qrData;
//         if (this.props.qrData) {
//             this.setState({
//                 qrUrl: qrData.qr,
//                 secret: qrData.secret,
//                 uri: qrData.uri
//             })
//         }
//     }

//     onSubmitAddVault = async(e) => {
//         e.preventDefault()
//         await this.setState({
//             modal: true,
//             fade: true,
//             isAddNewVault: true
//         });
//     }

//     onBackAction = (e) => {
//         e.preventDefault()
//         this.setState({
//             isSummaryPage: false
//         })
//     }

//     onChangeVaultType = (e) => {
//         const key = e.target.name;

//         if (e.target.value === 'shared') {
//             this.props.history.push('/sharedVault')
//         }
//         this.setState({
//             [key]: e.target.value
//         })
//     }

//     handleCryptoAssetChange = cryptoAsset => {
//         this.setState(
//             { cryptoAsset },
//             () => console.log(`Option selected:`, this.state.cryptoAsset)
//         );
//     };

//     onSubmit = (e) => {
//         e.preventDefault()
//         this.toggle();
//     }

    // onSubmitGoogleAuthToken = (e) => {
    //     e.preventDefault()
    //     this.setState({
    //         isGAuthLoading: true
    //     })
    //     const form = {
    //         token: this.state.token
    //     }

    //     const header = this.props.client_manager.auth.getHeader();
    //     this.props.client_manager.service.confirmGoogleAuthToken(header, form,
    //         (res) => {
    //             /**
    //              * Call Generate New Vault API
    //              */
    //             this.generateNewVault()
    //             // this.setState({
    //             //     isSummaryPage: true
    //             // })
    //         },
    //         (error) => {
    //             this.setState({
    //                 error: error.response.data.payload.message,
    //                 isGAuthLoading: false
    //             })
    //         })

    // }

    // generateNewVault() {

    //     const userDetails = this.props.client_manager.auth.getUserDetails()
    //     const form = {
    //         type: this.state.vaultType,
    //         email: userDetails.user_email,
    //         name: this.state.vaultName,
    //         senderVaultId: userDetails.user_pre_vaultID
    //     };

    //     const header = this.props.client_manager.auth.getHeader();
    //     this.props.client_manager.service.createNewVault(header, form,
    //         (res) => {
    //             /**
    //              * Call Generate New Vault API
    //              */
    //             this.updateNewVaultSummary(res.data)

    //         },
    //         (error) => {
    //             this.setState({
    //                 error: error.response.data.payload.message,
    //                 isGAuthLoading: false
    //             })
    //         })
    // }
    // updateNewVaultSummary(data) {
    //     if (data) {
    //         this.setState({
    //             newVaultSummary: {
    //                 walletAddress: data.walletAddress,
    //                 publicKey: data.publicKey,
    //                 transactionHash: data.transactionHash,
    //                 _id: data._id ? data._id : ''
    //             },
    //             isGAuthLoading: false,
    //             isSummaryPage: true
    //         })
    //     }
    // }
//     onRedirect = (e) => {
//         e.preventDefault()
//         const link = e.target.attributes.to.value
//         this.props.history.push(link)
//     }

//     render() {

//         return <AddVaultComponent
//             onRedirect={this.onRedirect}
//             onInputChange={this.onInputChange}
//             handleToken={this.handleToken}
//             onSubmit={this.onSubmit}
//             onSubmitAddVault={this.onSubmitAddVault}
//             onBackAction={this.onBackAction}
//             onChangeVaultType={this.onChangeVaultType}
//             handleCryptoAssetChange={this.handleCryptoAssetChange}
//             onSubmitGoogleAuthToken={this.onSubmitGoogleAuthToken}
//             handleVaultName={this.handleVaultName}
//             toggle={this.toggle}
//             onCloseAction={this.onCloseAction}
//             {...this.state}
//             {...this.props}
//         />
//     }
// }

// export const AddVaultContainer = withRouter(connect()(_AddVaultContainer));