//Import networkConfig a t(10:34:43)
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
    //SAME AS IF:
        // const helperConfig = require("../helper-hardhat-config")
        // const networkConfig = helperConfig.networkConfig //(10:35:22)

const {network} = require("hardhat") //Added (10:39:02) and used `const chainId = network.config.chainId`

//Not sure if needed for process.env.ETHERSCAN_API_KEY
require("dotenv").config()

//Added 10:55:02
const {verify} = require("../utils/verify")

//created and tested at (10:14:25)
// hre is the Hardhat Runtime Environment (10:17)
// async function deployFunc(hre){
//         // console.log("hi"); 
//     hre.getNamedAccounts()
//     hre.deployments()
// }
// module.exports.default = deployFunc

//Preferred way to write this (10:16:24)

//syntactic surgar (10:18)
// module.exports = async (hre) => {
//     const { getNamedAccounts, deployments } = hre
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    // At (10:31:34) - Use AAVE Solution, if ChainID = X use X Addy. If Y use Y Addy.
    // See AAVE github: https://github.com/aave/aave-v3-core
    // Use AAVE helper-hardhat-config.ts: https://github.com/aave/aave-v3-core/blob/master/helper-hardhat-config.ts

//Changed to let at (10:50:05)
    // const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"] //Added (10:36:24)

//Tried commenting out so we could compile to sepholia at (~10:58)
    let ethUsdPriceFeedAddress
    if(developmentChains.includes(network.name)){
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    }else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"] 
    }


//At (10:55:32)
const args = [ethUsdPriceFeedAddress]
    //(10:23:28) - NOTE: When going for localhost or hardhat network we want to use a mock // How change chains?     
    //At (10:30:33) - deploy name of contract, for FundMe.sol with list of overrides: 
    const fundMe = await deploy("FundMe", {
        from: deployer,
        //args: [address],
        args: args,
        // args: [ethUsdPriceFeedAddress],
        // args: [
            /* address? */
            // address            
        // ],   //(put price feed address) pass any args to constructor in FundMe.sol, single arg `address priceFeedAddress` (10:30:50)
        log: true,
        //At (10:57:39)
        waitConfirmations: network.config.blockConfirmations || 1,
    })

//At (10:53:30)
    if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY){
        //verify code like what we had in lesson 6 - deploy.js
        await verify(fundMe.address, args)

    }
    log("---------------------------terminado-----------------------------------")
} 

//(10:51:42) - Deploy JUST this script with yarn hardat deploy --tags fundme
module.exports.tags = ["all", "fundme"]

// module.exports = async (hre) => {
//     const { getNamedAccounts, deployments } = hre
            // hre.getNamedAccounts
            // hre.deployments

// }