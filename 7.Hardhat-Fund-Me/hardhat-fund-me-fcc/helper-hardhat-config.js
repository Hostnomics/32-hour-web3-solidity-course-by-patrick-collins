//created at (10:32:38), uses: https://github.com/aave/aave-v3-core/blob/master/helper-hardhat-config.ts

//Get Chain ETH/USD Address From ChainLink: https://docs.chain.link/data-feeds/price-feeds/addresses/#Sepolia%20Testnet
//Polygon from: https://docs.chain.link/data-feeds/price-feeds/addresses/?network=polygon
const networkConfig = {
    11155111: {
        name: "Sepholia",
        ehtUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306"
    },
    137: {
        name: "Polygon",
        ehtUsdPriceFeed: "0xF9680D99D6C9589e2a93a78A04A279e509205945",
    },
    80001: {
        name: "Mumbai",
        ehtUsdPriceFeed: "0x0715A7794a1dc8e42615F059dD6e406A6594651A",
    },

}

//(10:44:30)
const developmentChains = ["hardhat", "localhost"]

//(10:47:05) - helpers for constructor
const DECIMALS = 8
const INITIAL_ANSWER = 200000000000


//(10:34:21) export networkConfig
module.exports = {
    networkConfig,
    developmentChains,
    DECIMALS,
    INITIAL_ANSWER,
}