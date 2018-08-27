import {fire} from './firebase';

let cloud = {
  login(){
    return new Promise(resolve => {
      let that = this
      var provider = new fire.firebase_.auth.GithubAuthProvider();
      provider.addScope('repo');
      fire.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        that.register(resolve, result)
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        resolve({error: errorCode})
      });
    })
  },
  register(resolve, result){
    var firestore = fire.firebase_.firestore();
    const settings = {timestampsInSnapshots: true};
    firestore.settings(settings);
    firestore.collection("users").doc(fire.firebase_.auth().currentUser.uid).get().then((doc) => {
      if(!doc.exists) {
        firestore.collection("users").doc(fire.firebase_.auth().currentUser.uid).set({
          name: result.user.displayName,
          email: result.user.email
        })
        .then(function() {
          resolve(result)
        })
        .catch(function(error) {
          console.log(error)
          resolve({error: error})
        })
      } else {
        resolve(result)
      }
    }).catch((err)=>{
      console.log(err)
    })
  },
  createClass(name, code){
    return new Promise(resolve => {
      var firestore = fire.firebase_.firestore();
      const settings = {timestampsInSnapshots: true};
      firestore.settings(settings);
      let newClass = firestore.collection("classes").doc()
      let teachers = {}
      teachers[fire.firebase_.auth().currentUser.uid] = true
      newClass.set({
        name: name,
        code: code,
        teacher: fire.firebase_.auth().currentUser.uid,
        teachers: teachers
      }).then(() => {
        resolve({'status': 'created'})
      }).catch((err)=>{
        resolve({'status': 'error', 'error': err})
      })
    })
  },
  createTask(classId, description, date, name){
    return new Promise(resolve => {
      var firestore = fire.firebase_.firestore();
      const settings = {timestampsInSnapshots: true};
      firestore.settings(settings);
      firestore.collection("tasks").doc().set({
        name: name,
        date: date,
        classId: classId,
        description: description
      }).then(() => {
        resolve({'status': 'created'})
      }).catch((err)=>{
        resolve({'status': 'error', 'error': err})
      })
    })
  },
  prueba(){
  }
}
export {
  cloud,
};
  