import { API_STATUS, API_type, HTTP_TYPE } from "../constants/constants";

export interface IApiList {
    apiname: string,
    tablename: string,
    url: string,
    csv_type : boolean,
    api_type : API_type,
    http_type : HTTP_TYPE,
    api_status : API_STATUS,
    metadata : string,
    responsivekey : string
}

export interface Iapiresponse{
    tablename : string,
    api_status : API_STATUS
}
