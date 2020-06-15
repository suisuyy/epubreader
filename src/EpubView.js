import React from 'react'
import Epub from "epubjs/lib/index";

global.ePub = Epub; // Fix for v3 branch of epub.js -> needs ePub to by a global var


export default class EpubView extends React.Component{
    constructor(props){
        super(props);
        this.rendition=null;
        this.book=null;
        this.toc=[];
        this.state={
            ifShowToc:true,
            currentLocation: null,
        }
    }
    render(){

        if(this.props.file===null){
            return <p>error,go back and open book agian</p>
        }
        return (
            <div className='epub-view'>
                <p>{this.props.file.name}</p>
                <TOC toc={this.toc} rendition={this.rendition} ifShowToc={this.state.ifShowToc}
                    toogleTOC={()=>this.toogleTOC()}
                />

                <div id="area"></div>
                <button id='prevbtn' onClick={()=>this.rendition.prev()}>{"<"}</button>
                <button id='nextbtn' onClick={()=>this.rendition.next()}>{">"}</button>
                <Tool />
            </div>
        )
    }
    componentDidMount(){

        if(this.props.file===null) return;
        
        console.log('update bookview file:',this.props.file);
        let book = Epub();
        let freader=new FileReader();
        freader.onload=function(e){
            let fileData=e.target.result;
            book.open(fileData);
        }
        freader.readAsArrayBuffer(this.props.file);  
        document.getElementById('area').innerHTML='';
        this.rendition = book.renderTo("area", {width: "100%", height: "100%",flow: "scrolled-doc" ,});
        this.rendition.display().then(()=>{
            console.log('updated')
            this.rendition.themes.default({
                "body": { "padding": "0 !important"},
                "div":{"padding":"0 0 0 1% !important"}
            })
        });
        book.loaded.navigation.then(nav=>{
            this.rendertoc(nav.toc);
        })
    }

    rendertoc(toclist){
        let list=document.createElement('ul');
        toclist.map(item=>{
            let li=document.createElement('li');
            li.innerHTML=item.label;
            li.addEventListener('click',()=>{
                this.rendition.display(item.href);
                this.setState({ifShowToc:false});
            });
            list.appendChild(li);
            return null;
        })
        document.getElementById('tocdiv').innerHTML='';
        document.getElementById('tocdiv').appendChild(list);
    }
    toogleTOC(){
        this.setState({
            ifShowToc:!this.state.ifShowToc,
        })
    }
}

class Tool extends React.Component{
    
    render(){
        return (
            <div></div>
        )
    }
}

export class TOC extends React.Component{
    render(){
        
        return (
            <div>
            <button className='noborder' onClick={()=>this.props.toogleTOC()}>show/hide table of content</button>
            { <div id='tocdiv' style={{display:this.props.ifShowToc?'inherit':'none'}}></div>}
            </div>
        )
    }

}
