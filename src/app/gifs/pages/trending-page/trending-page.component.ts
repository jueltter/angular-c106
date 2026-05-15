import { AfterViewInit, ChangeDetectionStrategy, Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { ListComponent } from "../../components/list/list.component";
import { GifsService } from '../../services/gifs.service';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';

@Component({
  selector: 'app-trending-page',
//  imports: [ListComponent],
  templateUrl: './trending-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TrendingPageComponent implements AfterViewInit {



  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;

    if (!scrollDiv) return;
    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }



  gifsService = inject(GifsService);
  scrollStateService = inject(ScrollStateService);

  scrollDivRef =  viewChild<ElementRef<HTMLDivElement>>('groupDiv');


   gifs = computed(() => this.gifsService.trendingGifs());

  onScroll($event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;

    if (!scrollDiv) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollDiv;
    this.scrollStateService.trendingScrollState.set(scrollTop);

    const loadMoreGifs = scrollTop + clientHeight + 300 >= scrollHeight;

    if (loadMoreGifs) {
      console.log('Load more gifs');
      this.gifsService.loadTrendingGifs();
    }

  }

}
