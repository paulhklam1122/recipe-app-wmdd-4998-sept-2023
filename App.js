import { ThemeProvider, createTheme, lightColors, darkColors } from '@rneui/themed'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Header from './src/components/layout/Header'
import RecipesContainer from './src/components/containers/RecipesContainer'
import AppStack from './src/components/stacks/AppStack'

const theme = createTheme({
  lightColors: {
    ...Platform.select({
      default: lightColors.platform.android,
      ios: lightColors.platform.ios
    })
  },
  darkColors: {
    ...Platform.select({
      default: darkColors.platform.android,
      ios: darkColors.platform.ios
    })
  },
  mode: 'light'
})

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        {/* <Header /> */}
        {/* <RecipesContainer /> */}
        <AppStack />
        <StatusBar style='light' />
      </SafeAreaProvider>
    </ThemeProvider>
  )
}

export default App
