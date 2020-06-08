import * as ecdsa from 'elliptic'

const ec = new ecdsa.ec('secp256k1');

export const generatePrivateKey = (): string => {
    const keyPair = ec.genKeyPair();
    return keyPair.getPrivate().toString(16); //hex
}

export const generatePublicKey = (privateKey: string): string => {
    const key = ec.keyFromPrivate(privateKey,'hex');
    return key.getPublic().encode('hex',false); //256 bit
}

export const getKeyForSignature = (privateKey: string) => { //used for signing
    return ec.keyFromPrivate(privateKey,'hex');
}