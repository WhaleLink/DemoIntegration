const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("BaseToken", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploybaseToken() {

    const payer = "0xcB01eA704585C2f0aC6db4918ae06B4afCfb825C"
    const newPayer = "0xeFd17da741819Ed91159b054953bD578452F7A71"
    const manager = "0x23d98886902A7d000bD497df1Eb8AA31101a9974"
    const [controler, nonControler] = await hre.ethers.getSigners();

    const BaseToken = await ethers.getContractFactory("BaseToken");
    const baseToken = await BaseToken.deploy("DemoBase", "DBNFT", manager, payer);

    return { baseToken, manager, payer, controler, nonControler, newPayer }
  }

  describe("Base Functions", function () {
    it("Should return the correct manager", async function () {
      const { baseToken, manager } = await loadFixture(deploybaseToken);
      expect(await baseToken.manager()).to.equal(manager);
    });

    it("Should return the correct payer", async function () {
      const { baseToken, payer } = await loadFixture(deploybaseToken);
      expect(await baseToken.payer()).to.equal(payer);
    });

    it("Should validate controller", async function () {
      const { baseToken, controler } = await loadFixture(deploybaseToken);
      expect(await baseToken.getController()).to.equal(controler.address);
    });

    it("Should not validate controller", async function () {
      const { baseToken, nonControler } = await loadFixture(deploybaseToken);
      expect(await baseToken.getController()).not.to.equal(nonControler.address);
    });

    it("Should update new payer as controler", async function () {
      const { baseToken, newPayer } = await loadFixture(deploybaseToken);
      expect(await baseToken.payer()).not.to.equal(newPayer);
      await baseToken.setPayerWallet(newPayer);
      expect(await baseToken.payer()).to.equal(newPayer);
    });

    it("Should supports the Interface", async function () {
      const { baseToken } = await loadFixture(deploybaseToken);
      expect(await baseToken.supportsInterface("0x7ad5f333")).to.eq(true);
    });

  });
});
