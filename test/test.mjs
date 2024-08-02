// import testing libraries: https://www.chaijs.com/guide/styles/
import { assert } from "chai";

// the `describe` scope encapsulates an entire test called `TestModifyVariable`
// the `it` says the behavior that should be expected from the test
describe("TestModifyVariable", function () {
  // this line creates an ethers ContractFactory abstraction: https://docs.ethers.org/v5/api/contract/contract-factory/
  it("should change x to 1337", async function () {
    const ModifyVariable = await ethers.getContractFactory("ModifyVariable");

    // we then use the ContractFactory object to deploy an instance of the contract
    const contract = await ModifyVariable.deploy(10, "initial");

    // wait for contract to be deployed and validated!
    await contract.waitForDeployment();

    // modify x from 10 to 1337 via this function!
    await contract.modifyToLeet();

    // getter for state variable x
    const newX = await contract.x();
    assert.equal(Number(newX), 1337);
    await contract.modifyToString();
    const newString = await contract.str();
    assert.equal(newString, "Modified");
  });
  it("should change str to Modified", async function () {
    const ModifyVariable = await ethers.getContractFactory("ModifyVariable");

    // we then use the ContractFactory object to deploy an instance of the contract
    const contract = await ModifyVariable.deploy(10, "initial");

    // wait for contract to be deployed and validated!
    await contract.waitForDeployment();

    // modify x from 10 to 1337 via this function!
    await contract.modifyToString();
    const newString = await contract.str();
    assert.equal(newString, "Modified");
  });
});
