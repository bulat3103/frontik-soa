import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './component/main/main.component';
import { AppbarComponent } from './component/main/appbar/appbar.component';
import { MatRippleModule } from '@angular/material/core';
import { SpaceMarinesComponent } from './component/main/space-marines/space-marines.component';
import { SpaceMarineCardComponent } from './component/main/space-marines/space-marine-card/space-marine-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AddMarineDialogComponent } from './component/main/space-marines/add-marine-dialog/add-marine-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpaceMarineSoloComponent } from './component/main/space-marines/smace-marine-solo/space-marine-solo.component';
import { GetMarineDialogComponent } from './component/main/appbar/get-marine-dialog/get-marine-dialog.component';
import { EditMarineDialogComponent } from './component/main/space-marines/edit-marine-dialog/edit-marine-dialog.component';
import { SortDialogComponent } from './component/main/space-marines/sort-dialog/sort-dialog.component';
import { FilterDialogComponent } from './component/main/space-marines/filter-dialog/filter-dialog.component';
import { LowerAchievsComponent } from './component/main/appbar/lower-achievs/lower-achievs.component';
import { StarshipCreateDialogComponent } from './component/main/spaceShips/starship-create-dialog/starship-create-dialog.component';
import { UnloadAllMarinesDialogComponent } from './component/main/spaceShips/unload-all-marines-dialog/unload-all-marines-dialog.component';
import { PatternMarinesComponent } from './component/main/space-marines/pattern-marines/pattern-marines.component';
import { PatternDialogComponent } from './component/main/appbar/pattern-dialog/pattern-dialog.component';
import { ToastrModule } from 'ngx-toastr';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AppbarComponent,
    SpaceMarinesComponent,
    SpaceMarineCardComponent,
    AddMarineDialogComponent,
    SpaceMarineSoloComponent,
    GetMarineDialogComponent,
    EditMarineDialogComponent,
    SortDialogComponent,
    FilterDialogComponent,
    LowerAchievsComponent,
    StarshipCreateDialogComponent,
    UnloadAllMarinesDialogComponent,
    PatternMarinesComponent,
    PatternDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatRippleModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    ToastrModule.forRoot({
      timeOut: 2000,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
