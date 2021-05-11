import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Colors from "../../constants/Colors";
import CartItem from "./CartItem";
import Card from "../ui/Card";


const OrderItem = props => {
  const [showDetails, setShowDetails] = useState(false);
  const handleShowDetails = () => {
    setShowDetails(prev => !prev)
  }
  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button color={Colors.primary} title={showDetails ? 'Hide Details' : 'Show Details'} onPress={() => handleShowDetails()} />
      {
        showDetails && (
          <View style={styles.detailItems}>
            {
              props.items.map(item => <CartItem key={item.productId} quantity={item.quantity} amount={item.sum} title={item.productTitle} />)
            }
          </View>
        )
      }
    </Card>
  )
};


const styles = StyleSheet.create({
  orderItem: {
    padding: 10,
    margin: 20,
    alignItems: 'center'
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15
  },
  totalAmount: {
    fontFamily: 'open-sans-bold',
    fontSize: 16
  },
  date: {
    fontSize: 16,
    fontFamily: 'open-sans',
    color: '#888'
  },
  buttonContainer: {
    width: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },
  detailItems: {
    width: '100%'
  }
});

export default OrderItem;
