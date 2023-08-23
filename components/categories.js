import { View, Text, ScrollView, TouchableOpacity, Image} from 'react-native'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { getCategories } from '../api';
import { urlFor } from '../sanity';
import 'react-native-url-polyfill/auto';

export default function Categories() {
    const [activeCategory, setActiveCategory] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
      getCategories().then(data=>{
        setCategories(data);
      })
    }, [])
  
  
    return (
      <View style={{ marginTop: 4 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ overflowVisible: 'visible' }}
          contentContainerStyle={{ paddingHorizontal: 15 }}
        >
          {categories.map((category, index) => {
            const isActive = category._id === activeCategory;
            const btnClass = isActive ? { backgroundColor: 'white' } : { backgroundColor: 'gray' };
            const textClass = isActive ? { fontWeight: 'bold', color: 'gray' } : { color: 'gray' };
  
            return (
              <View key={index} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginRight: 30, marginTop: 10}}>
                <TouchableOpacity
                  onPress={() => setActiveCategory(category._id)}
                  style={{ padding: 5, borderRadius: 999, shadowColor: 'gray', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.5, ...btnClass }}
                >
                  <Image style={{ width: 45, height: 45 }} source={{uri: urlFor(category.image).url()}} />
                </TouchableOpacity>
                <Text style={{ fontSize: 13, ...textClass }}>{category.name}</Text>
              </View>
            )
          })}
        </ScrollView>
      </View>
    )
  }