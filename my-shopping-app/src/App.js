import React, { Component } from 'react';
import './App.css';
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
        <div class="row">
        {product.map((post) => (
          <div class="col-sm-6">
          <div className="card" key={post.id}>
            <div className="card-header">
              # {post.id}
            </div>
            <div className="card-body">
              <p className="card-text">{post.name}</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
             <div class="card-footer text-muted">
                {post.price}€
              </div>
            </div>
            </div>
        ))}
       </div>

      </div>
    );
  }
}
export default App;