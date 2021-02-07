import React, {Component} from 'react';

import './index.scss';

const Sidebar = () => {
        return (
           <div className='sidebar'>
               <div>
               <i className="fab fa-instagram-square icon"></i>
                <i className="fas fa-home icon"></i>
                <i className="fas fa-bars icon"></i>
                <i className="fas fa-calendar-week icon"></i>
                <i className="far fa-comment icon"></i>
                <i className="far fa-clock icon"></i>
                <i className="far fa-user icon"></i>
               </div>
               <div>
                <i className="far fa-comment icon"></i>
                </div>
           </div>
        );
}

export default Sidebar;
