import { useState } from 'react'
import Form from '../forms/Form'
import { getRecipes } from '../../services/api'
import Loading from '../layout/Loading'
import RecipesList from '../lists/RecipesList'

const recipesResponse = [
  {
    image:
      'https://edamam-product-images.s3.amazonaws.com/web-img/207/2074a28ff50eba58d79304c9296438a1.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLWVhc3QtMSJGMEQCIDT158CCZJ93kZ9DNWob6iymcIf16dfw5OS4ewUtz19KAiArZ4wdlrDIBHKHo9SqmmsSo9cBx709UX%2B3UWj5jRs21iq5BQg2EAAaDDE4NzAxNzE1MDk4NiIMaYLWZWZRVc2qy2z1KpYF%2FyBzYtF9ulJQ4GzEPtiBKxByL16%2FNXjP3ZguRO8vdNFkW4Krn63yFqBs33muyBhfJD1xdRFl3GWe0adi5wa3lvl3HdPQPfUW%2BvdFnN77mBR76g2DeJ7QcbRlcQSZ4Z%2Bv8BHnPETTQWtWlqM6bIbCiVdRzosGyeQVhyWwNWUjtERyUShTpGe5pLZmIdpAhXNyC%2FomM7lc0DkLe%2FGHqzNxjK2TidlPMrvjY9JnGr8Nr5sjABv%2BbhCGIv8D4Sob5%2FyNA8inULJ5kLq7BVYNEjceNRcom%2BMrnz37%2FBn%2F%2FfBA50bu%2Fwg8QZepdwJpjUdbATjNoJM2MWtCxkfRxMW9hTyATJgr%2BlpLTDM4CjXpEGRmMSumxZalGg4ahrxOp9tbcCN9UVdkQ4V9KfLUT%2F9xlmWTlXdoLHtLXsyCcSKi9ofl2lQqwvMrLOAJzLQ3c9M23%2F4Kb7HH7e0JCWVLA4MHL%2F%2BTv%2BoY%2FPG7wdhf%2B%2FiU14OqVYSQbJ3fcbQZknjfqy%2FXvwE1o1kFKaWj3njwqBU8xRuf50YFfDjH7mcuQ6OWFDQqF9BRAofFHPkdMCseOa6L8ChGh430o1cJdk%2Bpc%2Bh0ZOaawtPNl8NovlQsC4bvo8ZnH0gimS38ur9cTJfREwq547p1RwhnfZdhn7PyTE6GcWugnGyhj5ShNaX7c%2F%2FXCo5umfdZEHW%2FQrHcP55SoRjw34Ey13E%2BLOLS%2BNh7BNGWM8OwYTDQsbsnfslrysu7qt8t4Gf36Dmat0G1S4l4zrW%2Fhj3Tkm%2BJcbcx8JbUDw3OAPbCFyl%2BunskwF8FiE1KuNLfOZsONlVUuk7Lx32X39MfSK9%2BUveSp841%2Bc9CzbJ0xu7cIpQRxkVM6ogJ00UMCXnsxUmwgnc2G0Yw4p29qAY6sgGK%2BbQPLacXEwRW1Vx79OX9R%2BifT4RObwcUGdpKutczN78aZKmWWLINSK%2FZyZdMtg299wAZ%2B1orz1q%2FoqoR1EJscyCcMc3VCnFNC4lSbVvoMZFzwEVKmj%2F3Xu0c1eTwvy3daqPbJbwgktX2tF%2BAWa4VbCjGqQFIz0xFlx9%2BEsnlkNrTfliE%2BHLe4mbgiGHOu324gJihz%2B55ohWgoIYLqSfeKqzmtJ9QyCASGzttVWQjrvGZ&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230923T220214Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFD2ER4TYH%2F20230923%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=a17d418520507edf2fffdfd41259ae2940b8bd42a04db7ca05e66928cdf1e34a',
    label: 'Roast sirloin of beef',
    source: 'BBC Good Food',
    uri: 'http://www.edamam.com/ontologies/edamam.owl#recipe_7eb3edfc916ebf0e4b028c8e5c04b81a'
  },
  {
    image:
      'https://edamam-product-images.s3.amazonaws.com/web-img/ad3/ad35ae4c847dcd39bad104838007f84a.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLWVhc3QtMSJGMEQCIDT158CCZJ93kZ9DNWob6iymcIf16dfw5OS4ewUtz19KAiArZ4wdlrDIBHKHo9SqmmsSo9cBx709UX%2B3UWj5jRs21iq5BQg2EAAaDDE4NzAxNzE1MDk4NiIMaYLWZWZRVc2qy2z1KpYF%2FyBzYtF9ulJQ4GzEPtiBKxByL16%2FNXjP3ZguRO8vdNFkW4Krn63yFqBs33muyBhfJD1xdRFl3GWe0adi5wa3lvl3HdPQPfUW%2BvdFnN77mBR76g2DeJ7QcbRlcQSZ4Z%2Bv8BHnPETTQWtWlqM6bIbCiVdRzosGyeQVhyWwNWUjtERyUShTpGe5pLZmIdpAhXNyC%2FomM7lc0DkLe%2FGHqzNxjK2TidlPMrvjY9JnGr8Nr5sjABv%2BbhCGIv8D4Sob5%2FyNA8inULJ5kLq7BVYNEjceNRcom%2BMrnz37%2FBn%2F%2FfBA50bu%2Fwg8QZepdwJpjUdbATjNoJM2MWtCxkfRxMW9hTyATJgr%2BlpLTDM4CjXpEGRmMSumxZalGg4ahrxOp9tbcCN9UVdkQ4V9KfLUT%2F9xlmWTlXdoLHtLXsyCcSKi9ofl2lQqwvMrLOAJzLQ3c9M23%2F4Kb7HH7e0JCWVLA4MHL%2F%2BTv%2BoY%2FPG7wdhf%2B%2FiU14OqVYSQbJ3fcbQZknjfqy%2FXvwE1o1kFKaWj3njwqBU8xRuf50YFfDjH7mcuQ6OWFDQqF9BRAofFHPkdMCseOa6L8ChGh430o1cJdk%2Bpc%2Bh0ZOaawtPNl8NovlQsC4bvo8ZnH0gimS38ur9cTJfREwq547p1RwhnfZdhn7PyTE6GcWugnGyhj5ShNaX7c%2F%2FXCo5umfdZEHW%2FQrHcP55SoRjw34Ey13E%2BLOLS%2BNh7BNGWM8OwYTDQsbsnfslrysu7qt8t4Gf36Dmat0G1S4l4zrW%2Fhj3Tkm%2BJcbcx8JbUDw3OAPbCFyl%2BunskwF8FiE1KuNLfOZsONlVUuk7Lx32X39MfSK9%2BUveSp841%2Bc9CzbJ0xu7cIpQRxkVM6ogJ00UMCXnsxUmwgnc2G0Yw4p29qAY6sgGK%2BbQPLacXEwRW1Vx79OX9R%2BifT4RObwcUGdpKutczN78aZKmWWLINSK%2FZyZdMtg299wAZ%2B1orz1q%2FoqoR1EJscyCcMc3VCnFNC4lSbVvoMZFzwEVKmj%2F3Xu0c1eTwvy3daqPbJbwgktX2tF%2BAWa4VbCjGqQFIz0xFlx9%2BEsnlkNrTfliE%2BHLe4mbgiGHOu324gJihz%2B55ohWgoIYLqSfeKqzmtJ9QyCASGzttVWQjrvGZ&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230923T220214Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFD2ER4TYH%2F20230923%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=b7daffaa131c9cb2ebd33f74715a1cbf1176bf4ab9da5f8f58973329c7361ae9',
    label: 'Beef Tea',
    source: 'Epicurious',
    uri: 'http://www.edamam.com/ontologies/edamam.owl#recipe_0f3a359371750f372c7ac3c1459751d9'
  },
  {
    image:
      'https://edamam-product-images.s3.amazonaws.com/web-img/219/219b9268b0f84eecf0cab133498b7ef3.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLWVhc3QtMSJGMEQCIDT158CCZJ93kZ9DNWob6iymcIf16dfw5OS4ewUtz19KAiArZ4wdlrDIBHKHo9SqmmsSo9cBx709UX%2B3UWj5jRs21iq5BQg2EAAaDDE4NzAxNzE1MDk4NiIMaYLWZWZRVc2qy2z1KpYF%2FyBzYtF9ulJQ4GzEPtiBKxByL16%2FNXjP3ZguRO8vdNFkW4Krn63yFqBs33muyBhfJD1xdRFl3GWe0adi5wa3lvl3HdPQPfUW%2BvdFnN77mBR76g2DeJ7QcbRlcQSZ4Z%2Bv8BHnPETTQWtWlqM6bIbCiVdRzosGyeQVhyWwNWUjtERyUShTpGe5pLZmIdpAhXNyC%2FomM7lc0DkLe%2FGHqzNxjK2TidlPMrvjY9JnGr8Nr5sjABv%2BbhCGIv8D4Sob5%2FyNA8inULJ5kLq7BVYNEjceNRcom%2BMrnz37%2FBn%2F%2FfBA50bu%2Fwg8QZepdwJpjUdbATjNoJM2MWtCxkfRxMW9hTyATJgr%2BlpLTDM4CjXpEGRmMSumxZalGg4ahrxOp9tbcCN9UVdkQ4V9KfLUT%2F9xlmWTlXdoLHtLXsyCcSKi9ofl2lQqwvMrLOAJzLQ3c9M23%2F4Kb7HH7e0JCWVLA4MHL%2F%2BTv%2BoY%2FPG7wdhf%2B%2FiU14OqVYSQbJ3fcbQZknjfqy%2FXvwE1o1kFKaWj3njwqBU8xRuf50YFfDjH7mcuQ6OWFDQqF9BRAofFHPkdMCseOa6L8ChGh430o1cJdk%2Bpc%2Bh0ZOaawtPNl8NovlQsC4bvo8ZnH0gimS38ur9cTJfREwq547p1RwhnfZdhn7PyTE6GcWugnGyhj5ShNaX7c%2F%2FXCo5umfdZEHW%2FQrHcP55SoRjw34Ey13E%2BLOLS%2BNh7BNGWM8OwYTDQsbsnfslrysu7qt8t4Gf36Dmat0G1S4l4zrW%2Fhj3Tkm%2BJcbcx8JbUDw3OAPbCFyl%2BunskwF8FiE1KuNLfOZsONlVUuk7Lx32X39MfSK9%2BUveSp841%2Bc9CzbJ0xu7cIpQRxkVM6ogJ00UMCXnsxUmwgnc2G0Yw4p29qAY6sgGK%2BbQPLacXEwRW1Vx79OX9R%2BifT4RObwcUGdpKutczN78aZKmWWLINSK%2FZyZdMtg299wAZ%2B1orz1q%2FoqoR1EJscyCcMc3VCnFNC4lSbVvoMZFzwEVKmj%2F3Xu0c1eTwvy3daqPbJbwgktX2tF%2BAWa4VbCjGqQFIz0xFlx9%2BEsnlkNrTfliE%2BHLe4mbgiGHOu324gJihz%2B55ohWgoIYLqSfeKqzmtJ9QyCASGzttVWQjrvGZ&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230923T220214Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3599&X-Amz-Credential=ASIASXCYXIIFD2ER4TYH%2F20230923%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=cb278da0566b4dfff4b92175ac962648ecb27f7160c27d037420a0fcb70b576f',
    label: 'Beef Tacos',
    source: 'No Recipes',
    uri: 'http://www.edamam.com/ontologies/edamam.owl#recipe_321f22ade4bdf65d6166eca828bb53fc'
  },
  {
    image:
      'https://edamam-product-images.s3.amazonaws.com/web-img/deb/debce0693c8d8a6988af80e1f94e4c4c.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLWVhc3QtMSJGMEQCIDT158CCZJ93kZ9DNWob6iymcIf16dfw5OS4ewUtz19KAiArZ4wdlrDIBHKHo9SqmmsSo9cBx709UX%2B3UWj5jRs21iq5BQg2EAAaDDE4NzAxNzE1MDk4NiIMaYLWZWZRVc2qy2z1KpYF%2FyBzYtF9ulJQ4GzEPtiBKxByL16%2FNXjP3ZguRO8vdNFkW4Krn63yFqBs33muyBhfJD1xdRFl3GWe0adi5wa3lvl3HdPQPfUW%2BvdFnN77mBR76g2DeJ7QcbRlcQSZ4Z%2Bv8BHnPETTQWtWlqM6bIbCiVdRzosGyeQVhyWwNWUjtERyUShTpGe5pLZmIdpAhXNyC%2FomM7lc0DkLe%2FGHqzNxjK2TidlPMrvjY9JnGr8Nr5sjABv%2BbhCGIv8D4Sob5%2FyNA8inULJ5kLq7BVYNEjceNRcom%2BMrnz37%2FBn%2F%2FfBA50bu%2Fwg8QZepdwJpjUdbATjNoJM2MWtCxkfRxMW9hTyATJgr%2BlpLTDM4CjXpEGRmMSumxZalGg4ahrxOp9tbcCN9UVdkQ4V9KfLUT%2F9xlmWTlXdoLHtLXsyCcSKi9ofl2lQqwvMrLOAJzLQ3c9M23%2F4Kb7HH7e0JCWVLA4MHL%2F%2BTv%2BoY%2FPG7wdhf%2B%2FiU14OqVYSQbJ3fcbQZknjfqy%2FXvwE1o1kFKaWj3njwqBU8xRuf50YFfDjH7mcuQ6OWFDQqF9BRAofFHPkdMCseOa6L8ChGh430o1cJdk%2Bpc%2Bh0ZOaawtPNl8NovlQsC4bvo8ZnH0gimS38ur9cTJfREwq547p1RwhnfZdhn7PyTE6GcWugnGyhj5ShNaX7c%2F%2FXCo5umfdZEHW%2FQrHcP55SoRjw34Ey13E%2BLOLS%2BNh7BNGWM8OwYTDQsbsnfslrysu7qt8t4Gf36Dmat0G1S4l4zrW%2Fhj3Tkm%2BJcbcx8JbUDw3OAPbCFyl%2BunskwF8FiE1KuNLfOZsONlVUuk7Lx32X39MfSK9%2BUveSp841%2Bc9CzbJ0xu7cIpQRxkVM6ogJ00UMCXnsxUmwgnc2G0Yw4p29qAY6sgGK%2BbQPLacXEwRW1Vx79OX9R%2BifT4RObwcUGdpKutczN78aZKmWWLINSK%2FZyZdMtg299wAZ%2B1orz1q%2FoqoR1EJscyCcMc3VCnFNC4lSbVvoMZFzwEVKmj%2F3Xu0c1eTwvy3daqPbJbwgktX2tF%2BAWa4VbCjGqQFIz0xFlx9%2BEsnlkNrTfliE%2BHLe4mbgiGHOu324gJihz%2B55ohWgoIYLqSfeKqzmtJ9QyCASGzttVWQjrvGZ&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230923T220214Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFD2ER4TYH%2F20230923%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=e8e89c0bf354712e9996f143f8ccf938bd316a2994fd32cd383f9f6e8d5d5ec3',
    label: 'Beef Brisket',
    source: 'Simply Recipes',
    uri: 'http://www.edamam.com/ontolo[gies/edamam.owl#recipe_710678b0fae9d4fa004975ef91aae1a3'
  }
]

const RecipesContainer = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [ingredient, setIngredient] = useState(null)
  const [recipes, setRecipes] = useState([])

  const { navigation } = props

  const fetchRecipes = () => {
    setIsLoading(true)

    // getRecipes(ingredient).then(
    //   recipes => {
    //     setRecipes(recipes)
    //     setIsLoading(false)
    //   },
    //   error => {
    //     alert('Error', `Something went wrong! ${error}`)
    //   }
    // )

    setRecipes(recipesResponse)
    setIsLoading(false)
  }

  const handleInputChange = ingredient => {
    setIngredient(ingredient)
  }

  return (
    <>
      <Form onInputChange={handleInputChange} onSubmit={fetchRecipes} />
      {isLoading ? <Loading /> : <RecipesList navigation={navigation} recipes={recipes} />}
    </>
  )
}

export default RecipesContainer
