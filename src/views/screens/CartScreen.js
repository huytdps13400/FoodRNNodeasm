import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import COLORS from '../../consts/colors';
import actions from '../../redux/actions';
import {PrimaryButton} from '../components/Button';
import {convertCurrency} from '../utils/helper';

const CartScreen = ({navigation}) => {
  const [dataFood, setDataFood] = useState([]);
  const [sumprice, setSumprice] = useState('');
  const [date, setDate] = useState(new Date());
  const [tokenusers, settokenusers] = useState('');

  AsyncStorage.getItem('tokenusers')
    .then((data) => settokenusers(JSON.parse(data)))
    .catch((err) => console.log(err));

  const dispatch = useDispatch();

  useEffect(() => {
    AsyncStorage.getItem('cart').then((cart) => {
      if (cart !== null) {
        setDataFood(JSON.parse(cart));
      }
    });
  }, [dataFood]);

  useEffect(() => {
    let sum = 0;

    for (let index = 0; index < dataFood.length; index++) {
      sum = sum + dataFood[index].price * dataFood[index].quantity;
      setSumprice(sum);
    }
  });

  const checkoutcart = (Cart) => {
    dispatch({type: actions.ADD_CART, datacart: Cart});
    AsyncStorage.setItem('cart', JSON.stringify([]));
    ToastAndroid.show('Signup Success', ToastAndroid.SHORT);
  };

  // add remove Cart
  const onclickcart = (index, type, dataFood) => {
    const Data = dataFood;
    let quantityindex = Data[index].quantity;

    if (type) {
      quantityindex = quantityindex + 1;
      Data[index].quantity = quantityindex;
      AsyncStorage.setItem('cart', JSON.stringify(Data));
    } else if (type == false && quantityindex >= 2) {
      quantityindex = quantityindex - 1;
      Data[index].quantity = quantityindex;
      AsyncStorage.setItem('cart', JSON.stringify(Data));
    } else if (type == false && quantityindex == 1) {
      Data.splice(index, 1);
      AsyncStorage.setItem('cart', JSON.stringify(Data));
      console.log('clean', Data);
    }
  };
  //renderItem CartCard
  const CartCard = ({item, index}) => {
    return (
      <View style={style.cartCard}>
        <Image
          resizeMode="cover"
          source={{uri: 'http://10.0.2.2:3010/images/' + item.food.image}}
          style={{height: 80, width: 80}}
        />
        <View
          style={{
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            flex: 1,
          }}>
          <Text numberOfLines={1} style={{fontWeight: 'bold', fontSize: 16}}>
            {item.food.name}
          </Text>
          <Text style={{fontSize: 13, color: COLORS.grey}}>
            {item.food._idCategory.name}
          </Text>
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>
            ${convertCurrency(item.price * item.quantity)}
          </Text>
        </View>
        <View style={{marginRight: 20, alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>
            {item.quantity}
          </Text>
          <View style={style.actionBtn}>
            <Pressable onPress={() => onclickcart(index, false, dataFood)}>
              <Icon name="remove" size={25} color={COLORS.white} />
            </Pressable>
            <Pressable onPress={() => onclickcart(index, true, dataFood)}>
              <Icon name="add" size={25} color={COLORS.white} />
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{backgroundColor: COLORS.white, flex: 1}}>
      <View style={style.header}>
        <Icons name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Cart</Text>
      </View>
      {dataFood.length > 0 ? (
        <>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={dataFood}
            keyExtractor={(item, index) => index.toString()}
            renderItem={CartCard}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 15,
              paddingHorizontal: 20,
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Total Price</Text>

            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              ${convertCurrency(sumprice)}
            </Text>
          </View>
          <View style={{marginHorizontal: 30, paddingBottom: 30}}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                checkoutcart({
                  foodbill: dataFood,
                  totalprice: sumprice,
                  _idUser: tokenusers,
                  published: date,
                })
              }>
              <View style={style.btnContainer}>
                <Text style={style.title}>CHECKOUT</Text>
              </View>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={{}}>
          <Image
            resizeMode="contain"
            style={{height: '100%', width: '100%'}}
            source={{
              uri:
                'https://assets.materialup.com/uploads/66fb8bdf-29db-40a2-996b-60f3192ea7f0/preview.png',
            }}
          />
        </View>
      )}
    </View>
  );
};
const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  cartCard: {
    height: 100,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  title: {color: COLORS.white, fontWeight: 'bold', fontSize: 18},
  btnContainer: {
    backgroundColor: COLORS.primary,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CartScreen;
