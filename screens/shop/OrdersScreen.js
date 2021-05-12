import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {StyleSheet, FlatList, Platform, View, ActivityIndicator} from 'react-native';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../../components/ui/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";
import * as ordersActions from '../../store/actions/orders';
import Colors from "../../constants/Colors";

const OrdersScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const availableOrders = useSelector(state => state.orders.orders);
  const dispatch = useDispatch();

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    await dispatch(ordersActions.fetchOrders());
    setIsLoading(false);
  }, [dispatch, setIsLoading]);

  useEffect(() => {
    fetchOrders()
  }, [dispatch, fetchOrders]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size={'large'} color={Colors.primary} />
      </View>
    )
  }

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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default OrdersScreen;
