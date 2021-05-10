import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import { View, Text, StyleSheet, Image, Button, FlatList } from 'react-native';
import Colors from "../../constants/Colors";
import * as cartActions from '../../store/actions/cart';
import * as orderActions from '../../store/actions/orders';
import CartItem from "../../components/shop/CartItem";
import Card from "../../components/ui/Card";

const CartScreen = props => {
  const dispatch = useDispatch();
  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum
      })
    }
    return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1);
  })
  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text>
        </Text>
        <Button
          color={Colors.accent}
          title="Order Now"
          disabled={cartItems.length === 0}
          onPress={() => dispatch(orderActions.addOrder(cartItems, cartTotalAmount))}
        />
      </Card>
      <FlatList
        data={cartItems}
        renderItem={({item}) => (
          <CartItem
            quantity={item.quantity}
            title={item.productTitle}
            amount={item.sum}
            deletable
            onRemove={() => dispatch(cartActions.removeFromCart(item.productId))}
          />
        )}
        keyExtractor={item => item.productId}
      />
    </View>
  )
}

CartScreen.navigationOptions = ({ navigation }) => {
  return {
    title: 'Your Cart'
  }
}

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 20
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18
  },
  amount: {
    color: Colors.accent
  },
  button: {
    // width: 30
  }
});

export default CartScreen;
