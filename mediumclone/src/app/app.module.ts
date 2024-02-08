import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from 'src/app/app-routing.module';
import {AppComponent} from 'src/app/app.component';
import {AuthModule} from 'src/app/auth/auth.module';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {EffectsModule} from '@ngrx/effects';
import {TopBarModule} from './shared/modules/topBar/topBar.module';
import {PersistanceService} from './shared/services/persistance.service';
import {AuthInterceptor} from './shared/services/authInterceptor.service';
import {GlobalFeedModule} from './globalFeed/globalFeed.module';
import {routerReducer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {YourFeedModule} from './yourFeed/yourFeed.module';
import {TagFeedModule} from './tagFeed/tagFeed.module';
import {ArticleModule} from './article/article.module';
import {CreateArticleModule} from './createArticle/createArticle.module';
import {EditArticleModule} from './editArticle/editArticle.module';
import {SettingsModule} from './settings/settings.module';
import {UserProfileModule} from './userProfile/userProfile.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({router: routerReducer}),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    AuthModule,
    TopBarModule,
    GlobalFeedModule,
    YourFeedModule,
    TagFeedModule,
    CreateArticleModule,
    ArticleModule,
    EditArticleModule,
    SettingsModule,
    UserProfileModule
  ],
  providers: [
    PersistanceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
