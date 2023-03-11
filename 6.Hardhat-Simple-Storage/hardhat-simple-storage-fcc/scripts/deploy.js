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
const { ethers, run } = require("hardhat")

async function main() {

    //hardhat knows about the contracts directory: 
    const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    console.log("Deploying contract custom message...")

    const simpleStorage = await SimpleStorageFactory.deploy(); 
    await simpleStorage.deployed(); 

    //what is the private key
    //what is the rpc url? 

    console.log(`Deployed contract to: ${simpleStorage.address}`)

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
                }
            }
    }


}

main().then(() => process.exit(0)).catch((error) => {
    console.error(error); 
    process.exit(1); 
}); 
