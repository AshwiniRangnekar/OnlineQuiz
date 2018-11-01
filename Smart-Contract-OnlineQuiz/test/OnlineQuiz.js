const OnlineQuiz = artifacts.require("OnlineQuiz") 

contract('OnlineQuiz', (accounts) => {
	const QuizMaker = accounts[0];
	const participant1 = accounts[1];
	const participant2 = accounts[2];
	beforeEach(async () => {
        contractInstance = await OnlineQuiz.deployed(9,2,2,{ from: QuizMaker });
    })

	it('Check participants cannot add questions', async() => {
        try{
            await contractInstance.addQuestion("a", "b", { value: web3.toWei(0, "ether"), from: participant1 }); //{1,2} - 3
            assert.fail();
        }
        catch(e){
            assert.ok(true);
        }
    })

    it('Check Only quizmaker can add questions', async() => {
        try{
            await contractInstance.addQuestion("a", "b", { value: web3.toWei(0, "ether"), from: QuizMaker }); //{1,2} - 3
            assert.ok(true);
        }
        catch(e){
            assert.ok(true);
        }
    })

    it('Check quizmaker cannot be a participant', async() => {
        try{
            await contractInstance.registerParticipants(50, { value: web3.toWei(0, "ether"), from: QuizMaker }); //{1,2} - 3
            assert.fail();
        }
        catch(e){
            assert.ok(true);
        }
    })  

    it('Check participants can participate', async() => {
        try{
            await contractInstance.registerParticipants(50, { value: web3.toWei(0, "ether"), from: participant1 }); //{1,2} - 3
            assert.fail();
        }
        catch(e){
            assert.ok(true);
        }
    })  

    it('Check participants has sufficient money in wallet to participate', async() => {
        try{
            await contractInstance.registerParticipants(50, { value: web3.toWei(0, "ether"), from: participant1 });
            const payfee = contractInstance.pfee.call();
            assert.isAtleast(50,payfee,"Insufficient fund in Wallet");
        }
        catch(e){
            assert.ok(true);
        }
    }) 

    it('Check participants has sufficient money in wallet to participate', async() => {
        try{
            await contractInstance.registerParticipants(5, { value: web3.toWei(0, "ether"), from: participant1 });
            const payfee = contractInstance.pfee.toNumber();
            // console.log(payfee);
            assert.isAtleast(payfee,5,"Insufficient fund in Wallet");
        }
        catch(e){
        	assert.ok(true);
        }
 	})

 	it('Check number of participants is less than the limit', async() => {
        try{
            await contractInstance.registerParticipants(15, { value: web3.toWei(0, "ether"), from: participant1 });
            await contractInstance.registerParticipants(15, { value: web3.toWei(0, "ether"), from: participant2 });
            await contractInstance.registerParticipants(15, { value: web3.toWei(0, "ether"), from: participant3 });
            assert.fail();
        }
        catch(e){
        	assert.ok(true);
        }
 	})

 	it('Check number of participants is less than equal to the limit', async() => {
        try{
            await contractInstance.registerParticipants(15, { value: web3.toWei(0, "ether"), from: participant1 });
            await contractInstance.registerParticipants(15, { value: web3.toWei(0, "ether"), from: participant2 });
        }
        catch(e){
        	assert.ok(true);
        }
 	})



	// describe('Fail case', () => {
	// 	it('should revert on invalid arguments', async () => {
	// 		try {
	// 		const instance = await OnlineQuiz.new(9,10,5, { from: accounts[1] });
	// 		assert.isUndefined(instance, 'contract should be created by owner');
	// 		} 
	// 		catch (err) {
	// 		assert.isUndefined(err.message,'revert with valid arguments');
	// 		}
	// 	});
	// });
})




///////////////////////////
/*const assert = require('assert')

let contractInstance
contract('Unit Tests', (accounts) =>{
    const contractor = accounts[0];
    const participant1 = accounts[1];
    const participant2 = accounts[2];

    beforeEach(async () => {
        contractInstance = await OnlineQuiz.deployed({ from: contractor });
    })
    it('Check Contractor cannot register as a participant', async() => {
        try{
            await contractInstance.registerParticipants("a", "b", "c","d", { value: web3.toWei(0, "ether"), from: contractor }); //{1,2} - 3
            assert.fail();
        }
        catch(e){
            assert.ok(true);
        }
    })
    it('Register participant', async () => {
        //Test 1
        try {
            const Correct=await contractInstance.registerParticipants("a", "b", "c","d", { value: web3.toWei(36, "ether"), from: participant1 });  //{3,4} - 6
            assert.equal(Correct, 1, "Registration successful but number of correct answers should be one");
        }
        catch (err) {
            assert.ok(true);
        }
    })
    
    it('Check participant cannot register with wrong participant fee amount', async () => {
        //Test 1
        try {
            const Correct=await contractInstance.registerParticipants("a", "b", "c","d", { value: web3.toWei(30, "ether"), from: participant2 });  //{3,4} - 6
            assert.fail("Registration with wrong fee amount was successful")
            assert.equal(Correct, 1, "Registration unsuccessful but number of correct answers should be one");
        }
        catch (err) {
            assert.ok(true);
        }
    })
    it('Check same participant cannot register more than once', async () => {
        //Test 1
        const Correct=await contractInstance.registerParticipants("a", "b", "b","d", { value: web3.toWei(36, "ether"), from: participant2 }); //{1,2} - 3
        const prevCount = await contractInstance.getParticipantsLength();
        assert.equal(prevCount, 1,"The participants array should have one element");
        try{
            const Correct=await contractInstance.registerBidder("a", "b", "b","d", { value: web3.toWei(36, "ether"),from: participant2 });  //{3,4} - 6
            assert.fail("participant was able to double register");
        }
        catch(err){
            assert.ok(true);
        }
        const newCount = await contractInstance.getParticipantsLength();
        assert.equal(newCount, 1, "Double registration should not have been possible");

    })
    it('Check Amount paid to every participant', async() =>{
        try{
            await contractInstance.TransferAmount({ from: participant1 });
            assert.ok(true);

        }
        catch(e){
            assert.fail("participant was unable to earn money")
        }
        assert.equal(newCount, 1, "Double registration should not have been possible");

    })
    it('Check sorting is possible after notaries exchange', async() =>{
        try {
            await contractInstance.sortBidders({ from: auctioneer });
            assert.ok(true, "sortBidders should have been called");
        }
        catch (err) {
            assert.fail("sortBidders was not called successfully");
        }
    })
    it('Check auctioneer cannot findWinners until notaries find winners', async() =>{
        try {
            await contractInstance.findWinners({ from: auctioneer });
            assert.fail("findWinners was called successfully");
        }
        catch (err) {
            assert.ok(true, "findWinners should not have been called");
        }
    })
    it('Check Notaries exchange item values', async () => {
        try {
            await contractInstance.prior_Winner({ from: notary1 });
            assert.ok(true);
        }
        catch (e) {
            assert.fail("Notaries were unable to find Winner")
        }
    })
    it('Check makePayment is not possible before finding winner', async () => {
        try {
            await contractInstance.makePayments({ from: auctioneer });
            assert.fail("makePayments was called successfully");
        }
        catch (err) {
            assert.ok(true, "makePayments should not have been called");
        }
    })
    it('Check payNotaries is not possible before finding winner', async () => {
        try {
            await contractInstance.payNotaries({ from: auctioneer });
            assert.fail("payNotaries was called successfully");
        }
        catch (err) {
            assert.ok(true, "payNotaries should not have been called");
        }
    })
    it('Check withdrawNotaries is not possible before finding winner', async () => {
        try {
            await contractInstance.withdrawNotaries({ from: notary1 });
            assert.fail("withdrawNotaries was called successfully");
        }
        catch (err) {
            assert.ok(true, "withdrawNotaries should not have been called");
        }
    })
    it('Check findWinners is possible after notaries exchange', async () => {
        try {
            await contractInstance.findWinners({ from: auctioneer });
            assert.ok(true, "findWinners should have been called");
        }
        catch (err) {
            assert.fail("findWinners was not called successfully");
        }
    })
    it('Check makePayment is possible after finding winners', async () => {
        try {
            await contractInstance.findWinners({ from: auctioneer });
            assert.ok(true, "makePayments should have been called");
        }
        catch (err) {
            assert.fail("makePayments was not called successfully");
        }
    })
    it('Check payNotaries is possible after finding winners', async () => {
        try {
            await contractInstance.payNotaries({ from: auctioneer });
            assert.ok(true, "payNotaries should have been called");
        }
        catch (err) {
            assert.fail("payNotaries was not called successfully");
        }
    })
    it('Check withdrawNotaries is possible after finding winners', async () => {
        try {
            await contractInstance.withdrawNotaries({ from: notary1 });
            assert.ok(true, "withdrawNotaries should have been called");
        }
        catch (err) {
            assert.fail("withdrawNotaries was not called successfully");
        }
    })

})*/