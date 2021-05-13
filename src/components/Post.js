import React from 'react';
import moment from 'moment';

export const Post = (props) => {
    const info = props.p;
    const date = moment(info.date).fromNow();

    return (
        <li className="list-group-item">
            <div>
                <small>{ date }</small>
            </div>
            <div>
                {info.body}
                <span className="float-right">
                    <button onClick={() => props.deletePost(info)} className="btn btn-sm btn-danger">Delete</button>
                </span>
            </div>
            <div>
                <cite>&mdash; {info.author}</cite>
            </div>
        </li>
    )
}
