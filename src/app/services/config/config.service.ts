import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {


  constructor() { }

  get config(): any {
    throw new Error('Method not implemented.');
  }

  init() {
    throw new Error('Method not implemented.');
  }


}
