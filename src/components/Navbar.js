import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import { supabase } from 'C:/Users/Kaoru/Desktop/react/my-react-website/src/supabaseClient.js'; // Adjust the path as necessary
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const [username, setUsername] = useState(''); // New state for username

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    window.addEventListener('resize', showButton);

    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setIsLoggedIn(true);
        // Fetch the username from the profiles table
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching username:', error);
        } else {
          setUsername(profileData.username); // Set the fetched username
        }
      }
      setLoading(false); // Set loading to false after checking user
    };

    checkUser();

    return () => {
      window.removeEventListener('resize', showButton);
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false); // Update the state to reflect that the user is logged out
    setUsername(''); // Clear the username on logout
  };

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            Kaoru
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/aboutme'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                About me
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/projects'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Projects
              </Link>
            </li>
            <li>
              {isLoggedIn ? (
                <span className='nav-links' style={{ cursor: 'default' }}>
                  {username ? `Welcome, ${username}` : 'Welcome!'} {/* Display username */}
                </span>
              ) : (
                !loading && (
                  <Link
                    to='/sign-up'
                    className='nav-links-mobile'
                    onClick={closeMobileMenu}
                  >
                    Sign Up
                  </Link>
                )
              )}
            </li>
          </ul>
          {loading ? ( // Show loading indicator while checking auth
            <Button buttonStyle='btn--outline' disabled>
              Loading...
            </Button>
          ) : isLoggedIn ? (
            <Button buttonStyle='btn--outline' onClick={handleSignOut}>
              SIGN OUT
            </Button>
          ) : (
            button && (
              <Link to='/sign-up'>
                <Button buttonStyle='btn--outline'>LOGIN & REGISTER</Button>
              </Link>
            )
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
