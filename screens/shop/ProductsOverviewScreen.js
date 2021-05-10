import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import {Button, FlatList, StyleSheet, Platform, View} from 'react-native';
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from '../../store/actions/cart';
import HeaderButton from "../../components/ui/HeaderButton";
import Colors from "../../constants/Colors";


const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  const selectItemHandler = (id, title) => {
    props.navigation.navigate({
      routeName: 'ProductDetails',
      params: {
        productId: id,
        productTitle: title
      }
    })
  }

  return (
    <FlatList
      data={products}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.image}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => selectItemHandler(itemData.item.id, itemData.item.title)}
        >
          <Button color={Colors.primary} className={styles.button} title="View Details" onPress={() => selectItemHandler(itemData.item.id, itemData.item.title)} />
          <Button color={Colors.primary} className={styles.button} title="Add To Cart" onPress={() => dispatch(cartActions.addToCart(itemData.item))} />
        </ProductItem>
      )}
      keyExtractor={item => item.id}
    />
  )
};

ProductsOverviewScreen.navigationOptions = ({ navigation }) => ({
  title: 'Products Overview',
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title='cart'
        iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
        onPress={() => navigation.navigate({ routeName: 'Cart' })}
      />
    </HeaderButtons>
  ),
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title='menu'
        iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
        onPress={() => navigation.toggleDrawer()}
      />
    </HeaderButtons>
  )
})

const styles = StyleSheet.create({

});

export default ProductsOverviewScreen;
