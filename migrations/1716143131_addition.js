var Addition = artifacts.require('Addition');

module.exports = function(deployer) {
  // Use deployer to state migration tasks.
  deployer.deploy(Addition);
};
