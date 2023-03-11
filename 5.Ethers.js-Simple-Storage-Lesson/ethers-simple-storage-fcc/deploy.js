  // (6:45:29) Made Async: https://youtu.be/gyMwXuJrbJQ?t=24329
  // (6:50:56) solcjs to compile contract: https://youtu.be/gyMwXuJrbJQ?t=24656
  // (7:00:12) ethers.js: https://youtu.be/gyMwXuJrbJQ?t=25212 
  // (7:34:40) - .env file to store private key and other sensitive data

  //IMPORT ethers:
  const ethers = require("ethers");
  const fs = require('fs-extra');
      // const fs = require('fs');
  require("dotenv").config(); 

  async function main() {
    //Ganache RPC Server endpoint: http://127.0.0.1:7545
    // const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545'); 
    // using providers gave error: TypeError: Cannot read properties of undefined (reading 'JsonRpcProvider')
    // const provider = new ethers.JsonRpcProvider('http://127.0.0.1:7545');        
    //Switched back to ethers v 5.6.2:
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);                  
    
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider); 

//simple encryption
    // const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8"); 
    // let wallet = new ethers.Wallet.fromEncryptedJsonSync(encryptedJson, process.env.PRIVATE_KEY_PASSWORD);
    // wallet = await wallet.connect(provider);
    
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8"); 
    const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8");

//Comment out these three lines at 7:19:30 - Turn back on 7:25:38:
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait senior...");
  const contract = await contractFactory.deploy(); 
  // const transactionReceipt = await contract.deployTransaction.wait(1); 
  await contract.deployTransaction.wait(1);


  //(8:02:55) - Add to test our connection to Alchemy
  console.log(`Contract Address: ${contract.address}`);
    
    // console.log("Let's deploy with only transaction data!");

    const currentFavoriteNumber = await contract.retrieve(); 
          // console.log(currentFavoriteNumber);
          // console.log(currentFavoriteNumber.toString());

    console.log(`Current Favorite Number is: ${currentFavoriteNumber.toString()}`);

  // (7:31:40) - Better to pass variables in JS to our solidity functions as strings:
    // const transactionResponse = await contract.store(7); 
    const transactionResponse = await contract.store("7"); 
    const transactionReceipt = await transactionResponse.wait(1); 
    const updatedFavoriteNumber = await contract.retrieve(); 

    console.log(`Updated Favorite Number is: ${updatedFavoriteNumber}`);

  }
  
  //FORMAT:
  // main().then().catch();
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });