import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, computed, effect } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, of, tap } from 'rxjs';

const loadFromLocalStorage = (): Record<string, Gif[]> => {
  const history = localStorage.getItem('searchHistory');
  return history ? JSON.parse(history) : {};
}


@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);

  trendingGifGroup = computed(() => {
    const groups = [];

    for (let i = 0; i < this.trendingGifs().length; i += 3) {
      groups.push(this.trendingGifs().slice(i, i + 3));
    }

    return groups;
  });

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
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

  getHistoryForQuery(query: string): Gif[] {
    const key = query.toLowerCase();
    return this.searchHistory()[key] ?? [];
  }

  saveToLocalStorage = effect(() => {
    const history = this.searchHistory();
    localStorage.setItem('searchHistory', JSON.stringify(history));
  });


}
