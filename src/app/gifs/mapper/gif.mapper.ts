import { Gif } from '../interfaces/gif.interface';
import { GiphyItem } from '../interfaces/giphy.interfaces';
export class GifMapper  {
  static fromGiphyItem(giphyItem: GiphyItem): Gif {
    return {
      id: giphyItem.id,
      title: giphyItem.title,
      url: giphyItem.images.fixed_height.url
    }
  }

  static fromGiphyItemArray(giphyItems: GiphyItem[]): Gif[] {
    return giphyItems.map((item) => this.fromGiphyItem(item));
  }
}
