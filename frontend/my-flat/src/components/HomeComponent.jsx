// ✅ Transparent Navbar + Gray + Navy Blue Theme for My-Flat Landing Page
import React from "react";
import "../css/landing.css";

import { Link } from "react-router-dom";

const HomeComponent = () => {
  return (
    <div className="homepage">
      {/* Transparent Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top transparent-navbar">
        <div className="container">
          <Link className="navbar-brand" to="/">
            My-Flat
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#features">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#how">How It Works</a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section text-white text-center">
        <div className="hero-overlay">
          <h1 className="display-3 fw-bold">Find Your Ideal Apartment</h1>
          <p className="lead">Discover, Review, and Rent with My-Flat</p>
          <Link to="/register" className="btn btn-outline-light mt-3">
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4 text-navy">Features</h2>
          <div className="row">
            <div className="col-md-4 text-center">
              <h4>Verified Listings</h4>
              <p>Every apartment is checked for authenticity and landlord validity.</p>
            </div>
            <div className="col-md-4 text-center">
              <h4>Tenant Reviews</h4>
              <p>Read real experiences from verified tenants.</p>
            </div>
            <div className="col-md-4 text-center">
              <h4>Landlord Tools</h4>
              <p>Manage apartments, respond to reviews, and access deletion requests.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-5">
        <div className="container">
          <h2 className="text-center text-navy mb-4">How It Works</h2>
          <div className="row">
            <div className="col-md-6">
              <h5>1. Browse Apartments</h5>
              <p>Use filters to explore apartments by location, rent, and amenities.</p>

              <h5>2. Leave a Review</h5>
              <p>Share your experience or flag unfair conditions.</p>
            </div>
            <div className="col-md-6">

              <h5>3. Connect with Landlords</h5>
              <p>Contact landlords directly and securely.</p>

              <h5>4. Admin Oversight</h5>
              <p>Our team ensures fairness and transparency with review moderation tools.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-4 text-white footer-dark">
        <p className="mb-0">&copy; {new Date().getFullYear()} My-Flat. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomeComponent;