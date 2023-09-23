import { Button, Card, Text } from '@rneui/themed'
import { StyleSheet } from 'react-native'

const RecipeCard = props => {
  const { image, label, source, uri, navigation } = props

  return (
    <Card>
      <Card.Title>{label}</Card.Title>
      <Card.Divider />
      <Card.Image style={styles.image} source={{ uri: image }} />
      <Text style={styles.text}>{source}</Text>
      <Button
        buttonStyle={{
          borderRadius: 0,
          marginTop: 10
        }}
        title='View'
        type='outline'
        onPress={() => {
          navigation.navigate('Show', {
            label,
            uri
          })
        }}
      />
    </Card>
  )
}

const styles = StyleSheet.create({
  image: {
    padding: 0
  },
  text: {
    marginTop: 10
  }
})

export default RecipeCard
