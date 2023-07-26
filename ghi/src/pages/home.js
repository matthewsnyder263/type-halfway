import React, { Component } from "react";
// import "./public/assets/css/main.css";

class Home extends Component {
  render() {
    return (
      <div className="row">
        <div className="medium-12 columns">
          <div id="page-wrapper">
            {/* Header */}
            <div id="header-wrapper">
              <header id="header" className="container">
                {/* Logo */}
                <div id="logo">
                  <h1>
                    <a href="index.html">Halfway</a>
                  </h1>
                  <span>by Halfway Harmony</span>
                </div>

                {/* Nav */}
                <nav id="nav">
                  <ul>
                    <li className="current">
                      <a href="index.html">Welcome</a>
                    </li>
                    <li>
                      <a href="#">Hover</a>
                      <ul>
                        <li>
                          <a href="#">Potential Matches</a>
                        </li>
                        <li>
                          <a href="#">Meet The Team</a>
                        </li>
                        <li>
                          <a href="#">Contact us</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="left-sidebar.html">View My Profile</a>
                    </li>
                    <li>
                      <a href="right-sidebar.html">About Us</a>
                    </li>
                    <li>
                      <a href="no-sidebar.html">Logout</a>
                    </li>
                  </ul>
                </nav>
              </header>
            </div>

            {/* Banner */}
            <div id="banner-wrapper">
              <div id="banner" className="box container">
                <div className="row">
                  <div className="col-7 col-12-medium">
                    <h2>Hi. Timothy.</h2>
                    <p>
                      Find Match Meet Meet <strong>Halfway</strong>
                    </p>
                  </div>
                  <div className="col-5 col-12-medium">
                    <ul>
                      <li>
                        <a
                          href="#"
                          className="button large icon solid fa-arrow-circle-right"
                        >
                          Find Matches
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          id="view-button"
                          className="button alt large icon solid fa-question-circle"
                        >
                          View Profile
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div id="features-wrapper">
              <div className="container">
                <div className="row">
                  <div className="col-4 col-12-medium">
                    {/* Box */}
                    <section className="box feature">
                      <a href="#" className="image featured">
                        <img src="images/ana.doe.jpg" alt="" />
                      </a>
                      <div className="inner">
                        <header>
                          <h2>Ana Doe</h2>
                          <p>23, New York NY</p>
                        </header>
                        <p>
                          Phasellus quam turpis, feugiat sit amet in, hendrerit
                          in lectus. Praesent sed semper amet bibendum tristique
                          fringilla
                        </p>
                      </div>
                    </section>
                  </div>
                  <div className="col-4 col-12-medium">
                    {/* Box */}
                    <section className="box feature">
                      <a href="#" className="image featured">
                        <img src="images/ana.doe.jpg" alt="" />
                      </a>
                      <div className="inner">
                        <header>
                          <h2>JoAnn Doe</h2>
                          <p>23, Bronx, NY</p>
                        </header>
                        <p>
                          Phasellus quam turpis, feugiat sit amet in, hendrerit
                          in lectus. Praesent sed semper amet bibendum tristique
                          fringilla.
                        </p>
                      </div>
                    </section>
                  </div>
                  <div className="col-4 col-12-medium">
                    {/* Box */}
                    <section className="box feature">
                      <a href="#" className="image featured">
                        <img src="images/ana.doe.jpg" alt="" />
                      </a>
                      <div className="inner">
                        <header>
                          <h2>Kim Doe</h2>
                          <p>23, Brooklyn, NY</p>
                        </header>
                        <p>
                          Phasellus quam turpis, feugiat sit amet in, hendrerit
                          in lectus. Praesent sed semper amet bibendum tristique
                          fringilla.
                        </p>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>

            {/* Main */}
            <div id="main-wrapper">
              <div className="container">
                <div className="row gtr-200">
                  <div className="col-4 col-12-medium">
                    {/* Sidebar */}
                    <div id="sidebar">
                      <section className="widget thumbnails">
                        <h3>Potential Matches</h3>
                        <div className="grid">
                          <div className="row gtr-50">
                            <div className="col-6">
                              <a href="#" className="image fit">
                                <img src="images/ana.doe.jpg" alt="" />
                              </a>
                            </div>
                            <div className="col-6">
                              <a href="#" className="image fit">
                                <img src="images/ana.doe.jpg" alt="" />
                              </a>
                            </div>
                            <div className="col-6">
                              <a href="#" className="image fit">
                                <img src="images/ana.doe.jpg" alt="" />
                              </a>
                            </div>
                            <div className="col-6">
                              <a href="#" className="image fit">
                                <img src="images/ana.doe.jpg" alt="" />
                              </a>
                            </div>
                          </div>
                        </div>
                        <a href="#" className="button icon fa-file-alt">
                          More
                        </a>
                      </section>
                    </div>
                  </div>
                  <div className="col-8 col-12-medium imp-medium">
                    {/* Content */}
                    <div id="content">
                      <section className="last">
                        <h2>How does this work?</h2>
                        <p>
                          When users sign up for <strong>Halfway</strong>, they
                          choose their MBTI to determine their personality type.
                          MBTI helps us understand their preferences,
                          characteristics, and compatibility with others. Based
                          on this information, our algorithm suggests potential
                          matches for each user.
                        </p>
                        <p>
                          The potential matches page on Halfway is where users
                          can discover new people who align with their
                          personality traits and have the potential for a
                          meaningful connection. Every day, we update the
                          potential matches list, ensuring that users have fresh
                          options to explore.
                        </p>
                        <a
                          href="#"
                          className="button icon solid fa-arrow-circle-right"
                        >
                          Continue Reading
                        </a>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
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
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
