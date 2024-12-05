import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Kinoswiper from "./components/Kinoswiper";
import Filmi from "./components/Filmi";
import Footer from "./components/Footer";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Distributions from "./components/Distributions";
import MovieDetails from "./components/MovieDetails";
import "./App.css";

function Home() {
    return (
        <>
            <Kinoswiper />
            <Filmi />
        </>
    );
}

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="/distributions" element={<Distributions />} />
                    <Route path="/movie/:id" element={<MovieDetails />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
