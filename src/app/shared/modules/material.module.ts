import { NgModule } from '@angular/core';
import {
  MatAutocompleteModule,
  MatButtonModule,
  // MatCardModule,
  // MatDialogModule,
  // MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  // MatMenuModule,
  MatProgressBarModule,
  // MatProgressSpinnerModule,
  // MatSliderModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatSidenavModule,
  MatChipsModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    // MatMenuModule,
    MatIconModule,
    // MatCardModule,
    // MatSliderModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatInputModule,
    // MatGridListModule,
    MatSnackBarModule,
    // MatProgressSpinnerModule,
    MatTooltipModule,
    MatListModule,
    // MatDialogModule,
    MatSidenavModule,
    MatChipsModule
  ],
  exports: [
    MatButtonModule,
    // MatMenuModule,
    MatIconModule,
    // MatCardModule,
    // MatSliderModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatInputModule,
    // MatGridListModule,
    MatSnackBarModule,
    // MatProgressSpinnerModule,
    MatTooltipModule,
    MatListModule,
    // MatDialogModule,
    MatSidenavModule,
    MatChipsModule
  ]
})
export class MaterialModule {}
