/* eslint-disable @typescript-eslint/no-explicit-any */
function pick(obj: any, keys: string[]) {
    const modifiedObj: any = {};

    for (const key of keys) {
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            modifiedObj[key] = obj[key];
        }
    }
    return modifiedObj;
}

export default pick;
