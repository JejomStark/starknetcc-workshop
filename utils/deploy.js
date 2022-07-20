const starknet = require("hardhat").starknet;
const { strToFeltArr, toUint256WithFelts, feltArrToStr } = require("./../test/utils/utils")
require("dotenv").config();

async function main() {
    if (process.env.PROJET_NOM == null) {
        console.log("PROJET_NOM n'est pas défini dans .env");
        process.exit(1);
    }

    if (process.env.PROJET_SYMBOLE == null) {
        console.log("PROJET_SYMBOLE n'est pas défini dans .env");
        process.exit(1);
    }

    if (process.env.PROJET_PROPRIETAIRE == null) {
        console.log("PROJET_PROPRIETAIRE  n'est pas défini dans .env");
        process.exit(1);
    }
    if (process.env.PROJET_URI == null) {
        console.log("process.env.PROJET_URI  n'est pas défini dans .env");
        process.exit(1);
    }
    if (process.env.PROJET_MAX_SUPPLY == null) {
        console.log("process.env.PROJET_MAX_SUPPLY  n'est pas défini dans .env");
        process.exit(1);
    }

    /**
    * Initialiser de notre contract ERC721_Full nous avons besoin de :
    * un nom,
    * un symbol,
    * un propriétaire
    * une max_supply
    * une URI
    */

    const PROJET_NOM = starknet.shortStringToBigInt(process.env.PROJET_NOM);
    const PROJET_SYMBOLE = starknet.shortStringToBigInt(process.env.PROJET_SYMBOLE);
    const PROJET_PROPRIETAIRE = BigInt(process.env.PROJET_PROPRIETAIRE);
    const baseTokenURI = strToFeltArr(process.env.PROJET_URI);

    const NftContractFactory = await starknet.getContractFactory("Nft");
    const NftContract = await NftContractFactory.deploy({
        name: PROJET_NOM,
        symbol: PROJET_SYMBOLE,
        owner: PROJET_PROPRIETAIRE, 
        max_supply: toUint256WithFelts(process.env.PROJET_MAX_SUPPLY),
        base_token_uri: baseTokenURI,        
    });

    console.log(`Déploiement de notre smart contract à l'adresse : ${NftContract.address}`);

    process.exit(0);
}

main()
    .then(() => console.log("Workshop finit avex succès."))
    .catch((x) => {
        console.log(`Erreur d'exécution: ${x.toString()}`);
        process.exit(1);
    });