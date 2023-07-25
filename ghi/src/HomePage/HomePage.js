import React from 'react';
import "./HomePage.css";

const Header = () => {
    return (
        <header id="header" className="alt">
            <h1>
                Type Halfway
            </h1>
        </header>
    );
};

const Banner = () => {
    return (
        <section id="banner">
            <div className="inner">
                <h2>Type &hearts; Halfway</h2>
                <p>
                    Welcome to our MBTI dating website,
                    where sparks fly and personalities align!
                    Discover meaningful connections based on Myers-Briggs Type Indicator compatibility.{' '}
                    <p></p>
                    <div>
                        Take the test at <a href="https://www.16personalities.com/free-personality-test">MBTI TEST</a>
                    </div>

                </p>
            </div>
        </section>
    );
};

const One = () => {
    return (
        <section id="one" className="wrapper spotlight style1">
            <div className="inner">
                <a href="#" className="image">
                    <img src="images/pic01.jpg" alt="" />
                </a>
                <div className="content">
                    <h2 className="major">Find Your Perfect Match</h2>
                    <p>
                        Lorem ipsum dolor sit amet, etiam lorem adipiscing elit. Cras turpis
                        ante, nullam sit amet turpis non, sollicitudin posuere urna. Mauris
                        id tellus arcu. Nunc vehicula id nulla dignissim dapibus. Nullam
                        ultrices, neque et faucibus viverra, ex nulla cursus.
                    </p>
                    <a href="#" className="special">
                        Learn more
                    </a>
                </div>
            </div>
        </section>
    );
};

const Two = () => {
    return (
        <section id="two" className="wrapper alt spotlight style2">
            <div className="inner">
                <a href="#" className="image">
                    <img src="images/pic02.jpg" alt="" />
                </a>
                <div className="content">
                    <h2 className="major">Tempus adipiscing</h2>
                    <p>
                        Lorem ipsum dolor sit amet, etiam lorem adipiscing elit. Cras turpis
                        ante, nullam sit amet turpis non, sollicitudin posuere urna. Mauris
                        id tellus arcu. Nunc vehicula id nulla dignissim dapibus. Nullam
                        ultrices, neque et faucibus viverra, ex nulla cursus.
                    </p>
                    <a href="#" className="special">
                        Learn more
                    </a>
                </div>
            </div>
        </section>
    );
};

const Three = () => {
    return (
        <section id="three" className="wrapper spotlight style3">
            <div className="inner">
                <a href="#" className="image">
                    <img src="images/pic03.jpg" alt="" />
                </a>
                <div className="content">
                    <h2 className="major">Nullam dignissim</h2>
                    <p>
                        Lorem ipsum dolor sit amet, etiam lorem adipiscing elit. Cras turpis
                        ante, nullam sit amet turpis non, sollicitudin posuere urna. Mauris
                        id tellus arcu. Nunc vehicula id nulla dignissim dapibus. Nullam
                        ultrices, neque et faucibus viverra, ex nulla cursus.
                    </p>
                    <a href="#" className="special">
                        Learn more
                    </a>
                </div>
            </div>
        </section>
    );
};

const Four = () => {
    return (
        <section id="four" className="wrapper alt style1">
            <div className="inner">
                <h2 className="major">Vitae phasellus</h2>
                <p>
                    Cras mattis ante fermentum, malesuada neque vitae, eleifend erat.
                    Phasellus non pulvinar erat. Fusce tincidunt, nisl eget mattis
                    egestas, purus ipsum consequat orci, sit amet lobortis lorem lacus in
                    tellus. Sed ac elementum arcu. Quisque placerat auctor laoreet.
                </p>
                <section className="features">
                    <article>
                        <a href="#" className="image">
                            <img src="images/pic04.jpg" alt="" />
                        </a>
                        <h3 className="major">Sed feugiat lorem</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing vehicula id
                            nulla dignissim dapibus ultrices.
                        </p>
                        <a href="#" className="special">
                            Learn more
                        </a>
                    </article>
                    <article>
                        <a href="#" className="image">
                            <img src="images/pic05.jpg" alt="" />
                        </a>
                        <h3 className="major">Nisl placerat</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing vehicula id
                            nulla dignissim dapibus ultrices.
                        </p>
                        <a href="#" className="special">
                            Learn more
                        </a>
                    </article>
                    <article>
                        <a href="#" className="image">
                            <img src="images/pic06.jpg" alt="" />
                        </a>
                        <h3 className="major">Ante fermentum</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing vehicula id
                            nulla dignissim dapibus ultrices.
                        </p>
                        <a href="#" className="special">
                            Learn more
                        </a>
                    </article>
                    <article>
                        <a href="#" className="image">
                            <img src="images/pic07.jpg" alt="" />
                        </a>
                        <h3 className="major">Fusce consequat</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing vehicula id
                            nulla dignissim dapibus ultrices.
                        </p>
                        <a href="#" className="special">
                            Learn more
                        </a>
                    </article>
                </section>
                <ul className="actions">
                    <li>
                        <a href="#" className="button">
                            Browse All
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    );
};

const PageWrapper = () => {
    return (
        <div id="page-wrapper">
            <Header />
            <Banner />
            <section id="wrapper">
                <One />
                <Two />
                <Three />
                <Four />
            </section>
                <Footer/>
        </div>
    );
};

const Footer = () => {
    return (
        <div id="footer" className="inner">
            <h2 className="major">Get in touch</h2>
            <p>
                Cras mattis ante fermentum, malesuada neque vitae, eleifend erat.
                Phasellus non pulvinar erat. Fusce tincidunt, nisl eget mattis egestas,
                purus ipsum consequat orci, sit amet lobortis lorem lacus in tellus. Sed
                ac elementum arcu. Quisque placerat auctor laoreet.
            </p>
            <form method="post" action="#">
                <div className="fields">
                    <div className="field">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" />
                    </div>
                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" />
                    </div>
                    <div className="field">
                        <label htmlFor="message">Message</label>
                        <textarea name="message" id="message" rows="4"></textarea>
                    </div>
                </div>
                <ul className="actions">
                    <li>
                        <input type="submit" value="Send Message" />
                    </li>
                </ul>
            </form>
            <ul className="contact">
                <li className="icon solid fa-home">
                    Untitled Inc
                    <br />
                    1234 Somewhere Road Suite #2894
                    <br />
                    Nashville, TN 00000-0000
                </li>
                <li className="icon solid fa-phone">(000) 000-0000</li>
                <li className="icon solid fa-envelope">
                    <a href="#">information@untitled.tld</a>
                </li>
                <li className="icon brands fa-twitter">
                    <a href="#">twitter.com/untitled-tld</a>
                </li>
                <li className="icon brands fa-facebook-f">
                    <a href="#">facebook.com/untitled-tld</a>
                </li>
                <li className="icon brands fa-instagram">
                    <a href="#">instagram.com/untitled-tld</a>
                </li>
            </ul>
            <ul className="copyright">
                <li>&copy; Untitled Inc. All rights reserved.</li>
                <li>
                    Design: <a href="http://html5up.net">HTML5 UP</a>
                </li>
            </ul>
        </div>
    );
};

export default PageWrapper;
