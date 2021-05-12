import React from 'react'

export const Post = (props) => {
    const info = props.p;

    return (
        <li className="list-group-item">
            <div>
                <small>12-45-1012</small>
            </div>
            <div>
                {info.body}
                <span className="float-right">
                    <button className="btn btn-sm btn-danger">Delete</button>
                </span>
            </div>
            <div>
                <cite>&mdash; {info.author}</cite>
            </div>
        </li>
    )
}
