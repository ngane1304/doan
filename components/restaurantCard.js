import { View, Text, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { themeColors } from '../theme';
import * as Icon from "react-native-feather";
import { useNavigation } from '@react-navigation/native';
import { urlFor } from '../sanity';
import 'react-native-url-polyfill/auto';

export default function RestaurantCard({item}) {
  const navigation = useNavigation();
  console.log('item', item);
  return (
    <TouchableWithoutFeedback
    onPress={() => navigation.navigate('Restaurant', {...item})}
    >
      <View style={{ shadowColor: themeColors.bgColor(0.2), shadowRadius: 7, marginRight: 6, backgroundColor: 'white', borderRadius: 24, shadowOpacity: 0.8 }}>
        <Image style={{ height: 144, width: 256, borderTopLeftRadius: 24, borderTopRightRadius: 24 }} source={{uri: urlFor(item.image).url()}} />

        <View style={{ paddingHorizontal: 12, paddingBottom: 16, paddingTop: 8 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', paddingTop: 2 }}>{item.name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
            <Image source={require('../assets/images/fullStar.png')} style={{ height: 16, width: 16, marginRight: 4 }} />
            <Text style={{ fontSize: 12, color: 'green', fontWeight: 'bold' }}>{item.stars}</Text>
            <Text style={{ fontSize: 12, color: 'gray' }}> ({item.reviews} Đánh giá)</Text>
            <Text style={{ fontSize: 12, color: 'gray', fontWeight: 'bold' }}> · {item?.type?.name}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
            <Icon.MapPin color="gray" width={15} height={15} />
            <Text style={{ fontSize: 12, color: 'gray' }}> {item.address}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

