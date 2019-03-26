import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, StyleSheet, Button } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postComment } from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
        centers: state.centers,
        comments: state.comments,
    }
}

const mapDispatchToProps = dispatch => ({
    postComment: (CenterId, author, comment, rating) => dispatch(postComment(CenterId, author, comment, rating))
})

function RenderComments(props) {

    const comments = props.comments;

    const renderCommentItem = ({ item, index }) => {
        return (
            <View key={index} style={{ margin: 10 }} >
                <Rating
                    imageSize={20}
                    readonly
                    startingValue={+item.rating} ></Rating>
                <Text style={{ fontSize: 14 }}>{item.comment}</Text>

                <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + item.date}</Text>


            </View>

        );
    }

    return (
        <ScrollView >
            <Card title='Comments'>
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()} />
            </Card>
        </ScrollView>
    );
}



function RenderCenter(props) {

    const center = props.center;


    if (center != null) {
        return (
            <ScrollView>
                <Card
                    featuredTitle={center.name}
                    image={{ uri: baseUrl + center.image }}>
                    <Text >
                        {center.description}
                    </Text>
                    <Text style={{ margin: 10 }}>{center.address}</Text>
                    <Text style={{ fontWeight: 'bold' }}>Please fill out Sleep Questionnaire  and/or leave your review below:</Text>
                    <View style={styles.formRow}>
                        <Icon style={styles.formItem}
                            raised
                            reverse
                            name="pencil"
                            type='font-awesome'
                            color='#512DA8'
                            onPress={() => props.onShow('showModal')}
                        />

                        <Icon style={styles.formItem}
                            raised
                            reverse
                            name="tasks"
                            type='font-awesome'
                            onPress={() => props.onShow('showModalTwo')}
                        />

                    </View>
                </Card>
            </ScrollView>
        );
    }
    else {
        return (<View></View>);
    }
}


/*class Questionnaire extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prescriptions: []
        };
    }
        render() {
            return(
                {this.state.prescriptions.map()}
            );


        }
    }*/



class CenterDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            author: '',
            comment: '',
            rating: 3,
            showModal: false,
            showModalTwo: false,
            prescriptions: []

        };
    }



    handleComments(CenterId) {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
        this.props.postComment(CenterId, this.state.author, this.state.comment, this.state.rating);
    }

    resetForm() {
        this.setState({
            author: '',
            comment: '',
            rating: 3,
            showModal: false,
            showModalTwo: false
        });
    }

    toggleModal(modalName) {
        console.log(modalName)
        this.setState({
            [modalName]: !this.state[modalName],
        });
        console.log(this.state)
    }


    static navigationOptions = {
        title: 'Sleep Center Details'
    };

    render() {
        const CenterId = this.props.navigation.getParam('CenterId', '');
        return (
            <ScrollView>
                <RenderCenter center={this.props.centers.centers[+CenterId]}
                    onShow={(name) => this.toggleModal(name)}
                    />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.CenterId === CenterId)} />
                <Modal
                    visible={this.state.showModalTwo}
                    onDismiss={() => { this.toggleModal('showModalTwo'); this.resetForm() }}
                    onRequestClose={() => { this.toggleModal('showModalTwo'); this.resetForm() }}
                >
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Your Medications</Text>
                        {this.state.prescriptions.map((item,index)=>{
                        var currentPrescription=this.state.prescriptions[index]
                        return(
                        <View key={index}>
                            <Input
                                placeholder='Type your meds here'
                                leftIcon={{ type: 'font-awesome', name: 'check' }}
                                value={currentPrescription.name} 
                                onChangeText={(event)=>{
                                currentPrescription.name=event.value
                                var pre = [...this.state.prescriptions]
                                pre[index] = currentPrescription
                                this.setState({prescriptions:pre})
                                console.log(this.state.prescriptions)
                                }
                            }/>
                         </View>)
                        })}
                        <Button onPress={()=>this.setState({prescriptions:this.state.prescriptions.concat({name:""})})}
                        
                        title='Add..' />


                    </View>

                    <Button
                        onPress={() => { this.toggleModal('showModalTwo'); this.resetForm() }}

                        color="black"
                        title="Close"
                    />
                </Modal>
    {/* this is comments modal*/ }   
                <Modal animationType={'slide'} transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => { this.toggleModal('showModal'); this.resetForm() }}
                    onRequestClose={() => { this.toggleModal('showModal'); this.resetForm() }} >
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Please Leave Your Review</Text>
                        <Rating showRating fractions={0} startingValue={this.state.rating}
                            onFinishRating={(value) => this.setState({ rating: value })}
                        />
                        <Input
                            placeholder='Author'
                            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                            onChangeText={(value) => this.setState({ author: value })}
                        />
                        <Input
                            placeholder='Comment'
                            leftIcon={{ type: 'font-awesome', name: 'comments-o' }}
                            onChangeText={(value) => this.setState({ comment: value })}
                        />

                        <Button style={{ backgroundColor: 'red' }} textStyle={{ fontSize: 18 }}
                            onPress={() => this.handleComments(CenterId)}
                            //onSubmit={(values) => this.handleSubmit(values)}
                            raised

                            bacgroundcolor="#512DA8"
                            title="Submit"
                        />
                        <Button
                            onPress={() => { this.toggleModal(); this.resetForm() }}

                            color="black"
                            title="Close"
                        />
                    </View>
                </Modal>
            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },

    formLabel: {
        fontSize: 18,
        flex: 2
    },

    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: '#383b3f',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    },

    button: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(CenterDetail);