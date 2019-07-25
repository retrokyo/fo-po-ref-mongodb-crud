import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class editProduct extends Component {
    
    constructor(props) {
        super(props);

        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeBrandName = this.onChangeBrandName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeCountryCode = this.onChangeCountryCode.bind(this);
        this.onChangeUsage = this.onChangeUsage.bind(this);
        this.onChangeIngredients = this.onChangeIngredients.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            product_name: '',
            brand_name: '',
            description: '',
            country_code: '',
            usage: [],
            ingredients: [],
            category: '',
            redirect: false
        };
} 

    componentDidMount () {
        axios.get('http://localhost:4001/products/' + this.props.match.params.id)
                .then(res => {
                    this.setState({
                        product_name: res.data.product_name,
                        brand_name: res.data.brand_name,
                        description: res.data.description,
                        country_code: res.data.country_code,
                        usage: res.data.usage,
                        ingredients: res.data.ingredients,
                        category: res.data.category
                    })
                })
                .catch(function(err) {
                    console.log(err);
                });
            }
    


    onChangeProductName(e) {
        this.setState({
            product_name: e.target.value
        });
    }

    onChangeBrandName(e) {
        this.setState({
            brand_name: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeCountryCode(e) {
        this.setState({
            country_code: e.target.value
        });
    }

    onChangeUsage(e) {
        this.setState({
            usage: e.target.value.split(',')
        });
    }

    onChangeIngredients(e) {
        this.setState({
            ingredients: e.target.value.split(',')
        });
    }

    onChangeCategory(e) {
        this.setState({
            category: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const updateProduct = {
            product_name: this.state.product_name,
            brand_name: this.state.brand_name,
            description: this.state.description,
            country_code: this.state.country_code,
            usage: this.state.usage,
            ingredients: this.state.ingredients,
            category: this.state.category
        };

        axios.post('http://localhost:4001/products/update/'+this.props.match.params.id, updateProduct)
                .then(res => console.log(res.data));

        this.setState({ redirect: true });

    }
    render () {
        const redirectBool = this.state.redirect;
        if (redirectBool === true){
            return <Redirect to='/' />;
        }
        return (
            <div style={{marginTop: 10}}>
                <h3>Edit Product</h3>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>Product Name: </label>
                        <input type="text"
                                className='form-control'
                                value={this.state.product_name}
                                onChange={this.onChangeProductName}
                                />
                    </div>
                    <div className='form-group'>
                        <label>Brand Name: </label>
                        <input type='text'
                                className='form-control'
                                value={this.state.brand_name}
                                onChange={this.onChangeBrandName}
                                />
                    </div>
                    <div className='form-group'>
                            <label>Description: </label>
                            <input type='text'
                                    className='form-control'
                                    value={this.state.description}
                                    onChange={this.onChangeDescription}
                                    />
                    </div>
                    <div className='form-group'>
                        <label>Country Code: </label>
                        <input type='text'
                                className='form-control'
                                value={this.state.country_code}
                                onChange={this.onChangeCountryCode}
                                />
                    </div>
                    <div className='form-group'>
                        <label>Usage: </label>
                        <input type='text'
                                className='form-control'
                                value={this.state.usage}
                                onChange={this.onChangeUsage}
                                placeholder='Ex) Headache,Pain Relief,...'
                                />
                    </div>
                    <div className='form-group'>
                        <label>Ingredients</label>
                        <input type='text'
                                className='form-control'
                                value={this.state.ingredients}
                                onChange={this.onChangeIngredients}
                                placeholder='Ex) Onions,Carrots,...'
                                />
                    </div>
                    <div className='form-group'>
                        <label>Category</label>
                        <input type='text'
                                className='form-control'
                                value={this.state.category}
                                onChange={this.onChangeCategory}
                                />
                    </div>
                    <div className='form-group'>
                        <input type='submit' value='Update Product' className='btn btn-primary' />
                    </div>
                </form>
            </div>
        );
    }
}

export { editProduct };