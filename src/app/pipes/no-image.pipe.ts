import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noImage'
})
export class NoImagePipe implements PipeTransform {

  transform(img:any): string {
  
    if (!img){  
      return 'assets/ash.jpg'


   }


   if( img.length > 0){

    return img;
  } else{
    return 'assets/ash.jpg';  // si viene vacio o algo asi
  }
  }

}
