import { Tags } from '../utils/enums';

export const renderFooter = (): void => {
  const footer = document.createElement(Tags.FOOTER);
  footer.className = 'footer';
  document.body.append(footer);

  const linkGitHub = document.createElement(Tags.LINK);
  linkGitHub.className = 'github';
  linkGitHub.href = 'https://github.com/Wolf-Den1994';
  linkGitHub.target = '_blank';
  linkGitHub.rel = 'noopener noreferrer';
  linkGitHub.innerHTML = 'Wolf-Den1994';
  footer.append(linkGitHub);

  const linkRSS = document.createElement(Tags.LINK);
  linkRSS.className = 'rss';
  linkRSS.href = 'https://rs.school/js/';
  linkRSS.target = '_blank';
  linkRSS.rel = 'noopener noreferrer';
  footer.append(linkRSS);

  const year = document.createElement(Tags.SPAN);
  year.className = 'rss-year';
  linkRSS.append(year);
};
