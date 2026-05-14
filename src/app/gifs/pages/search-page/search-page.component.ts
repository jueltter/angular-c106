import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [ListComponent],
  templateUrl: './search-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchPageComponent {

  gifsService = inject(GifsService);

  gifs = signal<Gif[]>([]);

  onSearch(query: string) {
    console.log('Search query:', query);
    this.gifsService.searchGifs(query).subscribe((data) => {
      this.gifs.set(data);
    });
  }


}
