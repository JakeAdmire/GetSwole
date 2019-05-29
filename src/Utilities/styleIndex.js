import React, { Component } from 'react';
import { Header, Input, Button, Icon } from 'react-native-elements';

export const palette = {
  backgroundColor: '#2D71A8',
  lightAccent: '#53CFFF',
  darkAccent: '#104D80',
  deepAccent: '#003562'
};

export const buttonDropShadow = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2, },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,
  // 
  elevation: 4
};

export const headerDropShadow = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 6, },
  shadowOpacity: 0.37,
  shadowRadius: 7.49,
  // 
  elevation: 12
}


export const welcomeText = (name) => {
    return  <Text style={{ fontFamily: 'raleway', fontSize: 24, color: palette.backgroundColor }}>Welcome, 
              <Text style={{ fontFamily: 'raleway-bold', color: palette.darkAccent }}> {name}</Text>
            </Text>
  }

export const flexibleHeader = (leftIcon, leftMethod, center, rightIcon, rightMethod) => {
  return <Header  leftComponent={{ icon: leftIcon, size: 30, color: palette.backgroundColor, onPress: leftMethod }}
                  centerComponent={center}
                  rightComponent={{ icon: rightIcon, color: palette.backgroundColor, onPress: rightMethod }}
                  containerStyle={{ ...headerDropShadow, backgroundColor: '#FFF' }} />
}

export const flexibleButton = (title, icon, id, method, iconSource) => {
  return <Button  buttonStyle=
                    {{
                      ...buttonDropShadow, 
                      backgroundColor: '#FFF', 
                      position: 'relative',
                      width: '100%', 
                      borderRadius: 10,
                    }}
                  title={title} 
                  titleStyle={{ fontFamily: 'raleway-bold', fontSize: 20, color: palette.darkAccent }} 
                  icon=
                    {{ 
                      name: icon, 
                      type: iconSource,
                      size: 25, 
                      iconStyle: {position: 'absolute', right: 10}, 
                      color: palette.darkAccent 
                    }}
                  iconContainerStyle={{ position: 'absolute', right: 0 }}
                  iconRight
                  testID={id}
                  onPress={method} />
}

export const flexibleInput = (color, error, onChange, icon, placeholder, id) => {
  return <Input inputContainerStyle=
                  {{
                    ...buttonDropShadow,
                    backgroundColor: '#FFF',
                    borderWidth: 2,
                    borderRadius: 50, 
                    borderColor: color
                  }}
                inputStyle={{ marginLeft: 5, color: palette.lightAccent }}
                errorMessage={error} 
                errorStyle={{ color: palette.deepAccent, paddingLeft: 10, fontFamily: 'raleway' }}
                onChangeText={onChange} 
                leftIcon={{ name: icon, color: color }}
                placeholder={placeholder}
                testID={id} />
}
