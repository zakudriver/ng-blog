import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './modules/material.module';
import { MarkdownModule } from './modules/markdown.module';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { BlackboxDirective } from './directives/blackbox/blackbox.directive';
import { ScrollDirective } from './directives/scroll/scroll.directive';
import { SearchComponent } from './components/search/search.component';
import { LoadingPlaceholderComponent } from './components/loading-placeholder/loading-placeholder.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, RouterModule, MarkdownModule],
  declarations: [ToolbarComponent, BlackboxDirective, ScrollDirective, SearchComponent, LoadingPlaceholderComponent],
  exports: [
    ToolbarComponent,
    BlackboxDirective,
    ScrollDirective,
    SearchComponent,
    MaterialModule,
    MarkdownModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingPlaceholderComponent
  ]
})
export class SharedModule {}
