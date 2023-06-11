import { ethers } from 'ethers';

const estate = "";
let full:boolean = true;

const addressMultiSigAssetsManagement = "";
const abiMultiSigAssetsManagement = "";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(addressMultiSigAssetsManagement, abiMultiSigAssetsManagement, signer);


if (full) {
    const options = {value: ethers.utils.parseEther("100")};
    contract.buyFull(estate, options);
}
else {
    const options = {value: ethers.utils.parseEther("0.1")};
    contract.buyPart(estate, options);
}