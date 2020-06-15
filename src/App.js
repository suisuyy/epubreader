import React from 'react';
import { Route } from 'react-router-dom'

import './App.css';
import { savefile, getfile, getAllFiles, rmFiles } from './utils/fileapi'

import Shelf from './Shelf.js'
import EpubView from './EpubView'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentBook: null,
            currentFile: null,
            bookfiles: []
        }
        console.log(fetch('http://d.noty50.top'))

    }

    render() {
        return (
            <div id='appdiv'>
                <button className="noborder" onClick={this.toggleFullScreen}>{"[ ]"}</button>
                <Route exact path='/' render={({ history }) => (
                    <div className="home">
                        <input className='noborder' type='file' onChange={(e) => this.handleFileInput(e)} />
                        <Shelf bookfiles={this.state.bookfiles} name='local' onBookClick={(file) => {
                            this.onBookClick(file);
                            history.push('/reader');
                        }} />

                    </div>
                )} />

                <Route path='/reader' render={() => (
                    <EpubView file={this.state.currentFile} />
                )} />

            </div>
        );
    }

    componentDidMount() {
        getAllFiles((event) => {
            this.setState({ bookfiles: event.target.result });
        });
    }

    toggleFullScreen() {
        if (!document.fullscreenElement &&    // alternative standard method
            !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    }

    handleFileInput(e) {
        let file = e.target.files[0];
        this.setState({
            currentFile: file,
            bookfiles: this.state.bookfiles.concat(file)
        });
        savefile(file);
    }

    onBookClick(file) {
        this.setState({
            currentFile: file,
        });
    }
}
