const contractAddress = 'df7667823943deb71d14cefaa9ad5e591f831cc0b67f67b15756ff95cf47a96a' ///// paste (base58) key of SmartContract instead of current key
//const contractAddress = '' ///// paste (base58) key of SmartContract instead of current key



const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb, contractAddress) {
        console.log('contractAddress', contractAddress)
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress)
    },

};

export default utils;

