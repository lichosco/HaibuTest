import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  apiUrl = 'https://my-json-server.typicode.com/HaibuSolutions/prueba-tecnica-sf';
  constructor(public http: HttpClient) {
    console.log('Hello RestServiceProvider Provider');
  }
  getUsers() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/user').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
}

