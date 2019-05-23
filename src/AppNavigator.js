import { createStackNavigator, createAppContainer } from 'react-navigation';
import WelcomePage from './Components/WelcomePage/WelcomePage';
import HomePage from './Components/HomePage/HomePage';
import RoutineContainer from './Components/RoutineContainer/RoutineContainer'

const rootStack = createStackNavigator({
  welcomePage:  { screen: WelcomePage} ,
  homePage:  { screen: HomePage },
  routinePage:  { screen: RoutineContainer }
});

const AppNavigator = createAppContainer(rootStack);

export default AppNavigator;