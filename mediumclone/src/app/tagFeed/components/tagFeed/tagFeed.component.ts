import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'mc-tag-feed',
  templateUrl: './tagFeed.component.html',
  styleUrls: ['./tagFeed.component.scss']
})
export class TagFeedComponent implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  public tagName: string;
  public apiUrl: string;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params): void => {
      this.tagName = params['slug'];
      this.apiUrl = `articles?tag=${this.tagName}`;
    });
  }
}
