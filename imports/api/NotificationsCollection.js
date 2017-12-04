import { Mongo } from 'meteor/mongo'

export const NotificationsCollection = new Mongo.Collection("NotificationsCollection")

if ( Meteor.isServer ) {
  Meteor.publish("NotificationsCollection", function(){
    return NotificationsCollection.find()
  })
  Meteor.publish("MyNotifications", function() {
    return NotificationsCollection.find({'createdBy':Meteor.userId()})
  })

  NotificationsCollection.allow({
    insert: ()=>{return false},
    update: ()=>{return false},
    remove: ()=>{return false}
  })

  NotificationsCollection.deny({
    insert: ()=>{return true},
    update: ()=>{return true},
    remove: ()=>{return true}
  })

  Meteor.methods({
    'notification.insert':function(newNotification){
       newNotification.createdAt = new Date()
       newNotification.createdBy = Meteor.userId()
       newNotification.unread = true
       newNotification.active = true
       return NotificationsCollection.insert(newNotification)
    },
    'notification.delete':function(notificationId) {
      return NotificationsCollection.update({ _id : notificationId}, {$set:{
        active: false
      }})
    }
  })
}
