//BASIC FORMAT: 
// describe("SimpleStorage", function () {}) //best practice (9:30:00)
// describe("SimpleStorage", () => {})

const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

describe("SimpleStorage", function () {
    //At (9:32:25) - scope
        // let simpleStorageFactory
        // let simpleStorage
        let simpleStorageFactory, simpleStorage
    beforeEach(async function () {
        // const simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        // const simpleStorage = await simpleStorageFactory.deploy()

        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()

    })

//Run ONLY 1 test by it.only() or `yarn run test --grep store` in this case would match the 2nd one.
    it("Should start with a favorite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"

        //assert or expect keywords from chai package in hardhat, so require them at top (9:34:25) - generally prefers assert
        assert.equal(currentValue.toString(), expectedValue)
//At (9:37:57) - how you'd write with expect
        // expect(currentValue.toString()).to.equal(expectedValue)
    })
    it("Should update when we call store", async function () {
        const expectedValue = "7"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)

        const currentValue = await simpleStorage.retrieve()

        assert.equal(currentValue.toString(), expectedValue)
    })

})