import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, StyleSheet, Button} from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import {postComment} from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
    }
}

const mapDispatchToProps = dispatch => ({
    postComment: (CenterId,author,comment, rating) => dispatch(postComment(CenterId,author,comment, rating))
})

function RenderComments(props) {

    const comments = props.comments;

    const renderCommentItem = ({ item, index }) => {
        return (
            <View key={index} style={{ margin: 10 }} >
             <Rating
                    imageSize={20}
                    readonly
                    startingValue={item.rating} ></Rating>
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

    const dish = props.dish;


    if (dish != null) {
        return (
            <ScrollView>
                <Card
                    featuredTitle={dish.name}
                    image={{ uri: baseUrl + dish.image }}>
                    <Text >
                        {dish.description}
                    </Text>
                    <Text style={{ margin: 10 }}>{dish.address}</Text>
                    <View style={styles.formRow}>
                        <Icon style={styles.formItem}
                            raised
                            reverse
                            name="pencil"
                            type='font-awesome'
                            color='#512DA8'
                            onPress={() => props.onShow()}
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




class CenterDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            author: '',
            comment: '',
            rating: 3,
            showModal: false
        };
    }



    handleComments(CenterId) {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
        this.props.postComment(CenterId,this.state.author,this.state.comment,this.state.rating);
    }

    resetForm() {
        this.setState({
            author: '',
            comment: '',
            rating: 1,
            showModal: false
        });
    }

    toggleModal() {
        this.setState({
            showModal: !this.state.showModal
        });
    }

    static navigationOptions = {
        title: 'Sleep Center Details'
    };

    render() {
        const CenterId = this.props.navigation.getParam('CenterId', '');
        return (
            <ScrollView>
                <RenderCenter dish={this.props.dishes.dishes[+CenterId]}
                    onShow={() => this.toggleModal()}
                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.CenterId === CenterId)} />
                <Modal animationType={'slide'} transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => { this.toggleModal(); this.resetForm() }}
                    onRequestClose={() => { this.toggleModal(); this.resetForm() }} >
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Please Leave Your Comment</Text>
                        <Rating showRating fractions="{1}" startingValue="{3}"
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

                        <Button style={{backgroundColor: 'red'}} textStyle={{fontSize: 18}}
                            onPress={() => this.handleComments(CenterId)}
                            //onSubmit={(values) => this.handleSubmit(values)}
                            raised
                            
                            bacgroundcolor="#512DA8"
                            title="Submit"
                        />
                        <Button
                            onPress={() => { this.toggleModal(); this.resetForm() }}

                            color="#512DA8"
                            title="Close"
                        />
                    </View>
                </Modal>
            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    formRow:{
        alignItems: 'center',
        justifyContent:'center',
        flex:1,
        flexDirection: 'row',
        margin:20
    },

    formLabel:{
        fontSize:18,
        flex:2
    },

    formItem: {
        flex:1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
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