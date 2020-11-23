import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { HomeComponent } from './components/pages/home/home.component';
import { SubscribeComponent } from './components/layouts/subscribe/subscribe.component';
import { BlogComponent } from './components/layouts/blog/blog.component';
import { PodcastComponent } from './components/layouts/podcast/podcast.component';
import { VideoComponent } from './components/layouts/video/video.component';
import { MainBannerComponent } from './components/layouts/main-banner/main-banner.component';
import { NavbarComponent } from './components/layouts/navbar/navbar.component';
import { BlogDetailsComponent } from './components/pages/blog-details/blog-details.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    SubscribeComponent,
    BlogComponent,
    PodcastComponent,
    VideoComponent,
    MainBannerComponent,
    NavbarComponent,
    BlogDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
