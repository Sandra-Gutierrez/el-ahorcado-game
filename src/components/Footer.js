import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import "../styles/Footer.scss";

const Footer = (props) => {
  return (
    <footer className="footer">
      <nav>
        <ul>
          <li className="footer__menu-item">
            <NavLink to="/" className="footer__menu-link">
              A jugar
            </NavLink>
          </li>

          <li className="footer__menu-item">
            <NavLink to="/instrucciones" className="footer__menu-link">
              ¿Cómo se juega?
            </NavLink>
          </li>

          <li className="footer__menu-item">
            <NavLink to="/opciones" className="footer__menu-link">
              Más opciones
            </NavLink>
          </li>
        </ul>
      </nav>
      <small className="footer__copy">© Adalab</small>
    </footer>
  );
};
export default Footer;
