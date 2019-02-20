import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';

import { MaterialModule } from './modules/material.module';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { BlackboxDirective } from './directives/blackbox/blackbox.directive';
import { ScrollDirective } from './directives/scroll/scroll.directive';
import { SearchComponent } from './components/search/search.component';
import { LoadingPlaceholderComponent } from './components/loading-placeholder/loading-placeholder.component';
import { MarkdownComponent } from './components/markdown/markdown.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, RouterModule],
  declarations: [
    ToolbarComponent,
    BlackboxDirective,
    ScrollDirective,
    SearchComponent,
    LoadingPlaceholderComponent,
    MarkdownComponent
  ],
  exports: [
    ToolbarComponent,
    BlackboxDirective,
    ScrollDirective,
    SearchComponent,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingPlaceholderComponent,
    MarkdownComponent
  ],
  providers: [{ provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2000 } }]
})
export class SharedModule {}
