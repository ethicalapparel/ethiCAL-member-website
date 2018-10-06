import React from 'react';
import axios from 'axios';
import {Loader} from 'semantic-ui-react';
import './index.css';

export default class Inventory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            filter: '',
            loaded: false
        }
    }

    reloadInventory() {
        var newItems = this.state.items;
        axios.get('/square/inventory')
            .then((response) => {
                response.data.forEach(function(variation) {
                    if(newItems[variation.variation_id] != null) {
                        newItems[variation.variation_id].quantity = variation.quantity_on_hand;
                    }
                })
                this.setState({
                    items: newItems
                });
            });
    }

    componentDidMount() {
        axios.get('/square/items')
            .then((response) => {
                console.log(response);
                this.setState({
                    items: response.data,
                    loaded: true
                });
                this.reloadInventory();
                this.interval = setInterval(() => this.reloadInventory(), 10000);
            });
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    renderTable() {
        var children = [];
        children.push(
            <tr key="header">
                <th className="item-col">Item</th>
                <th className="size-col">Size</th>
                <th className="quantity-col">Quantity</th>
                <th className="price">Price</th>
            </tr>
        );
        for (var item_id in this.state.items) {
            var item = this.state.items[item_id];
            if(item.name.toLowerCase().includes(this.state.filter.toLowerCase())) {
                children.push(
                    <tr key={item_id}>
                        <td className="item-col">{item.name}</td>
                        <td className="size-col">{item.variation}</td>
                        <td className="quantity-col">{item.quantity}</td>
                        <td className="price-col">${item.price / 100}</td>
                    </tr>
                );
            }
        }
        if (children.length <= 1) {
            children.push(
                <tr>
                    <td colspan={3}>
                        <p className="empty-text">No items found!</p>
                    </td>
                </tr>
            )
        }
        return  React.createElement('table', {className: 'inventory-table'}, children);
    }

    render() {
        return (
            <div>
                <h1>Inventory</h1>
                <input className="search-input" placeholder="Search item name:" value={this.state.filter} onChange={(e) => this.setState({filter: e.target.value})} />
                {this.state.loaded ? this.renderTable() : <Loader active/>}
            </div>
        )
    }
}
