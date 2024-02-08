import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PopularTagsService} from './services/popularTags.service';
import {EffectsModule} from '@ngrx/effects';
import {GetPopularTagsEffect} from './store/effects/getPopularTags.effect';
import {StoreModule} from '@ngrx/store';
import {popularTagsReducer} from './store/reducers';
import {PopularTagsComponent} from './components/popularTags/popularTags.component';
import {RouterModule} from '@angular/router';
import {LoadingModule} from '../loading/loading.module';
import {ErrorMessageModule} from '../errorMessage/errorMessage.module';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetPopularTagsEffect]),
    StoreModule.forFeature('popularTags', popularTagsReducer),
    RouterModule,
    LoadingModule,
    ErrorMessageModule
  ],
  providers: [PopularTagsService],
  declarations: [PopularTagsComponent],
  exports: [PopularTagsComponent]
})
export class PopularTagsModule {}
