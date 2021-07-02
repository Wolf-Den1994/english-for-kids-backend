import cards from '../cards';
import { objGame } from '../control/obj-game';
import { root } from '../root/root';
import { store } from '../store/store';
import { CATEGORY } from '../utils/consts';
import { StateApp, Tags } from '../utils/enums';
import { ICards, IFullCars } from '../utils/interfaces';

export const cleanField = (): void => {
  objGame.counterErrors = 0;
  root.innerHTML = '';
};

export const render = (
  layout: string,
  pageNumber: number,
  arrCards: ICards[] | IFullCars[],
): void => {
  const title = document.createElement(Tags.TITLE2);
  title.className = 'title';
  title.innerHTML =
    layout === 'subject'
      ? cards[CATEGORY][pageNumber]
      : 'Train difficult words';
  root.append(title);

  const score = document.createElement(Tags.DIV);
  score.className = 'score';
  root.append(score);

  const general = document.createElement(Tags.DIV);
  general.className = layout === 'subject' ? 'subject' : 'diff';
  root.append(general);

  for (let i = 0; i < arrCards.length; i++) {
    const card = document.createElement(Tags.DIV);
    card.className = 'main-card';
    general.append(card);

    const flipper = document.createElement(Tags.DIV);
    flipper.className = 'flipper';
    card.append(flipper);

    const front = document.createElement(Tags.DIV);
    front.className = 'front';
    flipper.append(front);

    const img = document.createElement(Tags.IMG);
    const objCard = arrCards[i] as IFullCars;
    img.src = `${arrCards[i].image}`;
    img.alt = `${arrCards[i].word}`;
    front.append(img);

    const pFront = document.createElement(Tags.P);
    pFront.innerHTML = `${objCard.word}`;
    front.append(pFront);

    const reperse = document.createElement(Tags.SVG);
    front.append(reperse);

    if (store.getState().mode === StateApp.TRAIN) {
      img.className = `img image picture`;
      pFront.className = 'text text-font';
      reperse.className = 'svg image-svg';
    } else {
      img.className = `img image picture play`;
      pFront.className = 'text text-font play';
      reperse.className = 'svg image-svg play';
    }

    const back = document.createElement(Tags.DIV);
    back.className = 'back';
    flipper.append(back);

    const imgBack = document.createElement(Tags.IMG);
    imgBack.src = `${objCard.image}`;
    imgBack.className = 'picture';
    imgBack.alt = `${objCard.word}`;
    back.append(imgBack);

    const pBack = document.createElement(Tags.P);
    pBack.className = 'text';
    pBack.innerHTML = `${objCard.translation}`;
    back.append(pBack);
  }

  const audio1 = document.createElement(Tags.AUDIO);
  audio1.className = 'audio1';
  general.append(audio1);

  const audio2 = document.createElement(Tags.AUDIO);
  audio2.className = 'audio2';
  general.append(audio2);

  const btnStartGame = document.createElement(Tags.BUTTON);
  btnStartGame.className =
    store.getState().mode === StateApp.TRAIN
      ? 'btn btn-start-game play'
      : 'btn btn-start-game';
  btnStartGame.innerHTML = 'Start game';
  root.append(btnStartGame);
};

export const renderSubject = (page: number): void => {
  const index = page - 1;
  cleanField();

  render('subject', index, cards[index + 1] as ICards[]);
};
