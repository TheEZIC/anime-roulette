import {IRouletteTitle, rouletteTitlesStore} from "./RouletteTitlesStore";
import {Undefinable} from "../utils/Undefinable";
import {action, computed, makeObservable, observable, reaction} from "mobx";
import {persist} from "mobx-persist";

class RouletteStore {
  constructor() {
    makeObservable(this);

    reaction(() => rouletteTitlesStore.titles, () => {
      this.cleanWinner();
    });
  }

  @persist("object")
  @observable
  private _timer: number = 30;

  @computed
  public get timer(): number {
    return this._timer;
  }

  public set timer(value: number) {
    this._timer = value;
  }

  @observable
  private _winner: Undefinable<IRouletteTitle>;

  @computed
  public get winner(): Undefinable<IRouletteTitle> {
    return this._winner;
  }

  private set winner(value: Undefinable<IRouletteTitle>) {
    this._winner = value;
  }

  @action
  public setWinner(title: IRouletteTitle) {
    this.winner = title;
  }

  @action
  public cleanWinner() {
    this.winner = undefined;
  }

  @observable
  private _spinning: boolean = false;

  @computed
  public get spinning(): boolean {
    return this._spinning;
  }

  private set spinning(value: boolean) {
    this._spinning = value;
  }

  @action
  public startSpinning() {
    this.spinning = true;
  }

  @action
  public stopSpinner() {
    this.spinning = false;
  }
}

export const rouletteStore = new RouletteStore();
