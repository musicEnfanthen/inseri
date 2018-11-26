import {Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {Router, ActivatedRoute} from '@angular/router';
import {ActionService } from '../../../shared/nieOS/fake-backend/action/action.service';
import {GenerateHashService} from '../../../shared/nieOS/other/generateHash.service';
import {EditPageSetComponent} from '../edit-page-set/edit-page-set.component';
import {CreatePageSetAndLinkToActionService} from '../services/createPageSetAndLinkToAction.service';
import {PageService} from '../../apps/page/page.service';
import {MongoActionService} from '../../../shared/nieOS/mongodb/action/action.service';
import { PageSetModel } from '../model/page-set.model';
import { PageSetService } from '../model/page-set.service';
import { Action } from '../../../shared/nieOS/mongodb/action/action.model';
import { EditPageComponent } from '../edit-page/edit-page.component';
import { Page } from '../../../shared/nieOS/mongodb/page/page.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DeletePageComponent } from '../delete-page/delete-page.component';

@Component({
  selector: 'app-page-set-landing-page',
  templateUrl: './page-set-landing-page.component.html',
  styleUrls: ['./page-set-landing-page.component.scss']
})
export class PageSetLandingPageComponent implements OnInit {
  name: string;
  actionID: string;
  pageSet: any;
  action: Action;
  model: any;
  pagesOfThisPageSet: any;

  constructor(
    public dialog: MatDialog,
    public dialogUpdatePageSet: MatDialog,
    public dialogEditPage: MatDialog,
    private route: ActivatedRoute,
    private generateHashService: GenerateHashService,
    private actionService: ActionService,
    private pageSetService: PageSetService,
    private createPageSetAndLinkToActionService: CreatePageSetAndLinkToActionService,
    private pageService: PageService,
    private mongoActionService: MongoActionService,
  ) { }

  ngOnInit() {
    this.actionID = this.route.snapshot.queryParams.actionID;
    if (this.actionID) {
      this.checkIfPageSetExists(this.actionID);
    }
  }

  checkIfPageSetExists(actionID: string) {
    this.mongoActionService.getAction(actionID)
      .subscribe(data => {
        if (data.status === 200) {
          this.action = data.body.action;
          if (this.action.type === 'page-set') {
            this.pagesOfThisPageSet = [];
            this.pageSet = this.action.hasPageSet;
            this.updatePagesOfThisPageSet(this.action);
          }
        } else if (data.status === 404) {
          // Fehlermeldung
          // this.initializeTemplatePageSet();
        } else {
          // Fehlermeldung
        }
      }, error => {
        console.log(error);
        // Fehlermeldung
        // this.templatePageSet();
      });
  }

  updatePagesOfThisPageSet(action: any) {
    const help = [];
    for (const page of action.hasPageSet.hasPages) {
      help[help.length] = page;
    }
    this.pagesOfThisPageSet = help;
  }

  // initializeTemplatePageSet() {
  //   this.templatePageSet();
  //   console.log('Save page set and then add page set - hash to action and update action.');
  //
  //   this.pageSetService.createPageSet(this.pageSet)
  //     .subscribe(dbPageSet => {
  //       this.mongoActionService.getAction(this.actionID)
  //         .subscribe(dbAction => {
  //           dbAction.action.hasPageSet = dbPageSet.pageset._id;
  //           this.mongoActionService.updateAction(dbAction.action).subscribe(result => {
  //             this.action = result.action;
  //           });
  //         });
  //     });
  // }

  // templatePageSet() {
  //   this.pageSet = new PageSetModel();
  //   console.log('No page set for this action yet');
  //   this.pageSet.id = this.generateHashService.generateHash();
  //   this.pageSet.title = 'Example pageSet';
  //   this.pageSet.linkToImage = 'https://c8.alamy.com/' +
  //     'comp/DX9AP3/' +
  //     'open-book-vintage-accessories-old-letters-pages-photo-frames-glasses-DX9AP3.jpg';
  //   this.pageSet.description = 'Dies als Beispiel für eine PageSet bei NIE-OS';
  // }

  generateDescription() {
    if (this.pageSet && this.pageSet.description) {
      return this.pageSet.description;
    } else {
      return 'Description not found';
    }
  }

  generateTitle() {
    if (this.pageSet && this.pageSet.title) {
      return this.pageSet.title;
    } else {
      return 'Title not found';
    }
  }

  generateImage() {
    if (this.pageSet && this.pageSet.linkToImage) {
      return this.pageSet.linkToImage;
    } else {
      return 'Image not found';
    }
  }

  addPage() {
    const dialogRef = this.dialog.open(DialogCreateNewPageComponent, {
      width: '700px',
      data: { pageset: this.pageSet }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.checkIfPageSetExists(this.actionID);
      // this.createPageAndUpdateAction(result, this.route.snapshot.queryParams.actionID );
    });
  }

  editPageSet() {
    const dialogRef = this.dialogUpdatePageSet.open(EditPageSetComponent, {
      width: '700px',
      data: {
        id: this.action.hasPageSet['_id'],
        title: this.pageSet.title,
        description: this.pageSet.description,
        linkToImage: this.pageSet.linkToImage
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if ( result !== undefined ) {
        this.pageSet.title = result.title;
        this.pageSet.description = result.description;
        this.pageSet.linkToImage = result.linkToImage;
      }
    });
  }

  generateURL(page: any) {
    if ( page ) {
      return 'page?actionID=' + this.actionID + '&page=' + page._id;
    }
  }

  generatePageTitle (page: any) {
    if ( page ) {
      return page.title;
    }
  }

  generatePageDescription (page: any ) {
    if ( page ) {
      return page.description;
    }
  }

  editPage(page: Page) {
    const dialogRef = this.dialogEditPage.open(EditPageComponent, {
      width: '600px',
      data: {
        page: page,
        pageSetID: this.pageSet['_id']
      },
      hasBackdrop: false
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        this.checkIfPageSetExists(this.actionID);
      });
  }

  deletePage(page: Page) {
    const dialogRef = this.dialogEditPage.open(DeletePageComponent, {
      width: '600px',
      data: {
        page: page,
        pageSetID: this.pageSet['_id']
      },
      hasBackdrop: false
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        this.checkIfPageSetExists(this.actionID);
      });
  }
}

@Component({
  selector: 'dialog-create-new-page',
  templateUrl: './dialog-create-new-page.html',
  styleUrls: ['./dialog-create-new-page.scss']
})
export class DialogCreateNewPageComponent implements OnInit {
  form: FormGroup;
  isLoading: boolean;
  pageSetID: any;
  newPage: Page = {
    id: undefined,
    title: '',
    description: '',
    hash: ''
  };

  constructor(public dialogRef: MatDialogRef<DialogCreateNewPageComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router,
              private actionService: ActionService,
              private route: ActivatedRoute,
              private pageService: PageSetService) {
    this.pageSetID = data.pageset._id;
  }

  ngOnInit() {
    this.isLoading = false;
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    this.isLoading = true;
    this.newPage.title = this.form.get('title').value;
    this.newPage.description = this.form.get('description').value;

    this.pageService.createPage(this.pageSetID, this.newPage)
      .subscribe((result) => {
        this.isLoading = false;
        if (result.status === 201) {
          this.dialogRef.close();
        } else {
          this.dialogRef.close();
        }
      }, error => {
        this.isLoading = false;
      });
  }
}