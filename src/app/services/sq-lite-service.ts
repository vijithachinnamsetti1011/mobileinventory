import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Data, Metadata } from '../interfaces/i-login-details';

@Injectable({
  providedIn: 'root'
})
export class SqLiteService {

  maxBatchSize: number = 20

  private sqlconnection: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db: SQLiteDBConnection | null = null;

  constructor() { }
  async ConnectToDatabase(): Promise<void> {
    await this.sqlconnection.checkConnectionsConsistency();
    const isConnected = await this.sqlconnection.isConnection("MobileInventory", false);
    if (isConnected.result) {
      this.db = await this.sqlconnection.retrieveConnection("MobileInventory", false);
    } else {
      this.db = await this.sqlconnection.createConnection("MobileInventory", false, "no-encryption", 1, false);
      await this.db.open();
    }
  }

  getSafeBatchSize(columnCount: number, maxBatchSize: number = 1000): number {
    return Math.min(maxBatchSize, Math.floor(999 / columnCount));
  }
  async createTableFromMetadata(tableName: string, metadata: Metadata[], primarykey: string = ''): Promise<void> {
    const columns = metadata.map(col => `${col.name} ${col.type ? col.type.toUpperCase() : 'TEXT'}`).join(', ');
    const primaryKeys = metadata.filter(col => col.primarykey).map(col => col.name);
    const query = primaryKeys.length > 0 ? `CREATE TABLE IF NOT EXISTS ${tableName} (${columns}, PRIMARY KEY (${primaryKeys.join(', ')}));` : `CREATE TABLE IF NOT EXISTS ${tableName} (${columns});`;
    console.log("Create Table Query:", query);
    await this.db!.execute(query);
  }


  async insertData(tableName: string, data: Data[], maxBatchSize: number = 1000): Promise<void> {
    if (!data || data.length === 0) return;

    await this.db?.execute(`DELETE FROM ${tableName}`);

    const columns = Object.keys(data[0]);
    const colCount = columns.length;
    const safeBatchSize = this.getSafeBatchSize(colCount, maxBatchSize);
    if (safeBatchSize < maxBatchSize) {
      console.warn(`Requested batch size (${maxBatchSize}) too large for ${colCount} columns. Using safe batch size: ${safeBatchSize}`);
    }
    for (let i = 0; i < data.length; i += safeBatchSize) {
      const batch = data.slice(i, i + safeBatchSize);
      const valueString = batch.map(row => `(${columns.map(() => '?').join(',')})`).join(',');
      const flatValues = batch.reduce<any[]>((acc, row) => acc.concat(Object.values(row)), []);
      const query = `INSERT OR REPLACE INTO ${tableName} (${columns.join(',')}) VALUES ${valueString}`;
      console.log('Insert Query:', query, flatValues);
      await this.db?.run(query, flatValues);
    }
  }

  async createAndInsertOrganization(tableName: string, apiResponse: any[][], maxBatchSize: number = 1000) {
    if (!this.db) {
      await this.ConnectToDatabase();
    }
    const columns = apiResponse[0];
    const rows = apiResponse.slice(1);

    let pkColumns: string[] = [];
    const formattedCols = columns.map((col: string) => {
      if (col.endsWith('_PK')) {
        const pkCol = col.replace('_PK', '');
        pkColumns.push(pkCol);
        return `${pkCol} TEXT`;
      }
      return `${col} TEXT`;
    });

    const primaryKeySQL = pkColumns.length > 0 ? `, PRIMARY KEY (${pkColumns.join(', ')})` : '';
    const createTableSQL = `CREATE TABLE IF NOT EXISTS ${tableName} (${formattedCols.join(', ')}${primaryKeySQL});`;
    console.log('Create SQL:', createTableSQL);
    await this.db!.execute(createTableSQL);
    await this.db!.execute(`DELETE FROM ${tableName}`);
    const cleanCols = columns.map((c) => c.endsWith('_PK') ? c.replace('_PK', '') : c);
    const colCount = cleanCols.length;
    const safeBatchSize = this.getSafeBatchSize(colCount, maxBatchSize);

    if (safeBatchSize < maxBatchSize) {
      console.warn(`Requested batch size (${maxBatchSize}) too large for ${colCount} columns. Using safe batch size: ${safeBatchSize}`);
    }

    for (let i = 0; i < rows.length; i += safeBatchSize) {
      const batch = rows.slice(i, i + safeBatchSize);
      const valueString = batch.map(row => `(${cleanCols.map(() => '?').join(',')})`).join(',');
      const flatValues = batch.reduce((acc, row) => acc.concat(row), []);
      const insertSQL = `INSERT OR IGNORE INTO ${tableName} (${cleanCols.join(',')}) VALUES ${valueString};`;
      await this.db!.run(insertSQL, flatValues);
    }

    console.log(`Inserted ${rows.length} rows into ${tableName}`);
  }


  async getOrganizationDetails(tableName: string): Promise<any[]> {
    if (!this.db) {
      await this.ConnectToDatabase();
    }
    try {
      const result = await this.db!.query(`SELECT * FROM ${tableName}`);
      console.log("Select Result:", result);
      return result.values ?? [];
    } catch (err) {
      console.error("Error running SELECT:", err);
      return [];
    }
  }

  async getAllSubInventoryAndLocators(tableName: string): Promise<any[]> {
    if (!this.db) {
      await this.ConnectToDatabase();
    }
    try {
      const result = await this.db!.query(`SELECT * FROM ${tableName}`);
      return result.values ?? [];
    } catch (err) {
      console.error(`Error running SELECT * on ${tableName}:`, err);
      return [];
    }
  }

  //

  async groupByData(tableName: string): Promise<any[]> {
    if (!this.db) {
      await this.ConnectToDatabase();
    }
    try {
      const result = await this.db!.query(`SELECT PoNumber,PoType,VendorName,Requestor,LastUpdateDate, COUNT (*) as Items  FROM ${tableName} GROUP BY PoNumber`);
      console.log("docmentRec", result);

      return result.values ?? [];
    } catch (err) {
      console.error(`Error running SELECT * on ${tableName}:`, err);
      return [];
    }
  }
  async getItemsByPoNumber(tableName: string, poNumber: string): Promise<any[]> {
    if (!this.db) {
      await this.ConnectToDatabase();
    }
    const result = await this.db!.query(`SELECT * FROM ${tableName} WHERE PoNumber = ${poNumber}`);
    return result.values ?? [];
  }

  async getPoHeaderByNumber(tableName: string, poNumber: string): Promise<any[]> {
    if (!this.db) {
      await this.ConnectToDatabase();
    }
    const result = await this.db!.query(`SELECT PoType, VendorName, Requestor, LastUpdateDate FROM ${tableName} WHERE PoNumber= ${poNumber} LIMIT 1`);
    return result.values ?? [];
  }

  async receiveOrderData(tableName: string, ItemNumber: string, poNumber: string): Promise<any[]> {
    if (!this.db) {
      await this.ConnectToDatabase();
    }
    try {
      const result = await this.db!.query(`SELECT * FROM ${tableName} WHERE itemNumber = '${ItemNumber}' AND PoNumber = '${poNumber}'`);
      console.log("docmentRec", result);
      console.log('Querying with:', { ItemNumber, poNumber });
      return result.values ?? [];
    } catch (err) {
      console.error(`Error running SELECT * on ${tableName}:`, err);
      return [];
    }
  }


  async locatorsList(tableName: string, subInventory: string): Promise<any[]> {
    if (!this.db) {
      await this.ConnectToDatabase();
    }
    try {
      const result = await this.db!.query(`SELECT * FROM ${tableName} WHERE SubInventoryCode = '${subInventory}'`);
      console.log("docmentRec", result);
      return result.values ?? [];
    } catch (err) {
      console.error(`Error running SELECT * on ${tableName}:`, err);
      return [];
    }
  }




  //search functionalities

  async searchOrganizations(tableName: string, searchTerm: string): Promise<any[]> {
    if (!this.db) {
      await this.ConnectToDatabase();
    }

    const lowerTerm = `%${searchTerm.toLowerCase()}%`;
    try {
      const result = await this.db!.query(`SELECT * FROM ${tableName} WHERE LOWER(InventoryOrgCode) LIKE ? OR LOWER(InventoryOrgName) LIKE ?`, [lowerTerm, lowerTerm]);
      return result.values ?? [];
    } catch (err) {
      console.error("Error running search query:", err);
      return [];
    }
  }

  async searchGroupByPoNumber(tableName: string, searchTerm: string): Promise<any[]> {
    if (!this.db) {
      await this.ConnectToDatabase();
    }

    const lowerTerm = `%${searchTerm.toLowerCase()}%`;

    try {
      const result = await this.db!.query(
        `SELECT PoNumber, PoType, VendorName, Requestor, LastUpdateDate, COUNT(*) as Items 
       FROM ${tableName} 
       WHERE LOWER(PoNumber) LIKE ? OR LOWER(VendorName) LIKE ? OR LOWER(Requestor) LIKE ?
       GROUP BY PoNumber
       ORDER BY LastUpdateDate DESC`,
        [lowerTerm, lowerTerm, lowerTerm]
      );
      return result.values ?? [];
    } catch (err) {
      console.error("Error running PO search query:", err);
      return [];
    }
  }

}
