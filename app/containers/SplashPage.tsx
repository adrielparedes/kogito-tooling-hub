import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import chrome from '../images/chrome.png';
import kogitoHorizontal from '../images/kogito-horizontal.png';
import kogitoIcon from '../images/kogito-icon.png';
import vscode from '../images/vscode.png';

interface SplashItemModel {
  title: string;
  route: string;
  icon: any;
}

const items: SplashItemModel = [
  {
    title: 'Install Kogito VSCode extension',
    route: routes.WIZARD_VSCODE,
    icon: vscode
  },
  // {
  //   title: 'Run Kogito VSCode',
  //   route: routes.WIZARD_VSCODE,
  //   icon: vscode
  // },
  {
    title: 'Run Kogito Desktop',
    route: routes.WIZARD_VSCODE,
    icon: kogitoIcon
  },
  {
    title: 'Install Google Chrome Extension',
    route: routes.WIZARD_CHROME,
    icon: chrome
  }
];

export default class SplashPage extends React.Component {
  render() {
    return (
      <div className="splash_page">
        <div className="splash_page__title">
          <img
            className="splash_page__title-image"
            alt="kogito"
            src={kogitoHorizontal}
          />
          <h1>Kogito Tooling Hub</h1>
        </div>
        <div className="splash_page__content">
          {items.map(item => (
            <SplashItem key={item} item={item} />
          ))}
        </div>
      </div>
    );
  }
}

interface SplashItemProps {
  item: SplashItemModel;
}
const SplashItem = (props: SplashItemProps) => {
  const { item } = props;
  return (
    <div key={item.title} className="splash_item">
      <Link to={item.route} className="splash_item__button">
        <img className="splash_item__img" alt="kogito" src={item.icon} />
      </Link>
      <h3>{item.title}</h3>
    </div>
  );
};
