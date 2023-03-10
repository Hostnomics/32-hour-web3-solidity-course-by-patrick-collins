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

function setupMovieNight() {
    // let status = cookPopcorn()
    // await cookPopcorn()
    // await pourDrinks()
    startMovie();
  }
  
  async function cookPopcorn() {
    //some code here
    return Promise(/* Some Code Here*/);
  }
  
  async function pourDrinks() {
    //some code here
    return Promise(/* Some Code Here*/);
  }
  
  // ***************************************************************8
  
  // (6:45:29) Made Async: https://youtu.be/gyMwXuJrbJQ?t=24329
  async function main() {
    //uint256 variable = 5;
    let name = `Messi`;
    let variable = 5;
    console.log(`Hello ${name} ` + variable);
  }
  
  //FORMAT:
  // main().then().catch();
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });