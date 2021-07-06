import { rederectOnHome } from '../main-page/render-main';
import { linkOut } from '../utils/get-elems-categ';

export const workCateg = (): void => {
  linkOut().addEventListener('click', rederectOnHome);
};
