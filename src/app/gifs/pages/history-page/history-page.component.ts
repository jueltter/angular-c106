import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';
import { GifsService } from '../../services/gifs.service';
import { ListComponent } from "../../components/list/list.component";
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-history-page',
  imports: [ListComponent],
  templateUrl: './history-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HistoryPageComponent {
  gifsService = inject(GifsService);




  query = toSignal<string>(inject(ActivatedRoute).params.pipe(
    map(params => params['query']),
    tap(query => console.log({query}))

  ));

  gifs = computed<Gif[]>(() => {
     const key = this.query()?.toLowerCase() ?? '';
      return this.gifsService.searchHistory()[key] ?? [];

  });

}
