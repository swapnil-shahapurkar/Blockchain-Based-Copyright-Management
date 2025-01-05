const {Web3} = require("web3");
const fs = require("fs");
const path = require("path");

// Connect to Ganache
const web3 = new Web3("http://127.0.0.1:7545");

// Load contract artifacts
function loadContract(contractName) {
  const artifact = JSON.parse(
    fs.readFileSync(path.join(__dirname, `truffle/build/contracts/${contractName}.json`))
  );
  return {
    abi: artifact.abi,
    address: artifact.networks[Object.keys(artifact.networks)[0]].address,
  };
}

// Load all contracts
const Storage = loadContract("StorageContract");
const Verification = loadContract("VerificationContract");
const Transfer = loadContract("TransferContract");
const Delete = loadContract("DeleteContract");
const Upload = loadContract("UploadContract");

// Instantiate contracts
const storageContract = new web3.eth.Contract(Storage.abi, Storage.address);
const verificationContract = new web3.eth.Contract(Verification.abi, Verification.address);
const transferContract = new web3.eth.Contract(Transfer.abi, Transfer.address);
const deleteContract = new web3.eth.Contract(Delete.abi, Delete.address);
const uploadContract = new web3.eth.Contract(Upload.abi, Upload.address);

async function testContracts() {

  const accounts = await web3.eth.getAccounts();
  const owner = accounts[0];
  const newOwner = accounts[1];
  const uploader = accounts[2];

  // Sample hash for testing
  const sampleHash = web3.utils.sha3("457");

  console.log("\n=== Testing UploadContract ===");

// Step 1: Send the transaction to update the state (upload hash)
await uploadContract.methods
    .uploadHash(sampleHash,uploader)
    .send({ from: uploader, gas: 300000 });

// Step 2: After the transaction is mined, query the updated owner address
const ownerAddress1 = await storageContract.methods.getOwner(sampleHash).call();
console.log(`${uploader} , Owner Address:`, ownerAddress1);

await uploadContract.methods
    .uploadHash(sampleHash, uploader)
    .send({ from: uploader, gas: 300000 });

// Step 2: After the transaction is mined, query the updated owner address
const ownerAddress12 = await storageContract.methods.getOwner(sampleHash).call();
console.log(`${uploader}, Owner Address:`, ownerAddress12);


  console.log("\n=== Testing StorageContract ===");

  const ownerAddress = await storageContract.methods.getOwner(sampleHash).call();
  console.log(`Owner of hash: ${ownerAddress}`);

  console.log("\n=== Testing VerificationContract ===");

  const verificationResult = await verificationContract.methods
    .verifyOwnership(sampleHash, uploader)
    .call();
  
  console.log(
    `Verification Result: ${
      verificationResult ? "Hash belongs to the provided owner" : "Hash does not belong to the provided owner"
    }`
  );

  console.log("\n=== Testing TransferContract ===");

  // Transfer ownership from uploader to newOwner
  const transferResult = await transferContract.methods
    .transferOwnership(sampleHash, newOwner)
    .send({ from: uploader, gas: 300000 });

  if (transferResult) {
    const updatedOwner = await storageContract.methods.getOwner(sampleHash).call();
    console.log(`New owner after transfer: ${updatedOwner}`);
  } else {
    console.log("Failed to transfer ownership.");
  }

  console.log("\n=== Testing DeleteContract ===");

  // Delete hash entry from storage
  const deleteResult = await deleteContract.methods
    .deleteHashEntry(sampleHash)
    .send({ from: newOwner, gas: 300000 });

  if (deleteResult) {
    const ownerAfterDelete = await storageContract.methods.getOwner(sampleHash).call();
    console.log(`Owner after delete: ${ownerAfterDelete ? ownerAfterDelete : "Hash deleted"}`);
  } else {
    console.log("Failed to delete hash.");
  }
}

testContracts()
  .then(() => console.log("\nAll tests completed."))
  .catch((error) => console.error("Error during testing:", error));
