import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SqLiteService } from './sq-lite-service';

@Injectable({
  providedIn: 'root'
})
export class DeltaSync {

  private lastSyncKey = 'lastSyncDate';

  constructor(private http: HttpClient, private sqlite: SqLiteService) {}

  private getLastSyncDate(): string {
    return localStorage.getItem(this.lastSyncKey) || '2000-01-01T00:00:00Z'; 
  }

  private setLastSyncDate(date: string) {
    localStorage.setItem(this.lastSyncKey, date);
  }
  async syncTable(apiUrl: string, tableName: string, metadata?: any[]): Promise<void> {
    const lastSync = this.getLastSyncDate();
    const now = new Date().toISOString();

    try {
      const response: any = await this.http.get(`${apiUrl}?fromDate=${lastSync}&toDate=${now}`).toPromise();
      if (!response || response.length === 0) {
        console.log(`No updates for ${tableName}`);
        return;
      }
      if (metadata) {
        await this.sqlite.createTableFromMetadata(tableName, metadata);
        await this.sqlite.insertData(tableName, response);
      } else {
        await this.sqlite.insertData(tableName, response);
      }
      this.setLastSyncDate(now);
      console.log(`Delta sync completed for ${tableName}`);
    } catch (err) {
      console.error(`Delta sync failed for ${tableName}:`, err);
    }
  }
}
