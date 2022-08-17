import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { MaterialModule } from './material.module';
import { IntialPageComponent } from './views/intial-page/intial-page.component';
import { StudentFormModule } from './views/student-form/student-form.module';



@NgModule({
  declarations: [AppComponent, SideMenuComponent, IntialPageComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    StudentFormModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
