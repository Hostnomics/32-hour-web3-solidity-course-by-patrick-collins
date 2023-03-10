// Up to 7:05:00

//Synchronous
// 1. Put popcorn in microwave -> Promise
// 2. Wait for popcorn to finish
// 3. Pour drinks for everyone

// Asynchronous
// 1. Put popcorn in microwave
// 2. Pour drinks for everyone
// 3. Wait for popcorn to finish 

// Promise
// - Pending
// - Fulfilled
// - Rejected

//********************************************************* */
  
  // (6:45:29) Made Async: https://youtu.be/gyMwXuJrbJQ?t=24329
  // (6:50:56) solcjs to compile contract: https://youtu.be/gyMwXuJrbJQ?t=24656
  // (7:00:12) ethers.js: https://youtu.be/gyMwXuJrbJQ?t=25212 

  //IMPORT ethers:
  const ethers = require("ethers");
  const fs = require('fs-extra');
  // const fs = require('fs');

  async function main() {
    //compile them in our code
    //compile them separately 

    //Ganache RPC Server endpoint: http://127.0.0.1:7545
    // const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545'); 
    // using providers gave error: TypeError: Cannot read properties of undefined (reading 'JsonRpcProvider')
    const provider = new ethers.JsonRpcProvider('http://127.0.0.1:7545');                               
    const wallet = new ethers.Wallet(
      '1d16c023effb78a484b3c2b28423a8a1d39916231fc9ef4a5ad3619d56043302', 
      provider
    ); 
    
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8"); 
    const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8");

    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
    console.log("Deploying, please wait senior...");

    //Deploy our contract: (7:06:53)
    // use await b/c we made this an async function
    // saying STOP here! Wait for contract to deploy!
    const contract = await contractFactory.deploy(); 

    // const contract = await contractFactory.deploy({
    //   gasPrice: 1000000000, 
    //   gasLimit: 1000000
    // }); 

    console.log(contract); //make sure ganache is running


  }
  
  //FORMAT:
  // main().then().catch();
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });