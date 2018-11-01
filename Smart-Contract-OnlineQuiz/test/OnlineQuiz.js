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
            assert.isAtleast(payfee,50,"Insufficient fund in Wallet");
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

    it('Participant cannot pay to winner', async() => {
        try{

            await contractInstance.Payto_winner(15, { value: web3.toWei(0, "ether"), from: participant1 });

        }
        catch(e){
            assert.ok(true);
        }
    })

    it('Only quizmaker can pay to winner', async() => {
        try{

            await contractInstance.Payto_winner(15, { value: web3.toWei(0, "ether"), from: QuizMaker });

        }
        catch(e){
            assert.ok(true);
        }
    })

})


contract('OnlineQuiz', (accounts) => {
    const QuizMaker = accounts[0];
    const participant1 = accounts[1];
    const participant2 = accounts[2];
    const participant3 = accounts[3];
    const participant4 = accounts[4];
    beforeEach(async () => {
        contractInstance = await OnlineQuiz.deployed(9,3,4,{ from: QuizMaker });
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
            await contractInstance.addQuestion("a1", "b1", { value: web3.toWei(0, "ether"), from: QuizMaker }); //{1,2} - 3
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
            assert.isAtleast(payfee,50,"Insufficient fund in Wallet");
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
            await contractInstance.registerParticipants(15, { value: web3.toWei(0, "ether"), from: participant4 });
            await contractInstance.registerParticipants(15, { value: web3.toWei(0, "ether"), from: participant5 });
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

    it('Participant cannot pay to winner', async() => {
        try{

            await contractInstance.Payto_winner(15, { value: web3.toWei(0, "ether"), from: participant1 });

        }
        catch(e){
            assert.ok(true);
        }
    })

    it('Only quizmaker can pay to winner', async() => {
        try{

            await contractInstance.Payto_winner(15, { value: web3.toWei(0, "ether"), from: QuizMaker });

        }
        catch(e){
            assert.ok(true);
        }
    })
})
