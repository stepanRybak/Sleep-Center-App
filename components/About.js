import React, { Component } from 'react';
import { View, Text} from 'react-native';

class About extends Component {



    static navigationOptions = {
        title: 'About Us'
    };

    render() {

        
        return (
            <View>
                <Text>This is About Us Component</Text>
            </View>
        );
    }
}

export default About;