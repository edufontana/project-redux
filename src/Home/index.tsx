import React, {useEffect, useState} from 'react';
import {Container, Text} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import api from '../services/api';
import {IcartItems, ICartState, IProduct} from '../store/modules/cart/types';
import {Button, View} from 'react-native';
import {AddProductToCartRequest} from '../store/modules/cart/actions';
import {IState} from '../store';

export function Home() {
  const [catalog, setCatalog] = useState<IProduct[]>([]);

  const dispatch = useDispatch();
  const cartr = useSelector<IState, IcartItems[]>(state => state.cart.items);

  const handleAddItem = (r: IProduct) => {
    dispatch(AddProductToCartRequest(r));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('products');

        setCatalog(response.data);
      } catch (r) {
        console.log(r);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      {catalog.map(r => (
        <View key={r.id} style={{flexDirection: 'row', marginTop: 10}}>
          <Text>{r.title}</Text>
          <Text> - </Text>
          <Text>{r.price} </Text>
          <Text> </Text>
          <Button
            title="Comprar"
            onPress={() => {
              handleAddItem(r);
            }}
          />
        </View>
      ))}

      <View style={{marginTop: 30, flexDirection: 'row'}}>
        <Text>Produto</Text>
        <Text>Preço</Text>
        <Text>Quantidade</Text>
        <Text>Subtotal</Text>
      </View>
      {cartr.map(r => (
        <View key={r.product.id} style={{flexDirection: 'row', marginTop: 10}}>
          <View style={{flexDirection: 'row'}}>
            <Text>{r.product.title}</Text>
            <Text>{r.product.price}</Text>
            <Text>{r.quantity}</Text>
            <Text>{(r.product.price * r.quantity).toFixed(2)}</Text>
          </View>
        </View>
      ))}
    </Container>
  );
}
