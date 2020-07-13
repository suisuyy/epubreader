import React from 'react'

export default class Shelf extends React.Component {

    render() {
        let booknames = this.props.booknames;
        if(this.props.name==='local' && this.props.booknames.length===0){
            return (
                 <div className='shelf' id={this.props.name+'shelf'}>
                      <h1>{this.props.name.toUpperCase()} SHELF</h1>
                     no books! download or import one now!
                 </div>
            )
        }
        return (
            <div className='shelf' id={this.props.name+'shelf'}>
                <h1>{this.props.name.toUpperCase()} SHELF</h1>
                <ol>
                    {booknames.map(item => {
                        return (
                            <li key={item}
                                className='bookli'
                            >
                                <Bookli
                                    name={item} type={this.props.name}
                                    openBook={this.props.openBook}
                                    downloadBook={this.props.downloadBook}
                                    uploadBook={this.props.uploadBook}
                                    rmFile={this.props.rmFile}
                                />
                            </li>)
                    })}
                </ol>
            </div>
        )
    };
}

function Bookli(props) {
    if(!props){
        return (
            <div></div>
        )
    }
    return (
        <div className="bookli">
            <i>{props.name}</i>
            <div >
                {
                    props.type === 'local' && props.name.endsWith('epub') &&
                    <button className='noborder bookbtn' onClick={() => props.openBook(props.name)}>read</button>
                }
                
                {
                    props.type === 'local' &&
                    props.name.endsWith('epub') &&
                    <button className='noborder bookbtn' onClick={() => props.uploadBook(props.name)}>
                        upload
                </button>
                }

                {
                    props.type !== 'local' &&
                    <button className='noborder bookbtn' onClick={() => props.downloadBook(props.name)}>
                        download
                    </button>
                }

                {props.type === 'local' &&
                    <button
                        className='noborder bookbtn'
                        onClick={() => props.rmFile(props.name)}>
                        remove
                    </button>}

            </div>
        </div>
    )
}