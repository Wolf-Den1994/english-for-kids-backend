import { IHTMLElems } from './interfaces';

export const getArrsElem = (): IHTMLElems => {
  const svgs = document.querySelectorAll('.image-svg');
  const parags = document.querySelectorAll('.text-font');
  const images = document.querySelectorAll('.image');
  const btnStartGame = document.querySelector('.btn') as HTMLButtonElement;
  const score = document.querySelector('.score') as HTMLDivElement;

  const arrSvgs: HTMLElement[] = Array.prototype.slice.call(svgs);
  const arrParags: HTMLParagraphElement[] = Array.prototype.slice.call(parags);
  const arrImages: HTMLImageElement[] = Array.prototype.slice.call(images);

  return {
    arrSvgs,
    arrParags,
    arrImages,
    btnStartGame,
    score,
  };
};
