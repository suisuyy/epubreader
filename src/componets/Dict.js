import React from 'react';


export default class Dict extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            word: this.props.wordFromBook,
            defs: [],
            dict:{}
        };
    }
    componentWillReceiveProps(nextProps) {
        //if your props is received after the component is mounted, then this function will update the state accordingly.
        if(this.props.wordFromBook !== nextProps.wordFromBook) {
         this.setState({word: nextProps.wordFromBook});
        }
      }
    render() {
        
        return (
            <div className='dict' style={this.props.style}>
            {this.props.dictfiles.length===0 && <p>no dict file found you need download first</p>}
            <p>dict file name: {this.props.dictfiles[0].name}</p>
                
                <form onSubmit={(event) => {
                    event.preventDefault();
                    this.search(this.state.word);
                }}>
                    <input type='text' value={this.state.word} onChange={(event) => this.handleInput(event)} />
                    <button onClick={() => this.search(this.state.word)}>search</button>
                    {/* <p onClick={()=>this.search(this.props.word)}>click me to search: {this.props.word}</p> */}
                </form>
            <p>{this.props.wordFromBook }</p>
                <div className='defview'>
                    <ol>
                        
                        {this.state.word.length>1&&this.state.dict[this.state.word]&&this.state.dict[this.state.word].map((item) => {
                            return <li key={Math.random()}>
                                        <p>{item}</p>
                                    </li>
                        })}
                    </ol>
                </div>
            </div>
        )
    }

    componentDidMount(){
        let fr=new FileReader();
        fr.onload=(e)=>{
            let result=e.target.result;
            this.setState({
                dict: JSON.parse(result),
            })   
        }
        if(this.props.dictfiles.length===0){
            return
        }
        fr.readAsText(this.props.dictfiles[0]);
        document.onselectionchange=()=>{
            let word=document.getSelection().toString();
            if(word.length>1){
                this.search(word);
            }
        };
    }

    handleInput(event) {
        this.setState({
            word: event.target.value
        })
    }
    search(word) {
        let dictObject = this.state.dict;
        let defs = dictObject[word];
        if (!defs) {
            defs = [`sorry no definition for the word '${word}'`]
        }
        this.setState({
            word:word,
            defs: defs,
        })
    }
}