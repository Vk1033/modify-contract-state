const { ethers } = require("ethers");

async function main() {
  const url = process.env.ALCHEMY_URL;

  let artifacts = await hre.artifacts.readArtifact("ModifyVariable");

  const provider = new ethers.JsonRpcProvider(url);

  let privateKey = process.env.TEST_PRIVATE_KEY;

  let wallet = new ethers.Wallet(privateKey, provider);

  // Create an instance of a Faucet Factory
  let factory = new ethers.ContractFactory(artifacts.abi, artifacts.bytecode, wallet);

  let contract = await factory.deploy(10, "initial");

  console.log("Contract address:", await contract.getAddress());

  await contract.waitForDeployment();

  // Modify the uint variable
  await contract.modifyToLeet();
  const newX = await contract.x();
  console.log("Updated x to:", Number(newX));

  // Modify the string variable
  await contract.modifyToString();
  const newStr = await contract.str();
  console.log("Updated y to:", newStr);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
