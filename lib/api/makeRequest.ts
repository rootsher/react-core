import merge from "lodash/merge";
import omitBy from "lodash/omitBy";
import { stringify } from "qs";

export type RequestDataObjectParamValue =
    | Blob
    | number
    | string
    | boolean
    | null
    | undefined;

export type RequestDataObject = {
    [key: string]:
        | RequestDataObject
        | RequestDataObjectParamValue
        | Array<RequestDataObject | RequestDataObjectParamValue>;
};

export type MakeRequestInit = RequestInit & {
    params?: RequestDataObject;
};

export const makeRequest = (input: string, init: MakeRequestInit = {}) => {
    const queryParams = stringify(omitBy(init.params, (value) => !value));
    const method = (init.method || "GET").toUpperCase();
    // TODO(poc: rootsher@gmail.com, 20-06-2022): add authorization header
    const headers = merge({}, init.headers);

    if (queryParams) {
        input += input.includes("?") ? "&" : "?";
        input += queryParams;
    }

    // TODO(poc: rootsher@gmail.com, 20-06-2022): handle body

    return fetch(input, { ...init, method, headers });
};
