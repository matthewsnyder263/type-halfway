import { NavLink, Link } from 'react-router-dom';


export default function Nav () {
    return (
    <>
    <div id="header-wrapper">
        <header id="header" className="container">

    {/* <!-- Logo --> */}
            <div id="logo">
                <h1><a href="index.html">Verti</a></h1>
                <span>by HTML5 UP</span>
            </div>

    {/* <!-- Nav --> */}
        <nav id="nav">
            <ul>
                <li className="current" style="white-space: nowrap;"><a href="index.html">Welcome</a></li>
                <li className="opener" style="user-select: none; cursor: pointer; white-space: nowrap; opacity: 1;">
                <a href="#">Dropdown</a>

                <ul className="" style="user-select: none; display: none; position: absolute;">
                    <li style="white-space: nowrap;"><a href="#" style="display: block;">Lorem ipsum dolor</a></li>
                    <li style="white-space: nowrap;"><a href="#" style="display: block;">Magna phasellus</a></li>
                    <li className="opener" style="user-select: none; cursor: pointer; white-space: nowrap;">
                    <a href="#" style="display: block;">Phasellus consequat</a>
                        <ul className="dropotron" style="user-select: none; display: none; position: absolute;">
                            <li style="white-space: nowrap;"><a href="#" style="display: block;">Lorem ipsum dolor</a></li>
                            <li style="white-space: nowrap;"><a href="#" style="display: block;">Phasellus consequat</a></li>
                            <li style="white-space: nowrap;"><a href="#" style="display: block;">Magna phasellus</a></li>
                            <li style="white-space: nowrap;"><a href="#" style="display: block;">Etiam dolore nisl</a></li>
                        </ul>
                    </li>
                    <li style="white-space: nowrap;"><a href="#" style="display: block;">Veroeros feugiat</a></li>
                </ul>
                </li>
                <li style="white-space: nowrap;"><a href="left-sidebar.html">Left Sidebar</a></li>
                <li style="white-space: nowrap;"><a href="right-sidebar.html">Right Sidebar</a></li>
                <li style="white-space: nowrap;"><a href="no-sidebar.html">No Sidebar</a></li>
            </ul>
        </nav>

        </header>
    </div>
    </>
    );
}
