import avateaToken from './web3/avateaToken';
import marketMaker from './web3/marketMaker';
import vault from './web3/vault';
import marketMaking from "./marketMaking";
import project from "./project";
import token from "./web3/token";
import user from './user';
import vaultRest from './vault';
import callback from "./callback";
import authentication from "./web3/authentication";


// @TODO Cleanup all to Web3 object for now keep it as it is without breaking the current code
export default {
    avateaToken,
    marketMaker,
    vault,
    marketMaking,
    web3: {
        avateaToken,
        marketMaker,
        vault,
        authentication
    },
    project,
    token,
    user,
    vaultRest,
    callback
}