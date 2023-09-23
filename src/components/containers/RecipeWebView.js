import { Ionicons } from '@expo/vector-icons'
import { Button } from '@rneui/themed'
import { useLayoutEffect } from 'react'
import { Alert, Share } from 'react-native'
import WebView from 'react-native-webview'

const RecipeWebView = ({ navigation, route }) => {
  const { uri } = route.params

  const handleShare = async () => {
    try {
      await Share.share({
        content: { url: uri },
        message: `Sharing ${uri}`
      })
    } catch (error) {
      Alert.alert(error.message)
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button type='clear' onPress={handleShare}>
          <Ionicons name='ios-share-outline' size={25} />
        </Button>
      )
    })
    return () => {}
  }, [navigation])

  return <WebView source={{ uri }} />
}

export default RecipeWebView
