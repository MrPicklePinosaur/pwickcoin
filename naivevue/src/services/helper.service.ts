

export const hashHexToBin = (hex: string): string => {
    //TODO: check to make sure length of hash is right

    var result = ''
    for (const h of hex) {
        result += parseInt(h,16).toString(2).padStart(4,'0');
    }
    return result;

}

export const currentTimeStamp = (): number => {
    return new Date().getTime()/1000;
}