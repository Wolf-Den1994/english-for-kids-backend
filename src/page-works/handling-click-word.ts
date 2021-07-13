import { sound } from '../play/sound';
import { store } from '../store/store';
import { addClassList } from '../utils/add-class';
import { checkClass } from '../utils/check-class';
import { CATEGORY } from '../utils/consts';
import { Events, IndexSounds, Tags } from '../utils/enums';
import { getInputTranslation, getInputWord } from '../utils/get-elems-words';
import { ICards } from '../utils/interfaces';
import { removeClassList } from '../utils/remove-class';

const renderTopLayer = (
  card: HTMLElement,
  action: string,
  cards: [string[], ...ICards[][]],
) => {
  const divsCard = document.querySelectorAll('.words-card');
  divsCard.forEach((div) => {
    const isTopLayer = div.lastElementChild as HTMLElement;
    if (checkClass(isTopLayer, 'word-top-layer')) {
      isTopLayer.remove();
      removeClassList(div, 'word-hidden');
    }
  });

  const index = cards[CATEGORY].indexOf(store.getState().admCateg);
  // console.log(index)
  // console.log(card.id)
  // console.log(cards)
  const arr = cards[index + 1] as ICards[];
  const objWordDesired = arr.find((item) => item.word === card.id);

  addClassList(card, 'word-hidden');

  const topLayer = document.createElement(Tags.DIV);
  topLayer.className = 'word-top-layer';
  card.append(topLayer);

  const inputWord = document.createElement(Tags.INPUT);
  inputWord.type = 'text';
  inputWord.placeholder = 'Word';
  inputWord.value = `${objWordDesired?.word}`;
  inputWord.className = 'word-top-layer-input-word';
  topLayer.append(inputWord);

  const inputTranslation = document.createElement(Tags.INPUT);
  inputTranslation.type = 'text';
  inputTranslation.placeholder = 'Translation';
  inputTranslation.value = `${objWordDesired?.translation}`;
  inputTranslation.className = 'word-top-layer-input-translation';
  topLayer.append(inputTranslation);

  const soundDiv = document.createElement(Tags.DIV);
  soundDiv.className = 'word-top-layer-sound-wrapper';
  topLayer.append(soundDiv);

  const soundSpan = document.createElement(Tags.SPAN);
  soundSpan.className = 'word-top-layer-sound-text';
  soundSpan.innerHTML = 'Sound:';
  soundDiv.append(soundSpan);

  const divInputSound = document.createElement(Tags.DIV);
  divInputSound.className = 'word-top-layer-sound-wrapper-input';
  soundDiv.append(divInputSound);

  const inputSound = document.createElement(Tags.INPUT);
  inputSound.className = 'word-top-layer-sound-input';
  inputSound.type = 'file';
  divInputSound.append(inputSound);

  const btnSound = document.createElement(Tags.SPAN);
  btnSound.innerHTML = 'Select file';
  btnSound.className = 'word-top-layer-sound-btn';
  divInputSound.append(btnSound);

  const imageDiv = document.createElement(Tags.DIV);
  imageDiv.className = 'word-top-layer-image-wrapper';
  topLayer.append(imageDiv);

  const imageSpan = document.createElement(Tags.SPAN);
  imageSpan.className = 'word-top-layer-image-text';
  imageSpan.innerHTML = 'Image:';
  imageDiv.append(imageSpan);

  const divInputImage = document.createElement(Tags.DIV);
  divInputImage.className = 'word-top-layer-image-wrapper-input';
  imageDiv.append(divInputImage);

  const inputImage = document.createElement(Tags.INPUT);
  inputImage.className = 'word-top-layer-image-input';
  inputImage.type = 'file';
  divInputImage.append(inputImage);

  const btnImage = document.createElement(Tags.SPAN);
  btnImage.innerHTML = 'Select file';
  btnImage.className = 'word-top-layer-image-btn';
  divInputImage.append(btnImage);

  const divBtns = document.createElement(Tags.DIV);
  divBtns.className = 'word-top-layer-btns';
  topLayer.append(divBtns);

  const btnCancel = document.createElement(Tags.BUTTON);
  btnCancel.className = 'word-top-layer-btn-cancel';
  btnCancel.innerHTML = 'Cancel';
  divBtns.append(btnCancel);

  const btnCreate = document.createElement(Tags.BUTTON);
  btnCreate.className =
    action === 'update'
      ? 'word-top-layer-btn-update'
      : 'word-top-layer-btn-create';
  btnCreate.innerHTML = action === 'update' ? 'Update' : 'Create';
  divBtns.append(btnCreate);
};

const updateWord = (card: HTMLDivElement) => {
  console.log(getInputWord().value);
  console.log(getInputTranslation().value);
};

const handlerClickPageWord = (
  cards: [string[], ...ICards[][]],
  event: Event,
) => {
  const target = event.target as HTMLElement;
  const card = target.closest('.words-card') as HTMLDivElement;
  const idCard = card.id;
  // console.log(idCard)
  if (checkClass(target, 'words-play-sound')) {
    const wordsSound = target.closest('.words-sound') as HTMLDivElement;
    const fileName = wordsSound.innerText.split(': ')[1];
    sound(fileName, IndexSounds.FIRST);
  } else if (checkClass(target, 'words-btn-change')) {
    renderTopLayer(card, 'update', cards);
  } else if (checkClass(target, 'word-top-layer-btn-cancel')) {
    const topLayer = card.lastElementChild as HTMLElement;
    topLayer.remove();
  } else if (checkClass(target, 'word-top-layer-btn-update')) {
    updateWord(card);
  }
};

export const handlingClicksWordPage = (
  main: HTMLElement,
  cards: [string[], ...ICards[][]],
): void => {
  main.addEventListener(Events.CLICK, handlerClickPageWord.bind(null, cards));
};
