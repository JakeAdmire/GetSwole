import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import WelcomePage from './Components/WelcomePage/WelcomePage';
import HomePage from './Components/HomePage/HomePage';
import RoutineContainer from './Components/RoutineContainer/RoutineContainer';
import RoutineDetails from './Components/RoutineDetails/RoutineDetails';


const rootStack = createStackNavigator({
  homePage:  { screen: HomePage },
  routinePage:  { screen: RoutineContainer },
  routineDetails: { screen: RoutineDetails }

}, { initialRouteName: "homePage" })

const AppNavigator = createAppContainer(

  createSwitchNavigator({
    welcomePage: WelcomePage,
    MainApp: rootStack
  }, { initialRouteName: 'welcomePage' })

)

export default AppNavigator;