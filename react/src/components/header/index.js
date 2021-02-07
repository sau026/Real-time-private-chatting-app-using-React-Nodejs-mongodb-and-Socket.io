import React, { Component } from 'react';
import './index.scss';

const Header = (props) => {
        return (
            <header className="header__component-container -container">
                <div className="header__site-branding -site-text-size">
                    <div>
                    <span>{props.headerTitle}</span>
                    </div>
                    <div>
                      
                    </div>
                    <div className="admin-icon">
                        <span>Admin</span>
                        <span>A</span>
                        <i className="fas fa-arrow-down"></i>
                    </div>
                    <nav className="header__site-nav">
                    </nav>
                </div>
            </header>
        );
}

export default Header;
