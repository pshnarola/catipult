import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'numberFormat'})
export class NumberFormatPipe implements PipeTransform {
    constructor() {
    }

    public transform(number){
      // hundreds
      if(Math.abs(number) <= 999){
        return number ;
      }
      // thousands
      else if(Math.abs(number) >= 1000 && Math.abs(number) <= 999999){
        return (number / 1000);
      }
      // millions
      else if(Math.abs(number) >= 1000000 && Math.abs(number) <= 999999999){
        return (number / 1000000).toFixed(2) + 'M';
      }
      // billions
      else if(Math.abs(number) >= 1000000000 && Math.abs(number) <= 999999999999){
        return (number / 1000000000).toFixed(2) + 'B';
      }
      else
        return number ;
    }
}

