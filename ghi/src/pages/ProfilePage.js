import React from "react";

function ProfilePage() {
  return (
    <div>
      {/* <div id="header-wrapper"> */}
      {/* <header id="header" className="container">
          <div id="logo">
            <h1>
              <a href="index.html">Verti</a>
            </h1>
            <span>by HTML5 UP</span>
          </div> */}
      {/* <nav id="nav">
            <ul>
              <li>
                <a href="index.html">Welcome</a>
              </li>
              <li>
                <a href="#">Dropdown</a>
                <ul>
                  <li>
                    <a href="#">Lorem ipsum dolor</a>
                  </li>
                  <li>
                    <a href="#">Magna phasellus</a>
                  </li>
                  <li>
                    <a href="#">Phasellus consequat</a>
                    <ul>
                      <li>
                        <a href="#">Lorem ipsum dolor</a>
                      </li>
                      <li>
                        <a href="#">Phasellus consequat</a>
                      </li>
                      <li>
                        <a href="#">Magna phasellus</a>
                      </li>
                      <li>
                        <a href="#">Etiam dolore nisl</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">Veroeros feugiat</a>
                  </li>
                </ul>
              </li>
              <li className="current">
                <a href="left-sidebar.html">Left Sidebar</a>
              </li>
              <li>
                <a href="right-sidebar.html">Right Sidebar</a>
              </li>
              <li>
                <a href="no-sidebar.html">No Sidebar</a>
              </li>
            </ul>
          </nav> */}
      {/* </header> */}
      {/* </div> */}

      <div id="main-wrapper">
        <div className="container">
          <div className="row gtr-200">
            <div className="col-4 col-12-medium">
              <div id="sidebar">
                <section>
                  <h3>Ana Doe</h3>
                  <img
                    className="profilepic"
                    src="css/images/ana.doe.jpg"
                    alt="Ana Doe's profile picture"
                  />
                  <footer>23, New York, NY</footer>
                </section>

                <section>
                  <h3>Links</h3>
                  <ul className="style2">
                    <li>
                      <a href="#">Instagram</a>
                    </li>
                    <li>
                      <a href="#">Twitter</a>
                    </li>
                  </ul>
                </section>
              </div>
            </div>
            <div className="col-8 col-12-medium imp-medium">
              <div id="content">
                <article>
                  <h2>Interests</h2>
                  <table>
                    <tbody>
                      <tr>
                        <th>Stuff I like to do</th>
                      </tr>
                      <tr>
                        <td>Hang out in parks</td>
                      </tr>
                      <tr>
                        <td>Code on my Free time</td>
                      </tr>
                      <tr>
                        <td>Eat food</td>
                      </tr>
                    </tbody>
                  </table>

                  <h3>Bio</h3>
                  <p>
                    Hey there! I'm Ana Doe, a proud outsider in the vibrant city
                    of NYC. You'll often find me exploring the beauty of parks,
                    basking in the serenity they offer amidst the bustling urban
                    landscape. At 23 years old, I embrace the magic of outdoor
                    dining, savoring delicious meals al fresco when the weather
                    is just right. Pink is my absolute favorite color, as it
                    brings a touch of whimsy and joy to my world. And when it
                    comes to indulging my taste buds, nothing beats the creamy
                    goodness of vanilla ice cream—it's my ultimate treat! Join
                    me on my adventures as I seek out new experiences and create
                    memorable moments in the city that never sleeps.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
