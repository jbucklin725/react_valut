const getSingleAllVaultBalance = (props, header) => {
    return new Promise((resolve, reject)=>{
        props.client_manager.service.getBalanceAllVaults(
            header,
            (data) => {
                resolve(
                    {
                        success: true,
                        data: data.data.vaults
                    }
                )
            },
            (error) => {
                reject(
                    {
                        success: false,
                        data: []
                    }
                )
            });
    })
   
}

const getSingleAllVaultGraph = (props, header) => {
    const graphHistoryFlag = 'year';
    return new Promise((resolve, reject)=>{
        props.client_manager.service.getAllGraphData(
            header,
            graphHistoryFlag,
            (data) => {
                resolve(
                    {
                        success: true,
                        data: data.data
                    }
                )
            },
            (error) => {
                reject(
                    {
                        success: false,
                        data: []
                    }
                )
            });
    })
}

const getSingleAllTxnsHistory = (props, header) => {
    return new Promise((resolve, reject)=>{
        props.client_manager.service.getAllVaultsTxnsHistory(
            header,
            (data) => {
                resolve(
                    {
                        success: true,
                        data: data.historyData.transactions
                    }
                )
            },
            (error) => {
                reject(
                    {
                        success: false,
                        data: []
                    }
                )
            });
    })
}

const getSharedAllVaultBalance = (props, header) => {
    return new Promise((resolve, reject)=>{
        props.client_manager.service.getSharedAllVaultBalance(
            header,
            (data) => {
                resolve(
                    {
                        success: true,
                        data: data.data.vaults
                    }
                )
            },
            (error) => {
                reject(
                    {
                        success: false,
                        data: []
                    }
                )
            });
    })
}

const getSharedAllVaultGraph = (props, header) => {
    const graphHistoryFlag = 'year';
    return new Promise((resolve, reject)=>{
        props.client_manager.service.getSharedAllGraphData(
            header,
            graphHistoryFlag,
            (data) => {
                resolve(
                    {
                        success: true,
                        data: data.data
                    }
                )
            },
            (error) => {
                reject(
                    {
                        success: false,
                        data: []
                    }
                )
            });
    })
}

const getSharedAllTxnsHistory = (props, header) => {
    return new Promise((resolve, reject)=>{
        props.client_manager.service.getSharedAllVaultTxns(
            header,
            (data) => {
                resolve(
                    {
                        success: true,
                        data: data.historyData.transactions
                    }
                )
            },
            (error) => {
                reject(
                    {
                        success: false,
                        data: []
                    }
                )
            });
    })
}
/**
 * Get All Shared Vault balance
 */
const getAllVaultBalance = (props, header) => {
    return new Promise((resolve, reject)=>{
        props.client_manager.service.getAllVaultsBalance(
            header,
            (data) => {
                resolve(
                    {
                        success: true,
                        data: data && data.data ? data.data.balance : 0
                    }
                )
            },
            (error) => {
                reject(
                    {
                        success: false,
                        data: 0
                    }
                )
            });
    })
}

module.exports = {
    getSingleAllVaultBalance,
    getSingleAllVaultGraph,
    getSingleAllTxnsHistory,
    getSharedAllVaultBalance,
    getSharedAllVaultGraph,
    getSharedAllTxnsHistory,
    getAllVaultBalance
}