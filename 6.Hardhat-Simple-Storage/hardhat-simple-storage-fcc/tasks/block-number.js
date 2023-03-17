//Custom Task at 9:12:10 - to get current block number of whatever chain we are working on. 

const { task } = require("hardhat/config")

//Basic Format: 
// task("block-number", "Prints the current block number", async () => { })
//or
// // task("block-number", "Prints the current block number").setAction()

task("block-number", "Prints the current block number").setAction(
    async (taskArgs, hre) => {
       const blockNumber = await hre.ethers.provider.getBlockNumber()
       console.log(`Current Block Number: ${blockNumber}`)
    }
)