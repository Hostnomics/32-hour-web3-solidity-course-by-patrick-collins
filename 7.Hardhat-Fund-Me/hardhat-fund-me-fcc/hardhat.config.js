require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config()

//added (8:54:18): 
require("@nomiclabs/hardhat-etherscan")
//Added 9:39:18
require("hardhat-gas-reporter")
//Added 9:45:53
require("solidity-coverage")

//NEW ONE, added in his default (hardhat v 2.9.3) shown at (10:06:02)
// Since it's @nomiclabs/hardhat-waffle, probably install like: https://github.com/NomicFoundation/hardhat-waffle
// require("@nomiclabs/hardhat-waffle")

//Added at 10:12:01 - hardhat-deploy package: 
require("hardhat-deploy")


const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "https://eth-sepolia/example" //OR like in laravel at 9:44:35
const PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY || "0xkey"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key"
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "key"

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  // solidity: "0.8.8",  //specify two versions at 10:43:13
  solidity: {
    compilers: [
      { version: "0.8.8" }, 
      { version: "0.6.6" }
    ],
  },
  defaultNetwork: "hardhat", //Added (10:22:10) - Moved here (10:29)
  networks: {
    //Set up Test network (10:57)
      sepolia: {
        // url: SEPOLIA_RPC_URL || "",
        url: SEPOLIA_RPC_URL,
        accounts: [PRIVATE_KEY],
        chainId: 11155111,
        //Add confirmations (10:57:31)
        blockConfirmations: 6,
        // https://sepolia.infura.io/v3/
        // 11155111
      },
      // localhost: {
      //   url: "http://127.0.0.1:8545/",
      //   // accounts: (already provided in localhost terminal 10 accts)
      //   chainId: 31337,
      // }
  },
    etherscan: {
      apiKey: ETHERSCAN_API_KEY,
  }, 
  gasReporter: {
      // enabled: process.env.REPORT_GAS !== undefined,
      // currency: "USD",

      enabled: true,  //TURN OFF WHEN DON"T NEED IT.
      // enabled: false,
      outputFile: "gas-report.txt",
      noColors: true,
      currency: "USD",
      coinmarketcap: COINMARKETCAP_API_KEY,
      token: "MATIC",
  },
  namedAccounts: {
    deployer: {
      31337: 1,
      // default: 0,
      // 11155111: 1,
      // 31337: 2,
    }
  }
};
