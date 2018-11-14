import {fire} from './firebase';
/**
 * Define cloud functions, made it to firebase.
 * @module firebase/cloud
 */
let cloud = {
  /**
   * This function try to make a login to firebase authentication service.
   * It return a promise, this ensures the termination of the function.
   */
  login(){
    /**
     * Return the function as a promise.
     */
    return new Promise(resolve => {
      /**
       * Assign this value to that variable.
       * This is because in the fetch function made it by firebase overrides the this variable.
       */
      let that = this
      // Create a firebase github authenticator.
      var provider = new fire.firebase_.auth.GithubAuthProvider();
      // Defines the repo scope to the github request.
      provider.addScope('repo');
      // Make the sigin window popup.
      fire.auth().signInWithPopup(provider).then(function(result) {
        // If everything is okay, execute the register function.
        that.register(resolve, result)
      }).catch(function(error) {
        var errorCode = error.code;
        // Return the error code in the resolve function.
        if(errorCode!=='auth/cancelled-popup-request' || errorCode!=='auth/popup-closed-by-user'){
          resolve({error: errorCode})
        }
      });
    })
  },
  /**
   * Verifies if the user exists in the firebase's database. 
   * @param {function} resolve - The resolve's function of the promise.
   * @param {object} result - The github authentication object returned by the login function.
   */
  register(resolve, result){
    // Create a firestore var.
    // With firestore we can access to the database.
    var firestore = fire.firebase_.firestore();
    // Option required by firestore
    const settings = {timestampsInSnapshots: true};
    firestore.settings(settings);
    /**
     * Make a query to the users collection.
     * @param id {string} - The logged user id.
     */
    firestore.collection("users").doc(fire.firebase_.auth().currentUser.uid).get()
    /**
     * Callback function with the query's result.
     * @param doc {object} - User document.
     */ 
    .then((doc) => {
      // Verifies if the user exists.
      if(!doc.exists) {
        // If the user doesn't exist:
        /**
         * Make a query fot inserting the new user to the database.
         * @param id {string} - Logged user id.
         */
        firestore.collection("users").doc(fire.firebase_.auth().currentUser.uid)
        /**
         * Set define an insert in the database.
         * @param name {string} - User display name given by github.
         * @param email {string} - User email given by github.
         * 
         */
        .set({
          name: result.user.displayName,
          email: result.user.email
        })
        // If everything is okay, return the user given by github to the resolve function.
        .then(function() {
          resolve(result)
        })
        // If there's and error, return it to the resolve function.
        .catch(function(error) {
          resolve({error: error})
        })
      } else {
        // If the user already exists, just return it.
        resolve(result)
      }
    }).catch((err)=>{
      console.log(err)
    })
  },
  /**
   * Function to make a login without the popup verification
   * @param {Object} credential - Credential object given by github
   */
  loginWithToken(credential){
    return new Promise(resolve => {
      let token = fire.firebase_.auth.GithubAuthProvider.credential(credential.accessToken)
      fire.auth().signInAndRetrieveDataWithCredential(token)
      .then(function(res){
        resolve({"status": "ok", user: res})
      })
      .catch(function(error) {
        var errorMessage = error.message;
        resolve({"error": errorMessage})
      });
    })
  },
  /**
   * Function to make a logout
   */
  logout(){
    return new Promise(resolve => {
      var firebase = fire.firebase_;
      firebase.auth().signOut()
      .then(function() {
        // Sign-out successful.
        resolve(true)
      })
      .catch(function(error) {
        console.log(error)
        resolve(false)
        // An error happened
      }); 
    })
  },
  /**
   * Create class with given name and code
   * @param {string} name - Name of the class
   * @param {string} code -  The code given by the university
   */
  createClass(name, code){
    // Return the function as a promise
    return new Promise(resolve => {
      // Create firebase objects
      var firestore = fire.firebase_.firestore();
      const settings = {timestampsInSnapshots: true};
      firestore.settings(settings);
      firestore.collection("classes").where('code', '==', code).get().then((doc) => {
        if(doc.docs.length === 0){
          // Create a new document and get its id
          let newClass = firestore.collection("classes").doc()
          // Assign the current user(a teacher) to the teachers object in the class
          let teachers = {} 
          teachers[fire.firebase_.auth().currentUser.uid] = true
          /**
            * Function that creates the new class
            * @param {string} name - The name of the class
            * @param {string} code - The class's code
            * @param {string} teacher - The teacher that creates the class
            * @param {object} teachers - The list of teachers
            */
          newClass.set({
            name: name,
            code: code,
            teacher: fire.firebase_.auth().currentUser.uid,
            teachers: teachers
          }).then(() => {
            // Return the created status
            resolve({'status': 'created'})
          }).catch((err)=>{
            // Return the error status
            resolve({'status': 'error', 'error': err})
          })
        } else {
          resolve({'status':'error', 'error': 'Ya hay una clase creada con ese código, trate de unirse.'})
        }
      })
    })
  },
  /**
   * Create the task for one class
   * @param {string} classId - The id of the class
   * @param {string} description - The description of the task
   * @param {date} date - The delivery date of the task
   * @param {string} name - The name of the task 
   */
  createTask(classId, description, date, name){
    // Return the function as a promise
    return new Promise(resolve => {
      // Create firebase object
      var firestore = fire.firebase_.firestore();
      const settings = {timestampsInSnapshots: true};
      firestore.settings(settings);
      // Create task
      firestore.collection("tasks").doc().set({
        name: name,
        date: date,
        classId: classId,
        description: description
      }).then(() => {
        // Return cretated status
        resolve({'status': 'created'})
      }).catch((err)=>{
        // Return error status
        resolve({'status': 'error', 'error': err})
      })
    })
  },
  /**
   * Create deliverable for one task
   * @param {string} taskId - Id of the task
   * @param {string} document - Student's document
   * @param {string} docType - Student's document's type
   * @param {string} link - Repo's link
   * @param {string} userId - User id
   */
  createDeliverable(taskId, link){
    return new Promise(resolve => {
      var firestore = fire.firebase_.firestore();
      const settings = {timestampsInSnapshots: true};
      firestore.settings(settings);
      firestore.collection("deliverables").doc().set({
        taskId: taskId,
        link: link,
        userId: fire.firebase_.auth().currentUser.uid,
        score: 0
      }).then(() => {
        resolve({'status': 'created'})
      }).catch((err)=>{
        resolve({'status': 'error', 'error': err})
      })
    })
  },
  /**
   * Get user info from the database
   */
  getUser(){
    return new Promise(resolve => { 
      var firestore = fire.firebase_.firestore();
      const settings = {timestampsInSnapshots: true};
      firestore.settings(settings);
      fire.firebase_.auth().onAuthStateChanged(function(user) {
        if (user) {
          firestore.collection("users").doc(fire.firebase_.auth().currentUser.uid).get().then((doc) => {
            resolve(doc.data())
          }).catch((err)=>{
            resolve({'status': 'error', 'error': err})
          })
        } else {
          // No user is signed in.
        }
      });
    })
  },
  /**
   * Get classes per student
   */
  getClassesStudents(){
    return new Promise(resolve => {  
      var firestore = fire.firebase_.firestore();
      const settings = {timestampsInSnapshots: true};
      firestore.settings(settings);
      firestore.collection("classes").where('students.'+fire.firebase_.auth().currentUser.uid, '==', true).get().then((querySnapshot) => {
        // Return the array of students
        let result = querySnapshot.docs.map(function (documentSnapshot) {
          let data = documentSnapshot.data()
          data.id = documentSnapshot.id
          return data
        })
        resolve(result)
      }).catch((err)=>{
        resolve({'status': 'error', 'error': err})
      })
    })
  },
  /**
   * Get classses per teacher
   */
  getClassesTeachers(){
    return new Promise(resolve => {
      var firestore = fire.firebase_.firestore();
      const settings = {timestampsInSnapshots: true};
      firestore.settings(settings);
      // Get classes where the teachers is in the teachers list
      firestore.collection("classes").where('teachers.'+fire.firebase_.auth().currentUser.uid, '==', true).get().then((querySnapshot) => {
        let result = querySnapshot.docs.map(function (documentSnapshot) {
          let data = documentSnapshot.data()
          data.id = documentSnapshot.id
          return data
        })
        resolve(result)
      }).catch((err)=>{
        resolve({'status': 'error', 'error': err})
      })
    })
  },
  validateClass(id){
    return new Promise(resolve => {
      var firestore = fire.firebase_.firestore();
      const settings = {timestampsInSnapshots: true};
      firestore.settings(settings);
      // Get classes where the teachers is in the teachers list
      firestore.collection("classes").doc(id).get().then((querySnapshot) => {
        let result = querySnapshot.data()
        resolve(result)
      }).catch((err)=>{
        resolve({'status': 'error', 'error': err})
      })
    })
  },
  validateTask(id){
    return new Promise(resolve => {
      var firestore = fire.firebase_.firestore();
      const settings = {timestampsInSnapshots: true};
      firestore.settings(settings);
      // Get classes where the teachers is in the teachers list
      firestore.collection("tasks").doc(id).get().then((querySnapshot) => {
        let result = querySnapshot.data()
        resolve(result)
      }).catch((err)=>{
        resolve({'status': 'error', 'error': err})
      })
    })
  },
  /**
   * Get tasks
   * @param {string} classId 
   */
  getTasks(classId){
    return new Promise(resolve => {
      var firestore = fire.firebase_.firestore();
      const settings = {timestampsInSnapshots: true};
      firestore.settings(settings);
      firestore.collection("tasks").where('classId', '==', classId).get().then((querySnapshot) => {
        let result = querySnapshot.docs.map(function (documentSnapshot) {
          let data = documentSnapshot.data()
          data.id = documentSnapshot.id
          return data
        })
        resolve(result)
      }).catch((err)=>{
        resolve({'status': 'error', 'error': err})
      })
    })
  },
   /**
   * Get deliverables
   * @param {string} taskId 
   */
  getDeliverables(taskId, students){
    return new Promise(resolve => {
      var firestore = fire.firebase_.firestore();
      const settings = {timestampsInSnapshots: true};
      firestore.settings(settings);
      firestore.collection("deliverables").where('taskId', '==', taskId).get().then((querySnapshot) => {
        let result = students.map(function(student){
          for(let i = 0; i < querySnapshot.docs.length; i++){
            if(student.id===querySnapshot.docs[i].data().userId){
              let data = querySnapshot.docs[i].data()
              data.id = querySnapshot.docs[i].id
              student.delivery = data
              return student
            }
          } 
          let data = {
            score: 0,
            link: '',
            uid: student.id
          }
          student.delivery = data
          return student
        })
        resolve(result)
      }).catch((err)=>{
        resolve({'status': 'error', 'error': err})
      })
    })
  },
  /**
   * Update score of the deriverable
   * @param {string} deliverableId 
   * @param {float} score - Score for the deliverable
   */
  updateDeliverables(deliverableId, score){
    return new Promise(resolve => {
      var firestore = fire.firebase_.firestore();
      const settings = {timestampsInSnapshots: true};
      firestore.settings(settings);
      // Set deliverable score on firebase
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
  /**
   * Update user's info
   * @param {object} json 
   */
  updateUser(json){
    return new Promise(resolve => {
      var firestore = fire.firebase_.firestore();
      const settings = {timestampsInSnapshots: true};
      firestore.settings(settings);
      // Update user info with the added info
      firestore.collection("users").doc(fire.firebase_.auth().currentUser.uid).set(json, { merge: true })
      .then(function() {
        resolve({'status': 'ok'})
      })
      .catch(function(error) {
        resolve({error: error})
      })
    })
  },
  /**
   * Enroll student in class
   * @param {string} classId 
   */
  enrollStudent(classCode){
    return new Promise(resolve => {
      var firestore = fire.firebase_.firestore();
      const settings = {timestampsInSnapshots: true};
      let studentsPending = {}
      studentsPending[fire.firebase_.auth().currentUser.uid] = true
      firestore.settings(settings);
      // Get class with the given id
      firestore.collection("classes").where('code', '==', classCode).get().then((doc) => {
        // Check if the the students exists and if the logged user is in the class
        if(doc.docs.length!==0){
          if((doc.docs[0].data().students && doc.docs[0].data().students[fire.firebase_.auth().currentUser.uid]) || (doc.docs[0].data().studentsPending && doc.docs[0].data().studentsPending[fire.firebase_.auth().currentUser.uid])){
            // If the user is in the class, resolve an error
            resolve({error: 'You are in this class currently.'})
          } else {
            // If the user is not in the class, add it to the pending students list
            firestore.collection("classes").doc(doc.docs[0].id).set({
              studentsPending: studentsPending
            }, { merge: true })
            .then(function() {
              resolve({'status': 'created'})
            })
            .catch(function(error) {
              resolve({error: error})
            })
          }
        } else {
          resolve({'status': 'error', 'error': 'La clase con ese código no existe'})
        }
      }).catch((err)=>{
        resolve({'status': 'error', 'error': err})
      })
    })
  },
  /**
   * Enroll the teacher in the given class
   * @param {string} classId 
   */
  enrollTeacher(classCode){
    return new Promise(resolve => {
      var firestore = fire.firebase_.firestore();
      const settings = {timestampsInSnapshots: true};
      let teachersPending = {}
      teachersPending[fire.firebase_.auth().currentUser.uid] = true
      firestore.settings(settings);
      // Get given class
      firestore.collection("classes").where('code', '==', classCode).get().then((doc) => {
        // Check if the the students exists and if the logged user is in the class 
        if(doc.docs.length!==0){
          if((doc.docs[0].data().teachers && doc.docs[0].data().teachers[fire.firebase_.auth().currentUser.uid]) || (doc.docs[0].data().teachersPending && doc.docs[0].data().teachersPending[fire.firebase_.auth().currentUser.uid])){
            // If the user is in the class, resolve an error
            resolve({error: 'You are in this class currently.'})
          } else {
            firestore.collection("classes").doc(doc.docs[0].id).set({
              teachersPending: teachersPending
            }, { merge: true })
            .then(function() {
              resolve({'status': 'created'})
            })
            .catch(function(error) {
              resolve({error: error})
            })
          }
        } else {
          resolve({'status': 'error', 'error': 'La clase con ese código no existe'})
        }
      }).catch((err)=>{
        resolve({'status': 'error', 'error': err})
      })
    })
  },
  getEnrolledStudents(classId){
    return new Promise(resolve => {
      var firestore = fire.firebase_.firestore();
      const settings = {timestampsInSnapshots: true};
      firestore.settings(settings);
      firestore.collection("classes").doc(classId).get().then((doc) => {
        let result = doc.data()
        if(result.studentsPending){
          let students = Object.keys(result.studentsPending)
          let final = students.map(async (student) => {
            let data
            await firestore.collection('users').doc(student).get().then((doc) => {
              data = doc.data()
              data.id = doc.id
            })
            return data
          })
          Promise.all(final).then((completed) => resolve(completed))
        } else {
          resolve([])
        }
      }).catch((err)=>{
        resolve({'status': 'error', 'error': err})
      })
    })
  },  
  getStudents(classId){
    return new Promise(resolve => {
      var firestore = fire.firebase_.firestore();
      const settings = {timestampsInSnapshots: true};
      firestore.settings(settings);
      firestore.collection("classes").doc(classId).get().then((doc) => {
        let result = doc.data()
        if(result.students){
          let students = Object.keys(result.students)
          let final = students.map(async (student) => {
            let data
            await firestore.collection('users').doc(student).get().then((doc) => {
              data = doc.data()
              data.id = doc.id
            })
            return data
          })
          Promise.all(final).then((completed) => resolve(completed))
        } else {
          resolve([])
        }
      }).catch((err)=>{
        resolve({'status': 'error', 'error': err})
      })
    })
  },
  getEnrolledTeachers(classId){
    return new Promise(resolve => {
      var firestore = fire.firebase_.firestore();
      const settings = {timestampsInSnapshots: true};
      firestore.settings(settings);
      firestore.collection("classes").doc(classId).get().then((doc) => {
        let result = doc.data()
        if(result.teachersPending){
          let teachers = Object.keys(result.teachersPending)
          let final = teachers.map(async (teacher) => {
            let data
            await firestore.collection('users').doc(teacher).get().then((doc) => {
              data = doc.data()
              data.id = doc.id
            })
            return data
          })
          Promise.all(final).then((completed) => resolve(completed))
        } else {
          resolve([])
        }
      }).catch((err)=>{
        resolve({'status': 'error', 'error': err})
      })
    })
  },  
  getTeachers(classId){
    return new Promise(resolve => {
      var firestore = fire.firebase_.firestore();
      const settings = {timestampsInSnapshots: true};
      firestore.settings(settings);
      firestore.collection("classes").doc(classId).get().then((doc) => {
        let result = doc.data()
        if(result.teachers){
          let teachers = Object.keys(result.teachers)
          let final = teachers.map(async (teacher) => {
            let data
            await firestore.collection('users').doc(teacher).get().then((doc) => {
              data = doc.data()
              data.id = doc.id
            })
            return data
          })
          Promise.all(final).then((completed) => resolve(completed))
        } else {
          resolve([])
        }
      }).catch((err)=>{
        resolve({'status': 'error', 'error': err})
      })
    })
  },
  /**
   * Accept student enroll in the given class
   * @param {string} classId 
   * @param {string} userId 
   */
  acceptStudentEnroll(classId, userId){
    return new Promise(resolve => {
      var firestore = fire.firebase_.firestore();
      const settings = {timestampsInSnapshots: true};
      firestore.settings(settings);
      // Get the document of the given class
      firestore.collection("classes").doc(classId).get().then((doc) => {
        // Get the class data
        let data = doc.data()
        // Delete the student from the students pending object
        delete data.studentsPending[userId]
        // Add the student to the students object
        if(!data.students){
          data.students = {}
        }
        data.students[userId] = true
        // Sabe the new object
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
  rejectStudentEnroll(classId, userId){
    return new Promise(resolve => {
      var firestore = fire.firebase_.firestore();
      const settings = {timestampsInSnapshots: true};
      firestore.settings(settings);
      // Get the document of the given class
      firestore.collection("classes").doc(classId).get().then((doc) => {
        // Get the class data
        let data = doc.data()
        // Delete the student from the students pending object
        delete data.studentsPending[userId]
        // Sabe the new object
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
  deleteStudent(classId, userId){
    return new Promise(resolve => {
      var firestore = fire.firebase_.firestore();
      const settings = {timestampsInSnapshots: true};
      firestore.settings(settings);
      // Get the document of the given class
      firestore.collection("classes").doc(classId).get().then((doc) => {
        // Get the class data
        let data = doc.data()
        // Delete the student from the students pending object
        delete data.students[userId]
        // Sabe the new object
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
  /**
   * Enroll the teacher to the class
   * @param {string} classId 
   * @param {string} userId 
   */
  acceptTeacherEnroll(classId, userId){
    return new Promise(resolve => {
      var firestore = fire.firebase_.firestore();
      const settings = {timestampsInSnapshots: true};
      firestore.settings(settings);
      firestore.collection("classes").doc(classId).get().then((doc) => {
        // Get class data
        let data = doc.data()
        // Delete teacher from the pending teachers
        delete data.teachersPending[userId]
        // Add the user to the teachers object
        data.teachers[userId] = true
        // Save the object
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
  rejectTeacherEnroll(classId, userId){
    return new Promise(resolve => {
      var firestore = fire.firebase_.firestore();
      const settings = {timestampsInSnapshots: true};
      firestore.settings(settings);
      firestore.collection("classes").doc(classId).get().then((doc) => {
        // Get class data
        let data = doc.data()
        // Delete teacher from the pending teachers
        delete data.teachersPending[userId]
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
  deleteTeacher(classId, userId){
    return new Promise(resolve => {
      var firestore = fire.firebase_.firestore();
      const settings = {timestampsInSnapshots: true};
      firestore.settings(settings);
      firestore.collection("classes").doc(classId).get().then((doc) => {
        // Get class data
        let data = doc.data()
        // Delete teacher from the pending teachers
        if(userId===data.teacher){
          resolve({'status': 'error', error: 'No puedes borrar al creador de la clase'})
        } else {
          delete data.teachers[userId]
          firestore.collection("classes").doc(classId).set(data)
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
  }
}
export {
  cloud,
};
  