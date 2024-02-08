import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TagFeedComponent} from './components/tagFeed/tagFeed.component';
import {TagFeedRoutingModule} from './tagFeed-routing.module';
import {FeedModule} from '../shared/modules/feed/feed.module';
import {BannerModule} from '../shared/modules/banner/banner.module';
import {PopularTagsModule} from '../shared/modules/popularTags/popularTags.module';
import {FeedTogglerModule} from '../shared/modules/feedToggler/feedToggler.module';

@NgModule({
  imports: [CommonModule, TagFeedRoutingModule, FeedModule, BannerModule, PopularTagsModule, FeedTogglerModule],
  declarations: [TagFeedComponent]
})
export class TagFeedModule {}
