/* eslint-disable react/prop-types */
import React from 'react';
import DropDown from './DropDown.jsx';
import AddToCart from './AddToCart.jsx';
import axios from 'axios';

class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styleSelected: '',
      skuSizeSelected: '',
      skuQuantSelected: 0,
      sku: 0,
      inCart: 0,
      cart: []
    }
    this.changeSKU = this.changeSKU.bind(this);
    this.changeQuant = this.changeQuant.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  changeSKU(size, style, sku) {
    this.setState({
      styleSelected: style,
      skuSizeSelected: size,
      sku: sku
    });
  }

  changeQuant(quant) {
    this.setState({
      skuQuantSelected: quant
    });
  }

  addItem(obj) {
    //probably have to add a cart component to this later
    var number = this.state.inCart + 1;
    var copy = this.state.cart.slice();
    copy.push(obj);

    axios.post('/cart', obj)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

    this.setState({
      inCart: number,
      cart: copy,
      styleSelected: '',
      skuSizeSelected: '',
      skuQuantSelected: 0,
      sku: 0
    })
  }



  render() {
    const { category, name, slogan, description, features} = this.props.descriptions;
    //console.log('thispropsstyle in descroption', this.props.style);
    const {styleSelected, skuSizeSelected, skuQuantSelected, sku} = this.state;
    return(
      <>
       <div className = 'describe'>
         <div className = 'category'>{category}</div>
         <h2 data-testid = 'header'>{name}</h2>
         <div>{this.props.styleItem}</div>
         <br></br>
         <div className = 'price'>${this.props.price}</div>
         <span>{this.props.salePrice}</span>
         <DropDown name = 'Select Size' style = {this.props.style} skus = {this.props.skus} callback = {this.changeSKU}/>
         <DropDown name = 'Quantity'  quant = {this.state.skuSizeSelected} callback = {this.changeQuant}/>
         <AddToCart className = 'addCart' style = {styleSelected} size = {skuSizeSelected} quantity = {skuQuantSelected} callback = {this.addItem} sku = {sku}/>
       </div>
       <div className = 'description'>
         <h3>{slogan}</h3>
         <p>{description}</p>
         <div>{features.map((item, index) => {
            return (
              <div key = {index}>{item.feature} {item.value}</div>
            )
          })}</div>
        </div>

      </>
    );
  }

}

export default Description;