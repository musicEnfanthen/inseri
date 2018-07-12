import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseTypeFormsModule } from '../base-type-forms/base-type-forms.module';
import { ResourceFormComponent } from './resource-form/resource-form.component';
import { ResourceValueHistoryComponent } from './resource-value-history/resource-value-history.component';
import { ResourceValueHistoryValueComponent } from './resource-value-history-value/resource-value-history-value.component';
import { ResourceValueHistoryLinkTargetComponent } from './resource-value-history-link-target/resource-value-history-link-target.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BaseTypeFormsModule
  ],
  declarations: [
    ResourceFormComponent, 
    ResourceValueHistoryComponent, 
    ResourceValueHistoryValueComponent, 
    ResourceValueHistoryLinkTargetComponent 
  ],
  exports: [ResourceFormComponent]
})
export class ResourceFormModule { }