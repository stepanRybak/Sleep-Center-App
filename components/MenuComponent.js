import React, { Component } from 'react';
import { View, Text} from 'react-native';

class Menu extends Component {



    static navigationOptions = {
        title: 'Menu'
    };

    render() {

        const { navigate } = this.props.navigation;
        return (
            <View>
                <Text>This is Menu Component</Text>
            </View>
        );
    }
}

export default Menu;