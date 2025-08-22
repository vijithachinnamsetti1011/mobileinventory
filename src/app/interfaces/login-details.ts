
export interface LoginResponse {
  metadata: Metadata[];
  data: Data[];
}
export interface Data {
  STATUS: string;
  USER_NAME: string;
  USER_ID: string;
  TIMESTAMP: string;
  TIMEZONE_OFFSET: string;
  FULL_NAME: string;
  PERSON_ID: string;
  RESPONSIBILITY: string;
  SET_OF_BOOK_ID: string;
  DEFAULT_ORG_ID: string;
  DEFAULT_OU_NAME: string;
  DEFAULT_INV_ORG_ID: string;
  DEFAULT_INV_ORG_NAME: string;
  DEFAULT_INV_ORG_CODE: string;
  RESPONSIBILITY_ID: string;
  RESP_APPLICATION_ID: string;
}
export interface Metadata {
  name: string;
  type: string;
}