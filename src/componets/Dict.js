import React from 'react';

import { mobileAndTabletCheck } from "../utils/help";

export default class Dict extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            word: this.props.wordFromBook,
            defs: [],
            dict: {},
            style: {}
        };
    }
    componentWillReceiveProps(nextProps) {
        //if your props is received after the component is mounted, then this function will update the state accordingly.
        if (this.props.wordFromBook !== nextProps.wordFromBook) {
            this.setState({
                word: nextProps.wordFromBook.toLowerCase()
            });
        }
    }
    render() {
        return (
            <div className='dict' style={{ ...this.props.style, ...this.state.style }}>
                <div class='dict-button-group'>
                    <a href="#localdict"> <button className="dictbutton">Local</button> </a>
                    <a href="#yddict"> <button className="dictbutton">YouDao</button> </a>
                    <button onClick={() => this.moveUp()} className="dictbutton">Up</button>
                    <button onClick={() => this.moveDown()} className="dictbutton">Down</button>
                    <button onClick={() => this.props.toggleDict()} className="dictbutton">Close</button>
                </div>

                <textarea class='dict-textarea'
                    onContextMenu={
                        function (event) {
                            event.preventDefault();
                            return false;
                        }
                    }
                    placeholder='input some text here then long press to select word to look up the word'
                />
                {this.props.dictfiles.length !== 0 &&
                    <div id="localdict">
                        <p>dict file name: {this.props.dictfiles[0].name}</p>

                        <form onSubmit={(event) => {
                            event.preventDefault();
                            this.search(this.state.word);
                        }}>
                            <input
                                placeholder='Search'
                                type='text'
                                value={this.state.word}
                                onChange={(event) => this.handleInput(event)}
                            />
                            {/* <p onClick={()=>this.search(this.props.word)}>click me to search: {this.props.word}</p> */}
                        </form>
                        <p>{this.props.wordFromBook}</p>
                        <div className='defview'>

                            {this.state.word.length > 1 &&
                                this.state.dict[this.state.word.toLowerCase()] &&
                                <div dangerouslySetInnerHTML={{ __html: this.state.dict[this.state.word.toLowerCase()] }} />}
                        </div>
                    </div>

                }

                {mobileAndTabletCheck() === true &&
                    this.state.word.length >= 1 &&
                    <iframe title="youdao"
                        id="yddict"
                        width="100%"
                        height="500px"
                        src={`https://m.youdao.com/dict?q=${this.state.word}`}
                    />}
                {mobileAndTabletCheck() === false &&
                    this.state.word.length >= 1 &&
                    <iframe title="youdao"
                        id="yddict"
                        width="100%"
                        height="500px"
                        sandbox=""
                        src={`https://dict.youdao.com/w/${this.state.word}`}
                    />}
            </div>

        )
    }

    componentDidMount() {
        let fr = new FileReader();
        fr.onload = (e) => {
            let result = e.target.result;
            this.setState({
                dict: JSON.parse(result),
            })

        }
        console.log(this.props.dictfiles)
        setTimeout(() => {
            this.props.dictfiles.length !== 0 && fr.readAsText(this.props.dictfiles[0]);

        }, 2000);
        document.onselectionchange = () => {
            let word = document.getSelection().toString();
            if (word.length > 1) {
                this.search(word);
            }
        };
    }

    moveUp() {
        this.setState({
            style: {
                top: 0
            }
        })
    }
    moveDown() {
        this.setState({
            style: {
                bottom: 0
            }
        })
    }

    handleInput(event) {
        this.setState({
            word: event.target.value.toLowerCase()
        })
    }
    search(word) {
        let dictObject = this.state.dict;
        let defs = dictObject[word];
        if (!defs) {
            defs = [`sorry no definition for the word '${word}'`]
        }
        this.setState({
            word: word,
            defs: defs,
        })
    }
}