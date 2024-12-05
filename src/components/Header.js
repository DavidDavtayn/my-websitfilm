import React from "react";
import { Link } from "react-router-dom";

function Header() {
    return (
        <header id="header">
            <nav>
                <ul>
                    <li>
                        <Link to="/" className="ahome">
                            Home
                        </Link>
                    </li>
                    <li>
                        <a href="/distributions">Distributions</a>
                    </li>
                    <li>
                        <a href="#production">Production</a>
                    </li>
                    <li>
                        <a href="/about-us">About Us</a>
                    </li>
                    <li>
                        <Link to="/contact-us">Contact Us</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
