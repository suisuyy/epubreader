import React from 'react';  
import './App.css';

import EpubView from './EpubView'

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state={
            currentBook:null,
        }
    }

    render() {
        return (
            <div id='appdiv'>
                <button class="noborder" onClick={this.toggleFullScreen}>{"[ ]"}</button>
                <EpubView  />

            </div>
        );
    }

    toggleFullScreen(){
        let elem=document.documentElement;
        elem.requestFullscreen();
        elem.style.backgroundColor="white";
    }
}

