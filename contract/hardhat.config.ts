import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require('dotenv').config({ path: __dirname + '/.env' })

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  defaultNetwork: "goerli",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545/",
      accounts: [process.env.GANACHE_PRIVATE_KEY],
    },
    goerli: {
      url: "https://goerli.nodeguardians.io",
      accounts: [process.env.PRIVATE_KEY],
    }, 
  }
};

export default config;
