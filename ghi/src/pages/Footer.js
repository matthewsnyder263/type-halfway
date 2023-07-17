import React from "react";
// import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div id="footer-wrapper">
      <footer id="footer" className="container">
        <div className="row">
          {/* Links */}
          <div className="col-3 col-6-medium col-12-small">
            <section className="widget links">
              <h3>Random Stuff</h3>
              <ul className="style2">
                <li>
                  <a href="#">Etiam feugiat condimentum</a>
                </li>
                <li>
                  <a href="#">Aliquam imperdiet suscipit odio</a>
                </li>
                <li>
                  <a href="#">Sed porttitor cras in erat nec</a>
                </li>
                <li>
                  <a href="#">Felis varius pellentesque potenti</a>
                </li>
                <li>
                  <a href="#">Nullam scelerisque blandit leo</a>
                </li>
              </ul>
            </section>
          </div>
          <div className="col-3 col-6-medium col-12-small">
            {/* Contact */}
            <section className="widget contact last">
              <h3>Contact Us</h3>
              <ul>
                <li>
                  <a href="#" className="icon brands fa-twitter">
                    <span className="label">Twitter</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="icon brands fa-facebook-f">
                    <span className="label">Facebook</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="icon brands fa-instagram">
                    <span className="label">Instagram</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="icon brands fa-dribbble">
                    <span className="label">Dribbble</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="icon brands fa-pinterest">
                    <span className="label">Pinterest</span>
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </footer>
    </div>
  );
}
