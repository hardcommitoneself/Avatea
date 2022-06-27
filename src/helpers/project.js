import axios from 'axios';
import {ethers} from 'ethers';
import TokenContract from '../abi/Token.json';
import {API_URL, CLOUD_2_TOKEN_ADDRESS, DEFAULT_CHAIN_ID} from "./constants";


const getProjects = async ({live = 'True', network = DEFAULT_CHAIN_ID} = {}) => {

    let parameters = "?";
    if (live) parameters += `live=${live}&`
    if (network) parameters += `network=${network}&`

    try {
        const {data} = await axios.get(`${API_URL}Project/${parameters}`);
        return data;
    } catch (e) {
        console.log('getProjects error:', e);
    }
}

//@TODO Handle error for market maker settings if no wallet is available
const getProject = async (slug, network = DEFAULT_CHAIN_ID, user_address = "none") => {
    try {
        const {data} = await axios.get(`${API_URL}Project/${slug}/?network=${network}&user_address=${user_address}`);
        const {project, vault, marketMakingPool, UserSettings} = data;
        return {project, vault, marketMakingPool, UserSettings};
    } catch (e) {
        console.log('getProject error:', e);
    }
}

const getProjectServerSide = async (context, network = DEFAULT_CHAIN_ID, user_address = "none") => {
    const {slug} = context.query;
    if (slug !== "undefined") {
        try {
            const {data} = await axios.get(`${API_URL}Project/${slug}/?network=${network}&user_address=${user_address}`);
            const {project, vault, marketMakingPool, UserSettings} = data;
            return {
                props: {
                    projectDetail: project, marketMakingPool, vault
                }
            }
        } catch (e) {
            console.log('getProject error:', e);
            return {
                props: {
                    projectDetail: null, marketMakingPool: null, vault: null
                }
            }
        }
    } else {
        return {
            props: {
                projectDetail: null, marketMakingPool: null, vault: null,
            },
        };
    }
}



//@TODO Handle error for market maker settings if no wallet is available
const getArticles = async (slug) => {
    try {
        const data = await axios.get(`${API_URL}Article/?project=${slug}`);
        return data
    } catch (e) {
        console.log('getArticles error:', e);
    }
}


export default {
    getProjects,
    getProject,
    getArticles,
    getProjectServerSide
}