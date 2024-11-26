import "./global.css"
import { StatusBar } from 'expo-status-bar'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import { Redirect, router } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"

import { images } from "../constants"
import CustomButton from "@/components/CustomButton"

export default function App() {

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full justify-center items-center h-full px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5 max-w-[350px] w-full">
            <Text className="text-4xl text-white font-bold text-center">Discover Endless Possibilities with {""}
              <View className="relative mt-[36px]"><Text className="text-secondary-200 font-bold text-4xl mt-2">Aora</Text><Image
                source={images.path}
                className="w-[125px] h-[15px] absolute -bottom-4 -right-8"
                resizeMode="contain"
              /></View>
            </Text>


          </View>
          <Text className="mt-7 text-sm font-pregular text-gray-100 text-center">Where Creativity meets innovation: embark on a journey of limitless exploration with Aora</Text>

          <CustomButton title="Continue with Email" handlePress={() => router.push("/sign-in")} containerStyles="w-full mt-7" />
        </View>
      </ScrollView>

      <StatusBar style="light" backgroundColor="#161622" />
    </SafeAreaView>
  )
}
