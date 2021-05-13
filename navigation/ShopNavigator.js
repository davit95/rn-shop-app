import React from 'react';
import { Platform, SafeAreaView, Button, View } from "react-native";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import { createStackNavigator } from 'react-navigation-stack';
import {createDrawerNavigator, DrawerNavigatorItems} from 'react-navigation-drawer';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import UserProductScreen from "../screens/user/UserProductScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";
import StartupScreen from "../screens/StartupScreen";

import CartScreen from "../screens/shop/CartScreen";
import Colors from "../constants/Colors";

import * as authActions from '../store/actions/auth';

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
  },
  contentComponent: props => {
    const dispatch = useDispatch();
    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
          <DrawerNavigatorItems {...props} />
          <Button title='Logout' color={Colors.primary} onPress={() => {
            dispatch(authActions.logout());
            // props.navigation.navigate('Auth');
          }} />
        </SafeAreaView>
      </View>
    )
  }
})

const AuthNavigator = createStackNavigator({
  Auth: {
    screen: AuthScreen
  }
}, {
  defaultNavigationOptions
})

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator
})

export default createAppContainer(MainNavigator);

