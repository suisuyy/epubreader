import React from 'react';
import { Link } from 'react-router-dom';
import { toggleFullScreen } from '../utils/help'

export default class NavBar extends React.Component {

    render() {
        return (
            <div className="navbar">
                <Link
                    className='navitem'
                    to='/'>
                    <button className='noborder larger-font'>Home</button>
                </Link>
                <Link
                    className='navitem'
                    to='/dict'>
                    <button className='noborder larger-font'>Dict</button>
                </Link>
                
                <button className='noborder larger-font' onClick={toggleFullScreen} >[ ]</button>
            </div>
        );
    }
}