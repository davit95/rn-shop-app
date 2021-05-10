import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {View, Text, StyleSheet, Image, Button, FlatList, Platform} from 'react-native';
import Colors from "../../constants/Colors";
import * as cartActions from '../../store/actions/cart';
import * as orderActions from '../../store/actions/orders';
import CartItem from "../../components/shop/CartItem";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../../components/ui/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";

const OrdersScreen = props => {
  const availableOrders = useSelector(state => state.orders.orders);
  return (
    <FlatList
      data={availableOrders}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  )
}

OrdersScreen.navigationOptions = ({ navigation }) => {
  return {
    title: 'Your Orders',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='menu'
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => navigation.toggleDrawer()}
        />
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({

});

export default OrdersScreen;
