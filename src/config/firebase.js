import firestore from '@react-native-firebase/firestore';

export { 
    addCollectionWith,
    getDataByKey,
    saveMsg,
    getMsgs
}

const addCollectionWith = ({collectionName, data}) => {
    return firestore().collection(collectionName).add(data)
}

const getDataByKey = ({collectionName, key, value}) => {
    return firestore().collection(collectionName).where(key, '==', value).get()
}

const saveMsg = ({collectionName, id, data}) => {
   return firestore().collection('chatRooms').doc(id).collection(collectionName).add(data)
}

const getMsgs = ({collectionName, id}) => {
    return firestore().collection('chatRooms').doc(id).collection(collectionName)
 }
