import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-search-page',
  imports: [ListComponent],
  templateUrl: './search-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchPageComponent {

  gifsService = inject(GifsService);

  onSearch(query: string) {
    console.log('Search query:', query);
    this.gifsService.searchGifs(query);
  }


}
