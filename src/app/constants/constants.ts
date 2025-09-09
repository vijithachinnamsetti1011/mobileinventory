import { environment } from "src/environments/environment";

export enum API_type {
    MASTER = 'master',
    CONFIG = 'config',
    TRANSACTIONAL = 'transactional'
}

export enum HTTP_TYPE {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete'
}

export enum API_STATUS {
    START = 'start',
    SUCCESS = 'success',
    FAIL = 'fail',
    EMPTY = 'No-Content'
}

export const API_CODES = {
    _20D : '20D',
    _22A : '22A',
    _23A : '23A'
}

export const InventoryOrgId = localStorage.getItem('InventoryOrgId');
export const OrganizationID = localStorage.getItem('org_Id');
export const Responsibility_Id = localStorage.getItem('res_Id')
export const User_Id = localStorage.getItem('user_Id')
export const Person_Id = localStorage.getItem('person_Id')

export const URLS = {
    POST_TRANSACTION:`${environment.commonurl}${API_CODES._20D}/createGoodsReceiptTransactions`,
    FETCH_ITEMS_TABLE: `${environment.commonurl}${API_CODES._20D}/getItemsTable/${InventoryOrgId}/""`,
    FETCH_SUBINVENTORIES: `${environment.commonurl}${API_CODES._20D}/getSubinventories/${InventoryOrgId}/"null"/"Y"`,
    FETCH_LOCATORS_TABLE: `${environment.commonurl}${API_CODES._23A}/getLocatorsTable/${InventoryOrgId}/""`,
    FETCH_GLPERIODS: `${environment.commonurl}${API_CODES._20D}/getGLPeriods/${OrganizationID}`,
    FETCH_INVENTORY_PERIODS: `${environment.commonurl}${API_CODES._20D}/getInventoryPeriods/${OrganizationID}/${InventoryOrgId}`,
    FETCH_SERIAL_TABLE: `${environment.commonurl}${API_CODES._22A}/getSerialTableType/${InventoryOrgId}/"/468517/473573`,
    FETCH_DOCUMENT_FOR_RECEIVING: `${environment.commonurl}${API_CODES._20D}/getDocumentsForReceiving/${InventoryOrgId}/"null"/"Y"`,
    FETCH_LOTS_TABLE: `${environment.commonurl}${API_CODES._22A}/getLotsTableType/${InventoryOrgId}/""`,
//    FETCH_GLACCOUNT: `${environment.commonurl}${API_CODES._20D}/getglaccounts/${OrganizationID}`,
//    FETCH_RESTRICTED_SUBINVENTORIES: `${environment.commonurl}${API_CODES._20D}/getRestrictedSubinventories/${InventoryOrgId}/"null"/"Y"`,
//    FETCH_RESTRICTED_LOCATORS: `${environment.commonurl}${API_CODES._20D}/getRestrictedLocators/${InventoryOrgId}/"null"/"Y"`,
//    FETCH_EMPLOYEE_TABLE: `${environment.commonurl}${API_CODES._23A}/getEmployeesTable/${InventoryOrgId}/""`,
//    FETCH_LOCATIONS: `${environment.commonurl}${API_CODES._20D}/getLocations/"null"/"Y"`,
//    FETCH_ACCOUNT_ALIASES: `${environment.commonurl}${API_CODES._20D}/getAccountAliases/${InventoryOrgId}`,
//    FETCH_UNIT_MEASURES_CONVERSIONS: `${environment.commonurl}${API_CODES._20D}/getUnitOfMeasuresConversions/${InventoryOrgId}/""`,
//    FETCH_ITEMS_REVISIONS: `${environment.commonurl}${API_CODES._20D}/getItemRevisions/${InventoryOrgId}/""`,
//    FETCH_WORK_ORDER_OPERATIONS: `${environment.commonurl}${API_CODES._20D}/getWorkOrdersoperations/${InventoryOrgId}/""`,
//    FETCH_ON_HAND_QUANTITIES: `${environment.commonurl}${API_CODES._20D}/getOnHandQuantities/${InventoryOrgId}`,
//    FETCH_SHIPPING_NETWORK: `${environment.commonurl}${API_CODES._20D}/getShippingNetworks/${InventoryOrgId}`,
//    FETCH_REASONS: `${environment.commonurl}${API_CODES._20D}/getreasons`,
//    FETCH_PURCHASING_PERIODS: `${environment.commonurl}${API_CODES._20D}/getPurchasingPeriods/${OrganizationID}`,
};

export const METADATA_URLS = {

    SERIAL_TABLE: `${environment.commonurl}${API_CODES._22A}/getSerialTableType/"/473574/476650`,
    INVENTORY_PERIODS: `${environment.commonurl}${API_CODES._20D}/getInventoryPeriods/metadata`,
    DOCUMENT_FOR_RECEIVING: `${environment.commonurl}${API_CODES._20D}/getDocumentsForReceiving/metadata`,
    GLPERIODS: `${environment.commonurl}${API_CODES._20D}/getGLPeriodsmetadata`,
    SUBINVENTORY: `${environment.commonurl}${API_CODES._20D}/getSubinventories/metadata`,
//    GLACCOUNT: `${environment.commonurl}${API_CODES._20D}/getglaccountsmetadata`,
//    RESTRICTED_SUBINVENTORIES: `${environment.commonurl}${API_CODES._20D}/getRestrictedSubinventories/metadata`,
//    RESTRICTED_LOCATORS: `${environment.commonurl}${API_CODES._20D}/getRestrictedLocators/metadata`,
//    LOCATIONS: `${environment.commonurl}${API_CODES._20D}/getLocations/metadata`,
//    ACCOUNTALIASES: `${environment.commonurl}${API_CODES._20D}/getAccountAliasesmetadata`,
//    UNIT_MEASURES: `${environment.commonurl}${API_CODES._20D}/getUnitOfMeasuresConversionsmetadata`,
//    ITEM_REVISIONS: `${environment.commonurl}${API_CODES._20D}/getItemRevisionsmetadata`,
//    WORK_ORDER_OPERATIONS: `${environment.commonurl}${API_CODES._20D}/getWorkOrdersoperations/metadata`,
//    ONHAND_QUANTITIES: `${environment.commonurl}${API_CODES._20D}/getOnHandQuantitiesmetadata`,
//    SHIPPING_NETWORK: `${environment.commonurl}${API_CODES._20D}/getShippingNetworksmetadata`,
//    REASONS: `${environment.commonurl}${API_CODES._20D}/getreasons/metadata`,
//    PURCHASING_PERIODS: `${environment.commonurl}${API_CODES._20D}/getPurchasingPeriodsmetadata`,
};

export const LIST_OF_APIS = [
    {
        apiname: 'getDocumentsForReceiving',
        tablename: 'documentsforreceiving',
        url: URLS.FETCH_DOCUMENT_FOR_RECEIVING,
        csv_type: false,
        api_type: API_type.TRANSACTIONAL,
        http_type: HTTP_TYPE.GET,
        api_status: API_STATUS.START,
        metadata: METADATA_URLS.DOCUMENT_FOR_RECEIVING,
        responsivekey: 'Docs4Receiving'
    },
    {
        apiname: 'getItems',
        tablename: 'ItemsTable',
        url: URLS.FETCH_ITEMS_TABLE,
        csv_type: true,
        api_type: API_type.MASTER,
        http_type: HTTP_TYPE.GET,
        api_status: API_STATUS.START,
        metadata: '',
        responsivekey: ''
    },
    {
        apiname: 'getSubinventories',
        tablename: 'subinventories',
        url: URLS.FETCH_SUBINVENTORIES,
        csv_type: false,
        api_type: API_type.MASTER,
        http_type: HTTP_TYPE.GET,
        api_status: API_STATUS.START,
        metadata: METADATA_URLS.SUBINVENTORY,
        responsivekey: 'ActiveSubInventories'
    },
    {
        apiname: 'getLocatorsTable',
        tablename: 'locators',
        url: URLS.FETCH_LOCATORS_TABLE,
        csv_type: true,
        api_type: API_type.MASTER,
        http_type: HTTP_TYPE.GET,
        api_status: API_STATUS.START,
        metadata: '',
        responsivekey: ''
    },
    {
        apiname: 'getGLPeriods',
        tablename: 'glperiods',
        url: URLS.FETCH_GLPERIODS,
        csv_type: false,
        api_type: API_type.CONFIG,
        http_type: HTTP_TYPE.GET,
        api_status: API_STATUS.START,
        metadata: METADATA_URLS.GLPERIODS,
        responsivekey: 'GLPeriods'
    },
    {
        apiname: 'getInventoryPeriods',
        tablename: 'inventoryperiods',
        url: URLS.FETCH_INVENTORY_PERIODS,
        csv_type: false,
        api_type: API_type.CONFIG,
        http_type: HTTP_TYPE.GET,
        api_status: API_STATUS.START,
        metadata: METADATA_URLS.INVENTORY_PERIODS,
        responsivekey: 'InventoryPeriods'
    },
    {
        apiname: 'getLotsTableType',
        tablename: 'lots',
        url: URLS.FETCH_LOTS_TABLE,
        csv_type: true,
        api_type: API_type.TRANSACTIONAL,
        http_type: HTTP_TYPE.GET,
        api_status: API_STATUS.START,
        metadata: '',
        responsivekey: ''
    },
    {
        apiname: 'getSerialTableType',
        tablename: 'serials',
        url: URLS.FETCH_SERIAL_TABLE,
        csv_type: true,
        api_type: API_type.TRANSACTIONAL,
        http_type: HTTP_TYPE.GET,
        api_status: API_STATUS.START,
        metadata: '',
        responsivekey: ''
    },
    // {
    //     apiname: 'getglaccounts',
    //     tablename: 'glaccounts',
    //     url: URLS.FETCH_GLACCOUNT,
    //     csv_type: false,
    //     api_type: API_type.MASTER,
    //     http_type: HTTP_TYPE.GET,
    //     api_status: API_STATUS.START,
    //     metadata: METADATA_URLS.GLACCOUNT,
    //     responsivekey: 'GLAccounts'
    // },
    // {
    //     apiname: 'getRestrictedSubinventories',
    //     tablename: 'restrictedsubinventories',
    //     url: URLS.FETCH_RESTRICTED_SUBINVENTORIES,
    //     csv_type: false,
    //     api_type: API_type.MASTER,
    //     http_type: HTTP_TYPE.GET,
    //     api_status: API_STATUS.START,
    //     metadata: METADATA_URLS.RESTRICTED_SUBINVENTORIES,
    //     responsivekey: 'RestrictedSubInventories'
    // },
    // {
    //     apiname: 'getRestrictedLocators',
    //     tablename: 'restrictedlocators',
    //     url: URLS.FETCH_RESTRICTED_LOCATORS,
    //     csv_type: false,
    //     api_type: API_type.MASTER,
    //     http_type: HTTP_TYPE.GET,
    //     api_status: API_STATUS.START,
    //     metadata: METADATA_URLS.RESTRICTED_LOCATORS,
    //     responsivekey: 'RestrictedLocators'
    // },
    // {
    //     apiname: 'getEmployees',
    //     tablename: 'employees',
    //     url: URLS.FETCH_EMPLOYEE_TABLE,
    //     csv_type: true,
    //     api_type: API_type.MASTER,
    //     http_type: HTTP_TYPE.GET,
    //     api_status: API_STATUS.START,
    //     metadata: '',
    //     responsivekey: ''
    // },
    // {
    //     apiname: 'getLocations',
    //     tablename: 'locations',
    //     url: URLS.FETCH_LOCATIONS,
    //     csv_type: false,
    //     api_type: API_type.MASTER,
    //     http_type: HTTP_TYPE.GET,
    //     api_status: API_STATUS.START,
    //     metadata: METADATA_URLS.LOCATIONS,
    //     responsivekey: 'LocationList'
    // },
    // {
    //     apiname: 'getAccountAliases',
    //     tablename: 'accountaliases',
    //     url: URLS.FETCH_ACCOUNT_ALIASES,
    //     csv_type: false,
    //     api_type: API_type.MASTER,
    //     http_type: HTTP_TYPE.GET,
    //     api_status: API_STATUS.START,
    //     metadata: METADATA_URLS.ACCOUNTALIASES,
    //     responsivekey: 'AccountAliasesList'
    // },
    // {
    //     apiname: 'getUnitMeasuresConversions',
    //     tablename: 'unitmeasures',
    //     url: URLS.FETCH_UNIT_MEASURES_CONVERSIONS,
    //     csv_type: false,
    //     api_type: API_type.MASTER,
    //     http_type: HTTP_TYPE.GET,
    //     api_status: API_STATUS.START,
    //     metadata: METADATA_URLS.UNIT_MEASURES,
    //     responsivekey: 'Items'
    // },
    // {
    //     apiname: 'getItemRevisions',
    //     tablename: 'itemrevisions',
    //     url: URLS.FETCH_ITEMS_REVISIONS,
    //     csv_type: false,
    //     api_type: API_type.MASTER,
    //     http_type: HTTP_TYPE.GET,
    //     api_status: API_STATUS.START,
    //     metadata: METADATA_URLS.ITEM_REVISIONS,
    //     responsivekey: 'Items'
    // },
    // {
    //     apiname: 'getWorkOrderOperations',
    //     tablename: 'workorderoperations',
    //     url: URLS.FETCH_WORK_ORDER_OPERATIONS,
    //     csv_type: false,
    //     api_type: API_type.MASTER,
    //     http_type: HTTP_TYPE.GET,
    //     api_status: API_STATUS.START,
    //     metadata: METADATA_URLS.WORK_ORDER_OPERATIONS,
    //     responsivekey: 'WorkOrdersOperations'
    // },
    // {
    //     apiname: 'getOnHandQuantities',
    //     tablename: 'onhandquantities',
    //     url: URLS.FETCH_ON_HAND_QUANTITIES,
    //     csv_type: false,
    //     api_type: API_type.MASTER,
    //     http_type: HTTP_TYPE.GET,
    //     api_status: API_STATUS.START,
    //     metadata: METADATA_URLS.ONHAND_QUANTITIES,
    //     responsivekey: 'OnHandQuantityList'
    // },
    // {
    //     apiname: 'getShippingNetwork',
    //     tablename: 'shippingnetwork',
    //     url: URLS.FETCH_SHIPPING_NETWORK,
    //     csv_type: false,
    //     api_type: API_type.MASTER,
    //     http_type: HTTP_TYPE.GET,
    //     api_status: API_STATUS.START,
    //     metadata: METADATA_URLS.SHIPPING_NETWORK,
    //     responsivekey: 'ShippingNetworks'
    // },
    // {
    //     apiname: 'getReasons',
    //     tablename: 'reasons',
    //     url: URLS.FETCH_REASONS,
    //     csv_type: false,
    //     api_type: API_type.CONFIG,
    //     http_type: HTTP_TYPE.GET,
    //     api_status: API_STATUS.START,
    //     metadata: METADATA_URLS.REASONS,
    //     responsivekey: 'Reasons'
    // },
    // {
    //     apiname: 'getPurchasingPeriods',
    //     tablename: 'purchasingperiods',
    //     url: URLS.FETCH_PURCHASING_PERIODS,
    //     csv_type: false,
    //     api_type: API_type.CONFIG,
    //     http_type: HTTP_TYPE.GET,
    //     api_status: API_STATUS.START,
    //     metadata: METADATA_URLS.PURCHASING_PERIODS,
    //     responsivekey: 'POPeriods'
    // }
];




