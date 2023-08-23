import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import DishRow from '../components/dishRow';
import * as Icon from "react-native-feather";
import { themeColors } from '../theme';
import Cartlcon from '../components/cartlcon';
import { StatusBar } from 'expo-status-bar';
import { setRestaurant } from '../slices/restaurantSlice';
import { useDispatch } from 'react-redux';
import 'react-native-url-polyfill/auto';
import { urlFor } from '../sanity';

export default function RestaurantScreen() {
    const { params } = useRoute();
    const navigation = useNavigation();
    let item = params;
    const dispatch = useDispatch();
    useEffect(()=> {
        if(item && item._id) {
            dispatch(setRestaurant({...item}));
        }
    },[])
    return (
      <>
        <Cartlcon />
        <StatusBar style="light" />
        <ScrollView>
          <View style={{ position: 'relative' }}>
            <Image style={{ width: '100%', height: 288 }} source={{uri: urlFor(item.image).url()}} />
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ position: 'absolute', top: 56, left: 16, backgroundColor: 'white', padding: 8, borderRadius: 999, shadowColor: 'gray', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, elevation: 5 }}>
              <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} />
            </TouchableOpacity>
          </View>
          <View style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40, backgroundColor: 'white', marginTop: -64, paddingTop: 24 }}>
            <View style={{ paddingHorizontal: 16 }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{item.name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, marginBottom: 16 }}>
                <Image source={require('../assets/images/fullStar.png')} style={{ width: 16, height: 16, marginRight: 4 }} />
                <Text style={{ fontSize: 12, color: 'green', fontWeight: 'bold' }}>{item.stars}</Text>
                <Text style={{ fontSize: 12, color: 'gray' }}> ({item.reviews} Đánh giá)</Text>
                <Text style={{ fontSize: 12, color: 'gray', fontWeight: 'bold' }}> · {item?.type?.name}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
            <Icon.MapPin color="gray" width={15} height={15} />
            <Text style={{ fontSize: 12, color: 'gray' }}> {item.address}</Text>
          </View>
              <Text style={{ fontSize: 14, color: 'gray' }}>{item.description}</Text>
            </View>
          </View>
          <View style={{ paddingBottom: 80, backgroundColor: 'white' }}>
            <Text style={{ fontSize: 32, fontWeight: 'bold', paddingHorizontal: 16, paddingTop: 16 }}>Menu</Text>
            {/* dishes */}
              {
                item.dishes && item.dishes.map((dish, index) => <DishRow item={{...dish}} key={index}/>)
            }
          </View>
        </ScrollView>
      </>
    );
  }