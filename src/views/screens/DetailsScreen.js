import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import {SecondaryButton} from '../components/Button';

const DetailsScreen = ({navigation, route}) => {
  const item = route.params;
  const AddtoCart = (data) => {
    const itemcart = {
      food: data,
      quantity: 1,
      price: data.price,
    };
    AsyncStorage.getItem('cart')
      .then((datacart) => {
        if (datacart !== null) {
          const Cart = JSON.parse(datacart);

          Cart.push(itemcart);
          AsyncStorage.setItem('cart', JSON.stringify(Cart));
          navigation.navigate('Cart');
        } else {
          const Cart = [];
          Cart.push(itemcart);
          AsyncStorage.setItem('cart', JSON.stringify(Cart));
          navigation.navigate('Cart');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white}}>
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Details</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 280,
          }}>
          <Image
            source={{uri: 'http://10.0.2.2:3010/images/' + item.image}}
            style={{height: 220, width: 220}}
            resizeMode="contain"
          />
        </View>
        <View style={style.details}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              numberOfLines={2}
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: COLORS.white,
                width: 300,
              }}>
              {item.name}
            </Text>
            <View style={style.iconContainer}>
              <Icon name="favorite-border" color={COLORS.primary} size={25} />
            </View>
          </View>
          <Text style={style.detailsText}>{item.mota}</Text>
          <View style={{marginTop: 40, marginBottom: 40}}>
            <SecondaryButton
              title="Add To Cart"
              onPress={() => AddtoCart(item)}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  details: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  iconContainer: {
    backgroundColor: COLORS.white,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  detailsText: {
    marginTop: 10,
    lineHeight: 22,
    fontSize: 16,

    color: COLORS.white,
  },
});

export default DetailsScreen;
