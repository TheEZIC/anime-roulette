import {action, computed, observable} from "mobx";
import {Undefinable} from "../../utils/Undefinable";

export default abstract class APIStore< Response> {
  @observable
  private _loading: boolean = false;

  @computed
  public get loading(): boolean {
    return this._loading;
  }

  private set loading(value) {
    this._loading = value;
  }

  @observable
  private _error: Undefinable<any>;

  @computed
  public get error(): Undefinable<any> {
    return this._error;
  }

  public set error(value: Undefinable<any>) {
    this._error = value;
  }

  @observable
  private _result: Undefinable<Response>;

  @computed
  public get result(): Undefinable<Response> {
    return this._result;
  }

  public set result(value: Undefinable<Response>) {
    this._result = value;
  }

  @action
  protected onStart() {
    this.loading = true;
    this.error = undefined;
  }

  @action
  protected onEnd() {
    this.loading = false;
  }

  @action
  protected onSuccess(result: Response) {
    this.result = result;
    this.onEnd();
  }

  @action
  protected onError(error: any) {
    console.error(error);

    this.error = error;
    this.onEnd();
  }
}
