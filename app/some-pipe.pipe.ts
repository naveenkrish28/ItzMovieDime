import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'somePipe'
})
export class SomePipePipe implements PipeTransform {

  transform(value: String, param?: String): any {
    console.log("Pipe called");
    if (param.toLowerCase() == "caps"){
      return value.toUpperCase();
    }else{
      return value.toLowerCase();
    }
  }

}
