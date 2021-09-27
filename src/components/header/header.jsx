import './styles/header.scss';

const Header = ({headerText}) => {
  return (
    <h1 className="header-text">
      <span className="header-text__logo"/>
      {headerText}
    </h1>
  );
}

export default Header;