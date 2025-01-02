import hre from 'hardhat';
import {expect} from 'chai';
import {UserDetails} from '../typechain-types';

describe('UserDetails', () => {

  let userDetailsContract: UserDetails;

  beforeEach(async () => {
    userDetailsContract = await hre.ethers.deployContract('UserDetails');
  });

  it('Should deploy UserDetails contract ', async () => {
    expect(await userDetailsContract.registeredUsers()).to.equal(0);
  });

  it('Should register new user', async () => {
    await expect(userDetailsContract.register('Rafał', 'Sokulski', 18))
      .to
      .emit(userDetailsContract, 'UserRegistered')
      .withArgs('0xbD004d9048C9b9e5C4B5109c68dd569A65c47CF9');

    expect(await userDetailsContract.registeredUsers()).to.equal(1);

    expect((await userDetailsContract.getDetails())['0']).to.equal('Rafał');
    expect((await userDetailsContract.getDetails())['1']).to.equal('Sokulski');
    expect((await userDetailsContract.getDetails())['2']).to.equal('0xbD004d9048C9b9e5C4B5109c68dd569A65c47CF9');
    expect((await userDetailsContract.getDetails())['3']).to.equal(18);

    // Cleanup
    await expect(userDetailsContract.unregister('0xbD004d9048C9b9e5C4B5109c68dd569A65c47CF9'))
      .to
      .emit(userDetailsContract, 'UserDeleted')
      .withArgs('0xbD004d9048C9b9e5C4B5109c68dd569A65c47CF9');

    expect(await userDetailsContract.registeredUsers()).to.equal(0);
  });

  it('Try to register the same user', async () => {
    await expect(userDetailsContract.register('Rafał', 'Sokulski', 18))
      .to
      .emit(userDetailsContract, 'UserRegistered')
      .withArgs('0xbD004d9048C9b9e5C4B5109c68dd569A65c47CF9');

    expect(await userDetailsContract.registeredUsers()).to.equal(1);

    await expect(userDetailsContract.register('Rafał', 'Sokulski', 18))
      .to
      .be
      .rejectedWith('Already registered');

    expect(await userDetailsContract.registeredUsers()).to.equal(1);
  });
});