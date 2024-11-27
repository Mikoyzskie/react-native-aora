import { View, Text, TextInput, TouchableOpacity, Image, KeyboardTypeOptions } from 'react-native'
import React, { useState } from 'react'

import { icons } from "../constants"

type FormFieldProps = {
  title: string;
  value: string;
  placeholder?: string;
  handleChangeText: (e: string) => void;
  otherStyles: string;
  keyboardType?: KeyboardTypeOptions;
}

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, keyboardType, ...props }: FormFieldProps) => {

  const [showPassword, setShowPassword] = useState(false)
  const [focus, setFocus] = useState(false)

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-gray-100 font-pmedium'>{title}</Text>

      <View className={`border-2 border-black-200  w-full h-16 px-4 bg-black-100 rounded-2xl items-center flex-row ${focus && 'border-secondary'}`}>
        <TextInput
          className='flex-1 text-white font-psemibold text-base w-full'
          value={value}
          placeholder={placeholder}
          placeholderTextColor={"#7b7b8b"}
          onChangeText={handleChangeText}
          selectionColor={"#FF9C01"}
          secureTextEntry={title === "Password" && !showPassword}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          keyboardType={keyboardType ? keyboardType : 'default'}
        />


        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className='w-6 h-6 ml-4'
              resizeMode='contain'
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField