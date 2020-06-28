import React from 'react';
import { Route } from 'react-router-dom';

import './App.css';
import { savefile, getfile, getAllFiles, rmFiles } from './utils/fileapi'
import { getAllBookNamesOnline, getAllFileNamesOnline, getRemoteFile, uploadFile } from './utils/api';

import Shelf from './Shelf.js';
import EpubView from './EpubView';
import Dict from './componets/Dict';
import NavBar from './componets/NavBar';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentBook: null,
            currentFile: null,
            bookfiles: [],
            dictfiles: [],
            onlineBookNames: []
        };

    }

    render() {
        return (
            <div id='appdiv'>
                <NavBar />
                <Route exact path='/' render={({ history }) => (
                    <div className="home">
                        <input className='noborder' type='file' onChange={(e) => this.handleFileInput(e)} />
                        <Shelf booknames={this.state.bookfiles.map(i => i.name)} name='local' openBook={(filename) => {
                            this.openBook(filename);
                            history.push('/reader');
                        }}
                            uploadBook={(name)=>this.uploadFile(name)}
                        />
                        <Shelf name='online' 
                         booknames={this.state.onlineBookNames}
                         downloadBook={(name)=>this.downloadFile(name)}
                         />

                    </div>
                )} />

                <Route path='/reader' render={() => (
                    <EpubView file={this.state.currentFile} />
                )} />
                <Route path='/dict' render={() => {
                    if (this.state.dictfiles.length <= 0) {
                        return (<p>loading dict ...</p>)
                    }
                    console.log('dict load:', Array.isArray(this.state.dictfiles))
                    return <Dict dictfiles={this.state.dictfiles} />
                }} />
            </div>
        );
    }

    componentDidMount() {
        getAllBookNamesOnline().then((data) => {
            this.setState({
                onlineBookNames: data,
            })
        });
        
        getAllFiles((event) => {
            let files = event.target.result;
            console.log(files)
            let epubfiles = files.filter(f => f.name.endsWith('epub'));
            let dictfiles = files.filter(f => f.name.endsWith('json'));
            if (Array.isArray(dictfiles) !== true) {
                console.log('not aray');
                dictfiles = [dictfiles]
            }
            this.setState({
                bookfiles: epubfiles,
                dictfiles: dictfiles
            });
        });
    }


    handleFileInput(e) {
        let file = e.target.files[0];
        this.setState({
            currentFile: file,
            bookfiles: this.state.bookfiles.concat(file)
        });
        savefile(file);
    }

    downloadFile(name) {
        getRemoteFile(name).then(resBlob => {
            let file=new File([resBlob],name);
            if (name.endsWith('.epub')) {
                this.setState({
                    bookfiles:this.state.bookfiles.concat(file)
                })
            }
            savefile(file);

        })
    }

    uploadFile(name){
        uploadFile(name).then(()=>{
            if (name.endsWith('.epub')) {
                this.setState({
                    onlineBookNames:this.state.onlineBookNames.concat(name)
                })
            }
        }
        )
    }
    openBook(filename) {
        this.setState({
            currentFile: this.state.bookfiles.filter(i => i.name === filename)[0],
        });
    }
}
