import React, { Component } from 'react';
import { Text, ScrollView, FlatList, View, Image,StyleSheet } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        testOptions: state.testOptions
    }
}

class Home extends Component {



    static navigationOptions = {
        title: 'Home'
    };

    render() {

        const renderTestOptionsItem = ({ item, index }) => {
            return (
                <ListItem
                    key={index}
                    title={
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                        }}>
                            {item.name}
                        </Text>
                    }
                    subtitle={item.description}
                />
            );
        }
        if (this.props.testOptions.isLoading) {
            return (
                <ScrollView>
                    
                    <Card title='Neuroscience and Sleep Medicine'>
                        <View style={styles.CardContainer}>
                        <Text></Text>
                            <Image  style={styles.image} source={require('./images/Acrcredited.png')} />
    
                            <Text style={{ margin: 10 }}>
                                MultiCare Sleep Medicine serving out community in Pierce and King counties.Our Centers staffed by board certified physicians and registered technologists, who conduct a variety of sleep studies to diagnose and treat all sleep disorders.
                            </Text>
                        </View>
                        <Loading />
                    </Card>
                </ScrollView>
            );
        }

        else if (this.props.testOptions.errMess) {
            return (
                <ScrollView>
                    <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                        
                        <Card title='Neuroscience and Sleep Medicine'>
                        <View style={styles.CardContainer}>
                        <Text></Text>
                            <Image  style={styles.image} source={require('./images/Acrcredited.png')} />
    
                            <Text style={{ margin: 10 }}>
                                MultiCare Sleep Medicine serving out community in Pierce and King counties.Our Centers staffed by board certified physicians and registered technologists, who conduct a variety of sleep studies to diagnose and treat all sleep disorders.
                            </Text>
                        </View>
                            <Text>{this.props.testOptions.errMess}</Text>
                        </Card>
                    </Animatable.View>
                </ScrollView>
            );
        }
        else{
            return (
                <ScrollView>
                    <Card title='Neuroscience and Sleep Medicine'>
                    
                        <View style={styles.CardContainer}>
                        <Text></Text>
                            <Image  style={styles.image} source={require('./images/Acrcredited.png')} />
    
                            <Text style={{ margin: 10 }}>
                                MultiCare Sleep Medicine serving out community in Pierce and King counties.Our Centers staffed by board certified physicians and registered technologists, who conduct a variety of sleep studies to diagnose and treat all sleep disorders.
                            </Text>
                        </View>
                        
                        <Animatable.View animation="fadeInUp" duration={1000} delay={300}>
                        <FlatList
                            data={this.props.testOptions.testOptions}
                            renderItem={renderTestOptionsItem}
                            keyExtractor={item => item.id.toString()}
                        />
                        </Animatable.View>
                    </Card>
                </ScrollView>
            );
        }
      
    }
}


const styles = StyleSheet.create({
    CardContainer: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 30,
        marginRight: 30,
        
        justifyContent: 'center',
        
        
    },
    image: {
        marginTop:15,
        width: 80,
        height: 100
       
    }
        
});

export default connect(mapStateToProps)(Home);