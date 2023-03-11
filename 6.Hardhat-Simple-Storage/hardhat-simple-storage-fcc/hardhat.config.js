require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config()

//added (8:54:18): 
require("@nomiclabs/hardhat-etherscan")

/** @type import('hardhat/config').HardhatUserConfig */
                                    
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

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
    }
  },
  solidity: "0.8.8",
  etherscan: ETHERSCAN_API_KEY,
};
 