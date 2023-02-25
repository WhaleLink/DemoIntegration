const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("BaseNFT", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployBaseNFT() {

    const payer = "0xcB01eA704585C2f0aC6db4918ae06B4afCfb825C"
    const newPayer = "0xeFd17da741819Ed91159b054953bD578452F7A71"
    const manager = "0x23d98886902A7d000bD497df1Eb8AA31101a9974"
    const [controler, nonControler] = await hre.ethers.getSigners();

    const BaseNFT = await ethers.getContractFactory("BaseNFT");
    const baseNft = await BaseNFT.deploy("DemoBase", "DBNFT", manager, payer);

    return { baseNft, manager, payer, controler, nonControler, newPayer }
  }

  describe("Base Functions", function () {
    it("Should return the correct manager", async function () {
      const { baseNft, manager } = await loadFixture(deployBaseNFT);
      expect(await baseNft.manager()).to.equal(manager);
    });

    it("Should return the correct payer", async function () {
      const { baseNft, payer } = await loadFixture(deployBaseNFT);
      expect(await baseNft.payer()).to.equal(payer);
    });

    it("Should validate controller", async function () {
      const { baseNft, controler } = await loadFixture(deployBaseNFT);
      expect(await baseNft.getController()).to.equal(controler.address);
    });

    it("Should not validate controller", async function () {
      const { baseNft, nonControler } = await loadFixture(deployBaseNFT);
      expect(await baseNft.getController()).not.to.equal(nonControler.address);
    });

    it("Should update new payer as controler", async function () {
      const { baseNft, newPayer } = await loadFixture(deployBaseNFT);
      expect(await baseNft.payer()).not.to.equal(newPayer);
      await baseNft.setPayerWallet(newPayer);
      expect(await baseNft.payer()).to.equal(newPayer);
    });

    it("Should supports the Interface", async function () {
      const { baseNft } = await loadFixture(deployBaseNFT);
      expect(await baseNft.supportsInterface("0x7ad5f333")).to.eq(true);
    });

  });
});
