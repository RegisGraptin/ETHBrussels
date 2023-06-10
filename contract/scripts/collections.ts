import { ERC721Collectibles, Web3Connection } from '@taikai/dappkit';


async function createAssetNFT() {
    
    const web3Connection = new Web3Connection({ 
        web3Host: 'http://127.0.0.1:7545',
        privateKey: process.env.GANACHE_PRIVATE_KEY
    });
    
    await web3Connection.start();


    const erc721Collectibles = new ERC721Collectibles({
        web3Host: 'http://127.0.0.1:7545',
    });

    
    await erc721Collectibles.loadAbi();

    // Deploy
    const transactionReceipt = await erc721Collectibles.deployJsonAbi(
        "Art | BEPRO",
        "B.E.P.R.O",
        1000,
        "0xDAI_ADDRESS",
        "0xPURCHASE_TOKEN",
        "0xBASE_FEE_ADDRESS",
        "0xOTHER_ADDRESS" 
    );

    console.log(transactionReceipt);
}

createAssetNFT().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });