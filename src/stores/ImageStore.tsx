import {computed, makeObservable, observable} from "mobx";
import {Undefinable} from "../utils/Undefinable";
import {rouletteTitlesStore} from "./RouletteTitlesStore";

export interface IImageItem {
  id: number;
  image?: HTMLImageElement;
}

class ImageStore {
  constructor() {
    makeObservable(this);
  }

  @observable
  private _images: IImageItem[] = [];

  @computed
  public get images(): IImageItem[] {
    return this._images;
  }

  private set images(value: IImageItem[]) {
    this._images = value;
  }

  public getImage(id: number): Undefinable<IImageItem> {
    let image = this.images.find(img => img.id === id);

    if(!image) {
      console.log("loading image", id);
      const title = rouletteTitlesStore.getById(id);
      console.log("found title", title);

      if (title) {
        this.images.push({ id });
        this.loadImage(title.item.image.original, id);
      }
    }
    return image;
  }

  private async loadImage(src: string, id: number) {
    const img = new Image();

    img.onerror = () => {
      console.log("bruh");
    };

    img.onload = () => {
      console.log("image loaded", id, src);
      this._images.find(img => img.id === id)!.image = img;
    };

    img.src = "https://shikimori.one" + src;
  }
}

export const imageStore = new ImageStore();
