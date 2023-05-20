import React, {useState, useCallback} from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, ActivityIndicator } from 'react-native';
import axios from 'axios';


const App = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);


  const API = {
    key: 'bf424d56f4e5c7644d139b428047527a',
    baseUrl: 'http://api.openweathermap.org/data/2.5/weather',
  };

  const fetchDataHander = useCallback(() => {
    setLoading(true);
    setInput('');
    axios({
      method: 'GET',
      url: `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${API.key}`,
    })
      .then(response => {
        console.log(response.data);
        setData(response.data);
      })
      .catch(error => console.dir(error))
      .finally(() => setLoading(false));
  }, [API.key, input]); 



  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/images/bg.png')}
        resizeMode="cover"
        style={styles.bgImage}>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Enter city name & press enter..."
            onChangeText={text => setInput(text)}
            value={input}
            placeholderTextColor={'#000'}
            onSubmitEditing={fetchDataHander}
          />
        </View>
        {loading && (
          <View>
            <ActivityIndicator size="large" color="orange" />
          </View>
        )}
        {data && (
          <View style={styles.infoView}>
            <Text style={styles.cityText}>
              {`${data?.name}, ${data?.sys?.country}`}
            </Text>
            <Text style={styles.dateText}>{new Date().toLocaleString()}</Text>
            <Text style={styles.tempText}>
              {data?.main?.temp  + ' °C'}
            </Text>
            <Text style={styles.minmaxText}>{'min: ' + data?.main?.temp_min + '°C /  max: ' + data?.main?.temp_max + '°C'}</Text>
            <Text style={styles.descriptionText}>
              {data?.weather?.[0]?.description}</Text>
          </View>
        )}
      </ImageBackground>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    width: '100%',
    height: '100%',
  },
  input: {
    borderBottomWidth: 5,
    backgroundColor: '#fff',
    padding: 10,
    paddingVertical: 20,
    marginVertical: 100,
    marginHorizontal: 10,
    fontSize: 20,
    borderRadius: 16,
    borderBottomColor: '#df8e00',
  },
  infoView: {
    alignItems: 'center',
  },
  cityText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'royalblue',
  },
  dateText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'royalblue',
    marginVertical: 10,
  },
  tempText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'royalblue',
    marginVertical: 10,
  },
  minmaxText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'royalblue',
    marginTop: 10,
  },
  descriptionText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'royalblue',
    marginTop: 5,
  },
});

export default App;
