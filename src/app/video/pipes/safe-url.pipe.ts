import { Pipe, PipeTransform } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'

@Pipe({
  name: 'safeURL',
})
export class SafeURLPipe implements PipeTransform {
  constructor(public sanitizer: DomSanitizer) {}

  transform(value: string) {
    // in the background Angular will use this method to do the pipe (by default)
    return this.sanitizer.bypassSecurityTrustUrl(value)
  }
}
