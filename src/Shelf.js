import React from 'react'

export default class Shelf extends React.Component {

    render() {
        let booknames = this.props.booknames;
        return (
            <div className='shelf'>
                <h1>{this.props.name}</h1>
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
    return (
        <div className="bookli">
            <i>{props.name}</i>
            <div >
                {props.type === 'local' &&
                    <button className='noborder bookbtn' onClick={() => props.openBook(props.name)}>read</button>}
                <button className='noborder bookbtn' onClick={props.type === 'local' ? () => props.uploadBook(props.name) : () => props.downloadBook(props.name)}>
                    {props.type === 'local' ? 'upload' : 'download'}
                </button>
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