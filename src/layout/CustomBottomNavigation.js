import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';

import CheckScreen from '../pages/CheckScreen';
import CollectScreen from '../pages/CollectScreen';
import CancelScreen from '../pages/CancelScreen';
import HistoryScreen from '../pages/HistoryScreen';


const CustomBottomNavigation = () => {
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: 'collect', title: 'Collect', focusedIcon: 'widgets', unfocusedIcon: 'widgets-outline'},
    { key: 'check', title: 'Check', focusedIcon: 'eye-check', unfocusedIcon: 'eye-check-outline' },
    { key: 'cancel', title: 'Cancel', focusedIcon: 'flask-empty-remove', unfocusedIcon: "flask-empty-remove-outline" },
    { key: 'history', title: 'History', focusedIcon: 'clipboard-text-clock', unfocusedIcon: 'clipboard-text-clock-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    collect: CollectScreen,
    check: CheckScreen,
    cancel: CancelScreen,
    history: HistoryScreen,
  });


  const hadlePageChange = (index) =>{

    setIndex(index)
  }

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={hadlePageChange}
      renderScene={renderScene}
    />
  );
};

export default CustomBottomNavigation;