import React, { Component } from 'react';
import { Text } from 'react-native';
import { Body, Container, Header, Left, Title, Right } from 'native-base';
import moment from 'moment';
const TimeHeader = () => (
    <Container style={{ flex: 1, backgroundColor: 'lightblue'}}>
        <Header>
            <Left>
                <Title>{moment().format('dddd')}</Title>

            </Left>

            <Right>
                <Body>
                <Title>{moment().format('MMMM Do, YYYY')}</Title>
                </Body>
            </Right>
        </Header>
    </Container>
);

export default TimeHeader;