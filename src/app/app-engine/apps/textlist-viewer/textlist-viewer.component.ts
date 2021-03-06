import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-textlist-viewer',
  templateUrl: './textlist-viewer.component.html',
  styleUrls: ['./textlist-viewer.component.scss']
})
export class TextlistViewerComponent implements OnChanges {
  @Input() textToDisplay;
  displayArray: boolean;
  safeHtml: SafeHtml;

  constructor(
    private domSanitizer: DomSanitizer
  ) {
  }
  ngOnChanges() {
    // console.log( 'Changes', this.textToDisplay );
    this.safeHtml = this.domSanitizer.bypassSecurityTrustHtml(this.textToDisplay);

  }
}
