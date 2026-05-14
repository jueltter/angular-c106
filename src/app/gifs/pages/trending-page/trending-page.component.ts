import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ListComponent } from "../../components/list/list.component";
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-trending-page',
  imports: [ListComponent],
  templateUrl: './trending-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TrendingPageComponent {


  gifsService = inject(GifsService);


   gifs = computed(() => this.gifsService.trendingGifs());

}
