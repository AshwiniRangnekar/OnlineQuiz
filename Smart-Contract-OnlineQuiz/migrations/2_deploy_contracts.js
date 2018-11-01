var OnlineQuiz = artifacts.require("./OnlineQuiz.sol");

module.exports = function(deployer) {
	deployer.deploy(OnlineQuiz);
};