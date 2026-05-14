import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, computed } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, of, tap } from 'rxjs';




@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);

  searchHistory = signal<Record<string, Gif[]>>({});
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs() {
    this.http.get<GiphyResponse>(`${ environment.giphyApiUrl }/v1/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 25,
        offset: 0,
        rating: 'g'
      }
    }).subscribe( (resp) => {
      const gifs: Gif[] = GifMapper.fromGiphyItemArray(resp.data);
      this.trendingGifs.set(gifs);
      this.trendingGifsLoading.set(false);
      console.log({gifs});
    });
  }

  searchGifs(query: string) : Observable<Gif[]>{
    if (query.length === 0) return of([]);

    return this.http.get<GiphyResponse>(`${ environment.giphyApiUrl }/v1/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        q: query,
        limit: 25,
      }
    })
    .pipe(

      map((resp) => GifMapper.fromGiphyItemArray(resp.data)),
      tap((gifs) => { console.log({searchedGifs: gifs}) }),
      tap((gifs) => {
        this.searchHistory.update(currentHistory => ({
          ...currentHistory,
          [query.toLowerCase()]: gifs
        }));
      })

  )

  }


}
