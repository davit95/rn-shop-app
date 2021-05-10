import PRODUCTS  from '../../data/dummy-data';
import {DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT} from "../actions/products";
import Product from "../../models/product";

const initialState = {
  availableProducts : PRODUCTS,
  userProducts      : PRODUCTS.filter(product => product.ownerId === 'u1')
}

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      const { productId } = action;
      return {
        ...state,
        userProducts: state.userProducts.filter(product => product.id !== productId),
        availableProducts: state.availableProducts.filter(product => product.id !== productId)
      }
    case CREATE_PRODUCT:
      const newProduct = new Product(
        new Date().toString(),
        'u1',
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      )
      return {
        ...state,
        userProducts: [...state.userProducts, newProduct],
        availableProducts: [...state.availableProducts, newProduct],
      }
    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(product => product.id === action.pid);
      const updatedProduct = new Product(
        action.pid,
        state.userProducts[productIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[productIndex].price
      );
      const updatedUserProducts = [ ...state.userProducts ];
      updatedUserProducts[productIndex] = updatedProduct;

      const availableProductIndex = state.availableProducts.findIndex(product => product.id === action.pid);
      const updatedAvailableProducts = [ ...state.availableProducts ];
      updatedAvailableProducts[availableProductIndex] = updatedProduct;

      return {
        ...state,
        userProducts: updatedUserProducts,
        availableProducts: updatedAvailableProducts,
      }
    default:
      return state;
  }
}

export default productsReducer;