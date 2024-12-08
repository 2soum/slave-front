import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname.slice(1) || 'home');

  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'roadmap', label: 'Roadmap', path: '/roadmap' },
    { id: 'sprint', label: 'Sprint resume', path: '/sprint' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 flex items-center justify-center w-full h-16 bg-transparent z-20">
      <nav className="max-w-2xl w-full">
        <ul className="flex items-center justify-center gap-5 text-2xl list-none m-0 p-0">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.path}
                className={`hover:underline transition-colors duration-200 ${
                  activeLink === item.id ? 'text-white' : 'text-slate-400'
                }`}
                onClick={() => setActiveLink(item.id)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;