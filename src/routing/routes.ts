import { changeCategory } from './change-category';
import { changeWords } from './change-words';
import { changeHome } from './home';

interface IRoutes {
  [key: string]: string | void;
}

const routes: IRoutes = {
  '/': changeHome(),
  '/categoty': changeCategory,
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
};
