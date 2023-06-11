import { ethers } from 'ethers';

export function getMultiSigContract() {
    const addressMultiSigAssetsManagement = "";
    const abiMultiSigAssetsManagement = "";

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(addressMultiSigAssetsManagement, abiMultiSigAssetsManagement, signer);

    return contract;
}
