import React from 'react';
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import { createAppContainer } from 'react-navigation';
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import UserProductScreen from "../screens/user/UserProductScreen";
import EditProductScreen from "../screens/user/EditProductScreen";

import CartScreen from "../screens/shop/CartScreen";
import Colors from "../constants/Colors";

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor:  Platform.OS === 'android' ? 'white' : Colors.primary
}

const ProductsNavigator = createStackNavigator({
  ProductsOverview: {
    screen: ProductsOverviewScreen
  },
  ProductDetails: {
    screen: ProductDetailScreen
  },
  Cart: {
    screen: CartScreen
  }
}, {
  navigationOptions: {
    drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} size={23} color={drawerConfig.tintColor} />
  },
  defaultNavigationOptions
});

const OrdersNavigator = createStackNavigator({
  Orders: {
    screen: OrdersScreen
  }
}, {
  navigationOptions: {
    drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android' ? 'md-list' : 'ios-list'} size={23} color={drawerConfig.tintColor} />
  },
  defaultNavigationOptions
});

const AdminNavigator = createStackNavigator({
  UserProducts: {
    screen: UserProductScreen
  },
  EditProduct: {
    screen: EditProductScreen
  }
}, {
  navigationOptions: {
    drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android' ? 'md-create' : 'ios-create'} size={23} color={drawerConfig.tintColor} />
  },
  defaultNavigationOptions
})

const ShopNavigator = createDrawerNavigator({
  Products: {
    screen: ProductsNavigator
  },
  Orders: {
    screen: OrdersNavigator
  },
  Admin: {
    screen: AdminNavigator,
  }
}, {
  contentOptions: {
    activeTintColor: Colors.primary
  }
})

export default createAppContainer(ShopNavigator);

