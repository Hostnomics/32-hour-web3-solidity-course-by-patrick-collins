// Added (10:54:20)

//At (10:54:30) - since we are using the `run` command import it
const { run } = require("hardhat")

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

//Export it so we can pull it into 01-deploy-fund-me.js
module.exports = { verify }