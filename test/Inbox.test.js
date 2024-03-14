const ganache = require("ganache")
const { Web3 } = require("web3")
const assert = require("assert")
const web3 = new Web3(ganache.provider())
const { interface, bytecode } = require("../compile")

let accounts
let inbox
const INITIAL_STRING = "sassarello"

beforeEach(async () => {
    // Get a list of all accounts

    accounts = await web3.eth.getAccounts()

    // use una of this accounts to deploy
    // the contract

    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data: bytecode,
            arguments: [INITIAL_STRING]
        })
        .send({
            from: accounts[0],
            gas: "1000000"
        })

})

describe("Inbox", () => {
    it("deploy a contract", () => {
        assert.ok(inbox.options.address)
    })

    it("has a default message", async () => {
        const message = await inbox.methods.message().call()
        assert.equal(message, INITIAL_STRING)
    })

    it("can change the message", async () => {
        txHash = await inbox.methods.setMessage("sassarello 2").send({
            from: accounts[0]
        })
        const message = await inbox.methods.message().call()
        assert.equal(message, "sassarello 2")
    })
})