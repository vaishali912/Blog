import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__logo">NodeJs</Link>

      <nav className="header__nav">
        <ul>
          <li>
            <Link to="/" className="">Home</Link>
          </li>
          <li>
            <Link to="/about" className="">About</Link>
          </li>
          <li>
            <Link to="/contact" className="">Contact</Link>
          </li>
          <li>
            <Link to="/admin" className="">Sign in</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
