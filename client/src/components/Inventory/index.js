import React from 'react';
import axios from 'axios';

export default class Inventory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        axios.get('/square/inventory')
            .then((response) => {
                console.log(response);
                this.setState({items: response.data})
            });
    }

    renderItems() {
        var children = [];
        for (var item_id in this.state.items) {
            var item = this.state.items[item_id];
            children.append(<h1 key={item_id}>{item.name + ", " + item.variation + ", " + item.quantity}</h1>);
        }
        return React.createElement('div', [], children);
    }

    render() {
        var children = [];
        children.push(
            <tr key="header">
                <th>Item</th>
                <th>Size</th>
                <th>Quantity</th>
            </tr>
        );
        for (var item_id in this.state.items) {
            var item = this.state.items[item_id];
            children.push(
                <tr key={item_id}>
                    <td>{item.name}</td>
                    <td>{item.variation}</td>
                    <td>{item.quantity}</td>        
                </tr>
            );
        }
        return React.createElement('div', [], children);
    }
}



