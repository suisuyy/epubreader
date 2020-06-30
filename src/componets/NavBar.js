import React from 'react';
import { Link } from 'react-router-dom';
import { toggleFullScreen } from '../utils/help'

export default class NavBar extends React.Component {

    render() {
        return (
            <div className="navbar" id="navbar">
                <Link
                    className='navitem'
                    to='/'>
                    <button className='noborder larger-font'>Home</button>
                </Link>
                <button
                    className='noborder larger-font'
                    onClick={this.props.toggleDict}>
                   Dict
                </button>

                <a className='noborder larger-font' href="#top" >^</a>
                <button className='noborder larger-font' onClick={toggleFullScreen} >[ ]</button>
            </div>
        );
    }
}