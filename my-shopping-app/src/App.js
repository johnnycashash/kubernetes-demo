import React, { Component } from "react";
import "./App.css";
const url = "http://product-api.info/products";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
    };
    this.delete = this.delete.bind(this);
    this.create = this.create.bind(this);
  }
  create(event) {
    alert("Refresh");
    event.preventDefault();
    const text = {
      name: "A Product",
      price: 10000,
      productId: "test123",
    };
    fetch(url, {
      method: "POST",
      body: JSON.stringify(text),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => console.log("Delete successful"));
  }

  delete(post) {
    console.log("Delete start");
    fetch(url+'/' + post.id, { method: "DELETE" }).then(() =>
      console.log("Delete successful")
    );
  }
  componentDidMount() {
    fetch(url)
      .then((response) => response.json())
      .then((json) => this.setState({ product: json }));
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
              <div className="card text-white bg-dark mb-3" key={post.id}>
                <div className="card-header"># {post.id}</div>
                <div className="card-body">
                  <p className="card-text">{post.name}</p>
                  <button
                    onClick={() => this.delete(post)}
                    class="btn btn-primary"
                  >
                    Delete
                  </button>
                </div>
                <div class="card-footer text-muted">{post.price}€</div>
              </div>
            </div>
          ))}

          <div class="col-sm-6">
            <div className="card text-white bg-dark mb-3">
              <div className="card-header"># Create New Product</div>
              <div className="card-body">
                <form onSubmit={this.create}>
                  <button type="submit" class="btn btn-primary">
                    Create Sample Product
                  </button>
                </form>
              </div>
              <div class="card-footer text-muted"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
