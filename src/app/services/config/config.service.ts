import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AppConfig } from '../../models/app-config.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _config!: AppConfig;
  private configUrl = '/assets/config/config.json';

  constructor(private http: HttpClient) { }

  init(): Observable<void> {
    return this.http.get(this.configUrl).pipe(
      map(config => { this._config = config })
    );
  }


  get(key: string): any {
    if (!this._config[key]) {
      throw Error('Config has not been loaded');
    }
    return this._config[key]; 
  }
}
