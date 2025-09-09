import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, BehaviorSubject } from 'rxjs';
import { IApiList, Iapiresponse } from '../interfaces/i-apilist';
import { SqLiteService } from './sq-lite-service';
import { API_STATUS, LIST_OF_APIS } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
 apiCallStatesSubject = new BehaviorSubject<Iapiresponse[]>([]);
 apiCallStates$ = this.apiCallStatesSubject.asObservable();

  constructor(private sql: SqLiteService, private http: HttpClient) { }

  public getCurrentApiStates(): Iapiresponse[] {
    return this.apiCallStatesSubject.getValue();
  }
  async TrackApis(apilist: IApiList[]): Promise<Iapiresponse[]> {
    const results = await this.apiresponse(apilist);
    this.apiCallStatesSubject.next(results); 
    return results;
  }
  async retryFailedApis(): Promise<Iapiresponse[]> {
    const currentStates = this.apiCallStatesSubject.getValue();
    const failedApiTableNames = currentStates.filter(api => api.api_status !== API_STATUS.SUCCESS).map(api => api.tablename);
    if (failedApiTableNames.length === 0) {
      return currentStates; 
    }
    const apisToRetry = LIST_OF_APIS.filter(api => failedApiTableNames.includes(api.tablename));
    const retryResults = await this.apiresponse(apisToRetry);
    const newStates = currentStates.map(oldState => retryResults.find(r => r.tablename === oldState.tablename) || oldState);
    this.apiCallStatesSubject.next(newStates); 
    return newStates;
  }

  async apiresponse(apilist: IApiList[]): Promise<Iapiresponse[]> {
    let results: Iapiresponse[] = [];
    for (const api of apilist) {
      try {
        const response: any = await firstValueFrom(this.http.get<any>(api.url));
        if (api.csv_type === true) {
          const dataToInsert = api.responsivekey && response && response[api.responsivekey] ? response[api.responsivekey]: response;
          if (!Array.isArray(dataToInsert)) {
            console.error(`Data for ${api.apiname} is not in format.`, dataToInsert);
            results.push({ tablename: api.tablename, api_status: API_STATUS.FAIL });
            continue; 
          }
          await this.sql.createAndInsertOrganization(api.tablename, dataToInsert);
          results.push({ tablename: api.tablename, api_status: API_STATUS.SUCCESS });
        } else {
          const metadata: any = await firstValueFrom(this.http.get<any>(api.metadata));
          await this.sql.createTableFromMetadata(api.tablename, metadata);
          const dataToInsert = response && api.responsivekey && response[api.responsivekey] ? response[api.responsivekey] : (response ? response.data : []) || [];
          await this.sql.insertData(api.tablename, dataToInsert);
          results.push({ tablename: api.tablename, api_status: API_STATUS.SUCCESS });
          console.log(">>>>>results::", results)
        }
      } catch (err) {
        console.error(`Error fetching data for ${api.apiname}`, err);
        results.push({ tablename: api.tablename, api_status: API_STATUS.FAIL });
      }
    }
    return results;
  }
}