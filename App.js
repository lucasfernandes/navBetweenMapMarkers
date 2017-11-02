/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions
} from 'react-native';

import MapView from 'react-native-maps'

const { width, height } = Dimensions.get('window');

export default class App extends Component {
  state = {
    places: [
      {
        id: 1,
        title: 'Skeletors House',
        description: 'Development, Agility and louder guitars',
        latitude: -22.9200375,
        longitude: -47.0561667,
      },
      {
        id: 2,
        title: 'Galassi Supermarket',
        description: 'Great things, but really really espensive',
        latitude: -22.9213788,
        longitude: -47.0541809,
      },
      {
        id: 3,
        title: 'Ice Cream',
        description: 'The best of Black Bridge Neighbor',
        latitude: -22.922315,
        longitude: -47.0523227,
      },
      {
        id: 4,
        title: 'Drugstore',
        description: 'All kind of drugs you need',
        latitude: -22.9200368,
        longitude: -47.0627328,
      }
    ]
  }
  
  _mapReady = () => {
    this.state.places[0].mark.showCallout();
  }

  render() {

    const { latitude, longitude } = this.state.places[0];
    const { places } = this.state;

    console.log(this.state);

    return (
      <View style={styles.container}>
        <MapView
          ref={map => this.mapView = map}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.0342,
            longitudeDelta: 0.0331,
          }}
          style={styles.mapView}
          rotateEnabled={false}
          scrollEnabled={false}
          zoomEnabled={false}
          showsPointsOfInterest={false}
          showsBuildings={false}
          onMapReady={this._mapReady}
        >
          { places.map(place => (
            <MapView.Marker
              ref={mark => place.mark = mark}
              key={place.id}
              title={place.title}
              description={place.description}
              coordinate={{
                latitude: place.latitude,
                longitude: place.longitude,                
              }}
            />
          ))}
          
        </MapView>
        <ScrollView 
          style={styles.placesContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onMomentumScrollEnd={e => {
            const scrolled = e.nativeEvent.contentOffset.x;
            
            const place = (scrolled > 0)
              ? scrolled / width
              : 0;

            const { latitude, longitude, mark } = this.state.places[place];

            this.mapView.animateToCoordinate({
              latitude,
              longitude,
            }, 1000); // duration 1s

            setTimeout(() => {
              mark.showCallout();
            }, 1000);
          }}
          >
          { places.map(place => (
            <View key={place.id} style={styles.place}>
              <Text style={[styles.text, styles.title]}>{place.title}</Text>
              <Text style={styles.text}>{place.description}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  mapView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  placesContainer: {
    width: '100%',
    maxHeight: 100,
  },
  place: {
    width: width - 40,
    maxHeight: 100,
    backgroundColor:'#555352',
    marginHorizontal: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 30,
    justifyContent: 'space-between',
  },
  text: {
    color: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  }
  
});
