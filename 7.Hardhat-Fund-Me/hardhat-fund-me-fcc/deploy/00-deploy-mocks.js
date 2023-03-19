// Created at (10:38:34)
const {network} = require("hardhat") 
const {developmentChains, DECIMALS, INITIAL_ANSWER} = require("../helper-hardhat-config") //10:44:50

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    // if (chainId != asdfasdf){ deploymocks }
    // if(developmentChains.includes(chainId)){
    if(developmentChains.includes(network.name)){    //updated at (10:49:11) helper script using names not chain ids
        // {deploymocks}
        log("Local network detected, deploying mocks..")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSWER],
        })
        log("Mocks deployed!")
        log("-------------------terminado----------------------------")
    }
}


//Run only deploy mock scripts (10:48:32) //THEN run deploy with flag "tags" ie yarn hardhat deploy --tags mocks
module.exports.tags = ["all", "mocks"]

//Constructor Args from: https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.6/tests/MockV3Aggregator.sol
// constructor(
//     uint8 _decimals,
//     int256 _initialAnswer
//   ) public {
//     decimals = _decimals;
//     updateAnswer(_initialAnswer);
//   }

