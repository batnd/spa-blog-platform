import {Component, inject, Input, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {addToFavoritesAction} from '../../store/actions/addToFavorites.action';
import {isLoggedInSelector} from '../../../../../auth/store/selectors';
import {map, Observable, tap} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'mc-add-to-favorites',
  templateUrl: './addToFavorites.component.html',
  styleUrls: ['./addToFavorites.scss']
})
export class AddToFavoritesComponent implements OnInit {
  @Input('isFavorited') public isFavoritedProps: boolean;
  @Input('articleSlug') public articleSlugProps: string;
  @Input('favoritesCount') public favoritesCountProps: number;

  private router: Router = inject(Router);
  private store: Store = inject(Store);

  public favoritesCount: number;
  public isFavorited: boolean;
  public isLoggedIn: boolean;

  ngOnInit(): void {
    this.favoritesCount = this.favoritesCountProps;
    this.isFavorited = this.isFavoritedProps;
    this.store.pipe(select(isLoggedInSelector)).subscribe((isLoggedIn: boolean) => (this.isLoggedIn = isLoggedIn));
  }

  public handleLike(): void {
    if (this.isLoggedIn) {
      this.store.dispatch(addToFavoritesAction({isFavorited: this.isFavorited, slug: this.articleSlugProps}));
      if (this.isFavorited) this.favoritesCount = this.favoritesCount - 1;
      else this.favoritesCount = this.favoritesCount + 1;

      this.isFavorited = !this.isFavorited;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
