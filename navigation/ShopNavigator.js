import React from 'react';
import { Platform, SafeAreaView, Button, View } from "react-native";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator, DrawerItemList} from "@react-navigation/drawer";

import ProductsOverviewScreen, { screenOptions as productsOverviewScreenOptions } from "../screens/shop/ProductsOverviewScreen";
import OrdersScreen, { screenOptions as ordersScreenOptions } from "../screens/shop/OrdersScreen";
import ProductDetailScreen, { screenOptions as productDetailScreenOptions } from "../screens/shop/ProductDetailScreen";
import UserProductScreen, { screenOptions as userProductScreenOptions } from "../screens/user/UserProductScreen";
import EditProductScreen, { screenOptions as editProductScreenOptions } from "../screens/user/EditProductScreen";
import AuthScreen, { screenOptions as authScreenOptions } from "../screens/user/AuthScreen";
import StartupScreen from "../screens/StartupScreen";

import CartScreen, { screenOptions as cartScreenOptions } from "../screens/shop/CartScreen";
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

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <ProductsStackNavigator.Screen
        name='ProductsOverview'
        component={ProductsOverviewScreen}
        options={productsOverviewScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name='ProductDetails'
        component={ProductDetailScreen}
        options={productDetailScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name='Cart'
        component={CartScreen}
        options={cartScreenOptions}
      />
    </ProductsStackNavigator.Navigator>
  )
}

// const ProductsNavigator = createStackNavigator({
//   ProductsOverview: {
//     screen: ProductsOverviewScreen
//   },
//   ProductDetails: {
//     screen: ProductDetailScreen
//   },
//   Cart: {
//     screen: CartScreen
//   }
// }, {
//   navigationOptions: {
//     drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} size={23} color={drawerConfig.tintColor} />
//   },
//   defaultNavigationOptions
// });

const OrdersStackNavigator = createStackNavigator();

export const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <OrdersStackNavigator.Screen
        name='Orders'
        component={OrdersScreen}
        options={ordersScreenOptions}
      />
    </OrdersStackNavigator.Navigator>
  )
}
// const OrdersNavigator = createStackNavigator({
//   Orders: {
//     screen: OrdersScreen
//   }
// }, {
//   navigationOptions: {
//     drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android' ? 'md-list' : 'ios-list'} size={23} color={drawerConfig.tintColor} />
//   },
//   defaultNavigationOptions
// });

const AdminSTackNavigator = createStackNavigator();

export const AdminNavigator = () => {
  return (
    <AdminSTackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <AdminSTackNavigator.Screen
        name='UserProducts'
        component={UserProductScreen}
        options={userProductScreenOptions}
      />
      <AdminSTackNavigator.Screen
        name='EditProduct'
        component={EditProductScreen}
        options={editProductScreenOptions}
      />
    </AdminSTackNavigator.Navigator>
  )
}

//
// const AdminNavigator = createStackNavigator({
//   UserProducts: {
//     screen: UserProductScreen
//   },
//   EditProduct: {
//     screen: EditProductScreen
//   }
// }, {
//   navigationOptions: {
//     drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android' ? 'md-create' : 'ios-create'} size={23} color={drawerConfig.tintColor} />
//   },
//   defaultNavigationOptions
// })
//

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
  const dispatch = useDispatch();
  return (
    <ShopDrawerNavigator.Navigator
      drawerContent={props => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <DrawerItemList {...props} />
              <Button title='Logout' color={Colors.primary} onPress={() => {
                dispatch(authActions.logout());
                // props.navigation.navigate('Auth');
              }} />
            </SafeAreaView>
          </View>
        )
      }}
      drawerContentOptions={{ activeTintColor: Colors.primary }}
    >
      <ShopDrawerNavigator.Screen
        name='Products'
        component={ProductsNavigator}
        options={{
          drawerIcon: props => <Ionicons name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} size={23} color={props.color} />
        }}
      />
      <ShopDrawerNavigator.Screen
        name='Orders'
        component={OrdersNavigator}
        options={{
          drawerIcon: props => <Ionicons name={Platform.OS === 'android' ? 'md-list' : 'ios-list'} size={23} color={props.color} />
        }}
      />
      <ShopDrawerNavigator.Screen
        name='Admin'
        component={AdminNavigator}
        options={{
          drawerIcon: props => <Ionicons name={Platform.OS === 'android' ? 'md-create' : 'ios-create'} size={23} color={props.color} />
        }}
      />
    </ShopDrawerNavigator.Navigator>
  )
}
// const ShopNavigator = createDrawerNavigator({
//   Products: {
//     screen: ProductsNavigator
//   },
//   Orders: {
//     screen: OrdersNavigator
//   },
//   Admin: {
//     screen: AdminNavigator,
//   }
// }, {
//   contentOptions: {
//     activeTintColor: Colors.primary
//   },
//   contentComponent: props => {
//     const dispatch = useDispatch();
//     return (
//       <View style={{ flex: 1, paddingTop: 20 }}>
//         <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
//           <DrawerNavigatorItems {...props} />
//           <Button title='Logout' color={Colors.primary} onPress={() => {
//             dispatch(authActions.logout());
//             // props.navigation.navigate('Auth');
//           }} />
//         </SafeAreaView>
//       </View>
//     )
//   }
// })
//

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <AuthStackNavigator.Screen
        name='Auth'
        component={AuthScreen}
        options={authScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  )
}
// const AuthNavigator = createStackNavigator({
//   Auth: {
//     screen: AuthScreen
//   }
// }, {
//   defaultNavigationOptions
// })
//
// const MainNavigator = createSwitchNavigator({
//   Startup: StartupScreen,
//   Auth: AuthNavigator,
//   Shop: ShopNavigator
// })
//
// export default createAppContainer(MainNavigator);
//
