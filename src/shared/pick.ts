function pick<T extends Record<string, unknown>, k extends keyof T>(obj: T, keys: k[]): Partial<T> {
    const modifiedObj: Partial<T> = {};

    for (const key of keys) {
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            modifiedObj[key] = obj[key];
        }
    }
    return modifiedObj;
}

export default pick;
