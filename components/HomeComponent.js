import React, { Component } from 'react';
import { Text, ScrollView, FlatList, View, Image,StyleSheet } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';

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
                    <FlatList
                        data={this.props.testOptions.testOptions}
                        renderItem={renderTestOptionsItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </Card>

            </ScrollView>
        );
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