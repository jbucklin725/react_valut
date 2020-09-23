import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Fulllayout from '../../components/layouts/fulllayout.jsx';
import { set_selected_vault, set_logout_session, set_shared_vault_details } from '../../actions/registration.actions';
import moment from 'moment';
import { toast } from "react-toastify";
import helpers from '../helpers/util';
import checkoutStats from '../helpers//internalStates';
const message = require('../../constants/messages');

const vaultData = {
    _id: "",
    balances: "",
    currency: "",
    name: "",
    address: "",
    allAccepted: false,
    type: "",
    label: "",
    value: ""
}

class _DashboardContainer extends React.Component {

    constructor() {
        super();

        this.onFilterTrasactions = this.onFilterTrasactions.bind(this);

        this.state = {
            vaultName: '',
            cryptoAsset: '',
            vaultType: 'single',
            email: undefined,
            isOverview: false,
            isTxnsLoading: false,
            first_name: undefined,
            last_name: undefined,
            secondary_email: undefined,
            tfa_type: undefined,
            vaults: [],
            tokensList: [],
            userID: undefined,
            isLoadingCryptoAsset: false,
            modal: false,
            fade: false,
            isOpenAuthForCreateSharedVault: false,
            coSignerAuthModal: false,
            coSignerAuthFade: false,
            isCoSignerWarningPopupEnable: false,
            isCoSignerWarningPopupModal: false,
            isCoSignerWarningPopupFade: false,
            isCoSignerSummaryOnePopupEnable: false,
            isCoSignerSummaryOnePopupModal: false,
            isCoSignerSummaryOnePopupFade: false,
            isWithdrawVerified: false,
            isLoading: false,
            trasnactionHistoryFlag: 'all',
            currentVaultType: 'all',
            graphHistoryFlag: 'year',
            allTrasnactionHistory: [],
            filterTrasnactionHistory: [],
            isLoadingBalance: false,
            isCopied: false,
            token: undefined,
            vaultsBalance: [],
            totalVaultBalance: 0,
            totalBalance: 0,
            selectedVault: undefined,
            isWithdrawIntiOpen: true,
            isWithdrawIntiFade: true,
            ishowDeadManSwitch: false,
            isWithdrawNextFade: false,
            depositVaultSelect: undefined,
            isWithdrawNextOpen: false,
            withdrawReceiver: '',
            withdrawVaultSelect: undefined,
            withdrawAmount: 0,
            withdrawSymbol: undefined,
            withdrawLoading: false,
            withdrawError: undefined,

            isDepositNextOpen: false,
            isDepositNextFade: false,
            isDepositIntiFade: true,
            isDepositIntiOpen: true,
            coSignerCount: 0,

            rangeFilters: [
                {
                    label: 'Year',
                    value: 'year'
                },
                {
                    label: 'Month',
                    value: 'month'
                },
                {
                    label: 'Day',
                    value: 'day'
                }
            ],
            selectedRangeFilter: undefined,
            sortFilters: [
                {
                    label: 'Lowest Balance',
                    value: 'lowestBalance'
                },
                {
                    label: 'Highest Balance',
                    value: 'highestBalance'
                }
            ],
            graphData: [],
            filterGraphData: [],
            graphDataWithLabels: [],
            selectedSortFilter: undefined,
            startDate: new Date(),
            endDate: new Date(),

            sharedVaultData_vaultName: '',
            sharedVaultData_cryptoAsset: '',
            sharedVaultData_maxSigner: 2,
            sharedVaultData_currentSignerCount: 1,
            isConfigScreenShow: false,
            sharedVaultData_coSignerData: [],
            sharedVaultData_currentCoSignerEmail: undefined,

        }
        this.onSelectVault = this.onSelectVault.bind(this);
        this.onSelectSharedVault = this.onSelectSharedVault.bind(this);
        this.toggle = this.toggle.bind(this);
        this.getSingleVaultData = this.getSingleVaultData.bind(this);
        this.coSignerAuthToggle = this.coSignerAuthToggle.bind(this);
        this.handleWithdrawAssetChange = this.handleWithdrawAssetChange.bind(this);
        this.handleSharedVaultName = this.handleSharedVaultName.bind(this);
        this.handleCryptoSelectForSharedVault = this.handleCryptoSelectForSharedVault.bind(this);
        this.handleSharedVaultEmailCurrentCoSigner = this.handleSharedVaultEmailCurrentCoSigner.bind(this);
        this.handleAddCoSignerCountAndData = this.handleAddCoSignerCountAndData.bind(this);
        this.onCancelSignerStepTwo = this.onCancelSignerStepTwo.bind(this);
        this.onSubmitGoogleAuthTokenForSharedVault = this.onSubmitGoogleAuthTokenForSharedVault.bind(this);
        this.onSubmitAddVault = this.onSubmitAddVault.bind(this);
        this.onRemoveCoSigner = this.onRemoveCoSigner.bind(this);
        this.handleVaultName = this.handleVaultName.bind(this);
        this.sharedVaultTxnsHistory = this.sharedVaultTxnsHistory.bind(this);
        this.getSharedVaultData = this.getSharedVaultData.bind(this);
        this.handleToken = this.handleToken.bind(this);
        this.handleOnChangeSlider = this.handleOnChangeSlider.bind(this);
        this.onSideBarChanged = this.onSideBarChanged.bind(this);
        this.getAllVaultBalance = this.getAllVaultBalance.bind(this);
        this.getAllTxnsHistory = this.getAllTxnsHistory.bind(this);
    }
    _isMounted = false;

    static getDerivedStateFromProps(nextProps, prevState) {
        return true
    }

    async componentDidMount() {
        this._isMounted = true;

        /**
         * Clear data on allVaults route
         */
        if (this.props && this.props.vaultData) {
            this.setState({
                withdrawVaultSelect: this.props.vaultData
            })
        }
        if (this.props.match.path === '/allVaults') {
            this.props.client_manager.auth.saveUserSelectedVault(vaultData);
            await this.props.dispatch(set_logout_session());
        }
        this.getUserInfo();
        this.getAllTokens();
        const userDeatils = this.props.client_manager.auth.getUserDetails();
        this.updateVaultList(true)
        if (this.props.vaultData || (userDeatils && ((userDeatils.user_vault_address !== "undefined") && ((userDeatils.user_vault_address !== null))))) {
            if ((this.props.vaultData && this.props.vaultData.type === 'shared') || (userDeatils.vault_type === 'shared')) {
                this.getSharedVaultData()
            } else {
                this.getSingleVaultData()
            }
        } else {
            /**
             * Get All vaults balance
             */
            this.getAllVaultBalance();
            /**
             * Get All Graph Data
             */
            this.getAllGraphData();
            /**
             * Get All Txns History
             */
            this.getAllTxnsHistory();

            /**
             * Get All Vaults balance
             */
            this.getTotalBalance();
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    /**
     * Set Interval to update the balance and trxns
     */
    timerId = setInterval(() => {
        const userDeatils = this.props.client_manager.auth.getUserDetails();
        if (checkoutStats.isPathAllowed(this.props, '/dashboard')) {
            /**
             * Get is All vault enable or single vault enable
             */
            if (checkoutStats.isSingleAllowed(this.props, userDeatils)) {
                /**
                 * Check is shared vault enable or not
                 */
                if (checkoutStats.isVaultShared(this.props, userDeatils) && checkoutStats.isDataConsistant(this.props, userDeatils)) {
                    /** 
                     * Get Shared vault data
                     */
                    this.getSharedVaultData()
                } else if (checkoutStats.isDataConsistant(this.props, userDeatils)) {
                    /**
                     * Get single vault data
                     */
                    this.getSingleVaultData()
                }
            } else {
                /**
                 * Get All vaults balance
                 */
                this.getAllVaultBalance();
                /**
                 * Get All Graph Data
                 */
                this.getAllGraphData();
                /**
                 * Get All Txns History
                 */
                this.getAllTxnsHistory();
                /**
                 * Get All Vaults balance
                 */
                this.getTotalBalance();
            }
        }
    }, 60000);

    /**
     * getAllVaultBalance for shared and single
     */
    async getAllVaultBalance() {
        const header = this.props.client_manager.auth.getHeader();
        const singleVaultBalance = await helpers.getSingleAllVaultBalance(this.props, header)
        const sharedVaultBalance = await helpers.getSharedAllVaultBalance(this.props, header)
        const newBalanceData = [...singleVaultBalance.data, ...sharedVaultBalance.data]
        this.setState({
            vaultsBalance: newBalanceData
        })
    }
    /**
     * Get All Graph data for shared and single
     */
    async getAllGraphData() {
        const header = this.props.client_manager.auth.getHeader();
        const singleVaultGraph = await helpers.getSingleAllVaultGraph(this.props, header)
        const sharedVaultGraph = await helpers.getSharedAllVaultGraph(this.props, header)
        const newGraphData = [...singleVaultGraph.data, ...sharedVaultGraph.data]
        this.setState({
            graphData: newGraphData,
            filterGraphData: newGraphData
        })
        this.setGraphData(newGraphData)
    }

    /**
     * Get All txns history for shared and single vaults
     */
    async getAllTxnsHistory() {
        const header = this.props.client_manager.auth.getHeader();
        const singleVaultTxn = await helpers.getSingleAllTxnsHistory(this.props, header)
        const sharedVaultTxn = await helpers.getSharedAllTxnsHistory(this.props, header)

        const newtxnsDataDeposite = [...singleVaultTxn.data.deposits, ...sharedVaultTxn.data.deposits]
        const newtxnsDataWithdraw = [...singleVaultTxn.data.withdrawals, ...sharedVaultTxn.data.withdrawals]
        const newtxnsData = {
            deposits: newtxnsDataDeposite,
            withdrawals: newtxnsDataWithdraw
        }

        this.updateTransactionHistory('all', newtxnsData)
    }

    async getTotalBalance() {
        const header = this.props.client_manager.auth.getHeader();
        const totalVaultsBalance = await helpers.getAllVaultBalance(this.props, header);
        this.setState({
            totalBalance: totalVaultsBalance.data
        })
    }
    /**
     * Get Shared Vault data
     */
    getSharedVaultData(e) {
        this.getSharedVaultsBalance(true);
        this.sharedVaultGraphData(e);
        this.sharedVaultTxnsHistory(e);
    }
    /**
     * Get Shared Vault Txns History
     */
    sharedVaultTxnsHistory(e) {
        const { trasnactionHistoryFlag } = this.state;
        // this.setState({
        //     isTxnsLoading: true
        // })
        const header = this.props.client_manager.auth.getHeader();
        const userDeatils = this.props.client_manager.auth.getUserDetails();

        const vaultID = this.props.vaultData ? this.props.vaultData._id : userDeatils.user_vault_id;
        if (!vaultID) {
            this.props.client_manager.service.getSharedAllVaultTxns(
                header,
                (data) => {
                    this.setState({
                        isTxnsLoading: false
                    })

                    this.updateTransactionHistory('all', data.historyData.transactions)
                },
                (error) => {
                    this.setState({
                        isTxnsLoading: false
                    })
                });
        } else {
            this.props.client_manager.service.getSharedSingleVaultTxns(
                header,
                vaultID,
                trasnactionHistoryFlag,
                (data) => {
                    this.setState({
                        isTxnsLoading: false
                    })
                    this.updateTransactionHistory(trasnactionHistoryFlag, data.historyData.transactions)
                },
                (error) => {
                    this.setState({
                        isTxnsLoading: false
                    })
                });
        }
    }
    /**
     * Get Txns Vault History for Single Vault
     */
    getSingleVaultData() {
        this.graphData();
        this.getTransactionHistory(true)
        this.getVaultsBalance(true)
    }
    /**
     * Get Transaction history on dashboard
     */
    getTransactionHistory(isLoading) {
        const { trasnactionHistoryFlag } = this.state;
        this.setState({
            isTxnsLoading: isLoading
        })
        const header = this.props.client_manager.auth.getHeader();
        const userDeatils = this.props.client_manager.auth.getUserDetails();

        const vaultID = this.props.vaultData ? this.props.vaultData._id : userDeatils.user_vault_id;
        if (!vaultID) {
            // if (this.state.vaults.length > 0) {
            this.props.client_manager.service.getAllVaultsTxnsHistory(
                header,
                (data) => {
                    this.setState({
                        isTxnsLoading: false
                    })

                    this.updateTransactionHistory('all', data.historyData.transactions)
                },
                (error) => {
                    this.setState({
                        isTxnsLoading: false
                    })
                });
            // }
        } else {
            this.props.client_manager.service.getTransactionHistory(
                header,
                vaultID,
                trasnactionHistoryFlag,
                (data) => {
                    this.setState({
                        isTxnsLoading: false
                    })
                    this.updateTransactionHistory(trasnactionHistoryFlag, data.historyData.transactions)
                },
                (error) => {
                    this.setState({
                        isTxnsLoading: false
                    })
                });
        }
    }

    handleVaultName(e) {
        const key = e.target.id
        this.setState({
            [key]: e.target.value
        })
    }

    onSideBarChanged(value) {

        if (value === 'Overview') {

            this.props.dispatch(set_logout_session());

            this.props.client_manager.auth.setEmptyUserVault();

            this.setState({
                isOverview: !this.state.isOverview
            })


            /**
             * Get All vaults balance
             */
            this.getAllVaultBalance();
            /**
             * Get All Graph Data
             */
            this.getAllGraphData();
            /**
             * Get All Txns History
             */
            this.getAllTxnsHistory();
        }
    }
    /**
     * Shared Vault Graph Data
     */
    sharedVaultGraphData() {
        const header = this.props.client_manager.auth.getHeader();
        const userDeatils = this.props.client_manager.auth.getUserDetails();

        let vaultID = this.props.vaultData ? this.props.vaultData._id : userDeatils.user_vault_id;
        const { graphHistoryFlag } = this.state;
        if (vaultID) {
            this.props.client_manager.service.getSingleSharedGraphData(
                header,
                vaultID,
                graphHistoryFlag,
                (data) => {
                    this.setState({
                        graphData: data.data,
                        filterGraphData: data.data
                    })
                    this.setGraphData(data.data)
                },
                (error) => {
                });
        } else {
            this.props.client_manager.service.getSharedAllGraphData(
                header,
                graphHistoryFlag,
                (data) => {
                    this.setState({
                        graphData: data.data,
                        filterGraphData: data.data
                    })
                    this.setGraphData(data.data)
                },
                (error) => {
                });
        }
    }
    /**
     * graphData
     */
    graphData() {
        const header = this.props.client_manager.auth.getHeader();
        const userDeatils = this.props.client_manager.auth.getUserDetails();

        let vaultID = this.props.vaultData ? this.props.vaultData._id : userDeatils.user_vault_id;
        const { graphHistoryFlag } = this.state;
        if ((this.props.vaultData && this.props.vaultData.type === 'shared') || (userDeatils.vault_type === 'shared')) {
            this.sharedVaultGraphData();
        } else {
            if (vaultID) {
                this.props.client_manager.service.getSingleGraphData(
                    header,
                    vaultID,
                    graphHistoryFlag,
                    (data) => {
                        this.setState({
                            graphData: data.data,
                            filterGraphData: data.data
                        })
                        this.setGraphData(data.data)
                    },
                    (error) => {
                    });
            } else {
                this.props.client_manager.service.getAllGraphData(
                    header,
                    graphHistoryFlag,
                    (data) => {
                        this.setState({
                            graphData: data.data,
                            filterGraphData: data.data
                        })
                        this.setGraphData(data.data)
                    },
                    (error) => {
                    });
            }
        }
    }

    /**
     * Set graph data
     */
    setGraphData(graphData) {
        var fullGraphData = [];
        if (graphData.length > 0) {
            graphData.map((thread) => {
                const dateFormat = moment(thread.timestamp).format('D-MMM-YY');
                const transactionType = thread.transaction_type;
                const amount = thread.amount;
                fullGraphData.push({
                    label: dateFormat,
                    transactionType: transactionType,
                    value: amount
                });
                return thread
            })
            const yesterday = moment(graphData[0].timestamp).subtract(1, 'days');
            fullGraphData = [{
                label: yesterday.format('D-MMM-YY'),
                transactionType: 'withdraw',
                value: 0
            }, ...fullGraphData]
        } else {
            fullGraphData = [
                {
                    label: "23-Jan-20",
                    transactionType: 'withdraw',
                    value: "0"
                }
            ]
        }

        this.setState({
            graphDataWithLabels: fullGraphData
        });
    }

    /**
     * Update allTrasnactionHistory
     */
    updateTransactionHistory(trasnactionHistoryFlag, transactions) {
        if (transactions && (trasnactionHistoryFlag === 'all')) {
            let allTransactions = [];
            if (transactions.deposits.length > 0) {
                transactions.deposits.map((deposit) => {
                    allTransactions.push(deposit)
                    return deposit
                });
            }

            if (transactions.withdrawals.length > 0) {
                transactions.withdrawals.map((withdrawal) => {
                    allTransactions.push(withdrawal)
                    return withdrawal
                });
            }

            this.setState({
                allTrasnactionHistory: allTransactions,
                filterTrasnactionHistory: allTransactions
            });
        }
    }

    getAllTokens() {
        this.setState({
            isLoadingCryptoAsset: true
        })
        const header = this.props.client_manager.auth.getHeader();
        this.props.client_manager.service.getTokenList(header,
            (data) => {
                if (data.data.tokens.length > 0) {
                    let tokens = data.data.tokens.map((token) => {
                        return {
                            ...token,
                            label: token.name,
                            value: token.symbol
                        }
                    })
                    this.setState({
                        tokensList: tokens
                    })
                    this.setState({
                        isLoadingCryptoAsset: false
                    })
                }

            },
            (error) => {
                this.setState({
                    isLoadingCryptoAsset: false
                })
            })

    }

    handleCryptoAssetChange = cryptoAsset => {
        this.setState(
            { cryptoAsset }
        );
    };

    handleOnChangeSlider = sharedVaultData_maxSigner => {
        if ((parseInt(sharedVaultData_maxSigner, 10) >= 2) && (parseInt(sharedVaultData_maxSigner, 10) < 6)) {
            this.setState(
                { sharedVaultData_maxSigner }
            );
        }
    };

    /**
     * Get Shared Vault balance
     */
    getSharedVaultsBalance(isLoading) {
        this.setState({
            isLoadingBalance: isLoading
        })

        const header = this.props.client_manager.auth.getHeader();
        const userDeatils = this.props.client_manager.auth.getUserDetails();

        if (this.props.vaultData) {
            const vaultID = this.props.vaultData._id;
            const currency = this.props.vaultData.currency;

            this.props.client_manager.service.getSharedSingleVaultBalance(
                header,
                vaultID,
                currency,
                (data) => {
                    this.setState({
                        isLoadingBalance: false
                    })
                    const balanceData = [{
                        balances: data.data.balance,
                        currency: currency
                    }]
                    this.updateVaultBalance(balanceData)
                },
                (error) => {
                    this.setState({
                        isLoadingBalance: false
                    })
                });
        } else if (userDeatils.user_vault_id) {
            const vaultID = userDeatils.user_vault_id;
            const currency = userDeatils.user_vault_currency;

            this.props.client_manager.service.getSharedSingleVaultBalance(
                header,
                vaultID,
                currency,
                (data) => {
                    this.setState({
                        isLoadingBalance: false
                    })
                    const balanceData = [{
                        balances: data.data.balance,
                        currency: currency
                    }]
                    this.updateVaultBalance(balanceData)
                },
                (error) => {
                    this.setState({
                        isLoadingBalance: false
                    })
                });
        } else {
            this.props.client_manager.service.getSharedAllVaultBalance(
                header,
                (data) => {
                    this.setState({
                        isLoadingBalance: false
                    })
                    this.updateVaultBalance(data.data.vaults)
                },
                (error) => {
                    this.setState({
                        isLoadingBalance: false
                    })
                });
        }
    }
    /**
     * Get Transaction history on dashboard
     */
    getVaultsBalance(isLoading) {
        this.setState({
            isLoadingBalance: isLoading
        })

        const header = this.props.client_manager.auth.getHeader();
        const userDeatils = this.props.client_manager.auth.getUserDetails();

        if (this.props.vaultData) {
            const vaultID = this.props.vaultData._id;
            const currency = this.props.vaultData.currency;

            this.props.client_manager.service.getSingleVaultBalance(
                header,
                vaultID,
                currency,
                (data) => {
                    this.setState({
                        isLoadingBalance: false
                    })
                    const balanceData = [{
                        balances: data.data.balance,
                        currency: currency
                    }]
                    this.updateVaultBalance(balanceData)
                },
                (error) => {
                    this.setState({
                        isLoadingBalance: false
                    })
                });
        } else if (userDeatils.user_vault_id) {
            const vaultID = userDeatils.user_vault_id;
            const currency = userDeatils.user_vault_currency;

            this.props.client_manager.service.getSingleVaultBalance(
                header,
                vaultID,
                currency,
                (data) => {
                    this.setState({
                        isLoadingBalance: false
                    })
                    const balanceData = [{
                        balances: data.data.balance,
                        currency: currency
                    }]
                    this.updateVaultBalance(balanceData)
                },
                (error) => {
                    this.setState({
                        isLoadingBalance: false
                    })
                });
        } else {
            this.props.client_manager.service.getBalanceAllVaults(
                header,
                (data) => {
                    this.setState({
                        isLoadingBalance: false
                    })
                    this.updateVaultBalance(data.data.vaults)
                },
                (error) => {
                    this.setState({
                        isLoadingBalance: false
                    })
                });
        }
    }

    onCloseAction = (e) => {
        this.props.history.push('/dashboard')
    }

    handleToken(e) {
        const key = e.target.id
        this.setState({
            [key]: e.target.value
        })
    }
    /**
     * Get Shared Vault List
     */
    getSharedVaultList(data, isLoading) {
        const header = this.props.client_manager.auth.getHeader();
        this.props.client_manager.service.getSharedAllVaultBalance(
            header,
            (response) => {
                this.setState({
                    isLoadingBalance: false
                })
                const newVaults = [...data.data.vaults, ...response.data.vaults];

                let vaults = newVaults.map((vault) => {

                    return {
                        ...vault,
                        type: vault.type === 'single' ? 'single' : 'shared',
                        label: vault.name,
                        value: vault.address
                    }
                })
                this.setState({
                    vaults: vaults,
                })
                this.props.client_manager.auth.saveUserPreVault(vaults[0]);

            },
            (error) => {
                this.setState({
                    isLoadingBalance: false
                })
            });
    }
    /**
     * Update All vaults data
     */
    updateVaultList(isLoading) {

        const header = this.props.client_manager.auth.getHeader();

        this.props.client_manager.service.getBalanceAllVaults(
            header,
            (data) => {
                /**
                 * Get Shared Vault list also
                 */
                this.getSharedVaultList(data, isLoading)
            },
            (error) => {
                this.setState({
                    isLoadingBalance: false
                })
            });
    }

    onChangeVaultType = (e) => {
        const key = e.target.name;

        if (e.target.value === 'shared') {
            this.props.history.push('/sharedVault')
        }
        this.setState({
            [key]: e.target.value
        })
    }

    updateVaultBalance(vaults) {
        this.setState({
            vaultsBalance: vaults
        })
    }
    /**
     * Get Logged in user info
     */
    getUserInfo() {
        const header = this.props.client_manager.auth.getHeader();
        this.props.client_manager.service.getUserInfo(
            header,
            (data) => {
                this.setUserProfileInfo(data.data.profile);
            },
            (error) => {
            });
    }
    /**
     * onFilterTrasactions
     */
    onFilterTrasactions = (e, transactionType) => {
        e.preventDefault();
        let { allTrasnactionHistory, filterTrasnactionHistory } = this.state;

        this.setState(({
            trasnactionHistoryFlag: transactionType
        }))

        if (transactionType === 'receive') {
            filterTrasnactionHistory = allTrasnactionHistory.filter((transaction, idx) => {
                return transaction.transaction_type === 'deposit'
            });

            this.setState({
                filterTrasnactionHistory: filterTrasnactionHistory
            })
        }
        if (transactionType === 'sent') {
            filterTrasnactionHistory = allTrasnactionHistory.filter((transaction, idx) => {
                return transaction.transaction_type === 'withdraw'
            });

            this.setState({
                filterTrasnactionHistory: filterTrasnactionHistory
            })
        }

        if (transactionType === 'all') {
            filterTrasnactionHistory = allTrasnactionHistory.filter((transaction, idx) => {
                return transaction.transaction_type === 'withdraw' || transaction.transaction_type === 'deposit'
            });

            this.setState({
                filterTrasnactionHistory: filterTrasnactionHistory
            })
        }
    }

    onSubmitAddVault = async (e) => {
        e.preventDefault()
        await this.setState({
            modal: true,
            fade: true,
            isAddNewVault: true
        });
    }

    setUserProfileInfo = (userInfo) => {

        if (userInfo) {

            this.setState({
                email: userInfo.email,
                first_name: userInfo.first_name,
                last_name: userInfo.last_name,
                secondary_email: userInfo.secondary_email,
                tfa_type: userInfo.tfa_type,
                userID: userInfo._id,
                selectedVault: this.props.vaultData
            });
            /**
             * Store userInfo in localstoreg
             */
            this.props.client_manager.auth.saveUserProfile(userInfo);
        }
    }

    /**
     * Shared Vault functions
     */
    handleSharedVaultName(e) {
        const key = e.target.id
        this.setState({
            [key]: e.target.value
        })
    }

    handleCryptoSelectForSharedVault(crypto) {
        this.setState({
            sharedVaultData_cryptoAsset: crypto
        })
    }

    handleSharedVaultEmailCurrentCoSigner(e) {
        const key = e.target.id
        this.setState({
            [key]: e.target.value
        })
    }

    handleAddCoSignerCountAndData = (e) => {
        const { sharedVaultData_currentSignerCount, sharedVaultData_coSignerData, sharedVaultData_currentCoSignerEmail } = this.state;
        /**
         * User can add as many coSigner want
         */
        if (sharedVaultData_coSignerData.length < 5 && sharedVaultData_currentCoSignerEmail) {
            sharedVaultData_coSignerData.push(sharedVaultData_currentCoSignerEmail)
            this.setState({
                sharedVaultData_currentSignerCount: sharedVaultData_currentSignerCount + 1,
                sharedVaultData_coSignerData: sharedVaultData_coSignerData,
            })
        }
    };


    onStepTwoSharedVault = () => {
        this.setState({
            isCoSignerModalOpen: false,
            isOpenAuthForCreateSharedVault: false,
            isCoSignerWarningPopupEnable: true,
            isCoSignerWarningPopupModal: true,
            isCoSignerWarningPopupFade: true,
        })
    }

    onStepThreeSharedVault = async () => {
        /**
         * Need to Make the API call to create shared vault
         */
        await this.createSharedVault();
    }

    createSharedVault = () => {
        this.setState({
            isCreatingSharedVault: true
        })
        const { sharedVaultData_vaultName, sharedVaultData_cryptoAsset, sharedVaultData_coSignerData, sharedVaultData_maxSigner } = this.state;
        const form = {
            name: sharedVaultData_vaultName,
            currency: sharedVaultData_cryptoAsset.symbol,
            signers: sharedVaultData_coSignerData,
            numberOfSignatures: sharedVaultData_maxSigner,
            numberOfSigners: sharedVaultData_coSignerData.length,
        }

        const header = this.props.client_manager.auth.getHeader();
        this.props.client_manager.service.createSharedVault(header, form,
            (res) => {
                this.setState({
                    isCreatingSharedVault: false,
                    isCoSignerWarningPopupEnable: false,
                    isCoSignerWarningPopupModal: false,
                    isCoSignerWarningPopupFade: false,

                    isCoSignerSummaryOnePopupEnable: true,
                    isCoSignerSummaryOnePopupModal: true,
                    isCoSignerSummaryOnePopupFade: true,
                })

            },
            (error) => {
                this.setState({
                    error: error.response.data.payload.message,
                    isCreatingSharedVault: false
                })
            })

    }

    onSubmitGoogleAuthToken = (e) => {
        e.preventDefault()
        this.setState({
            isGAuthLoading: true
        })
        const form = {
            token: this.state.token
        }

        const header = this.props.client_manager.auth.getHeader();
        this.props.client_manager.service.confirmGoogleAuthToken(header, form,
            (res) => {

                this.setState({
                    isWithdrawNextOpen: true,
                    isWithdrawNextFade: true,
                    isWithdrawIntiFade: false,
                    isWithdrawIntiOpen: false,
                    isGAuthLoading: false
                })
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

    onSubmitGoogleAuthTokenForAddNewVault = (e) => {
        e.preventDefault()
        this.setState({
            isGAuthLoading: true
        })
        const form = {
            token: this.state.token
        }

        const header = this.props.client_manager.auth.getHeader();
        this.props.client_manager.service.confirmGoogleAuthToken(header, form,
            (res) => {
                /**
                 * Call Generate New Vault API
                 */
                this.generateNewVault()
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


    generateNewVault() {

        const userDetails = this.props.client_manager.auth.getUserDetails()
        const form = {
            type: this.state.vaultType,
            email: userDetails.user_email,
            name: this.state.vaultName,
        };

        const header = this.props.client_manager.auth.getHeader();
        this.props.client_manager.service.createNewVault(header, form,
            (res) => {
                /**
                 * Call Generate New Vault API
                 */
                toast.success(message.SINGLE_VAULT_CREATED,
                    {
                        position: toast.POSITION.TOP_RIGHT
                    });
                this.updateNewVaultSummary(res.data)

            },
            (error) => {
                this.setState({
                    error: error.response.data.payload.message,
                    isGAuthLoading: false
                })
            })
    }

    updateNewVaultSummary(data) {
        if (data) {
            this.setState({
                newVaultSummary: {
                    walletAddress: data.walletAddress,
                    publicKey: data.publicKey,
                    transactionHash: data.transactionHash,
                    _id: data._id ? data._id : ''
                },
                isGAuthLoading: false,
                isSummaryPage: true
            })
        }
    }

    onSubmitGoogleAuthTokenForSharedVault = (e) => {
        e.preventDefault()
        this.setState({
            isGAuthLoading: true,
            error: undefined
        })
        const form = {
            token: this.state.token
        }

        const header = this.props.client_manager.auth.getHeader();
        this.props.client_manager.service.confirmGoogleAuthToken(header, form,
            (res) => {
                this.onStepTwoSharedVault();
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
    onRedirect = (e) => {
        e.preventDefault();
        const link = e.target.attributes.to.value;
        this.props.history.push(link);
    }

    onSelectVault = (e, selectedVault) => {
        e.preventDefault();
        this.props.dispatch(set_selected_vault(selectedVault));
        /**
         * Update VaultID state when we are selecting vault
         */
        this.props.client_manager.auth.saveUserSelectedVault(selectedVault);
        this.props.history.push('/dashboard');
    }

    onSelectSharedVault = (e, selectedVault) => {
        e.preventDefault();
        this.props.dispatch(set_selected_vault(selectedVault));
        /**
         * Update VaultID state when we are selecting vault
         */
        this.props.client_manager.auth.saveUserSelectedVault(selectedVault);
        this.props.history.push('/dashboard');
    }

    /**
     * onSwitchVaultType
     */
    onSwitchVaultType = async (e, vaultType) => {
        e.preventDefault();
        let currentVaultType = vaultType;
        if (vaultType === 'all') {
            this.setState({
                currentVaultType: 'all'
            })
        } else if (vaultType === 'single') {
            this.setState({
                currentVaultType: 'single'
            })
        } else if (vaultType === 'shared') {
            this.setState({
                currentVaultType: 'shared'
            })
        }

        const header = this.props.client_manager.auth.getHeader();
        if (currentVaultType === 'single') {
            const singleVaultBalance = await helpers.getSingleAllVaultBalance(this.props, header)

            this.setState({
                vaultsBalance: singleVaultBalance.data
            })

            const singleVaultTxn = await helpers.getSingleAllTxnsHistory(this.props, header)
            this.updateTransactionHistory('all', singleVaultTxn.data)

            const singleVaultGraph = await helpers.getSingleAllVaultGraph(this.props, header)

            this.setState({
                graphData: singleVaultGraph.data,
                filterGraphData: singleVaultGraph.data
            })

            this.setGraphData(singleVaultGraph.data)
        } else if (currentVaultType === 'shared') {
            const sharedVaultBalance = await helpers.getSharedAllVaultBalance(this.props, header)

            this.setState({
                vaultsBalance: sharedVaultBalance.data
            })

            const sharedVaultTxn = await helpers.getSharedAllTxnsHistory(this.props, header)

            this.updateTransactionHistory('all', sharedVaultTxn.data)

            const sharedVaultGraph = await helpers.getSharedAllVaultGraph(this.props, header)

            this.setState({
                graphData: sharedVaultGraph.data,
                filterGraphData: sharedVaultGraph.data
            })

            this.setGraphData(sharedVaultGraph.data)
        } else if (currentVaultType === 'all') {
            /**
             * Get All vaults balance
             */
            this.getAllVaultBalance();
            /**
             * Get All Graph Data
             */
            this.getAllGraphData();
            /**
             * Get All Txns History
             */
            this.getAllTxnsHistory();
        }

    }

    onShowSharedVaultDetails = (e, selectedVault, isRedirected) => {
        e.preventDefault();
        const header = this.props.client_manager.auth.getHeader();
        const vaultID = selectedVault._id;
        this.props.client_manager.service.getSignersSharedVaultData(header, vaultID,
            (res) => {
                selectedVault = Object.assign(selectedVault, {
                    signers: res.data[0].signers
                })
                this.updateSigners(selectedVault, isRedirected);
            },
            (error) => {
                this.setState({
                    error: error.response.data.payload.message,
                    isGAuthLoading: false
                })
            })

    }

    updateSigners(sharedVaultDetails, isRedirected) {
        this.props.dispatch(set_shared_vault_details(sharedVaultDetails));
        if (isRedirected) {
            this.props.history.push('/SharedVaultStatus');
        }
    }

    onContinueWithdraw = (e) => {
        e.preventDefault();
        this.toggle();
    }

    onOpenAuthForCreateSharedVault = (e) => {
        e.preventDefault();
        this.setState({
            isOpenAuthForCreateSharedVault: true
        })
    }

    onCancelWithdraw = (e) => {
        e.preventDefault();
        this.props.history.push('/dashboard');
    }

    onBackFromShared = (e) => {
        e.preventDefault();
        this.props.history.push('/addNewVault');
    }

    onCancelSignerStepTwo = (e) => {
        e.preventDefault();
        this.setState({
            isCoSignerWarningPopupEnable: false,
            isCoSignerWarningPopupModal: false,
            isCoSignerWarningPopupFade: false,
        })
    }

    onShowNextDepositSummary = (e) => {
        e.preventDefault();
        this.setState({
            isDepositNextOpen: true,
            isDepositNextFade: true,
            isDepositIntiFade: false,
            isDepositIntiOpen: false
        })
    }

    async toggle() {
        await this.setState({
            modal: !this.state.modal,
            fade: !this.state.fade,
            isWithdrawVerified: !this.state.isWithdrawVerified
        });
    }

    coSignerAuthToggle() {
        this.setState({
            coSignerAuthModal: !this.state.coSignerAuthModal,
            coSignerAuthFade: !this.state.coSignerAuthFade,
        });
    }

    onCloseDeposit = (e) => {
        e.preventDefault();
        this.setState({
            isDepositNextOpen: false,
            isDepositNextFade: false,
            isDepositIntiFade: false,
            isDepositIntiOpen: false
        })
        this.props.history.push('/dashboard');
    }

    onCopied = (e) => {
        e.preventDefault();
        this.setState({
            isCopied: true
        })
    }

    onShowDeadManSwitchUI = (e) => {
        e.preventDefault();
        this.setState({
            ishowDeadManSwitch: true
        })
    }

    onSubmitWithdraw = (e) => {
        e.preventDefault();
        /**
         * API call to submit withdraw transaction
         */
        this.setState({
            withdrawLoading: true
        })
        const { withdrawReceiver, withdrawAmount, withdrawVaultSelect } = this.state;

        if (withdrawVaultSelect.type === 'shared') {

            const form = {
                receiver: withdrawReceiver,
                amount: parseFloat(withdrawAmount),
                symbol: withdrawVaultSelect ? withdrawVaultSelect.currency : 'ETH',
                vault_name: withdrawVaultSelect.name
            }
            const header = this.props.client_manager.auth.getHeader();
            const vaultID = this.state.selectedVault ? this.state.selectedVault._id : this.state.vaults[0]._id;
            this.props.client_manager.service.sharedVaultWithdrawAPI(
                header,
                form,
                vaultID,
                (data) => {
                    this.setState({
                        withdrawLoading: false
                    })
                    toast.success(message.WITHDRAW_SUCCESS,
                        {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    this.props.history.push('/dashboard');
                },
                (error) => {
                    toast.error(message.WITHDRAW_TRANSACTION_FAILD,
                        {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    this.setState({
                        withdrawLoading: false,
                        withdrawError: message.WITHDRAW_TRANSACTION_FAILD,
                    })
                });
        } else {
            this.setState({
                withdrawLoading: true
            })

            const form = {
                receiver: withdrawReceiver,
                amount: parseFloat(withdrawAmount),
                symbol: withdrawVaultSelect ? withdrawVaultSelect.currency : 'ETH'
            }
            const header = this.props.client_manager.auth.getHeader();
            const vaultID = this.state.selectedVault ? this.state.selectedVault._id : this.state.vaults[0]._id;
            this.props.client_manager.service.withdrawCryptoAPI(
                header,
                form,
                vaultID,
                (data) => {
                    this.setState({
                        withdrawLoading: false
                    })
                    toast.success(message.WITHDRAW_SUCCESS,
                        {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    this.props.history.push('/dashboard');
                },
                (error) => {
                    toast.error(message.WITHDRAW_TRANSACTION_FAILD,
                        {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    this.setState({
                        withdrawLoading: false,
                        withdrawError: message.WITHDRAW_TRANSACTION_FAILD,
                    })
                });
        }
    }

    handleWithdrawVaultSelect = withdrawVaultSelect => {
        if (withdrawVaultSelect) {
            this.props.dispatch(set_selected_vault(withdrawVaultSelect));

            this.setState(
                {
                    withdrawVaultSelect,
                    selectedVault: withdrawVaultSelect,
                    withdrawSymbol: withdrawVaultSelect.currency
                }
            );
            this.props.client_manager.auth.saveUserSelectedVault(withdrawVaultSelect);
        }

    };

    handleDepositVaultSelect = depositVaultSelect => {
        if (depositVaultSelect) {

            this.props.dispatch(set_selected_vault(depositVaultSelect));
            this.setState(
                {
                    depositVaultSelect,
                });
            this.props.client_manager.auth.saveUserSelectedVault(depositVaultSelect);
        }
    };

    handleRangeFilter = selectedRangeFilter => {
        this.setState(
            { selectedRangeFilter }
        );
    };

    onInputChange = (e) => {
        const key = e.target.id
        this.setState({
            [key]: e.target.value
        })
    }

    showConfigScreen = (e) => {
        e.preventDefault();
        this.setState({
            isConfigScreenShow: true
        })
    }

    handleWithdrawAmount = (e, hightAmount) => {
        e.target.value = e.target.value.replace(/^0+/, '')
        const key = e.target.id
        if (parseFloat(e.target.value) <= parseFloat(hightAmount)) {
            this.setState({
                [key]: parseFloat(e.target.value)
            })
        } else if (!e.target.value) {
            this.setState({
                [key]: 0
            })
        }
    }

    handleWithdrawAssetChange = async (withdrawSymbol) => {
        this.setState(
            { withdrawSymbol }
        );
    };

    handleSortFilter = async (selectedSortFilter) => {
        this.setState(
            { selectedSortFilter }
        );
    };

    onRemoveCoSigner = (e, signer) => {
        e.preventDefault();
        var { sharedVaultData_coSignerData } = this.state;
        sharedVaultData_coSignerData = sharedVaultData_coSignerData.filter((thread) => {
            return thread.toLowerCase() !== signer.toLowerCase()
        })
        this.setState({
            sharedVaultData_coSignerData: sharedVaultData_coSignerData
        });
    }

    handleChangeStartDatePicker = date => {
        this.setState({
            startDate: date
        });
        const { endDate } = this.state;
        this.filterTrasnactionHistoryOnDateChange(date, endDate);
    };

    handleChangeEndDatePicker = date => {
        this.setState({
            endDate: date
        });
        const { startDate } = this.state;
        this.filterTrasnactionHistoryOnDateChange(startDate, date);
    };


    filterTrasnactionHistoryOnDateChange = (startDate, endDate) => {

        let { filterTrasnactionHistory, allTrasnactionHistory } = this.state;
        /**
         * Filter the transaction history according to date range
         */
        if (allTrasnactionHistory.length > 0) {
            filterTrasnactionHistory = allTrasnactionHistory.filter((transaction, idx) => {
                return (moment(transaction.timestamp) > moment(startDate) && moment(transaction.timestamp) < moment(endDate))
            });

            this.setState({
                filterTrasnactionHistory: filterTrasnactionHistory
            })
        }
    }


    render() {
        return <Fulllayout
            onRedirect={this.onRedirect}
            onSubmit={this.onSubmit}
            onInputChange={this.onInputChange}
            onFilterTrasactions={this.onFilterTrasactions}
            onSelectVault={this.onSelectVault}
            handleOnChangeSlider={this.handleOnChangeSlider}
            onSelectSharedVault={this.onSelectSharedVault}
            onShowSharedVaultDetails={this.onShowSharedVaultDetails}
            onContinueWithdraw={this.onContinueWithdraw}
            onCancelWithdraw={this.onCancelWithdraw}
            onCloseDeposit={this.onCloseDeposit}
            onSubmitAddVault={this.onSubmitAddVault}
            onSubmitWithdraw={this.onSubmitWithdraw}
            handleWithdrawVaultSelect={this.handleWithdrawVaultSelect}
            handleDepositVaultSelect={this.handleDepositVaultSelect}
            handleWithdrawAssetChange={this.handleWithdrawAssetChange}
            handleWithdrawAmount={this.handleWithdrawAmount}
            handleToken={this.handleToken}
            onShowNextDepositSummary={this.onShowNextDepositSummary}
            handleRangeFilter={this.handleRangeFilter}
            onShowDeadManSwitchUI={this.onShowDeadManSwitchUI}
            handleSortFilter={this.handleSortFilter}
            handleChangeStartDatePicker={this.handleChangeStartDatePicker}
            handleChangeEndDatePicker={this.handleChangeEndDatePicker}
            onSubmitGoogleAuthToken={this.onSubmitGoogleAuthToken}
            onOpenAuthForCreateSharedVault={this.onOpenAuthForCreateSharedVault}
            onCopied={this.onCopied}
            onSideBarChanged={this.onSideBarChanged}
            handleSharedVaultName={this.handleSharedVaultName}
            handleCryptoSelectForSharedVault={this.handleCryptoSelectForSharedVault}
            handleSharedVaultEmailCurrentCoSigner={this.handleSharedVaultEmailCurrentCoSigner}
            handleAddCoSignerCountAndData={this.handleAddCoSignerCountAndData}
            handleCryptoAssetChange={this.handleCryptoAssetChange}
            onStepTwoSharedVault={this.onStepTwoSharedVault}
            onStepThreeSharedVault={this.onStepThreeSharedVault}
            onCancelSignerStepTwo={this.onCancelSignerStepTwo}
            onSubmitGoogleAuthTokenForSharedVault={this.onSubmitGoogleAuthTokenForSharedVault}
            onRemoveCoSigner={this.onRemoveCoSigner}
            onSwitchVaultType={this.onSwitchVaultType}
            onSubmitGoogleAuthTokenForAddNewVault={this.onSubmitGoogleAuthTokenForAddNewVault}
            onCloseAction={this.onCloseAction}
            getSingleVaultData={this.getSingleVaultData}
            getTxnsForSingleHistory={this.getTxnsForSingleHistory}
            handleVaultName={this.handleVaultName}
            onBackFromShared={this.onBackFromShared}
            onChangeVaultType={this.onChangeVaultType}
            getSharedVaultData={this.getSharedVaultData}
            showConfigScreen={this.showConfigScreen}
            {...this.state}
            {...this.props}
        />
    }
}

function mapStatestoProps(state) {
    return {
        vaultData: state.registration.vaultData,
        sharedVaultDetails: state.registration.sharedVaultDetails
    }
}

export const DashboardContainer = withRouter(connect(mapStatestoProps)(_DashboardContainer));
