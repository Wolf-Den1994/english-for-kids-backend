import { workCategPage, workWordsPage } from '../page-works/work-categ';
import { changeCategory, renderCategPage } from './change-category';
import { changeWords, renderWordsPage } from './change-words';
import { changeHome } from './home';

interface IRoutes {
  [key: string]: string | void;
}

const routes: IRoutes = {
  '/': changeHome(),
  '/category': changeCategory,
  '/words': changeWords,
};

if (typeof routes[window.location.pathname] === 'string') {
  document.body.innerHTML = routes[window.location.pathname] as string;
}

export const onNavigate = (pathname: string): void => {
  window.history.pushState({}, pathname, window.location.origin + pathname);
  if (typeof routes[window.location.pathname] === 'string') {
    document.body.innerHTML = routes[pathname] as string;
  } else {
    document.body.innerHTML = '';
    changeHome();
  }
  if (pathname === '/category') {
    renderCategPage();
    workCategPage();
  }
  if (pathname === '/words') {
    renderWordsPage();
    workWordsPage();
  }
};
