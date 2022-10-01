import {action, computed, makeObservable, observable} from "mobx";
import {IShikimoriTitleResponse} from "../shikimoriApi/ShikimoriTypes";

export interface IRouletteTitle {
  item: IShikimoriTitleResponse;
  weight: number;
}

class RouletteTitlesStore {
  constructor() {
    makeObservable(this);
  }

  @observable
  private _titles: IRouletteTitle[] = [];

  @computed
  public get titles(): IRouletteTitle[] {
    return this._titles;
  }

  private set titles(value: IRouletteTitle[]) {
    this._titles = value;
  }

  public checkTitle(title: IShikimoriTitleResponse) {
    return this.titles.find(t => t.item.id === title.id);
  }

  public getById(id: number) {
    return this.titles.find(t => t.item.id === id);
  }

  @action
  public addTitle(title: IShikimoriTitleResponse) {
    if (!this.checkTitle(title)) {
      this.titles.push({
        item: title,
        weight: 1,
      });
    }
  }

  @action
  public removeTitle(title: IShikimoriTitleResponse) {
    this.titles = this.titles.filter(t => t.item.id !== title.id);
  }

  @action
  public clearTitles() {
    this.titles = [];
  }

  private doForTitle(title: IShikimoriTitleResponse, cb: (title: IRouletteTitle) => void) {
    this.titles = this.titles.map(t => {
      if (title.id === t.item.id) {
        cb(t);
      }

      return t;
    });
  }

  @action
  public increaseWeight(title: IShikimoriTitleResponse) {
    this.doForTitle(title, (title) => {
      title.weight += 1;
    });
  }

  @action
  public decreaseWeight(title: IShikimoriTitleResponse) {
    this.doForTitle(title, (title) => {
      title.weight -= 1;

      if(title.weight < 1) {
        title.weight = 1;
      }
    });
  }
}

export const rouletteTitlesStore = new RouletteTitlesStore();
