// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  let executor = null;

  console.log(`Selected Network: ${hre.network.name}`);

  if (hre.network.name === 'main') {
  } else if (hre.network.name === 'mumbai') {
  } else if (hre.network.name === 'bsc') {
  }
  else if (hre.network.name === 'goerli') {
    executor = "0x636014E54EEBfd894a64CdFcA5deB0bDe96597bA"
  } else if (hre.network.name === 'polygon') {
  } else if (hre.network.name === 'bsctest') {
  }

  if (manager === null) {
    return console.log('No Executor found. Can not deploy Smart Contract');
  } else {
    console.log(`Executor Found at : ${manager}`)
  }


  const BaseNFT = await hre.ethers.getContractFactory("BaseNFT");
  const baseNft = await BaseNFT.deploy("DemoBase", "DBNFT", manager);
  await baseNft.deployed();

  console.log(`BaseNFT is deployed to ${basenft.address}`);

  const BaseToken = await hre.ethers.getContractFactory("BaseNFT");
  const baseToken = await BaseToken.deploy("DemoBase", "DBNFT", manager);
  await baseToken.deployed();

  console.log(`BaseNFT is deployed to ${basenft.address}`);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
