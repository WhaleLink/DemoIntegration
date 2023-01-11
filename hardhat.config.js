require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",

  networks: {
    main: {
      url: process.env.MAIN_NETWORK_URL,
      accounts: [process.env.PRIVATE_KEY_DEPLOYMENT],
    },
    polygon: {
      url: process.env.POLYGON_NETWORK_URL,
      accounts: [process.env.PRIVATE_KEY_DEPLOYMENT],
    },
    bsc: {
      url: process.env.BINANCE_SMART_CHAIN_URL,
      accounts: [process.env.PRIVATE_KEY_DEPLOYMENT],
    },
    goerli: {
      url: process.env.GOERLI_NETWORK_URL,
      accounts: [process.env.PRIVATE_KEY_TEST],
    },
    mumbai: {
      url: process.env.MUMBAI_NETWORK_URL,
      accounts: [process.env.PRIVATE_KEY_TEST],
    },
    bsctest: {
      url: process.env.BINANCE_SMART_CHAIN_TEST_URL,
      accounts: [process.env.PRIVATE_KEY_TEST],
    },
  },

  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY
    }
  }
}
