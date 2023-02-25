// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  let executor = null;
  let payer = "PAYERWALLET";
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {

    const provider = hre.ethers.provider;
    const gasPrice = await provider.getGasPrice()

    const balanceInWei = await provider.getBalance(account.address);
    console.log('Gas Price: ', ethers.utils.formatEther(gasPrice))
    console.log("Accounts used:", account.address, " Balance: ", ethers.utils.formatEther(balanceInWei));


  }

  console.log(`Selected Network: ${hre.network.name}`);

  if (hre.network.name === 'main') {
    /* WILL UPDATE SOON */

  } else if (hre.network.name === 'mumbai') {
    manager = "0x636014E54EEBfd894a64CdFcA5deB0bDe96597bA"
  } else if (hre.network.name === 'bsc') {
    /* WILL UPDATE SOON */
  }
  else if (hre.network.name === 'goerli') {
    manager = "0xBb6AFaF72322A89632bB4198e74448E84D90fBa9"
  } else if (hre.network.name === 'polygon') {
    manager = "0x3acfB6f6DFf8E444dbeebacAFc5C77634f70AF6a"
  } else if (hre.network.name === 'bsctest') {
    /* WILL UPDATE SOON */
  }

  if (executor === null) {
    return console.log('No Executor found. Can not deploy Smart Contract');
  } else {
    console.log(`Executor Found at : ${executor}`)
  }


  const BaseNFT = await hre.ethers.getContractFactory("BaseNFT");
  const baseNft = await BaseNFT.deploy("DemoBase", "DBNFT", executor, payer);
  await baseNft.deployed();

  console.log(`BaseNFT is deployed to ${baseNft.address}`);

  const BaseToken = await hre.ethers.getContractFactory("BaseNFT");
  const baseToken = await BaseToken.deploy("DemoBase", "DBNFT", executor, payer);
  await baseToken.deployed();

  console.log(`BaseToken is deployed to ${baseToken.address}`);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
