//Create at (12:57:55)

//In nodejs we use require()
// const {ethers} = require("ethers")

// In front-end js, we can't use require(). We use the import keyword instead (13:00:00)
// IMPORT ethers library: https://docs.ethers.org/v5/getting-started/#getting-started--importing--web-browser
import { ethers } from "./ethers-5.6.esm.min.js"

// At (13:11:32) IMPORT our abi in constants.js
import { abi, contractAddress } from "./constants.js"

// (13:06:20) - can't call `onclick` as HTML attribute in index.html, so define here: 
const connectButton = document.getElementById("connectButton")
connectButton.onclick = connect

const fundButton = document.getElementById("fundButton")
fundButton.onclick = fund

// (13:35:24) - getBalance button
const balanceButton = document.getElementById("balanceButton")
balanceButton.onclick = getBalance

// (13:36:15) - withdraw button
const withdrawButton = document.getElementById("withdrawButton")
withdrawButton.onclick = withdraw

// console.log(ethers)

        async function connect(){   //(12:54:38) - wrap in async fn          
            if(typeof window.ethereum !== "undefined"){
                
                // window.ethereum.request({method: "eth_requestAccounts"})

                try {
                    window.ethereum.request({method: "eth_requestAccounts"})
                } catch (error) {
                    console.log(error)
                }    

                connectButton.innerHTML = "Connected Successfully!"

            } else {
                connectButton.innerHTML = "Please install MetaMask"
                // console.log("please install metamask")
            }
        }


        async function getBalance(){    //Added 13:34:23
            if(typeof window.ethereum !== "undefined"){
                const provider = new ethers.providers.Web3Provider(window.ethereum)
                const balance = await provider.getBalance(contractAddress)
                console.log(ethers.utils.formatEther(balance))
                let tempBalance = ethers.utils.formatEther(balance)
                withdrawButton.innerHTML = `Withdraw ${tempBalance} ETH`
            }
        }

// fund function - START @ 13:02:02: https://youtu.be/gyMwXuJrbJQ?t=46922
        // async function fund(ethAmount){
        async function fund(){   //(13:14:42) hardcode ethAmount
            // const ethAmount = "77" // (13:32:52) - change to input form        
            const ethAmount = document.getElementById("ethAmount").value

            console.log(`Funding with ${ethAmount}...`)
            if(typeof window.ethereum !== "undefined"){
                //(13:02:43)
                // provider/connection to the blockchain, see: https://docs.ethers.org/v5/api/providers/other/#Web3Provider
                    const provider = new ethers.providers.Web3Provider(window.ethereum)

                // signer/wallet/someone with some gas
                    const signer = provider.getSigner() //return Acct 1 as signer in our example
                    console.log(signer)
                    
                // contract that we are interacting with (1) ABI, (2) Address
                    const contract = new ethers.Contract(contractAddress, abi, signer)

                // (13:13:41) - Make a transaction with our ethers contract object. 
                try{
                    const transactionResponse = await contract.fund({
                        value: ethers.utils.parseEther(ethAmount),
                    })
                    // Hey wait for this TX to be mined || listen for event (later)
                    await listenForTransactionMine(transactionResponse, provider)
                } catch(error){
                    console.log(error)
                }
            }
        }

    //At 13:20:44 - not async, use JS promise
    function listenForTransactionMine(transactionResponse, provider){
        console.log(`Mining ${transactionResponse.hash}...`)
        console.log("Done! (Should come after Completed with 1 confirmations.")
        // return new Promise() //13:21:53
            //create a listener for the blockchain.
            // 13:23:08 - docs.ethers.io - contract.once or provider.once
            // provider.once(transactionResponse.hash, listener)
        
        //13:27:51 adjust to wait for promise
        return new Promise((resolve, reject) => {
            provider.once(transactionResponse.hash, (transactionReceipt) => {
                console.log(`Completed with ${transactionReceipt.confirmations} confirmations.`)
                resolve() //13:29:02
            })
        })

    }

// withdraw - (13:36:40)
    async function withdraw(){

        // const withdrawAmount = document.getElementById("withdrawAmount").value

        if(typeof window.ethereum !== "undefined"){
            console.log("Withdrawing...")
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            
            // signer/wallet/someone with some gas
            const signer = provider.getSigner() //return Acct 1 as signer in our example               
            // contract that we are interacting with (1) ABI, (2) Address
            const contract = new ethers.Contract(contractAddress, abi, signer)

            try{
                const transactionResponse = await contract.withdraw() 
                
                await listenForTransactionMine(transactionResponse, provider)
            }catch(error){
                console.log(error)
            }

        }        
    }







// notes
// alert() vs confirm() vs prompt(): https://www.bitdegree.org/learn/javascript-alert (confirm cancel) (prompt textbox) 
