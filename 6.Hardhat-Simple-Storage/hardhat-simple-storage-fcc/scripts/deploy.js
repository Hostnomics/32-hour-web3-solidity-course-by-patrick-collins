// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

//default import form hardhat sample project:
// const hre = require("hardhat");

//Instead of const { ethers } = require("ethers")
//8:57:36 - import `run` form hardhat, which allows us to RUN any hardhat task.
//9:01:50 - import network from hardhat to check if we are on a live network (thus call verify)
const { ethers, run, network } = require("hardhat")

async function main() {

    //hardhat knows about the contracts directory: 
    const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    console.log("Deploying contract custom message...")

    const simpleStorage = await SimpleStorageFactory.deploy(); 
    await simpleStorage.deployed(); 
    console.log(`Deployed contract to: ${simpleStorage.address}`)

        //Returns Large Object in terminal: 
            // console.log(`We are on network: ${network.config}`)
            // console.log(network.config)
            // console.log('end of network.config log')

//At 9:03:40 - ONLY run verify function if we are on Sepolia chain and Etherscan API Key exists
    if (network.config.chainId === 1155111 && process.env.ETHERSCAN_API_KEY){
        //wait 6 block confirmations added (9:06:20)
        await simpleStorage.deployTransaction.wait(6)
        await verify(simpleStorage.address, [])
    }


// At 9:07:07 - Interact with our Contract (set and retrieve favorite number)
//GET Favorite Num
    const currentValue = await simpleStorage.retrieve()
    console.log(`Current Favorite Number is: ${currentValue}`)

//SET Favorite Num
    const transactionResponse = await simpleStorage.store(8)
//Wait 1 block confirmation
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated Value is: ${updatedValue}`)

}



    //At (8:52:15) / (8:57:08)- added verify which takes the place of manually copy/paste etc on sepholia.etherscan.com
async function verify(contractAddress, args){
    console.log("Verifying contract...")
    
        try{
                await run("verify:verify", {
                    address: contractAddress,
                    constructorArguments: args,
                })
        } catch (e) {
            if(e.message.toLowerCase().includes("already verified")){
                console.log("Already Verifie homie!!")
            }else{
                console.log(e)
            }
        }
}


main().then(() => process.exit(0)).catch((error) => {
    console.error(error); 
    process.exit(1); 
}); 
