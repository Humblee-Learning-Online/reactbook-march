import React from 'react'
import { Post } from '../components/Post';

export const Home = (props) => {
    const user = props.user;

    return (
        <React.Fragment>
            <h4>Hello, {user.name} ({user.age}) from: {user.location}</h4>
            <hr />
            <div className="container my-5">
                <div className="row">
                    <div className="col-md-12">
                        <form onSubmit={(e) => props.addPost(e)} id="post-form" className="form-inline">
                            <div className="flex-fill mr-2">
                                <input type="text" name="body" id="body" placeholder="What's on your mind?" className="form-control w-100" />
                            </div>
                            <input type="submit" value="Post" className="btn btn-primary" />
                        </form>
                    </div>
                </div>
            </div>

            <ul className="list-group">
                {props.posts.map(p => <Post deletePost={props.deletePost} key={p.id} p={p} />)}
            </ul>

        </React.Fragment>
    )
}
