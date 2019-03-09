import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Tile } from "react-native-elements";
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import { ScrollView } from 'react-native-gesture-handler';

const mapStateToProps = state => {
    return {
        dishes: state.dishes
    }
}

class Locations extends Component {

    static navigationOptions = {
        title: 'Our Locations'
    };

    render() {

        const { navigate } = this.props.navigation;
        const renderLocationsItem = ({ item, index }) => {
            return (
                <ScrollView>
                    <Tile
                        key={index}
                        title={item.name}
                        caption={item.description}
                        featured
                        onPress={() => navigate('CenterDetail', { CenterId: item.id })}
                        imageSrc={{ uri: baseUrl + item.image }}
                    />
                </ScrollView>
            );
        }

        if (this.props.dishes.isLoading) {
            return (
                <Loading />
            );
        }
        else if (this.props.dishes.errMess) {
            return (
                <View>
                    <Text>{props.dishes.errMess}</Text>
                </View>
            );
        }

        else {
            return (
                <FlatList
                    data={this.props.dishes.dishes}
                    renderItem={renderLocationsItem}
                    keyExtractor={item => item.id.toString()}
                />
            );
        }
    }

}

export default connect(mapStateToProps)(Locations);