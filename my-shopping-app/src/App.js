import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: []
    }
  }

  componentDidMount() {
    const url = "http://product-api.info/products";
    fetch(url)
    .then(response => response.json())
    .then(json => this.setState({ product: json }))
  }

  render() {
    const { product } = this.state;
    return (
      <div className="container">
        <div class="jumbotron">
          <h1 class="display-4">Product List</h1>
        </div>
        {product.map((post) => (
          <div className="card" key={post.id}>
            <div className="card-header">
              Id - {post.id} and Product Id - {post.productId}
            </div>
            <div className="card-body">
              <p className="card-text">{post.name} -- {post.price} Euro</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export default App;