import { Component, ChangeDetectorRef, Inject, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  NG_VALUE_ACCESSOR
} from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { SelectionModel } from "@angular/cdk/collections";
import { AppserviceService } from "./service/appservice.service";
import { Router, NavigationEnd } from "@angular/router";
import { filter, window } from "rxjs/operators";
import { WindowRefService } from './service/window-ref.service';
import {TranslateService} from '@ngx-translate/core';


declare var gtag;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "app";
  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    public dialog: MatDialog,
    private appService: AppserviceService,
    public router: Router,
    public winRef:WindowRefService,
    public translate: TranslateService

  ) {
    const navEndEvent$ = router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    );
    navEndEvent$.subscribe((e: NavigationEnd) => {
     // gtag("config", "UA-149143223-1", { page_path: e.urlAfterRedirects });
     console.log(' e.urlAfterRedirects===>', e.urlAfterRedirects)
     console.log('Native window obj', winRef.nativeWindow.dataLayer);
     winRef.nativeWindow.dataLayer.push({
        event: 'virtualPageview',
        contentCategory: e.urlAfterRedirects,
      
      });

     
    });
  }
  ngOnInit() {
    this.appService.userList.subscribe(next => next);
    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang('en');

    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }
}
