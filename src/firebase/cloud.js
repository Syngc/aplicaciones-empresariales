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
  createDeliverable(taskId, document, docType, link, userId){
    return new Promise(resolve => {
      var firestore = fire.firebase_.firestore();
      const settings = {timestampsInSnapshots: true};
      firestore.settings(settings);
      firestore.collection("deliverables").doc().set({
        taskId: taskId,
        document: document,
        docType: docType,
        link: link,
        userId: userId
      }).then(() => {
        resolve({'status': 'created'})
      }).catch((err)=>{
        resolve({'status': 'error', 'error': err})
      })
    })
  },
  getUser(){
    return new Promise(resolve => {
      var firestore = fire.firebase_.firestore();
      const settings = {timestampsInSnapshots: true};
      firestore.settings(settings);
      firestore.collection("users").doc(fire.firebase_.auth().currentUser.uid).get().then((doc) => {
        resolve(doc.data())
      }).catch((err)=>{
        resolve({'status': 'error', 'error': err})
      })
    })
  },
  getClassesStudents(){
    return new Promise(resolve => {
      var firestore = fire.firebase_.firestore();
      const settings = {timestampsInSnapshots: true};
      firestore.settings(settings);
      firestore.collection("classes").where('students.'+fire.firebase_.auth().currentUser.uid, '==', true).get().then((querySnapshot) => {
        let result = querySnapshot.docs.map(function (documentSnapshot) {
          return documentSnapshot.data();
        })
        resolve(result)
      }).catch((err)=>{
        resolve({'status': 'error', 'error': err})
      })
    })
  },
  getClassesTeachers(){
    return new Promise(resolve => {
      var firestore = fire.firebase_.firestore();
      const settings = {timestampsInSnapshots: true};
      firestore.settings(settings);
      firestore.collection("classes").where('teachers.'+fire.firebase_.auth().currentUser.uid, '==', true).get().then((querySnapshot) => {
        let result = querySnapshot.docs.map(function (documentSnapshot) {
          return documentSnapshot.data();
        })
        resolve(result)
      }).catch((err)=>{
        resolve({'status': 'error', 'error': err})
      })
    })
  },
  getTasks(classId){
    return new Promise(resolve => {
      var firestore = fire.firebase_.firestore();
      const settings = {timestampsInSnapshots: true};
      firestore.settings(settings);
      firestore.collection("tasks").where('classId', '==', classId).get().then((querySnapshot) => {
        let result = querySnapshot.docs.map(function (documentSnapshot) {
          return documentSnapshot.data();
        })
        resolve(result)
      }).catch((err)=>{
        resolve({'status': 'error', 'error': err})
      })
    })
  },
  getDeliverables(taskId){
    return new Promise(resolve => {
      var firestore = fire.firebase_.firestore();
      const settings = {timestampsInSnapshots: true};
      firestore.settings(settings);
      firestore.collection("deliverables").where('taskId', '==', taskId).get().then((querySnapshot) => {
        let result = querySnapshot.docs.map(function (documentSnapshot) {
          return documentSnapshot.data();
        })
        resolve(result)
      }).catch((err)=>{
        resolve({'status': 'error', 'error': err})
      })
    })
  },
  updateDeliverables(deliverableId, score){
    return new Promise(resolve => {
      var firestore = fire.firebase_.firestore();
      const settings = {timestampsInSnapshots: true};
      firestore.settings(settings);
      firestore.collection("deliverables").doc(deliverableId).set({
        score: score
      }, { merge: true })
      .then(function() {
        resolve({'status': 'ok'})
      })
      .catch(function(error) {
        resolve({error: error})
      })
    })
  },
  updateUser(json){
    return new Promise(resolve => {
      var firestore = fire.firebase_.firestore();
      const settings = {timestampsInSnapshots: true};
      firestore.settings(settings);
      firestore.collection("users").doc(fire.firebase_.auth().currentUser.uid).set(json, { merge: true })
      .then(function() {
        resolve({'status': 'ok'})
      })
      .catch(function(error) {
        resolve({error: error})
      })
    })
  },
  enrollStudent(classId){
    return new Promise(resolve => {
      var firestore = fire.firebase_.firestore();
      const settings = {timestampsInSnapshots: true};
      let studentsPending = {}
      studentsPending[fire.firebase_.auth().currentUser.uid] = true
      firestore.settings(settings);
      firestore.collection("classes").doc(classId).get().then((doc) => {
        if((doc.data().students && doc.data().students[fire.firebase_.auth().currentUser.uid]) || (doc.data().studentsPending && doc.data().studentsPending[fire.firebase_.auth().currentUser.uid])){
          resolve({error: 'You are in this class currently.'})
        } else {
          firestore.collection("classes").doc(classId).set({
            studentsPending: studentsPending
          }, { merge: true })
          .then(function() {
            resolve({'status': 'ok'})
          })
          .catch(function(error) {
            resolve({error: error})
          })
        }
      }).catch((err)=>{
        resolve({'status': 'error', 'error': err})
      })
    })
  },
  enrollTeacher(classId){
    return new Promise(resolve => {
      var firestore = fire.firebase_.firestore();
      const settings = {timestampsInSnapshots: true};
      let teachersPending = {}
      teachersPending[fire.firebase_.auth().currentUser.uid] = true
      firestore.settings(settings);
      firestore.collection("classes").doc(classId).get().then((doc) => {
        if((doc.data().teachers && doc.data().teachers[fire.firebase_.auth().currentUser.uid]) || (doc.data().teachersPending && doc.data().teachersPending[fire.firebase_.auth().currentUser.uid])){
          resolve({error: 'You are in this class currently.'})
        } else {
          firestore.collection("classes").doc(classId).set({
            teachersPending: teachersPending
          }, { merge: true })
          .then(function() {
            resolve({'status': 'ok'})
          })
          .catch(function(error) {
            resolve({error: error})
          })
        }
      }).catch((err)=>{
        resolve({'status': 'error', 'error': err})
      })
    })
  },
  acceptStudentEnroll(classId, userId){
    return new Promise(resolve => {
      var firestore = fire.firebase_.firestore();
      const settings = {timestampsInSnapshots: true};
      firestore.settings(settings);
      firestore.collection("classes").doc(classId).get().then((doc) => {
        let data = doc.data()
        delete data.studentsPending[userId]
        data.students[userId] = true
        firestore.collection("classes").doc(classId).set(data)
        .then(function() {
          resolve({'status': 'ok'})
        })
        .catch(function(error) {
          resolve({error: error})
        })
      }).catch((err)=>{
        resolve({'status': 'error', 'error': err})
      })
    })
  },
  acceptTeacherEnroll(classId, userId){
    return new Promise(resolve => {
      var firestore = fire.firebase_.firestore();
      const settings = {timestampsInSnapshots: true};
      firestore.settings(settings);
      firestore.collection("classes").doc(classId).get().then((doc) => {
        let data = doc.data()
        delete data.teachersPending[userId]
        data.teachers[userId] = true
        firestore.collection("classes").doc(classId).set(data)
        .then(function() {
          resolve({'status': 'ok'})
        })
        .catch(function(error) {
          resolve({error: error})
        })
      }).catch((err)=>{
        resolve({'status': 'error', 'error': err})
      })
    })
  },
  prueba(){
    this.acceptEnroll('1231sad', '8NPb2YPeZNdJ2SgVWfYlgOLYW2z1')
  }
}
export {
  cloud,
};
  