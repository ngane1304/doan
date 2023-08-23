import { View, Text, TouchableOpacity, Image, ScrollView} from 'react-native'
import React, { useEffect, useState } from 'react'
import { featured } from '../constants'
import * as Icon from "react-native-feather";
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { selectRestaurant } from '../slices/restaurantSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../slices/cartSlice';
import { selectCartItems } from '../slices/cartSlice';
import { selectCartTotal } from '../slices/cartSlice';
import { urlFor } from '../sanity';

export default function CartScreen() {
    const restaurant = useSelector(selectRestaurant);
    const navigation = useNavigation(); 
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    const [groupedItems, setGroupedItems] = useState({});
    const dispatch = useDispatch();
    const deliveryFee = 30;
    
    useEffect(() => {
      const items = cartItems.reduce((group, item) => {
       if (group[item.id]) {
           group[item.id].push(item);
       } else{
        group[item.id] = [item];
       }
       return group;
      },{})
    setGroupedItems(items);
    },[cartItems])
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          {/* top button */}
          <View style={{ position: 'relative', paddingTop: 16, paddingBottom: 8, shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2 }}>
            <TouchableOpacity style={{ position: 'absolute', zIndex: 10, top: 24, left: 16, borderRadius: 999, padding: 6, shadowRadius: 5, backgroundColor: themeColors.bgColor(1) }} onPress={navigation.goBack}>
              <Icon.ArrowLeft strokeWidth={3} stroke="white" />
            </TouchableOpacity>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>Giỏ hàng của bạn</Text>
              <Text style={{ color: 'gray', textAlign: 'center' }}>{restaurant.name}</Text>
            </View>
          </View>
    
          {/* delivery time */}  
          <View style={{ backgroundColor: themeColors.bgColor(0.2), flexDirection: 'row', paddingHorizontal: 16, alignItems: 'center', marginTop: 8 }}>
            <Image source={require('../assets/images/bikeGuy.png')} style={{ width: 80, height: 80, borderRadius: 999 }} />
            <Text style={{ flex: 1, paddingLeft: 16 }}>Được giao hàng trong vòng 20-30 phút</Text>
            <TouchableOpacity>
              <Text style={{ color: themeColors.text, fontWeight: 'bold' }}>Thay đổi</Text>
            </TouchableOpacity>
          </View>
    
          {/* dishes */}
          <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: 'white', paddingTop: 20, paddingBottom: 70 }}>
            {
                Object.entries(groupedItems).map(([key, items]) => {
                    const dish = items[0]; 
                    return(
                        <View key={key} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 8, backgroundColor: 'white', borderRadius: 16, marginHorizontal: 8, marginBottom: 12, shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2 }}>
                        <Text style={{ color: themeColors.text, fontWeight: 'bold' }}> {items.length} x </Text>
                        <Image style={{ width: 56, height: 56, borderRadius: 999 }} source={{uri: urlFor(dish.image).url()}} />
                        <Text style={{ flex: 1, fontWeight: 'bold', color: 'gray' }}>{dish.name}</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>₫{dish.price}.000</Text>
                        <TouchableOpacity 
                        onPress={() =>  dispatch(removeFromCart({id: dish._id}))}
                        style={{ padding: 6, borderRadius: 999, backgroundColor: themeColors.bgColor(1) }} >
                          <Icon.Minus strokeWidth={2} height={20} width={20} stroke="white" />
                        </TouchableOpacity>
                      </View>
                    )
                }) 
            }
          </ScrollView>
    
          {/* totals */}
          <View style={{ backgroundColor: themeColors.bgColor(0.2), padding: 24, paddingHorizontal: 32, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
              <Text style={{ color: 'gray' }}>Tổng tiền hàng</Text>
              <Text style={{ color: 'gray' }}>₫{cartTotal}.000</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
              <Text style={{ color: 'gray' }}>Tổng tiền phí vận chuyển</Text>
              <Text style={{ color: 'gray' }}>₫{deliveryFee}.000</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
              <Text style={{ fontWeight: 'bold' }}>Tổng thanh toán</Text>
              <Text style={{ fontWeight: 'bold' }}>₫{deliveryFee+cartTotal}.000</Text>
            </View>
            <View>
              <TouchableOpacity style={{ backgroundColor: themeColors.bgColor(1), padding: 12, borderRadius: 999 }} onPress={() => navigation.navigate('OrderPreparing')}>
                <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>Nơi vận chuyển</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
} 