import React from 'react';
import { Link } from 'react-router-dom';
import { toggleFullScreen } from '../utils/help'

export default class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            max: false
        };
    }

    render() {
        if (this.state.max !== true) {
            return (<div
                onClick={() => this.setState({ max: true })}
                onDoubleClick={()=>this.props.showDict()}
                className="navbarmin lage-font">
            </div>)
        }
        return (
            <div className="navbar" id="navbar">
                <div
                onClick={() => this.setState({ max: true })}
                onDoubleClick={()=>this.props.showDict()}
                className="navbarmin lage-font">
                
            </div>
                <ol>
                    <li>
                        <Link
                            className='navitem'
                            to='/'>
                            <button className='noborder larger-font'>Home</button>
                        </Link>
                    </li>
                    <li>
                        <button
                            className='noborder larger-font'
                            onClick={this.props.toggleDict}>
                            Dict
                </button>
                    </li>
                    <li>
                        <button className='noborder larger-font' onClick={()=>{window.scrollTo(0,0)}}>top</button>
                    </li>
                    <li>
                        <button className='noborder larger-font' onClick={toggleFullScreen} >fullscreen</button>
                    </li>
                    <li>
                        <input id="fileElem" className='noborder visually-hidden' type='file' onChange={(e) => this.props.handleFileInput(e)} />
                        <label htmlFor="fileElem"
                        className='noborder larger-font'
                        style={{marginLeft:"7px"}}
                        >import local file</label>
                    </li>
                    <li>
                        <button 
                        onClick={()=>this.setState({max:false})}
                        className='noborder larger-font'>
                            close
                        </button>
                    </li>
                </ol>






            </div>
        );
    }
}