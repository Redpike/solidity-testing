import hre from 'hardhat';
import {expect} from 'chai';

describe('UserDetails', () => {
  it('Should deploy UserDetails contract ', async () => {
    const userDetails = await hre.ethers.deployContract('UserDetails');

    expect(await userDetails.registeredUsers()).to.equal(0);
  });
});