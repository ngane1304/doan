import { View, Text, TextInput, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as Icon from "react-native-feather";
import { themeColors } from '../theme';
import Categories from '../components/categories';
import FeaturedRow from '../components/featuredRow';
import { getFeaturedRestaurants } from '../api';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import 'react-native-url-polyfill/auto';

export default function HomeScreen() {

    const [featuredRestaurants, setFeaturedCRestaurants] = useState([])
    const navigation = useNavigation();
    useEffect(()=>{
        getFeaturedRestaurants().then(data =>{
            setFeaturedCRestaurants(data);
        })
    },[])

    return (
      <SafeAreaView style={{ backgroundColor: 'white' }}> 
        <StatusBar barStyle="dark-content"/>
        {/* tìm kiếm nhà hàng */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 5, paddingBottom: 2 }}>
              <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', padding: 10, borderRadius: 999, borderWidth: 1, borderColor: 'gray' }}>
                  <Icon.Search height={25} width={25} stroke="gray" />
                  <TextInput placeholder='Tìm kiếm nhà hàng' style={{ marginLeft: 2, flex: 1 }} keyboardType='default' />
                  <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 0, borderLeftWidth: 2, paddingLeft: 5, borderLeftColor: 'gray' }}>
                      <Icon.MapPin height={25} width={25} stroke="gray" />
                      <Text style={{ color: 'gray' }}>TP.HCM</Text>
                  </View>
              </View>
              <View style={{ backgroundColor: themeColors.bgColor(1), padding: 6, borderRadius: 999,}}>
                  <Icon.Sliders height={30} width={30} strokeWidth={2} stroke="white" />
              </View>
        </View>

        {/* Main */}
        <ScrollView showsVerticalScrollIndicator={false} 
        contentContainerStyle={{
            paddingBottom: 20
        }}>

            {/* categories */}
            <Categories />

            {/* featured */}
            <View
            style={{marginTop: 5}}>
                {
                    featuredRestaurants.map((item, index) => (
                        <FeaturedRow
                            key={index}
                            title={item.name}
                            restaurants={item.restaurants}
                            description={item.description} />
                    ))                      
                }
            </View>
        </ScrollView>

      </SafeAreaView>
    )
  }
  