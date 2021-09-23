import './styles/header.scss';

const Header = ({headerText}) => {
  return (
    <h1 className="header-text">
      {headerText}
    </h1>
  );
}

export default Header;