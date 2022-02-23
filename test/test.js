const { assert } = require('chai')

const Decentragram = artifacts.require("./Decentragram.sol")
require('chai')
    .use(require("chai-as-promised"))
    .should()
contract('Decentragram', ([deployer, author, tipper]) =>{
    let decentragram

    before(async () => {
        decentragram = await Decentragram.deployed()
    })

    describe('decentragram', async () => {
        it('deploys successfully', async () => {
            const address = await decentragram.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })
        it('has a name', async () => {
            const name = await decentragram.name()
            assert.equal(name, 'Decentragram')
        })
    })

    describe('images', async () => {
        let result, imageCount
        const hash = 'abc123'

        before(async () => {
            result = await decentragram.uploadImage(hash, 'Image description', {from: author})
            imageCount = await decentragram.imageCount()
        })

        it('creates image', async () => {
            // success
            assert.equal(imageCount, 1)
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), imageCount.toNumber(), 'id is correct')
            assert.equal(event.hash, hash, 'Hash is correct')
            assert.equal(event.description, 'Image description', 'description is correct')
            assert.equal(event.tipAmount, '0', 'tip amount is correct')
            assert.equal(event.author, author, 'author is correct')

            // Failure image must have hash
            await decentragram.uploadImage("", 'Image description', { from: author}).should.be.rejected;
           
            //  Failure image must have description
            await decentragram.uploadImage("Image hash", '', { from: author}).should.be.rejected;
        })

        // check from Struct
        it('list image', async () => {
            const image = await decentragram.images(imageCount)
            assert.equal(image.id.toNumber(), imageCount.toNumber(), 'id is correct')
            assert.equal(image.hash, hash, 'Hash is correct')
            assert.equal(image.description, 'Image description', 'description is correct')
            assert.equal(image.tipAmount, '0', 'tip amount is correct')
            assert.equal(image.author, author, 'author is correct')

        })
        it('allow users to tip image', async () => {
            // Track the auther balance before purchase
            let oldAuthorBalance
            oldAuthorBalance = await web3.eth.getBalance(author)
            oldAuthorBalance = new web3.utils.BN(oldAuthorBalance)
            result = await decentragram.tipImageOwner(imageCount, { from: tipper, value: web3.utils.toWei('1', 'Ether') })
            
            // success
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), imageCount.toNumber(), 'id is correct')
            assert.equal(event.hash, hash, 'Hash is correct')
            assert.equal(event.description, 'Image description', 'description is correct')
            assert.equal(event.tipAmount, '1000000000000000000', 'tip amount is correct')
            assert.equal(event.author, author, 'author is correct')

            // check that author received funds
            let newAuthorBalance
            newAuthorBalance = await web3.eth.getBalance(author)
            newAuthorBalance = new web3.utils.BN(newAuthorBalance)

            let tipImageOwner
            tipImageOwner = web3.utils.toWei('1', 'Ether')
            tipImageOwner = new web3.utils.BN(tipImageOwner)

            const expectedBalance = oldAuthorBalance.add(tipImageOwner)
            assert.equal(newAuthorBalance.toString(), expectedBalance.toString())

            // Failure: Tripe to tip a image that does not exist

            await decentragram.tipImageOwner(99, {from: tipper, value:web3.utils.toWei('1', 'Ether')}).should.be.rejected;


        })
    })
})