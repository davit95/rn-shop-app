import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import {ScrollView, StyleSheet, Platform, View, Text, TextInput} from 'react-native';
import * as productActions from '../../store/actions/products';
import HeaderButton from "../../components/ui/HeaderButton";


const EditProductScreen = props => {
  const dispatch = useDispatch();
  const productId = props.navigation.getParam('productId');
  const editedProduct = useSelector(state => state.products.userProducts.find(product => product.id === productId));

  const [title, setTitle] = useState(editedProduct?.title || '');
  const [imageUrl, setImageUrl] = useState(editedProduct?.image || '');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState(editedProduct?.description || '');

  const submitHandler = useCallback(() => {
    if (editedProduct) {
      dispatch(productActions.updateProduct(productId, title, description, imageUrl))
    } else {
      dispatch(productActions.createProduct(title, description, imageUrl, +price));
    }
    props.navigation.goBack();
  }, [productId, title, description, imageUrl, dispatch, price])

  useEffect(() => {
    props.navigation.setParams({ 'submit': submitHandler })
  }, [submitHandler])

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput style={styles.input} value={title} onChangeText={setTitle} />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput style={styles.input} value={imageUrl} onChangeText={setImageUrl} />
        </View>
        {
          !editedProduct && (
            <View style={styles.formControl}>
              <Text style={styles.label}>Price</Text>
              <TextInput style={styles.input} value={price} onChangeText={setPrice} />
            </View>
          )
        }
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput style={styles.input} value={description} onChangeText={setDescription} />
        </View>
      </View>
    </ScrollView>
  )
};

EditProductScreen.navigationOptions = ({ navigation }) => {
  const submit = navigation.getParam('submit');
 return {
   title: navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
   headerRight: () => (
     <HeaderButtons HeaderButtonComponent={HeaderButton}>
       <Item
         title='Save'
         iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
         onPress={submit}
       />
     </HeaderButtons>
   )
 }
}

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  formControl: {
    width: '100%'
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  }
});

export default EditProductScreen;
