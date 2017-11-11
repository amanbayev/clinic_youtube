import { Mongo } from 'meteor/mongo'

export const StaffCollection = new Mongo.Collection("StaffCollection")

if ( Meteor.isServer ) {
  Meteor.publish("StaffCollection", function(){
    return StaffCollection.find()
  })

  StaffCollection.allow({
    insert: ()=>{return false},
    update: ()=>{return false},
    remove: ()=>{return false}
  })

  StaffCollection.deny({
    insert: ()=>{return true},
    update: ()=>{return true},
    remove: ()=>{return true}
  })

  Meteor.methods({
    'staff.insert':function(newStaff){
       newStaff.createdAt = new Date()
       newStaff.createdBy = Meteor.userId()
       newStaff.active = true
       return StaffCollection.insert(newStaff)
    },
    'staff.delete':function(staffId) {
      return StaffCollection.update({_id:staffId}, {$set:{
        active: false
      }})
    }
  })
}
