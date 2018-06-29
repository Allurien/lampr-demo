import React, { Component } from 'react';
import axios from 'axios';
import Item from './item';
import Input from './input';
import './list.css';
import {formatPostData} from '../../helpers/'

class ToDoList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [],
            newItem: {
                title: '',
                details: ''
            },
            submitted: false,
            message: 'Loading',
            errors: []
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    async componentWillMount() {
        this.getListData();
       
        

        
    }

    async getListData() {
        // Use get request to get list data
        const response = await axios.get('/api/to_do_list.php', {
            params: { action: 'get_to_do_list' }
        });
        console.log ('Get Resp:', response);
        console.log ('Get Resp:', response.data.listItems);

        const { message, listItems } = response.data;

        let newState = {
            list: [],
            message: ''
        };

        if(listItems){
            newState.list = listItems;
        } else if (message){
            newState.message = message;
        } else {
            newState.message = 'Error with server'
        }

        this.setState(newState);
    }

    async deleteItem(id) {
        // Use delete method to delete a to do item based on ID
        await axios.delete('/api/to_do_list.php', {
            params: {
                action: 'delete_item',
                id: id
            }
        });
        this.getListData();
    }

    async addItem(e) {
        e.preventDefault();
        // Item @ this.state.newItem
        // Use post method to send new item to DB
        const newItem = formatPostData(this.state.newItem);
        const response = await axios.post('/api/to_do_list.php', newItem, {
            params: {
                action: 'save_item'
            }
        });

        const { errors, success } = response.data;

        if(!success){
            return this.setState({ errors });
        }

        this.setState({
            newItem: {
                title: '',
                details: ''
            },
            submitted: true,
            errors: []
        });

        this.getListData();
    }

    handleInputChange(e) {
        const { name, value } = e.target;
        const { newItem } = this.state;

        this.setState({
            submitted: false,
            newItem: { ...newItem, [name]: value }
        });
    }

    async handleToggleComplete(id, complete){
        const dataToSend = {
            id: id,
            complete: !complete
        };

        // Use patch request to update item based on id
        const patchDat = await axios.patch('/api/to_do_list.php', dataToSend, {
            params: {
                action: 'change_complete'
            }
        });

        this.getListData();
    }

    render() {
        const { message, errors, list, submitted, newItem: { title, details } } = this.state;

        let listDisplay = <li className="list-error center grey-text text-lighten-1">{message}</li>;
        let errorsDisplay = [];

        if(list.length){
            listDisplay = list.map(item => {
                return <Item key={item.id} toggleComplete={this.handleToggleComplete.bind(this, item.id, item.complete)} deleteItem={this.deleteItem.bind(this, item.id)} {...item} />
            });
        }

        if(errors){
            errorsDisplay = errors.map( err => <p key={err} className="red-text">{err}</p>);
        }

        return (
            <div className="to-do-list">
                <h1 className="center cyan-text text-accent-4">To Do List</h1>
                <form onSubmit={this.addItem} className="row">
                    <Input name="title" label="Title" value={title} onChange={this.handleInputChange} submitted={submitted} focus />
                    <Input name="details" label="Details" value={details} onChange={this.handleInputChange} submitted={submitted} />

                    <div className="col s12">
                        <div className="row">
                            <div className="col s10">
                                {errorsDisplay}
                            </div>
                            <div className="col s2 right-align">
                                <button className="btn cyan accent-4">Add Item</button>
                            </div>
                        </div>
                    </div>

                </form>
                <ul className="collection">
                    {listDisplay}
                </ul>
            </div>
        );
    }
}

export default ToDoList;
