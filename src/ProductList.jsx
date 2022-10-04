import React from "react";
import './App.css'
import './ProductList.css'

const PRODUCTS = [
    {category: "Sport", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sport", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sport", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electroniques", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electroniques", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electroniques", price: "$199.99", stocked: true, name: "Nexus 7"}
];
class FilterableProducTable extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            filterText : "",
            inStockOnly : false,
        }
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleInStockChange = this.handleInStockChange.bind(this)
    }

    handleFilterTextChange(filterText) {
        this.setState({filterText: filterText});
    }
    
    handleInStockChange(inStockOnly){
        this.setState({inStockOnly : inStockOnly})
    }

    render() {
        const {products} = this.props

        return (
            <div className="container">
                {/* {JSON.stringify(this.state)} */}
                <SearchBar 
                    filterText={this.state.filterText} 
                    inStockOnly={this.state.inStockOnly}
                    onFilterTextChange={this.handleFilterTextChange}
                    onInStock={this.handleInStockChange}
                />
                <ProductTable 
                    products={products}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                />
            </div>
        );
    }
}
class SearchBar extends React.Component {
    
    constructor(props){
        super(props)
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleInStockChange = this.handleInStockChange.bind(this)
    }
    handleFilterTextChange(e){
        this.props.onFilterTextChange(e.target.value)
    }
    handleInStockChange(e){
        // console.log(this.props)
        this.props.onInStock(e.target.value)
    }
    render() {
        const {filterText, inStockOnly} = this.props
        return (
        <div className="search-bar-wrapper">
            <input type="text" value={filterText} className="text-search-bar" placeholder="Rechercher" onChange={this.handleFilterTextChange}/>
            <div className="checkbox-wrapper">
                <input type="checkbox" checked={inStockOnly} onChange={this.handleInStockChange}/>{'  '}
                <label htmlFor="checkbox" className="checkbox-label">Seulement produits en stocks</label>
            </div>
        </div>
        );
    }
}
class ProductCategoryRow extends React.Component {
    render() {
        const category = this.props.category;
        return (
        <tr>
            <th colSpan="2" className="product-category">
            {category}
            </th>
        </tr>
        );
    }
}
class ProductRow extends React.Component {
    render() {
        const product = this.props.product;
        const name = product.stocked ? product.name :
            <span className="product-out-stock">
                {product.name}
            </span>;
        return (
        <tr>
            <td>{name}</td>
            <td>{product.price}</td>
        </tr>
        );
    }
}
function ProductTable({products,inStockOnly,filterText}) {
    const rows = [];
    let lastCategory = null;
    

    products.forEach((product) => {
        if (inStockOnly && !product.stocked){
            return
        }
        if (product.name.indexOf(filterText) === -1 ){
            return
        }
        if (product.category !== lastCategory) {
            rows.push(
            <ProductCategoryRow
                category={product.category}
                key={product.category} 
                />
            );
        }
        rows.push(
            <ProductRow
                product={product}
                key={product.name} 
            />
        );
        lastCategory = product.category;
    });

    return (
    <table className="table-product">
        <thead>
            <tr>
                <th>Nom :</th>
                <th>Prix :</th>
            </tr>
        </thead>
        <tbody>{rows}</tbody>
    </table>
    );
}

export const ProductList = () => {
    return(
        <div className="product-list-wrapper">
            <h3>Liste des produits:</h3>
            <FilterableProducTable products={PRODUCTS}/>
        </div>
    )
}