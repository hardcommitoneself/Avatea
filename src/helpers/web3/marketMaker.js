import {ethers} from 'ethers';
import marketMaker from '../../abi/MarketMaker.json';
import {toast} from "react-toastify";
import helpers from "../index";
import {API_URL, MARKET_MAKER_DEPLOYER_ADDRESS} from "../constants";
import MarketMakerDeployer from "../../abi/MarketMakerDeployer.json";
import axios from "axios";

const deploy = async (wallet, baseToken, pairedToken, revocable, project) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const MarketMakerDeployerContract = await new ethers.Contract(MARKET_MAKER_DEPLOYER_ADDRESS, MarketMakerDeployer.abi, signer);

    try {
        const tx = await MarketMakerDeployerContract.createMarketMaker(baseToken, pairedToken, revocable);
        toast.promise(
            tx.wait(),
            {
                pending: 'Pending transaction',
                success: `Transaction succeeded!`,
                error: 'Transaction failed!'
            }
        )
        const receipt = await tx.wait();

        const { _controllerWallet, _marketMaker } = receipt.events.CreatedMarketMakingContract.returnValues;

        await axios(
            {
                method: 'post',
                url: `${API_URL}MarketMakingPool`,
                data: {
                    address: _marketMaker,
                    controller_wallet: _controllerWallet,
                    paired_token: pairedToken,
                    project: project,
                }
            }
        )
        await helpers.callback.hook({
            type: "DEPLOYMENT",
            data: {
                receipt,
                wallet,
                currency: "POOL"
            }
        })

        console.log('stake success')
    } catch (e) {
        alert(e)
        console.log('stake error', e);
    }
}

//@Todo Specify types for registration
const stake = async (wallet, marketMakerAddress, amount, callback) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const marketMakerContract = await new ethers.Contract(marketMakerAddress, marketMaker.abi, signer);

    try {
        const tx = await marketMakerContract.stake(amount);
        toast.promise(
            tx.wait(),
            {
                pending: 'Pending transaction',
                success: `Transaction succeeded!`,
                error: 'Transaction failed!'
            }
        )
        const receipt = await tx.wait();
        console.log(receipt);
        await helpers.callback.hook({
            type: "DEPOSIT",
            data: {
                receipt,
                wallet,
                currency: "POOL"
            }
        })
        console.log('stake success')
    } catch (e) {
        alert(e)
        console.log('stake error', e);
    }
}

const stakePairedToken = async (wallet, marketMakerAddres, amount, callback) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const marketMakerContract = await new ethers.Contract(marketMakerAddres, marketMaker.abi, signer);

    try {
        const tx = await marketMakerContract.stakePairedToken(amount);
        toast.promise(
            tx.wait(),
            {
                pending: 'Pending transaction',
                success: `Transaction succeeded!`,
                error: 'Transaction failed!'
            }
        )
        const receipt = await tx.wait();
        console.log(receipt);
        await helpers.callback.hook({
            type: "DEPOSIT",
            data: {
                receipt,
                wallet,
                currency: "POOL"
            }
        })
        console.log('stakePairedToken success')
    } catch (e) {
        alert(e)
        console.log('stakePairedToken error', e);
    }
}

const stakePairedTokenInETH = async (wallet, marketMakerAddress, amount, callback) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const marketMakerContract = await new ethers.Contract(marketMakerAddress, marketMaker.abi, signer);

    try {
        const tx = await marketMakerContract.stakePairedTokenInETH({value: amount});
        toast.promise(
            tx.wait(),
            {
                pending: 'Pending transaction',
                success: `Transaction succeeded!`,
                error: 'Transaction failed!'
            }
        )
        const receipt = await tx.wait();
        console.log(receipt);
        await helpers.callback.hook({
            type: "DEPOSIT",
            data: {
                receipt,
                wallet,
                currency: "POOL"
            }
        })
    } catch (e) {
        alert(e)
        console.log('stakePairedTokenInETH error', e);
    }
}

const withdrawBaseToken = async (wallet, marketMakerAddress, amount, callback) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const marketMakerContract = await new ethers.Contract(marketMakerAddress, marketMaker.abi, signer);
    try {
        const tx = await marketMakerContract.withdrawBaseToken(amount);
        toast.promise(
            tx.wait(),
            {
                pending: 'Pending transaction',
                success: `Transaction succeeded!`,
                error: 'Transaction failed!'
            }
        )
        const receipt = await tx.wait();
        console.log(receipt);
        await helpers.callback.hook({
            type: "WITHDRAW",
            data: {
                receipt,
                wallet,
                currency: "POOL"
            }
        })
        console.log('withdrawBaseToken success')
    } catch (e) {
        alert(e)
        console.log('withdrawBaseToken error', e);
    }
}

const withdrawPairToken = async (wallet, marketMakerAddress, amount, callback) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const signer = provider.getSigner();
    const marketMakerContract = await new ethers.Contract(marketMakerAddress, marketMaker.abi, signer);

    try {
        const tx = await marketMakerContract.withdrawPairedToken(amount);
        toast.promise(
            tx.wait(),
            {
                pending: 'Pending transaction',
                success: `Transaction succeeded!`,
                error: 'Transaction failed!'
            }
        )
        const receipt = await tx.wait();
        console.log(receipt);
        await helpers.callback.hook({
            type: "WITHDRAW",
            data: {
                receipt,
                wallet,
                currency: "POOL"
            }
        })
        console.log('withdrawPairedToken success')
    } catch (e) {
        alert(e)
        console.log('withdrawPairedToken error', e);
    }
}


const release = async (wallet, marketMakerAddress, amount, callback) => {
    try {
        const provider = new ethers.providers.Web3Provider(wallet.ethereum);
        const signer = provider.getSigner();
        const marketMakerContract = await new ethers.Contract(marketMakerAddress, marketMaker.abi, signer);

        const tx = await marketMakerContract.release(amount);
        toast.promise(
            tx.wait(),
            {
                pending: 'Pending transaction',
                success: `Transaction succeeded!`,
                error: 'Transaction failed!'
            }
        )
        const receipt = await tx.wait();
        console.log(receipt);
        await helpers.callback.hook({
            type: "RELEASE",
            data: {
                receipt,
                wallet,
                currency: "POOL"
            }
        })
        console.log('release success')
    } catch (e) {
        alert(e)
        console.log('release error', e);
    }
}


const computeReleasableAmount = async (wallet, marketMakerAddress, address, callback) => {
    try {
        const provider = new ethers.providers.Web3Provider(wallet.ethereum);
        const signer = provider.getSigner();
        const marketMakerContract = await new ethers.Contract(marketMakerAddress, marketMaker.abi, signer);
        const result = await marketMakerContract.computeReleasableAmount(address);
        callback(result)
        console.log('computeReleasableAmount success')
    } catch (e) {
        console.log('computeReleasableAmount error', e);
        return 0;
    }
}

const getWithdrawablePairedTokens = async (wallet, marketMakerAddress, address, callback) => {
    try {
        const provider = new ethers.providers.Web3Provider(wallet.ethereum);
        const signer = provider.getSigner();
        const marketMakerContract = await new ethers.Contract(marketMakerAddress, marketMaker.abi, signer);
        return await marketMakerContract.getWithdrawablePairedTokens(address);
    } catch (e) {
        console.log('getWithdrawablePairedTokens error', e);
        return 0;
    }
}
const available = async (wallet, marketMakerAddress, address) => {
    try {
        const provider = new ethers.providers.Web3Provider(wallet.ethereum);
        const signer = provider.getSigner();
        const marketMakerContract = await new ethers.Contract(marketMakerAddress, marketMaker.abi, signer);
        return await marketMakerContract.available(address);
    } catch (e) {
        console.log('available error', e);
        return 0;
    }
}

export default {
    stake,
    stakePairedToken,
    stakePairedTokenInETH,
    withdrawBaseToken,
    withdrawPairToken,
    release,
    computeReleasableAmount,
    getWithdrawablePairedTokens,
    available,
    deploy
}