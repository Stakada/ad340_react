/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  Button,
  FlatList, 
  ActivityIndicator,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {StackNavigator} from 'react-navigation';



class HomeScreen extends React.Component{
    static navigationOptions = {
        title:'Home',
    };
    render(){
        const{navigate} = this.props.navigation;
        return(
            <View style={styles.container}>
                <Text onPress={()=>navigate('TrafficCamera')}> 
                    Go to TrafficCamera
                </Text>
            </View>
        
        )
    }
}

class TrafficCamera extends React.Component{
    constructor(props){
        super(props);
        this.state ={ isLoading: true}
    };
    
    static navigationOptions = {
        title:'TrafficCamera',
    };
    

    componentDidMount(){
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((response) =>{

        this.setState({
          isLoading: false,
          dataSource: response.Cameras,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }



  render(){
      const{navigate} = this.props.navigation;
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={
                ({item}) => <Text>{item.Description}, {item.ImageUrl}</Text> 
          }
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }


    
}

const NavigationApp = StackNavigator({
    Home: {screen: HomeScreen},
    TrafficCamera : { screen: TrafficCamera}
    });

export default class App extends React.Component {
    render(){
        return<NavigationApp />;
    }
}
    

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
    },
});
