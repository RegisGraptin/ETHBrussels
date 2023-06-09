
import {Erc721Standard} from '@taikai/dappkit';

async function createAssetNFT() {

    let privateKey = process.env.PRIVATE_KEY;

    let deployer = new Erc721Standard({
        web3Host: "http://127.0.0.1:7545",
        privateKey: privateKey
    });


}