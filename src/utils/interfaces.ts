export interface ICards {
  word: string;
  translation: string;
  image: string;
  audioSrc: string;
}

export interface IObjApplication {
  countStatistic: number;
  countCards: number;
  empryDifficult: boolean;
}

export interface IHTMLElems {
  arrSvgs: HTMLElement[];
  arrParags: HTMLParagraphElement[];
  arrImages: HTMLImageElement[];
  btnStartGame: HTMLButtonElement;
  score: HTMLDivElement;
}

export interface IGameField {
  arrAudios: string[];
  arrImages: string[];
  counterErrors: number;
}

export interface IFullCars {
  number: number;
  category: string;
  word: string;
  translation: string;
  image: string;
  audioSrc: string;
  train: number;
  play: number;
  errors: number;
  answers: number;
  percent: number;
}
