import React, { Component } from 'react';
import Home from './HomeComponent';
import Locations from './LocationsComponent';
import ContactUs from './ContactComponent';
import About from './About';
import CenterDetail from './CenterDetailComponent';
import { View, Platform, ScrollView,Text,Image,StyleSheet } from 'react-native';
import { createStackNavigator, createDrawerNavigator,DrawerItems, SafeAreaView } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchCenters, fetchComments, fetchLeaders, fetchOptions } from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
      centers: state.centers,
      comments: state.comments,
      leaders: state.leaders,
      testOptions: state.testOptions
    }
  }

  const mapDispatchToProps = dispatch => ({
    fetchCenters: () => dispatch(fetchCenters()),
    fetchComments: () => dispatch(fetchComments()),
    fetchLeaders: () => dispatch(fetchLeaders()),
    fetchOptions: ()=> dispatch(fetchOptions())
  })

const LocationsNavigator = createStackNavigator({
    Locations: { screen: Locations,
    navigationOptions: ({navigation}) =>({
        headerLeft : <Icon name='menu' size={24}
        color='white'
        onPress ={ ()=>navigation.toggleDrawer() }/>
    })
    },CenterDetail: { screen: CenterDetail}
    
},

    {
        initialRouteName: 'Locations',
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#2758a5"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff"
            }
        }
    }
);

const HomeNavigator = createStackNavigator({
    Home: { screen: Home }
}, {
        navigationOptions: ({navigation}) =>({
            headerStyle: {
                backgroundColor: "#2758a5"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff"
            },
            headerLeft : <Icon name='menu' size={24}
                color='white'
                onPress ={ ()=>navigation.toggleDrawer() }/>
        })
    });

const ContactUsNavigator = createStackNavigator({
    ContactUs: { screen: ContactUs }
}, {
        navigationOptions: ({navigation}) =>({
            headerStyle: {
                backgroundColor: "#2758a5"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff"
            },
            headerLeft : <Icon name='menu' size={24}
            color='white'
            onPress ={ ()=>navigation.toggleDrawer() }/>
        })
    });

const AboutNavigator = createStackNavigator({
    About: { screen: About }
}, {
        navigationOptions: ({navigation}) =>({
            headerStyle: {
                backgroundColor: "#2758a5"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff"
            },
            headerLeft : <Icon name='menu' size={24}
            color='white'
            onPress ={ ()=>navigation.toggleDrawer() }/>
        })
    });

    

const CustomDrawerContentComponent= (props) => (
    <ScrollView>
        <SafeAreaView  style={styles.container} forceInset={{top: 'always', horizontal: 'never'}}>
            <View style={styles.drawerHeader}>
                <View style={styles.drawerHeaderText} >
                
                <Text >MultCare </Text>
                 <Text >____________________________________________</Text>
                </View>
                <View style={{flex:2}}>
                    <Text style={styles.drawerHeaderText}>Neuroscience and Sleep Medicine</Text>
                </View>
            </View>
            <DrawerItems {...props}/>
        </SafeAreaView>
    </ScrollView>
)


const MainNavigator = createDrawerNavigator({
    Home: {
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawerLabel: 'Home',
            drawerIcon: ({tintColor, focused}) =>(
                <Icon 
                    name="home"
                    type= 'font-awesome'
                    size={24}
                    color={tintColor}/> 
                )
        }
    },

    About: {
        screen: AboutNavigator,
        navigationOptions: {
            title: 'About Us',
            drawerLabel: 'About Us',
            drawerIcon: ({tintColor, focused}) =>(
                <Icon 
                    name="info-circle"
                    type= 'font-awesome'
                    size={24}
                    color={tintColor}/> 
                )
        }
    },
    Locations: {
        screen: LocationsNavigator,
        navigationOptions: {
            title: 'Our Locations',
            drawerLabel: 'Our Locations',
            drawerIcon: ({tintColor, focused}) =>(
                <Icon 
                    name="list"
                    type= 'font-awesome'
                    size={24}
                    color={tintColor}/> 
                )
        }
    },
    ContactUs: {
        screen: ContactUsNavigator,
        navigationOptions: {
            title: 'Contact Us',
            drawerLabel: 'Contact Us',
            drawerIcon: ({tintColor, focused}) =>(
                <Icon 
                    name="address-card"
                    type= 'font-awesome'
                    size={24}
                    color={tintColor}/> 
                )
        }
    },

},
    { drawerBackgroundColor: '#d7e3f7', contentComponent:CustomDrawerContentComponent });


class Main extends Component {

    componentDidMount() {
        this.props.fetchLeaders();
        this.props.fetchComments();
        this.props.fetchCenters();
        this.props.fetchOptions();
        
        
      }

    render() {

        return (
            <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                <MainNavigator />
            </View>
        );
    }

}

const styles = StyleSheet.create({

    container:{
        flex:1
    },

    drawerHeader :{
        backgroundColor: '#2758a5',
        height: 140,
        alignItems: "center",
        justifyContent: 'center',
        flex: 1,
        flexDirection:'column'
    },
    drawerHeaderText:{
        margin:5,
        color:"white",
        fontSize : 24,
        fontWeight: 'bold'
    },

    drawerImage: {
        paddingTop:20,
        width:260,
        height: 40
    }

});

export default connect( mapStateToProps, mapDispatchToProps) (Main); 