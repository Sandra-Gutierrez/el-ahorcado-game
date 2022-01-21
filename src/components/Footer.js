import { Link , Switch , Route } from "react-router-dom/cjs/react-router-dom.min";
import "../styles/Footer.scss";

const Footer = (props) => {
  return (
    <footer class="footer">
        <Switch>

        <Route exact path="/instrucciones">
            <p>Esto es instrucciones</p>
        </Route>

        <Route exact path="/opciones">
            <p>Esto es opciones</p>
        </Route>

        <Route exact path="/">
        </Route>

      </Switch>

      <nav>
        <ul>
          <li className="footer__menu-item">
            <Link to="/" className="footer__menu-link">A jugar</Link>
          </li>

          <li className="footer__menu-item">
            <Link to="/instrucciones" className="footer__menu-link">¿Cómo se juega?</Link>
          </li>

          <li className="footer__menu-item">
            <Link to="/opciones" className="footer__menu-link">Más opciones</Link>
          </li>

        </ul>
      </nav>
      <small className="footer__copy">© Adalab</small>
    </footer>
  );
};
export default Footer;
