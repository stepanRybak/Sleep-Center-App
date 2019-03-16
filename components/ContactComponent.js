import React, { Component } from 'react';
import { Card } from 'react-native-elements';
import {ScrollView, Text} from 'react-native';


class ContactUs extends Component {



    static navigationOptions = {
        title: 'Contact Us'
    };

    render() {

      
        return (
            <ScrollView>
            
                <Card
                    title='Contact Information'>
                    <Text style={{fontWeight:'bold',  margin: 10}}>Tacoma Sleep Center</Text>
                    <Text style={{ margin: 10 }}>
                    315 Martin Luther King Jr Way{"\n"}{"\n"}
                    Tacoma, WA 98405{"\n"}{"\n"}
                        HONG KONG{"\n"}{"\n"}
                        Tel: +253-403-4554{"\n"}{"\n"}
                        Fax: +253-403-4554{"\n"}{"\n"}
                
                     </Text>
                </Card>
            
        </ScrollView>
        );
    }
}

export default ContactUs;