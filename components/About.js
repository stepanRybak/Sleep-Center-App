import React, { Component } from 'react';
import { FlatList, ScrollView, Text } from 'react-native';
import { ListItem, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        leaders: state.leaders
    }
}

class About extends Component {

    static navigationOptions = {
        title: 'About Us'
    };

    render() {

        const { params } = this.props.navigation.state;

        const renderLeader = ({item, index}) => {

            return (
                <ListItem
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    leftAvatar={{source: {uri: baseUrl + item.image}}}
                    />
            );
        };

        if (this.props.leaders.isLoading) {
            return(
                <ScrollView>
                    <Card
                        title='Corporate Leadership'>
                        <Loading />
                    </Card>
                </ScrollView>
            );
        }
        else if (this.props.leaders.errMess) {
            return(
                <ScrollView>
                    <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                        <Card
                            title='Corporate Leadership'>
                        <Text>{this.props.leaders.errMess}</Text>
                        </Card>
                    </Animatable.View>
                </ScrollView>
            );
        }
        else {
            return(
                <ScrollView>
                    <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                        <Card
                            title='Corporate Leadership'>
                        <FlatList 
                            data={this.props.leaders.leaders}
                            renderItem={renderLeader}
                            keyExtractor={item => item.id.toString()}
                        />
                        </Card>
                    </Animatable.View>
                </ScrollView>
            );
        }
    }
};

export default connect(mapStateToProps)(About);

/*class About extends Component {

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
}*/

//export default About;