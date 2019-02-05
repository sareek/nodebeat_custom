import React, { Component } from 'react';
import axios from 'axios'
import PostTest from '../../components/Test/PostTest'

class Test1 extends Component {
    state = {
        posts: []
    }


    componentDidMount () {
        axios.get('https://jsonplaceholder.typicode.com/posts')
           .then(response => {
               const posts = response.data.slice(0, 4);
               const updatedPosts = posts.map(post => {
                   return {
                       ...post,
                       author:"Sarik"
                   }
               });
               this.setState({posts: updatedPosts });
                console.log(response.data.slice(0, 4));
           } );
    }

    render() {

        const posts = this.state.posts.map(post => {
            return <PostTest key={post.id} title={post.title} author={post.author} />;
        }

        );

        return (
          <div className="App">
          <p>inside Test1</p>
          <section className="Posts">
            {posts}
          </section>
            
          </div>
        );
      }

}

export default Test1;