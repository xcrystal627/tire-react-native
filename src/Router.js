import { NavigationContainer } from '@react-navigation/native';
import CustomNavigationBar from './layout/CustomNavigationBar';
import CustomBottomNavigation from './layout/CustomBottomNavigation'

const Router = () =>{
    return (
        <NavigationContainer>
            <CustomNavigationBar />
            <CustomBottomNavigation/>
        </NavigationContainer>
    )
}

export default Router