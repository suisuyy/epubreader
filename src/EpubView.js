import React from 'react'
import Epub from "epubjs/lib/index";

global.ePub = Epub; // Fix for v3 branch of epub.js -> needs ePub to by a global var


export default class EpubView extends React.Component{
    constructor(props){
        super(props);
        this.rendition=null;
        this.state={
            toc:[],
            ifShowToc:false,
            currentLocation: null,
        }
    }
    render(){
        return (
            <div className='epub-view'>
                <TOC toc={this.state.toc} rendition={this.rendition}/>

                <div id="area"></div>
                <button id='prevbtn' onClick={()=>this.rendition.prev()}>{"<"}</button>
                <button id='nextbtn' onClick={()=>this.rendition.next()}>{">"}</button>
                <Tool />
                
            </div>
        )
    }
    componentDidMount(){
        let book = Epub("/alice.epub");  
        this.rendition = book.renderTo("area", {width: "100%", height: "100%",flow: "scrolled-doc" ,});
        this.rendition.display().then(()=>{
            console.log(this.rendition.currentLocation())
        });
        book.loaded.navigation.then(nav=>{
            this.setState({
                toc:nav.toc
            })
        })
    }
}

class Tool extends React.Component{
    
    render(){
        return (
            <button>TOC</button>
        )
    }
}

class TOC extends React.Component{
    goto(location){
        this.props.rendition.display(location)
        console.log(this.props.rendition.currentLocation())
    }
    render(){
        return (
            <ol>
                {this.props.toc.map(item=><li key={item.label} onClick={()=>this.goto(item.href)}>{item.label}</li>)}
            </ol>
        )
    }
}