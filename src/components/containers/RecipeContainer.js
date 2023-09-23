import { Button, Text } from '@rneui/themed'
import { StyleSheet, View } from 'react-native'

const RecipeContainer = ({ navigation, route }) => {
  const { label, uri } = route.params

  return (
    <View style={styles.recipeContainer}>
      <View style={styles.recipeContainerItem}>
        <Text>{label}</Text>
      </View>
      <View style={styles.recipeContainerItem}>
        <Button
          type='outline'
          onPress={() => {
            navigation.navigate('Web', {
              label,
              uri
            })
          }}
        >
          View Online
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  recipeContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 50,
    paddingRight: 50
  },
  recipeContainerItem: {
    marginBottom: 20,
    marginTop: 20
  }
})

export default RecipeContainer
