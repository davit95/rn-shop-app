import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import {FlatList, StyleSheet, Platform, Button, Alert} from 'react-native';
import ProductItem from "../../components/shop/ProductItem";
import * as productActions from '../../store/actions/products';
import HeaderButton from "../../components/ui/HeaderButton";
import Colors from "../../constants/Colors";


const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.userProducts);
  const dispatch = useDispatch();

  const editProductHandler = id => {
    props.navigation.navigate({ routeName: 'EditProduct', params: { productId: id } })
  }

  const deleteHandler = (id) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      { text: 'Yes', style: 'destructive', onPress: () => { dispatch(productActions.deleteProduct(id)) } }
    ])
  }

  return (
    <FlatList
      data={products}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.image}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => editProductHandler(itemData.item.id)}
        >
          <Button color={Colors.primary} className={styles.button} title="Edit" onPress={() => editProductHandler(itemData.item.id)} />
          <Button color={Colors.primary} className={styles.button} title="Delete" onPress={() => deleteHandler(itemData.item.id)} />
        </ProductItem>
      )}
      keyExtractor={item => item.id}
    />
  )
};

ProductsOverviewScreen.navigationOptions = ({ navigation }) => ({
  title: 'Your Products',
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title='menu'
        iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
        onPress={() => navigation.toggleDrawer()}
      />
    </HeaderButtons>
  ),
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title='Add'
        iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
        onPress={() => navigation.navigate({ routeName: 'EditProduct' })}
      />
    </HeaderButtons>
  )
})

const styles = StyleSheet.create({

});

export default ProductsOverviewScreen;
