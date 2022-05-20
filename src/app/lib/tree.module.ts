import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NodeComponent } from './node/node.component';
import { TreeComponent } from './tree/tree.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    NodeComponent,
    TreeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  exports: [
    TreeComponent
  ]
})
export class TreeModule { }
