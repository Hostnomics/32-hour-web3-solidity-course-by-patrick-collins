const { task } = require("hardhat/config");

require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config()

//added (8:54:18): 
require("@nomiclabs/hardhat-etherscan")

//added 9:16:38 - import blockNumber task in tasks/block-number.js
require("./tasks/block-number")

//Added 9:39:18
require("hardhat-gas-reporter")

//Added 9:45:53
require("solidity-coverage")

//At (9:11:22) - Example of Custom Task. 
// Learn more at https://hardhat.org/guides/create-task.html
task("custom-print-acct-test", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for(const account of accounts){
    console.log(account.address)
  }
})



/** @type import('hardhat/config').HardhatUserConfig */
                                    
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "https://eth-sepolia/example" //OR like in laravel at 9:44:35
const PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY || "0xkey"

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key"

const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "key"

module.exports = {
  // defaultNetwork: "hardhat",
  defaultNetwork: "hardhat",
  networks: {
        sepolia: {
          url: SEPOLIA_RPC_URL,
          accounts: [PRIVATE_KEY],  
          chainId: 11155111,
          // https://sepolia.infura.io/v3/
          // 11155111
        },
        localhost: {
          url: "http://127.0.0.1:8545/",
          // accounts: (already provided in localhost terminal 10 accts)
          chainId: 31337,
        }
  },
  solidity: "0.8.8",
  etherscan: {
      apiKey: ETHERSCAN_API_KEY,
  }, 
  gasReporter: {
      // enabled: true,  //TURN OFF WHEN DON"T NEED IT.
      enabled: false,
      outputFile: "gas-report.txt",
      noColors: true,
      currency: "USD",
      coinmarketcap: COINMARKETCAP_API_KEY,
      token: "MATIC",
  }

};
 


