import { sound } from '../play/sound';
import { addClassList } from '../utils/add-class';
import { checkClass } from '../utils/check-class';
import { IndexSounds, Tags } from '../utils/enums';
import { ICards } from '../utils/interfaces';
import { removeClassList } from '../utils/remove-class';

const renderTopLayer = (card: HTMLElement, action: string) => {
  const divsCard = document.querySelectorAll('.words-card');
  divsCard.forEach((div) => {
    const isTopLayer = div.lastElementChild as HTMLElement;
    if (checkClass(isTopLayer, 'word-top-layer')) {
      isTopLayer.remove();
      removeClassList(div, 'word-hidden');
    }
  });

  addClassList(card, 'word-hidden');

  const topLayer = document.createElement(Tags.DIV);
  topLayer.className = 'word-top-layer';
  card.append(topLayer);

  const inputWord = document.createElement(Tags.INPUT);
  inputWord.type = 'text';
  inputWord.placeholder = 'Word';
  inputWord.className = 'word-top-layer-input-word';
  topLayer.append(inputWord);

  const inputTranslation = document.createElement(Tags.INPUT);
  inputTranslation.type = 'text';
  inputTranslation.placeholder = 'Translation';
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
    renderTopLayer(card, 'update');
  }
};

export const handlingClicksWordPage = (
  main: HTMLElement,
  cards: [string[], ...ICards[][]],
): void => {
  main.addEventListener('click', handlerClickPageWord.bind(null, cards));
};
