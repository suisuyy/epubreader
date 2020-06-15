import React from 'react'

export default class Shelf extends React.Component {

    render() {
        let bookfiles = this.props.bookfiles;
        console.log('bookfiles at shelf:', bookfiles)
        return (
            <div className='shelf'>
                <h1>{this.props.name}</h1>
                <ol>
                    {bookfiles.map(bf => {
                        return (
                            <li key={bf.name} onClick={() => this.props.onBookClick(bf)}>
                                {bf.name}
                            </li>)
                    })}
                </ol>
            </div>
        )
    };
}