import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import { View, Text, StyleSheet, Image, Button, ScrollView } from 'react-native';
import Colors from "../../constants/Colors";
import * as cartActions from '../../store/actions/cart';

const ProductDetailScreen = props => {
  const productId = props.navigation.getParam('productId');
  const products = useSelector(state => state.products.availableProducts);
  const selectedProduct = products.find(product => product.id === productId);

  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.image }} />
      <View style={styles.actions}>
        <Button
          style={styles.button}
          title="Add To Cart"
          onPress={() => dispatch(cartActions.addToCart(selectedProduct))}
          color={Colors.primary}
        />
      </View>
      <View style={styles.details}>
        <Text style={styles.price}>
          {selectedProduct.price.toFixed(2)}
        </Text>
        <Text style={styles.description}>
          {selectedProduct.description}
        </Text>
      </View>
    </ScrollView>
  )
}

ProductDetailScreen.navigationOptions = ({ navigation }) => {
  const productTitle = navigation.getParam('productTitle');
  return {
    title: productTitle
  }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300
  },
  actions: {
    alignItems: 'center',
    paddingVertical: 10
  },
  details: {
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'open-sans-bold'
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
    fontFamily: 'open-sans'
  }
});

export default ProductDetailScreen;
