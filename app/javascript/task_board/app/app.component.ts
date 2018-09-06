import { Component } from '@angular/core';
import templateString from './app.component.html';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'task-board',
  template: templateString
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    // ブラウザの言語を取得
    const browserLanguage: string = (() => {
      console.log(navigator.languages);
      if (navigator.languages.length > 0) {
        return navigator.languages[0];
      }
      if (navigator.language) {
        return navigator.language
      }
      return "en";
    })();

    if (browserLanguage.match(/^ja$|^ja-/)) {
      translate.setDefaultLang('ja');
      translate.use('ja');
    } else {
      translate.setDefaultLang('en');
      translate.use('en');
    }
  }
}
