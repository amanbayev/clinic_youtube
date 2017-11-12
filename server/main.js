import { Meteor } from 'meteor/meteor';

import '/imports/api/StaffCollection'
import '/imports/api/DepartmentsCollection'

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.publish("allUsers", function(){
    return Meteor.users.find({})
  });

  if ( Meteor.users.find().count() === 0 ) {
    let cResult = Accounts.createUser({
        username: 'admin',
        email: 'amanbayev@gmail.com',
        password: '4thebest',
        profile: {
            first_name: 'Talgat',
            last_name: 'Grow IT',
            clinic: 'MM Dent',
        }
    });

    Roles.addUsersToRoles(cResult, 'admin');
  }

  Meteor.methods({
    'users.add':function(newUser){
       let cResult = Accounts.createUser({
         username: newUser.username,
         email: newUser.email,
         password: newUser.password,
         profile: {
           first_name: newUser.first_name,
           last_name: newUser.last_name,
           clinic: newUser.clinic
         }
       });
       Roles.addUsersToRoles(cResult, 'client')
       return true;
    },
    'users.addRole':function(userId, newRole) {
      Roles.addUsersToRoles(userId, newRole)
      return true;
    }
  });
});
