import { Mongo } from 'meteor/mongo'

export const AppointmentsCollection = new Mongo.Collection("AppointmentsCollection")

if ( Meteor.isServer ) {
  Meteor.publish("AppointmentsCollection", function(){
    return AppointmentsCollection.find()
  })
  Meteor.publish("MyAppointments", function() {
    return AppointmentsCollection.find({'authorId':Meteor.userId()})
  })

  AppointmentsCollection.allow({
    insert: ()=>{return false},
    update: ()=>{return false},
    remove: ()=>{return false}
  })

  AppointmentsCollection.deny({
    insert: ()=>{return true},
    update: ()=>{return true},
    remove: ()=>{return true}
  })

  Meteor.methods({
    'appointment.insert':function(newAppointment){
       newAppointment.createdAt = new Date()
       newAppointment.createdBy = Meteor.userId()
       // active = not deleted
       newAppointment.active = true
       // approved by registrar
       newAppointment.approved = false
       return AppointmentsCollection.insert(newAppointment)
    },
    'appointment.delete':function(appointmentId) {
      return AppointmentsCollection.update({_id:appointmentId}, {$set:{
        active: false
      }})
    }
  })
}
