import styles from "./Desktop1.module.css";

export const Desktop1 = ({ ...props }) => {
    return (
        <div className={styles["desktop-1"]}>
            <div className={styles["nav"]}>
                <div className={styles["rectangle-1"]}></div>

                <div className={styles["rectangle-2"]}></div>

                <div className={styles["nav2"]}>NAV</div>
            </div>

            <div className={styles["profile-content"]}>
                <img className={styles["ellipse-1"]} src="ellipse-1.png" />

                <div className={styles["rectangle-3"]}></div>

                <div className={styles["_32-new-york-ny"]}>
                    32 New York, NY
                    <br />
                </div>

                <div className={styles["ana-doe"]}>Ana Doe</div>

                <div className={styles["rectangle-4"]}></div>

                <div className={styles["group-1"]}>
                    <div className={styles["rectangle-6"]}></div>

                    <div
                        className={
                            styles[
                            "hang-out-in-parks-code-on-my-free-time-eat-food-go-on-dates-city-life"
                            ]
                        }
                    >
                        Hang out in parks <br />
                        <br />
                        Code on my Free time
                        <br />
                        <br />
                        Eat food
                        <br />
                        <br />
                        Go on dates
                        <br />
                        <br />
                        City Life
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                    </div>

                    <div className={styles["interests"]}>interests</div>
                </div>
            </div>

            <div className={styles["group-2"]}>
                <div className={styles["rectangle-5"]}></div>

                <div className={styles["who-am-i"]}>Who am I ?</div>

                <div
                    className={
                        styles[
                        "hey-there-i-m-ana-doe-a-proud-outsider-in-the-vibrant-city-of-nyc-you-ll-often-find-me-exploring-the-beauty-of-parks-basking-in-the-serenity-they-offer-amidst-the-bustling-urban-landscape-at-23-years-old-i-embrace-the-magic-of-outdoor-dining-savoring-delicious-meals-al-fresco-when-the-weather-is-just-right-pink-is-my-absolute-favorite-color-as-it-brings-a-touch-of-whimsy-and-joy-to-my-world-and-when-it-comes-to-indulging-my-taste-buds-nothing-beats-the-creamy-goodness-of-vanilla-ice-cream-it-s-my-ultimate-treat-join-me-on-my-adventures-as-i-seek-out-new-experiences-and-create-memorable-moments-in-the-city-that-never-sleeps"
                        ]
                    }
                >
                    Hey there! I&#039;m Ana Doe, a proud outsider in the vibrant city of
                    NYC. You&#039;ll often find me exploring the beauty of parks, basking
                    in the serenity they offer amidst the bustling urban landscape. At 23
                    years old, I embrace the magic of outdoor dining, savoring delicious
                    meals al fresco when the weather is just right. Pink is my absolute
                    favorite color, as it brings a touch of whimsy and joy to my world.
                    And when it comes to indulging my taste buds, nothing beats the creamy
                    goodness of vanilla ice cream—it&#039;s my ultimate treat! Join me on
                    my adventures as I seek out new experiences and create memorable
                    moments in the city that never sleeps.
                </div>
            </div>

            <img className={styles["logo-1"]} src="logo-1.png" />

            <div className={styles["rectangle-7"]}></div>

            <div className={styles["footer"]}>FOOTER</div>
        </div>
    );
};
