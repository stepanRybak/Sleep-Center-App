import React, { Component } from 'react';
import { View, Text} from 'react-native';


class Home extends Component {



    static navigationOptions = {
        title: 'Home'
    };

    render() {

        
        return (
            <View>
                <Text>This is Homes skillet Component by Us</Text>
            </View>
        );
    }
}

export default Home;