import { StyleSheet, View, ScrollView ,TextInput} from 'react-native';
import {useEffect,useState} from 'react';
import ExploreCard from './ExploreCard';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import axios from 'axios';
import Shimmer from './Shimmer';

const VideoScreen = () => {
  
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    axios.get('https://thread-api-gjhu.onrender.com/user')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
 
  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>

    
    <ScrollView>
      <View style={styles.footer}>
      
        <TextInput
          style={styles.input}
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
          placeholder="search..."
          multiline
        />
        <FontAwesome
          style={styles.button}
          name="send"
          size={22}
          color="black"
        />
      </View>
    
    
      <View style={styles.container}>
      {loading ? (
        <Shimmer />
      ):(
        filteredData.map((item, index) => (
          <ExploreCard key={index} imageUri={item.contentImage} name={item.name}/>
        ))
      )}
      </View>
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    marginTop: 40,
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginBottom:15,
  },
  input: {
    fontSize: 20,
    height: 48,
    width:"60%",
    padding: 8,
    marginLeft:10,
    marginRight:20,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 18,
    textAlignVertical: "top",
    flex: 1,
    borderRadius: 10,
  },
  button: {
    position:"absolute",
    top:10,
    left:330
  },
  container: {
    marginVertical: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap:3,
    paddingLeft: 4
  },
});

export default VideoScreen;
