import React from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView, ScrollView, Alert, Platform } from 'react-native';
import MapView, {Marker}  from 'react-native-maps';
import { connect, useSelector, useDispatch } from 'react-redux';
import {
  Icon,
  Provider,
  SearchBar,
  Button,
  Modal, List, WhiteSpace,
} from '@ant-design/react-native';
import useHook from './hook';

const MapScreen = (props) => {
  const h = useHook(props);
  const initialRegion = {
    latitude: 3.1473964,
    longitude: 101.6984301,
    latitudeDelta: 0.0122,
    longitudeDelta: 0.0121,
  };
  const itemList = (data, action) => (
    <>
      {data?.map((item, key) => (
        <List.Item key={key}>
          <Button onPress={()=> action ? h.goTo(item) : null}>
            {item.name}
          </Button>
        </List.Item>
      ))}
    </>
  );
  return (
    <Provider>
      <SafeAreaView style={{flex: 1}}>
        <MapView
          ref={h.mapRef}
          style={StyleSheet.absoluteFillObject}
          initialRegion={initialRegion}>
          <Marker
            coordinate={{
              latitude: h.focusMarker?.latitude || initialRegion?.latitude,
              longitude: h.focusMarker?.longitude || initialRegion?.longitude,
            }}
            title={h.focusMarker?.subName || 'Maybank'}
          />
        </MapView>
        <View style={{position: 'absolute', top: 60, left: 20, right: 20}}>
          <SearchBar
            value={h.searchKeyword}
            placeholder="Search by"
            onSubmit={value => h.setOpenList(false)}
            onChange={value => {
              h.setSearchKeyword(value);
              h.setOpenList(true);
            }}
            cancelText="Cancel"
            onCancel={() => {
              h.setSearchKeyword('');
              h.setOpenList(false);
            }}
          />
          {!!h.openList && (
            <View style={{height: 200, backgroundColor: 'white'}}>
              <ScrollView>
                <List>{itemList(h.byFilter, true)}</List>
              </ScrollView>
            </View>
          )}
        </View>
        {(!h.openList && !!h.history.length) && (
          <View style={{position: 'absolute',bottom: 20, right: 20}}>
            <Button style={{borderRadius: 25, height: 65, width: 65}} onPress={() => !!h.history.length ?  h.isVisible(true) : Alert.alert(`Not have list yet!`)}>
              <Icon
                name="history"
                color="black"
              />
            </Button>
          </View>
        )}
        {!!h.history.length && (
          <Modal
            title="History"
            transparent
            onClose={() => h.isVisible(false)}
            maskClosable
            visible={h.visible}
            closable
            style={{
              width: Dimensions.get('window').width - 20,
              height: Dimensions.get('window').height - 150,
            }}
            >
            <View style={{height: '95%',}}>
              <ScrollView>
                <WhiteSpace />
                <List>{itemList(h.history, false)}</List>
              </ScrollView>
            </View>
          </Modal>
        )}
      </SafeAreaView>
    </Provider>
  );
};

const mapStateToProps = state => ({
  history: state.history,
});

export default connect(mapStateToProps)(MapScreen);
