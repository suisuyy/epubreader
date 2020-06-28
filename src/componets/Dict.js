import React from 'react';


export default class Dict extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            word: '',
            defs: [],
            dict:{}
        };
    }

    render() {
        console.log('render:',this.props.dictfiles);
        if(this.props.dictfiles.length<=0){
            
            return (<p>loading dict ...</p>)
        }
        return (
            <div className='dict'>
            <p>dict file name: {this.props.dictfiles[0].name}</p>
                
                <form onSubmit={(event) => {
                    event.preventDefault();
                    this.search(this.state.word);
                }}>
                    <input type='text' value={this.state.word} onChange={(event) => this.handleInput(event)} />
                    <button
                        onClick={() => this.search(this.state.word)}
                        disabled={this.state.word === ''}
                    >search</button>
                </form>
                <div className='defview'>
                    <ol>
                        {this.state.defs.map((item) => {
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

        console.log('didmount',this.props.dictfiles)
        let fr=new FileReader();
        fr.onload=(e)=>{
            let result=e.target.result;
            this.setState({
                dict: JSON.parse(result),
            })
            console.log(this.state)
        }
        if(this.props.dictfiles.length===0){
            return
        }
        fr.readAsText(this.props.dictfiles[0])
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
            defs: defs,
        })
    }
}