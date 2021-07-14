import cards from '../cards';
import { objGame } from '../control/obj-game';
import { dispatchInfo, fullCards } from '../control/obj-statistic';
import { renderFinish } from '../finish/finish';
import { store } from '../store/store';
import { arrDifficultWord } from '../train-difficult/render-train-difficult';
import { addClassList } from '../utils/add-class';
import { changeClassList } from '../utils/change-class';
import { ElemClasses, IndexSounds, NumberPage, Tags } from '../utils/enums';
import { getSoundPath } from '../utils/get-sound-path';
import { getStringWord } from '../utils/get-word';
import { ICards, IWordsMongo } from '../utils/interfaces';
import { sound } from './sound';

const IN_INTEREST = 100;
const DELAY_PLAY_SOUND = 1000;

const addStars = (nameClass: string): void => {
  const score = <HTMLDivElement>document.querySelector('.score');
  const star = document.createElement(Tags.SPAN);
  star.className = `star ${nameClass}`;
  score.append(star);
};

const generateRandom = (page: ICards[]): string[] => {
  const arrAudios: string[] = [];
  for (let i = 0; i < page.length; i++) {
    arrAudios.push(page[i].audioSrc);
  }
  return arrAudios.sort(() => Math.random() - 0.5);
};

const playingArrOfSounds = (arrSounds: string[]) => {
  objGame.arrAudios = arrSounds;
  sound(arrSounds[0], IndexSounds.FIRST);
};

export const startGame = (elem: HTMLElement): void => {
  changeClassList(elem, ElemClasses.BTN_START_GAME, ElemClasses.REPEAT);
  if (store.getState().page === NumberPage.DIFFICULT) {
    const randomAudios = generateRandom(arrDifficultWord);
    playingArrOfSounds(randomAudios);
  } else {
    const page = cards[store.getState().page] as ICards[];
    const randomAudios = generateRandom(page);
    playingArrOfSounds(randomAudios);
  }
};

const addAnswers = (item: IWordsMongo) => {
  item.answers++;
  item.percent = (item.play / item.answers) * IN_INTEREST;
};

export const gameProcess = (elem: HTMLElement): void => {
  const image = elem as HTMLImageElement;
  if (objGame.arrAudios.length) {
    const wordImage = getStringWord(image.src);
    const wordAudio = getStringWord(objGame.arrAudios[0]);
    if (wordImage === wordAudio) {
      sound(getSoundPath('correct'), IndexSounds.SECOND);
      addClassList(elem, ElemClasses.GREAT);
      addStars('win');
      fullCards.forEach((item) => {
        if (item.word === wordImage) {
          item.play++;
          addAnswers(item);
        }
      });
      dispatchInfo(fullCards);
      objGame.arrAudios.shift();
      if (objGame.arrAudios.length) {
        setTimeout(() => {
          sound(objGame.arrAudios[0], IndexSounds.FIRST);
        }, DELAY_PLAY_SOUND);
      } else {
        renderFinish();
      }
    } else {
      objGame.counterErrors++;
      sound(getSoundPath('error'), IndexSounds.SECOND);
      addStars('fail');
      fullCards.forEach((item) => {
        if (item.word === wordAudio) {
          item.fails++;
          addAnswers(item);
        }
      });
      dispatchInfo(fullCards);
    }
  }
};
