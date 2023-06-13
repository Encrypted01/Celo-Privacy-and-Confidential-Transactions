const Web3 = require('web3');
const web3 = new Web3('https://celo-network-url');

async function createRingSignature(message, signer, potentialSigners) {
  const ringSize = potentialSigners.length;
  const messageHash = web3.utils.sha3(message);

  const signature = await web3.eth.accounts.sign(messageHash, signer.privateKey);

  const ringSignature = {
    message,
    signer,
    signature,
    potentialSigners
  };

  return ringSignature;
}

function verifyRingSignature(ringSignature) {
  const { message, signer, signature, potentialSigners } = ringSignature;
  const messageHash = web3.utils.sha3(message);

  const verified = web3.eth.accounts.recover(messageHash, signature.signature);
  const validSignature = potentialSigners.includes(verified.toLowerCase());

  return validSignature;
}
