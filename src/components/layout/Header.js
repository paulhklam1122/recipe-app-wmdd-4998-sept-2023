import { Header as HeaderRNE } from '@rneui/themed'

const Header = () => {
  return (
    <HeaderRNE
      backgroundColor='#2c3e50'
      centerComponent={{
        text: 'Recipe App',
        style: { color: '#fff', fontSize: 18 }
      }}
    />
  )
}

export default Header
