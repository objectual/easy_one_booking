import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image, Animated, TouchableOpacity, Alert, I18nManager } from 'react-native';

import styles from "./styles";

import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const AnimatedFontAwesome = Animated.createAnimatedComponent(FontAwesome);

let row = [];

export default class SwipeableList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleList: [],
            previousIndex: null
        }
    }

    componentDidMount() {
        const { articleList } = this.props
        this.setState({ articleList })
    }

    deleteArticle = (index) => {
        const { articleList } = this.props
        articleList.splice(index, 1);
        this.setState({ articleList })
        this.rowClose(index)
    };

    readMore = (index) => {
        Alert.alert('Message', `Development mode`);
        this.rowClose(index)
        // Alert.alert('Info', `Read More ${index + 1}`);
    };

    notifyMe = (index) => {
        Alert.alert('Notification', `Successfully sent.`);
        this.rowClose(index)
        // Alert.alert('Notification', `Successfully Sent ${index + 1}`);
    };

    renderSingleRightAction = (icon, color, onPress, width, index, progress, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [-80, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });

        const trans = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [width, 0],
        });

        return (
            <Animated.View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                transform: [{ translateX: trans }]
            }}>
                <RectButton
                    style={[styles.iconBtn, { backgroundColor: color, }]}
                    onPress={() => onPress(index)}
                >
                    <AnimatedFontAwesome name={icon} size={20} color="#fff" style={{ transform: [{ scale }] }} />
                </RectButton>
            </Animated.View>
        );
    };

    renderRightActions = (progress, dragX, index) => (
        <View style={{ width: 165, flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row' }}>
            {this.renderSingleRightAction('bars', '#C8C7CD', this.readMore, 165, index, progress, dragX)}
            {this.renderSingleRightAction('bell', '#ffab00', this.notifyMe, 110, index, progress, dragX)}
            {this.renderSingleRightAction('trash', '#dd2c00', this.deleteArticle, 55, index, progress, dragX)}
        </View>
    );

    // onSwipeFromLeft = () => {
    //     console.log('lefttttttttttttttttttttttt');
    // };

    // _renderLeftActions = (progress, dragX) => {
    //     const scale = dragX.interpolate({
    //         inputRange: [50, 100],
    //         outputRange: [0, 1],
    //         extrapolate: 'clamp',
    //     });
    //     return (
    //         <View
    //             style={{
    //                 backgroundColor: 'green',
    //                 justifyContent: 'center',
    //                 alignItems: 'flex-end',
    //             }}>
    //             <Animated.Text
    //                 style={[{ color: 'white', padding: 20 }, { transform: [{ scale }] }]}>
    //                 Add to cart
    //     </Animated.Text>
    //         </View>
    //     );
    // };

    rowClose = (index) => {
        if (Number.isInteger(index)) {
            row[index].close();
        }
    };

    render() {
        const { articleList, previousIndex } = this.state;
        return (
            <SafeAreaView>
                {articleList.map((item, index) => (
                    <View key={index} style={{ marginBottom: 12, }}>
                        <Swipeable
                            ref={ref => (row[index] = ref)}
                            key={index}
                            friction={2}
                            rightThreshold={40}
                            onSwipeableOpen={() => this.setState({ previousIndex: index })}
                            // onSwipeableRightOpen={() => this.getIndexNumber(index)}
                            // renderLeftActions={this._renderLeftActions}
                            // onSwipeableLeftOpen={this.onSwipeFromLeft}
                            onSwipeableWillOpen={() => this.rowClose(previousIndex)}
                            renderRightActions={(progress, dragX) => this.renderRightActions(progress, dragX, index)}
                        >
                            <View style={{ flexDirection: "row", paddingHorizontal: 8, }}>
                                <Image source={{ uri: item.urlToImage }} style={styles.image} />
                                <View style={{ marginLeft: 12, flex: 1 }}>
                                    <View>
                                        <Text style={[styles.text, styles.author]}>{item.author}</Text>
                                    </View>
                                    <View>
                                        <Text style={[styles.text, styles.title]}>{item.title}</Text>
                                    </View>
                                </View>
                            </View>
                        </Swipeable>
                    </View>
                ))}
            </SafeAreaView>
        );
    }
}