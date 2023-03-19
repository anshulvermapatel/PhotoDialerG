import { useEffect, useState } from 'react';
import { PermissionsAndroid, AppRegistry, StatusBar, TouchableOpacity } from 'react-native';
import Contacts from 'react-native-contacts';
import { ScrollView, StyleSheet, Text, View, Image, TextInput, Button } from 'react-native';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
  
export default function App() {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([])
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
    title: 'Contacts',
    message: 'This app would like to view your contacts.',
    buttonPositive: 'Please accept bare mortal',
  }).then((res) => {
        console.log('Permission: ', res);
        Contacts.getAll()
            .then((contacts) => {
                // work with contacts
                setContacts(contacts)
            })
            .catch((e) => {
                console.log(e);
            });
    }).catch((error) => {
        console.error('Permission error: ', error);
    });
  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.outerScrollView}>
        {/* <Text>Contacts Module Example</Text> */}
        {
          contacts.map((contact) => {
            if (contact.hasThumbnail) {
              return (
                <TouchableOpacity onPress={() => {
                  RNImmediatePhoneCall.immediatePhoneCall(contact.phoneNumbers[0].number);
                }}> 
                <View style={styles.contactTile}>
                  <Image source={{uri: contact.thumbnailPath/*, width:370,height:400*/}} style={styles.image}/>
                  <View style={styles.textView}>
                    <Text style={styles.contactName}>{contact.displayName}</Text>
                  </View>
                </View>
                </TouchableOpacity>
              )
          }})
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aliceblue',
    justifyContent: 'center',
    // paddingTop: StatusBar.currentHeight,  <<< RE-VISIT THIS
    borderWidth: 2,
    borderColor: 'aliceblue',
  },
  outerScrollView: {
    // flexDirection: "column",
    // flex: 1,
    // padding: 0,
    // flexGrow:1,
    // justifyContent: 'center',
    // marginHorizontal: 0,
    marginHorizontal: 2,
  },
  contactTile: {
    marginVertical: 4,
    borderRadius: 40,
    width: '100%',
    // flexWrap: ',
    flexShrink: 5,
    // borderWidth: 2,
    // borderColor: 'green',
    justifyContent: 'flex-end',
    alignContent: 'center'
  },
  image: {
    // flex: 1,
    width: '100%',
    height:450,
    borderRadius :20,
  },
  contactName: {
    fontSize: 30,
    fontFamily: 'Cochin',
    
    color: '#ffebcd',
    justifyContent: 'center',
    // borderColor: "black",
    // borderWidth: 1,
  },
  textView: {
    flex:1,
    // borderColor: "yellow",
    // borderWidth: 1,
    position: 'absolute',
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    width: '100%',
    alignItems: 'center',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  }
});