import {Component, inject, Input, OnInit} from '@angular/core';
import {UtilsService} from '../../../../services/utils.service';

@Component({
  selector: 'mc-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  private utilsService: UtilsService = inject(UtilsService);
  @Input('total')
  public totalProps: number;
  @Input('limit')
  public limitProps: number;
  @Input('currentPage')
  public currentPageProps: number;
  @Input('url')
  public urlProps: string;
  private pagesCount: number;
  public pages: number[];

  ngOnInit(): void {
    this.pagesCount = Math.ceil(this.totalProps / this.limitProps); // Округление в большую сторону
    this.pages = this.utilsService.range(1, this.pagesCount);
  }
}
