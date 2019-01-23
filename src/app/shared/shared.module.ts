import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './modules/material.module';
import { MarkdownModule } from './modules/markdown.module';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { BlackboxDirective } from './directives/blackbox/blackbox.directive';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, RouterModule, MarkdownModule, ReactiveFormsModule],
  declarations: [ToolbarComponent, BlackboxDirective, SearchComponent],
  exports: [ToolbarComponent, BlackboxDirective, SearchComponent, MaterialModule, MarkdownModule, ReactiveFormsModule]
  // providers: [{ provide: APP_CONFIG, useValue: appConfig }]
})
export class SharedModule {}
