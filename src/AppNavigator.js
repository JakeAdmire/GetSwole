import { createStackNavigator, createAppContainer } from 'react-navigation';
import WelcomePage from './Components/WelcomePage/WelcomePage';
import HomePage from './Components/HomePage/HomePage';
import Routine from './Components/RoutineCreator/RoutineCreator'

const rootStack = createStackNavigator({
  welcomePage:  { screen: WelcomePage} ,
  homePage:  { screen: HomePage },
  routine:  { screen: Routine }
});

const AppNavigator = createAppContainer(rootStack);

export default AppNavigator;