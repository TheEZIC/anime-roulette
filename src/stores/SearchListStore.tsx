import {action, computed, makeObservable, observable, reaction} from "mobx";
import APIStore from "./abstracts/APIStore";
import ShikimoriApi from "../shikimoriApi/ShikimoriApi";
import { IShikimoriTitleResponse } from "shikimoriApi/ShikimoriTypes";
import {persist} from "mobx-persist";

export enum TitleType {
  Anime = "Anime",
  Manga = "Manga",
}

type SearchFunction = (search: string, censored: boolean) => Promise<IShikimoriTitleResponse[]>;

class SearchListStore extends APIStore<IShikimoriTitleResponse[]> {
  constructor() {
    super();

    makeObservable(this);

    reaction(() => this.types, () => {
      this.request();
    });

    reaction(() => this.nsfw, () => {
      this.request();
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
  public get search(): string {
    return this._search;
  }

  private set search(value: string) {
    this._search = value;
  }

  @action
  public changeSearch(search: string) {
    this._search = search
  }

  @observable
  @persist("object")
  private _nsfw: boolean = false;

  @computed
  public get nsfw(): boolean {
    return this._nsfw;
  }

  private set nsfw(value: boolean) {
    this._nsfw = value;
  }

  @action
  public toggleNsfw() {
    this._nsfw = !this._nsfw;
  }

  public async request(): Promise<void> {
    if (!this.search) {
      return;
    }

    console.log(this.search, "request new title")

    this.onStart();

    try {
      const titles: IShikimoriTitleResponse[] = [];

      for (let fun of this.requests) {
        const response = await fun(this.search, !this.nsfw);
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
