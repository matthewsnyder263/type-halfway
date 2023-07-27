import React from 'react';
import "./HomePage.css";
import { Link } from 'react-router-dom';
import couple1 from "./images/couple1.jpg"
import couple2 from "./images/couple2.jpg"
import couple3 from "./images/couple3.jpg"
import couple4 from "./images/couple4.jpg"
import matt from "./images/matt.png"


// const Header = () => {
//     return (
//         <header id="header" className="alt">
//             <h1>
//                 Type Halfway
//             </h1>
//         </header>
//     );
// };

const Banner = () => {
    return (
        <section id="banner">
            <div className="inner">
                <h2>Type &hearts; Halfway</h2>
                <h3>Dating Website</h3>
                <p>
                    Integrating MBTI compatibility to find the best possible matches for you,
                    <div>where sparks fly and personalities align!</div>
                    Discover meaningful connections based on Myers-Briggs Type Indicator.{' '}
                    <p></p>
                    <div>
                        Take the <Link to="https://www.16personalities.com/free-personality-test">MBTI TEST</Link>
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
                <Link to="#" className="image">
                    <img src="" alt="" />
                </Link>
                <div className="content">
                    <h2 className="major">Find Your Perfect Match</h2>
                    <p>
                        Join our platform today and embark on a journey that transcends typical dating experiences. Discover the magic of scientific MBTI compatibility, and find your perfect match based on authentic connections, shared values, and genuine understanding. We are dedicated to making your search for love not only enjoyable but also accurate and deeply rewarding. Let's redefine dating together!
                        <div>Click the link below to check your compatibility</div>
                    </p>
                    <Link to="#" className="special">
                        Check your compatibility level
                    </Link>
                </div>
            </div>
        </section>
    );
};

const Two = () => {
    return (
        <section id="two" className="wrapper alt spotlight style2">
            <div className="inner">
                <Link to="#" className="image">
                    <img src="images/pic02.jpg" alt="" />
                </Link>
                <div className="content">
                    <h2 className="major">Activity Finder</h2>
                    <p>
                        Enhance your dating journey by unlocking the potential of shared experiences. With our Activity Finder, you'll discover exciting new places and activities, all tailored to your preferences and conveniently located between you and your match. Get ready to create cherished memories together, strengthening the foundation of your connection. Love awaits with every shared moment—embrace the possibilities with the Activity Finder!
                    </p>
                    <Link to="#" className="special">
                        Learn more about Google API
                    </Link>
                </div>
            </div>
        </section>
    );
};

const Three = () => {
    return (
        <section id="three" className="wrapper spotlight style3">
            <div className="inner">
                <Link to="#" className="image">
                    <img src="images/pic03.jpg" alt="" />
                </Link>
                <div className="content">
                    <h2 className="major">Integrated Chat</h2>
                    <p>
                        <ul>
                            <ul>Comprehensive Profiling</ul>
                            <ul>Extensive User Base</ul>
                            <ul>Constant Refinement</ul>
                            <ul>Dedicated Support</ul>
                        </ul>
                    </p>
                    <Link to="#" className="special">
                        Learn more
                    </Link>
                </div>
            </div>
        </section>
    );
};

const Four = () => {
    return (
        <section id="four" className="wrapper alt style1">
            <div className="inner">
                <h2 className="major">Type&hearts;Halfway Members'</h2>
                <h2 className="major">Testimonials</h2>
                <p>
                    Experience the power of Type♥Halfway Members firsthand!
                    Our platform has been a catalyst for success, helping our members
                    thrive in various fields. From entrepreneurs to artists, our diverse
                    community has achieved remarkable milestones. Start your journey today
                    and be part of this inspiring success story
                </p>
                <section className="features">
                    <article>
                        <Link to="#" className="image">
                            <img src={couple1} alt="testimony" />
                        </Link>
                        <h3 className="major">Dwight &hearts; Angela</h3>
                        <p>
                            "We were skeptical about online dating, but this platform exceeded our expectations! The matching algorithm brought us together based on our personalities and interests, and we hit it off instantly. Our first date was at one of the recommended dating spots, and we had an incredible time. Thanks to this website, we found our perfect match!"
                        </p>
                        <Link to="#" className="special">
                            Learn more
                        </Link>
                    </article>
                    <article>
                        <Link to="#" className="image">
                            <img src={couple2} alt="testimony" />
                        </Link>
                        <h3 className="major">Jim &hearts; Pam</h3>
                        <p>
                            "Finding someone who truly understands you can be challenging, but this platform made it happen for us. We share the same MBTI compatibility, and it's like we can read each other's minds! The activity finder feature has been a game-changer, giving us fantastic date ideas. We are grateful for this platform and excited for our future together!"
                        </p>
                        <Link to="#" className="special">
                            Learn more
                        </Link>
                    </article>
                    <article>
                        <Link to="#" className="image">
                            <img src={couple3} alt="testimony" />
                        </Link>
                        <h3 className="major">Michael &hearts; Holly</h3>
                        <p>
                            "After trying multiple dating apps, we were feeling discouraged. Then we discovered this website, and everything changed. The compatibility matching was spot on, and we connected on a deeper level from the start. The guarantee gave us confidence, and we are delighted to say that we've found our forever person. Thank you!"
                        </p>
                        <Link to="#" className="special">
                            Learn more
                        </Link>
                    </article>
                    <article>
                        <Link to="#" className="image">
                            <img src={couple4} alt="" />
                        </Link>
                        <h3 className="major">Pete &hearts; Erin</h3>
                        <p>
                            "This platform is unlike any other dating app out there. The emphasis on scientific compatibility and the activity finder feature set it apart. We enjoyed exploring new places and activities together, making our dates unforgettable. We've grown together as a couple and are thankful for this website for bringing us together."
                        </p>
                        <Link to="#" className="special">
                            Learn more
                        </Link>
                    </article>
                </section>
                <ul className="actions">
                    <li>
                    </li>
                </ul>
            </div>
        </section>
    );
};

const PageWrapper = () => {
    return (
        <div id="page-wrapper">
            {/* <Header /> */}
            <Banner />
            <section id="wrapper">
                <One />
                <Two />
                <Three />
                <Four />
            </section>
            <Footer />
        </div>
    );
};

const Footer = () => {
    return (
        <div id="footer" className="inner">
            <h2 className="major">Meet the Team</h2>
            <p>
                Cras mattis ante fermentum, malesuada neque vitae, eleifend erat.
                Phasellus non pulvinar erat. Fusce tincidunt, nisl eget mattis egestas,
                purus ipsum consequat orci, sit amet lobortis lorem lacus in tellus. Sed
                ac elementum arcu. Quisque placerat auctor laoreet.
            </p>

            <section className="features">
                <article className="custom-article">
                    <Link to="#" className="image">
                        <img src={matt} alt="testimony" />
                    </Link>
                    <h3 className="major">MAtthew</h3>
                    <p>
                        "ah fuckkkk this"
                    </p>
                    <Link to="#" className="special">
                        Linkedin
                    </Link>
                </article>
                <article>
                    <Link to="#" className="image">
                        <img src={couple2} alt="testimony" />
                    </Link>
                    <h3 className="major">Jim &hearts; Pam</h3>
                    <p>
                        "Finding someone who truly understands you can be challenging, but this platform made it happen for us. We share the same MBTI compatibility, and it's like we can read each other's minds! The activity finder feature has been a game-changer, giving us fantastic date ideas. We are grateful for this platform and excited for our future together!"
                    </p>
                    <Link to="#" className="special">
                        Learn more
                    </Link>
                </article>
                <article>
                    <Link to="#" className="image">
                        <img src={couple3} alt="testimony" />
                    </Link>
                    <h3 className="major">Michael &hearts; Holly</h3>
                    <p>
                        "After trying multiple dating apps, we were feeling discouraged. Then we discovered this website, and everything changed. The compatibility matching was spot on, and we connected on a deeper level from the start. The guarantee gave us confidence, and we are delighted to say that we've found our forever person. Thank you!"
                    </p>
                    <Link to="#" className="special">
                        Learn more
                    </Link>
                </article>
                <article>
                    <Link to="#" className="image">
                        <img src={couple4} alt="" />
                    </Link>
                    <h3 className="major">Pete &hearts; Erin</h3>
                    <p>
                        "This platform is unlike any other dating app out there. The emphasis on scientific compatibility and the activity finder feature set it apart. We enjoyed exploring new places and activities together, making our dates unforgettable. We've grown together as a couple and are thankful for this website for bringing us together."
                    </p>
                    <Link to="#" className="special">
                        Learn more
                    </Link>
                </article>
            </section>
            <ul className="actions">
                <li>
                </li>
            </ul>
        </div>


    );
};

export default PageWrapper;
