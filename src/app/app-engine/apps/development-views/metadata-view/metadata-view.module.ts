import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetadataViewComponent } from './metadata-view/metadata-view.component';
import { RouterModule } from '@angular/router';
import { FactSheetModule } from '../obsolete/fact-sheet/fact-sheet.module';
import { MaterialModule } from '../../../../material.module';
import { TagChipsModule } from '../obsolete/tag-chips/tag-chips.module';
import { D3jsModule } from '../../d3js/d3js.module';
import { Project0041Module } from '../../project-specific/project-0041/project-0041.module';
import { Project0062Module } from '../../project-specific/project-0062/project-0062.module';
import { HierarchicalNavigationModule } from '../../navigation/hierarchical-navigation/hierarchical-navigation.module';

@NgModule({
  imports: [
    CommonModule,
    FactSheetModule,
    MaterialModule,
    TagChipsModule,
    Project0041Module,
    Project0062Module,
    HierarchicalNavigationModule,
    D3jsModule,
    RouterModule.forChild([
      { path: 'dev/metadata', component: MetadataViewComponent }
    ])
  ],
  declarations: [MetadataViewComponent]
})
export class MetadataViewModule { }
