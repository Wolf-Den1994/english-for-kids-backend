export const selectTitle = (): HTMLSelectElement =>
  document.querySelector('.words-select-title') as HTMLSelectElement;

export const getInputWord = () =>
  document.querySelector('.word-top-layer-input-word') as HTMLInputElement;
export const getInputTranslation = () =>
  document.querySelector(
    '.word-top-layer-input-translation',
  ) as HTMLInputElement;
export const getInputSound = () =>
  document.querySelector('.word-top-layer-sound-input') as HTMLInputElement;
