import React from "react";
import './ProductList.css'

const PRODUCTS = [
    {category: 'Articles de sport', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Articles de sport', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Articles de sport', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronique', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronique', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronique', price: '$199.99', stocked: true, name: 'Nexus 7'}
];
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
const ProductRow = React.memo(function ({product}) {

        const name = product.stocked ?
            product.name :
        <span className="product-out-stock">{product.name}</span>;

        return (
            <tr className="product-row">
                <td>{name}</td>
                <td>{product.price}</td>
            </tr>
        );
})
class ProductTable extends React.Component {
    render() {
        const filterText = this.props.filterText;
        const inStockOnly = this.props.inStockOnly;

        const rows = [];
        let lastCategory = null;

        this.props.products.forEach((product) => {
        if (product.name.indexOf(filterText) === -1) {
            return;
        }
        if (inStockOnly && !product.stocked) {
            return;
        }
        if (product.category !== lastCategory) {
            rows.push(
            <ProductCategoryRow
                category={product.category}
                key={product.category} />
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
            <div>
                <h3  className="title-product-list">Liste des produits:</h3>
                <table className="table-product">
                    <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prix</th>
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        );
    }
}
class SearchBar extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value);
    }

    handleInStockChange(e) {
        this.props.onInStockChange(e.target.checked);
    }

    render() {
        return (
            <form className="search-bar-wrapper">
                <input
                    type="text"
                    placeholder="Rechercher un produit..."
                    className="text-search-bar"
                    value={this.props.filterText}
                    onChange={this.handleFilterTextChange}
                />
                <div className="checkbox-wrapper">
                    <p>
                    <input
                        type="checkbox"
                        checked={this.props.inStockOnly}
                        onChange={this.handleInStockChange}
                    />
                    {' '}
                    Seulement produits en stocks
                    </p>
                </div>

            </form>
        );
    }
}
class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false
        };
        
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    shouldComponentUpdate (nextProps,nextState){
        return nextProps.products !== this.props.products ||
                nextState.filterText != this.props.filterText ||
                nextState.inStockOnly !== this.state.inStockOnly
        // return false;
    }
    
    handleFilterTextChange(filterText) {
        this.setState({
            filterText: filterText
        });
    }

    handleInStockChange(inStockOnly) {
        this.setState({
            inStockOnly: inStockOnly
        })
    }

    render() {
        return (
            <div className="container">
                <SearchBar
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onFilterTextChange={this.handleFilterTextChange}
                    onInStockChange={this.handleInStockChange}
                />
                <ProductTable
                    products={this.props.products}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                />
            </div>
        );
    }
}
export const ProductList = () => {
    return(
        <div className="product-list-wrapper">
            <FilterableProductTable products={PRODUCTS}/>
        </div>
    )
}