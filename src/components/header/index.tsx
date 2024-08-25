
import React from 'react';
import styles from './header.module.css';
import logimg from '../../assets/logo.svg'
import { Link, NavLink } from 'react-router-dom';

export function Header() {

   return(
      
    <header className={styles.container}>
        <Link to="/">
            <img src={logimg} alt="Logo Cripto App" />
        </Link>

      

        <nav className={styles.nav}>
            <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? styles.active : ''}
                >
                 Criptos
            </NavLink>
            <NavLink 
                    to="/exchanges"
                    className={({ isActive }) => isActive ? styles.active : ''}
                >
                    Exchanges
            </NavLink>
        </nav>
        
        
    </header>

   )

}