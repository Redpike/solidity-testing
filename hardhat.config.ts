import {HardhatUserConfig} from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import 'solidity-coverage';

const config: HardhatUserConfig = {
  solidity: '0.8.18',
  networks: {
    ganache: {
      url: 'http://localhost:28545',
      accounts: ['0x91fd4e8a060cceff00ae5cde99d5b167179f724d9a424e24672e4200c7679c98']
    },
    hardhat: {
      allowUnlimitedContractSize: true,
      accounts: [
        {
          privateKey: '0x91fd4e8a060cceff00ae5cde99d5b167179f724d9a424e24672e4200c7679c98',
          balance: '100000000000000000000'
        }
      ]
    }
  },
  defaultNetwork: 'hardhat'
};

export default config;