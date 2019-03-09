import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Tile } from "react-native-elements";
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import { ScrollView } from 'react-native-gesture-handler';

const mapStateToProps = state => {
    return {
        centers: state.centers
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

        if (this.props.centers.isLoading) {
            return (
                <Loading />
            );
        }
        else if (this.props.centers.errMess) {
            return (
                <View>
                    <Text>{props.centers.errMess}</Text>
                </View>
            );
        }

        else {
            return (
                <FlatList
                    data={this.props.centers.centers}
                    renderItem={renderLocationsItem}
                    keyExtractor={item => item.id.toString()}
                />
            );
        }
    }

}

export default connect(mapStateToProps)(Locations);