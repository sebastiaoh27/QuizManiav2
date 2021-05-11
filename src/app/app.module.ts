import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenav, MatSidenavModule, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { HomeComponent } from './components/home/home.component';
import { CreateRoomComponent } from './components/create-room/create-room.component';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';
import { ContactComponent } from './components/contact/contact.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {HttpClientModule} from '@angular/common/http';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {RoomService} from './services/room-service.service';
import {OverlayModule} from '@angular/cdk/overlay';

import { UserRoomComponent } from './components/user-room/user-room.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {Dialog, HostRoomComponent} from './components/host-room/host-room.component';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {ThreeLineSelectListComponent} from './components/objects/three-line-select-list/three-line-select-list.component';
import {CountdownSelectListComponent} from './components/objects/countdown-select-list/countdown-select-list.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateRoomComponent,
    CreateQuizComponent,
    ContactComponent,
    HostRoomComponent,
    UserRoomComponent,
    Dialog,
    ThreeLineSelectListComponent,
    CountdownSelectListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatRadioModule,
    HttpClientModule,
    OverlayModule,
    MatTabsModule,
    MatDialogModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
