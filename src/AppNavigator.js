import { createStackNavigator, createAppContainer } from 'react-navigation';
import WelcomePage from './Components/WelcomePage/WelcomePage';
import HomePage from './Components/HomePage/HomePage';

const RootStack = createStackNavigator({
  welcomePage: { screen: WelcomePage },
  homePage: { screen: HomePage }
});

const AppNavigator = createAppContainer(RootStack);

export default AppNavigator;