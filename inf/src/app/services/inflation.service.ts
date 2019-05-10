import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InflationService {
 public baseUrl = 'https://www.hal-davis.com/inflationapi';
 constructor(
   private http: HttpClient
 ) {

 }
  getInfltion(StartYear: string, EndYear: string, WageOrPrice: string) {
    const Url = this.baseUrl + '/api/AvarageCpis/' + StartYear + ', ' + EndYear + ', ' + WageOrPrice ;
    return this.http.get<number>(Url)
        .pipe(map(value => {
            return value;
        }));
  }
}
