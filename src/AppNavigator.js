import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import WelcomePage from './Components/WelcomePage/WelcomePage';
import HomePage from './Components/HomePage/HomePage';
import RoutineContainer from './Components/RoutineContainer/RoutineContainer'

const rootStack = createStackNavigator({
  homePage:  { screen: HomePage },
  routinePage:  { screen: RoutineContainer }
  },
  {
    initialRouteName: "homePage"
  }
);

const AppNavigator = createAppContainer(
  createSwitchNavigator({
    welcomePage: WelcomePage,
    MainApp: rootStack
  },
  {
    initialRouteName: "welcomePage"
  }
  )
);

export default AppNavigator;