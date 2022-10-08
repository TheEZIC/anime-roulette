import axios from 'axios';
import {
  IShikimoriAnimesResponse,
  IShikimoriMangasResponse,
  IShikimoriTitleResponse
} from './ShikimoriTypes';
import {objectToQuery} from "../utils/objectToQuery";

export default class ShikimoriApi {
  private static readonly API = axios.create({
    baseURL: "https://shikimori.one/api"
  });

  public static async fetchAnime(search: string, censored: boolean): Promise<IShikimoriAnimesResponse[]> {
    const query = ShikimoriApi.getResponseQuery(search, censored);
    const { data } = await ShikimoriApi.API.get(`/animes?${query}`);

    return data;
  }

  public static async fetchManga(search: string, censored: boolean): Promise<IShikimoriMangasResponse[]> {
    const query = ShikimoriApi.getResponseQuery(search, censored);
    const { data } = await ShikimoriApi.API.get(`/mangas?${query}`);

    return data;
  }

  private static getResponseQuery(search: string, censored: boolean) {
    return objectToQuery({
      search,
      limit: "50",
      censored: JSON.stringify(censored),
    });
  }

  public static async fetchAll(search: string, censored: boolean): Promise<IShikimoriTitleResponse[]> {
    const mangas = await this.fetchManga(search, censored);
    const animes = await this.fetchAnime(search, censored);

    return [ ...mangas, ...animes ] as IShikimoriTitleResponse[];
  }
}
