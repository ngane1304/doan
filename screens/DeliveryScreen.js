import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { featured } from '../constants';
import { useNavigation } from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import * as Icon from "react-native-feather";
import { themeColors } from '../theme';
import { setRestaurant } from '../slices/restaurantSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { emptyCart } from '../slices/cartSlice';

export default function DeliveryScreen() {
    const restaurants = useSelector(setRestaurant);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const cancelOrder = () => {
        navigation.navigate('Home');
        dispatch(emptyCart());
    }
    return (
        <View style={{ flex: 1 }}>
          <MapView
            initialRegion={{
              latitude: restaurants.lat,
              longitude: restaurants.lng,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            style={{ flex: 1 }}
            mapType = 'standard'
          >
            <Marker
              coordinate={{
                latitude: restaurants.lat,
                longitude: restaurants.lng,
              }}
              title={restaurants.title}
              description={restaurants.description}
              pinColor={themeColors.bgColor(1)}
            />
          </MapView>
    
          <View style={{ flex: 0.33, backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingTop: 40, marginTop: -70, paddingTop: 24  }}>
          <TouchableOpacity style={{ position: 'absolute', right: 10, top: 10 }}>
              {/* Nội dung bên trong TouchableOpacity */}
            </TouchableOpacity>
    
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
              <View>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'gray' }}>Ước tính đến nơi</Text>
                <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'gray' }}>20-30 phút</Text>
                <Text style={{ marginTop: 10, fontWeight: 'bold', color: 'gray' }}>Đơn đặt hàng của bạn đang đến</Text>
              </View>
              <Image style={{ height: 80, width: 80 }} source={require('../assets/images/bikeGuy2.gif')} />
            </View>
    
            <View style={{ backgroundColor: 'rgba(0,0,0,0.8)', padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10, marginHorizontal: 10, borderRadius: 9999 }}>
              <View style={{ backgroundColor: 'rgba(255,255,255,0.4)', padding: 2, borderRadius: 9999 }}>
                <Image style={{ width: 80, height: 80, borderRadius: 9999 }} source={require('../assets/images/deliveryGuy.png')} />
              </View>
    
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Quang Tươi</Text>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Người vận chuyển của bạn</Text>
              </View>
    
              <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                <TouchableOpacity style={{ backgroundColor: 'white', padding: 10, borderRadius: 9999 }}>
                  {/* Nút điện thoại */}
                  <Icon.Phone fill={themeColors.bgColor(1)} stroke={themeColors.bgColor(1)} strokeWidth={1}></Icon.Phone>
                </TouchableOpacity>
    
                <TouchableOpacity onPress={cancelOrder} style={{ backgroundColor: 'white', padding: 10, borderRadius: 9999 }}>
                  {/* Nút hủy bỏ */}
                  <Icon.X stroke ={'red'} strokeWidth={4}></Icon.X>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      );
}