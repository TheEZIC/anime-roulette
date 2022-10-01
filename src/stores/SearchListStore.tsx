import {action, computed, makeObservable, observable, reaction} from "mobx";
import APIStore from "./abstracts/APIStore";
import ShikimoriApi from "../shikimoriApi/ShikimoriApi";
import { IShikimoriTitleResponse } from "shikimoriApi/ShikimoriTypes";

export enum TitleType {
  Anime = "Anime",
  Manga = "Manga",
}

type SearchFunction = (search: string) => Promise<IShikimoriTitleResponse[]>;

class SearchListStore extends APIStore<IShikimoriTitleResponse[]> {
  constructor() {
    super();

    makeObservable(this);
    reaction(() => this.types, () => {
      this.request(this.search);
    });
  }

  private _types: TitleType[] = [TitleType.Anime];

  @computed
  public get types(): TitleType[] {
    return this._types;
  }

  private set types(value) {
    this._types = value;
  }

  private checkType(type: TitleType) {
    return this.types.includes(type);
  }

  @action
  public addType(type: TitleType) {
    if (!this.checkType(type)) {
      this.types.push(type);
    }
  }

  @action
  public removeType(type: TitleType) {
    if (this.checkType(type)) {
      this.types.filter(t => t !== type);
    }
  }

  @computed
  private get requests(): SearchFunction[] {
    const result: SearchFunction[] = [];

    for (let type of this.types) {
      switch (type) {
        case TitleType.Anime:
          result.push(ShikimoriApi.fetchAnime);
          break;
        case TitleType.Manga:
          result.push(ShikimoriApi.fetchManga);
          break;
      }
    }

    return result;
  }

  @observable
  private _search: string = "";

  @computed
  private get search(): string {
    return this._search;
  }

  private set search(value: string) {
    this._search = value;
  }

  public async request(search: string): Promise<void> {
    if (!search) {
      return;
    }

    console.log(search, "request new title")

    this.onStart();
    this.search = search;

    try {
      const titles: IShikimoriTitleResponse[] = [];

      for (let fun of this.requests) {
        const response = await fun(search);
        titles.push(...response);
      }

      console.log("titles", titles);

      this.onSuccess(titles);
    } catch (e) {
      this.onError(e);
    }
  }
}

export const searchListStore = new SearchListStore();
