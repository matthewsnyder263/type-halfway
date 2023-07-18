import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div>
        <div>
          <div id="page-wrapper">
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
                        <img src="css/images/ana.doe.jpg" alt="" />
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
                      <button className="LikeButton">Like</button>
                    </section>
                  </div>
                  <div className="col-4 col-12-medium">
                    {/* Box */}
                    <section className="box feature">
                      <a href="#" className="image featured">
                        <img src="css/images/ana.doe.jpg" alt="" />
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
                        <img src="css/images/ana.doe.jpg" alt="" />
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
                                <img src="css/images/ana.doe.jpg" alt="" />
                              </a>
                            </div>
                            <div className="col-6">
                              <a href="#" className="image fit">
                                <img src="css/images/ana.doe.jpg" alt="" />
                              </a>
                            </div>
                            <div className="col-6">
                              <a href="#" className="image fit">
                                <img src="css/images/ana.doe.jpg" alt="" />
                              </a>
                            </div>
                            <div className="col-6">
                              <a href="#" className="image fit">
                                <img src="css/images/ana.doe.jpg" alt="" />
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
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
