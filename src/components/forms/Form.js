import { Button, Input } from '@rneui/themed'
import { StyleSheet, View } from 'react-native'

const Form = props => {
  const { onInputChange, onSubmit } = props
  return (
    <View style={styles.formContainer}>
      <View style={{ ...styles.formtItems, ...styles.input }}>
        <Input
          label='Ingredient Search'
          placeholder='Beef, pork, chicken etc.'
          onChangeText={value => onInputChange(value)}
        />
      </View>
      <View style={styles.formItems}>
        <Button color='primary' type='solid' onPress={onSubmit}>
          Search
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    marginTop: 20
  },
  formtItems: {
    display: 'inline-flex'
  },
  input: {
    width: '65%'
  }
})

export default Form
