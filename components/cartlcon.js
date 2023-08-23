import { View, Text, TouchableOpacity,} from 'react-native'
import React from 'react'
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { selectCartItems, selectCartTotal } from '../slices/cartSlice';
import { useSelector } from 'react-redux';

export default function Cartlcon() {
    const navigation = useNavigation();
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    if(!cartItems.length) return;
    return (
        <View style={{ position: 'absolute', bottom: 16, width: '100%', zIndex: 50 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Cart')}
            style={{ backgroundColor: themeColors.bgColor(1), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 16, borderRadius: 999, padding: 16, paddingBottom: 12, shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2 }}>
            <View style={{ paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.3)' }}>
              <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 16 }}>{cartItems.length}</Text>
            </View>
            <Text style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: 'white', fontSize: 16 }}>View Cart</Text>
            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 16 }}>₫{cartTotal}.000</Text>
          </TouchableOpacity>
        </View>
      )
}