

export const hashHexToBin = (hex: string): string => {
    //TODO: check to make sure length of hash is right

    let result = ''
    for (const h of hex) {
        result += parseInt(h,16).toString(2).padStart(4,'0');
    }
    return result;

}

export const currentTimeStamp = (): number => {
    return new Date().getTime()/1000;
}

    //from https://github.com/lhartikk/naivecoin/blob/chapter3/src/transaction.ts
export const toHexString = (byteArray: string): string => {
    return Array.from(byteArray, (byte: any) => {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
};