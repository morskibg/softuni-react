import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Navbar = (props) => {
  const { icon, title } = props;
  return (
    <nav className='navbar bg-primary'>
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='about'>About</Link>
        </li>
      </ul>
    </nav>
  );
};
Navbar.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
};
Navbar.defaultProps = {
  title: "Power",
  icon: "fas fa-plug",
};

export default Navbar;
