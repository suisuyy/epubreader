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
            ifShowTocTool: true,
            ifShowToc:true,
            currentLocation: null,
        };
    }
    render(){

        if(this.props.file===null){
            return <p>error,go back and open book agian</p>
        }
        return (
            <div className='epub-view' id='epubviewer'>
                <p>{this.props.file.name}</p>
                <TOC toc={this.toc} rendition={this.rendition} ifShowToc={this.state.ifShowToc}
                    toogleTOC={()=>this.toogleTOC()}
                />

                <button className='prevbtn' onClick={()=>this.prev()}>prev</button>
                <button className='nextbtn' onClick={()=>this.next()}>next</button>
                <div id="contentview"></div>
                <button className='prevbtn' onClick={()=>this.prev()}>prev</button>
                <button className='nextbtn' onClick={()=>this.next()}>next</button>
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
        document.getElementById('contentview').innerHTML='';
        this.rendition = book.renderTo("contentview", {width: "100%", height: "2000",spread: "always",});
        this.rendition.display().then(()=>{
            this.rendition.themes=({
                "body": { "padding": "0 !important"},
                "div":{"padding":"0 0 0 1% !important","font-familly":"Courier New !important","font-size": "30px !important",}
            })
        });
        book.loaded.navigation.then(nav=>{
            this.rendertoc(nav.toc);
        })
        this.rendition.on("rendered", (e,i) => {
            i.document.onselectionchange=()=>{
                this.props.setWordFromBook(i.document.getSelection().toString());
                
                i.document.getSelection().toString().length>1 && this.props.showDict();
            
            };
            let mathjaxScript=document.createElement('script');
            mathjaxScript.src='https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML';
            i.document.body.appendChild(mathjaxScript);
        })
    }

    rendertoc(toclist){
        let list=document.createElement('ul');
        toclist.map(item=>{
            let li=document.createElement('li');
            li.innerHTML=item.label;
            li.style.color='blue';
            li.style.marginBottom='20px';
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

    prev(){
        this.rendition.prev();
    }
    next(){
        this.rendition.next();
        document.getElementById('contentview').scrollIntoView();
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
