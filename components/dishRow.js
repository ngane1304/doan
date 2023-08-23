import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import * as Icon from "react-native-feather";
import { themeColors } from '../theme';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, selectCartItemsById } from '../slices/cartSlice';
import { urlFor } from '../sanity';
import 'react-native-url-polyfill/auto';

export default function DishRow({item}) {

    const dispatch = useDispatch();
    const totalItems = useSelector(state => selectCartItemsById(state, item._id));
 
    const handleIncrease = () => {
        dispatch (addToCart({...item}))
    }
    const handleDecrease = () => {
        dispatch(removeFromCart({id: item._id}))
    }
        
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 12, borderRadius: 16, shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, marginBottom: 12, marginLeft: 8, marginRight:8 }}>
          <Image style={{ height: 100, width: 100, borderRadius: 16 }} source={{uri: urlFor(item.image).url()}} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <View style={{ paddingLeft: 12 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.name}</Text>
              <Text style={{ color: 'gray' }}>{item.description}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 12, marginTop: 12 }}>
              <Text style={{ color: 'gray', fontSize: 16, fontWeight: 'bold' }}>₫{item.price}.000</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity 
                onPress={handleDecrease}
                disabled={!totalItems.length }
                style={{ padding: 4, borderRadius: 999, backgroundColor: themeColors.bgColor(1) }}>
                  <Icon.Minus strokeWidth={2} height={20} width={20} stroke="white" />
                </TouchableOpacity>
                <Text style={{ paddingHorizontal: 12 }}>{totalItems.length}</Text>
                <TouchableOpacity 
                   onPress={handleIncrease}
                   style={{ padding: 4, borderRadius: 999, backgroundColor: themeColors.bgColor(1) }}>
                  <Icon.Plus strokeWidth={2} height={20} width={20} stroke="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      );
}