import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutText',
})
export class CutTextPipe implements PipeTransform {
  transform(value: string, max: number = 50): unknown {
    return value.length > max ? `${value.substring(0, max)}...` : value;
  }
}
