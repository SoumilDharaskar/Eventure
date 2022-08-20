import { StatusBar } from 'expo-status-bar'
import { Platform, useColorScheme, View } from 'react-native'
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer
} from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  StackNavigationProp,
  createStackNavigator
} from '@react-navigation/stack'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  CogIcon,
  QrcodeIcon,
  UserCircleIcon
} from 'react-native-heroicons/outline'
import { CalendarIcon } from 'react-native-heroicons/solid'

import { NavigationParams } from './lib/Navigation'
import Main from './pages/Events'
import SettingsScreen from './pages/Settings'
import ScanScreen from './pages/Scan'
import ProfileScreen from './pages/Profile'
import EventScreen from './pages/EventPage'

const MainStack = createNativeStackNavigator()
function MainStackScreen() {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerLargeTitle: true
      }}>
      <MainStack.Screen name="Events" component={Main} />
    </MainStack.Navigator>
  )
}

const Tab = createBottomTabNavigator<NavigationParams>()

// type PlatformProps = {
//   navigation: StackNavigationProp<NavigationParams, 'Platform'>
// }

function PlatformPage() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#6366f1',
        tabBarStyle: Platform.OS === 'android' ? { paddingBottom: 6 } : {}
      }}>
      <Tab.Screen
        name="Main"
        component={MainStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <CalendarIcon color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="Scan"
        component={ScanScreen}
        options={{
          title: '',
          tabBarIcon: ({ focused, size }) => (
            <View
              style={{
                borderRadius: 999,
                backgroundColor: focused ? '#4338ca' : '#6366f1',
                padding: 15
              }}>
              <QrcodeIcon color="#eef2ff" size={size + 6} />
            </View>
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <UserCircleIcon color={color} size={size} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

const Stack = createStackNavigator<NavigationParams>()

export default function App() {
  const scheme = useColorScheme()

  return (
    <>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator
          screenOptions={{
            headerBackTitle: 'Back'
          }}>
          <Stack.Screen
            name="Platform"
            component={PlatformPage}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen
            name="EventPage"
            component={EventScreen}
            options={({ route }) => ({ title: route.params.name })}
          />
        </Stack.Navigator>
      </NavigationContainer>

      <StatusBar style="auto" />
    </>
  )
}
