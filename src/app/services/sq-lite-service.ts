import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Data, Metadata  } from '../interfaces/login-details';

@Injectable({
  providedIn: 'root'
})
export class SqLiteService {
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
  async createTableFromMetadata(tableName: string, metadata: Metadata[]): Promise<void> {
    if (!this.db){
      await this.ConnectToDatabase();
    }
    const columns = metadata.map(col => `${col.name} ${col.type}`).join(', ');
    const query = `CREATE TABLE IF NOT EXISTS ${tableName} (${columns});`;
    console.log("Create Table Query:", query);
    await this.db!.execute(query);
  }
  async insertData(tableName: string, data: Data[]): Promise<void> {
    if (!this.db) await this.ConnectToDatabase();
    for (const row of data) {
      const columns = Object.keys(row).join(', ');
      const placeholders = Object.keys(row).map(() => '?').join(', ');
      const values = Object.values(row);
      const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders});`;
      console.log("Insert Query:", query, values);
      await this.db?.run(query, values);
    }
  } 
}
