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

  public static async fetchAnime(search: string): Promise<IShikimoriAnimesResponse[]> {
    const query = objectToQuery({ search, limit: "50" });
    const { data } = await ShikimoriApi.API.get(`/animes?${query}`);

    return data;
  }

  public static async fetchManga(search: string): Promise<IShikimoriMangasResponse[]> {
    const query = objectToQuery({ search, limit: "50" });
    const { data } = await ShikimoriApi.API.get(`/mangas?${query}`);

    return data;
  }

  public static async fetchAll(search: string): Promise<IShikimoriTitleResponse[]> {
    const mangas = await this.fetchManga(search);
    const animes = await this.fetchAnime(search);

    return [ ...mangas, ...animes ] as IShikimoriTitleResponse[];
  }
}
