import { Mongo } from 'meteor/mongo'

export const PositionsCollection = new Mongo.Collection("PositionsCollection")

if ( Meteor.isServer ) {
  Meteor.publish("PositionsCollection", function(){
    return PositionsCollection.find()
  })

  PositionsCollection.allow({
    insert: ()=>{return false},
    update: ()=>{return false},
    remove: ()=>{return false}
  })

  PositionsCollection.deny({
    insert: ()=>{return true},
    update: ()=>{return true},
    remove: ()=>{return true}
  })

  Meteor.methods({
    'positions.insert':function(newPosition){
       newPosition.createdAt = new Date()
       newPosition.createdBy = Meteor.userId()
       newPosition.counter = 0
       newPosition.active = true
       newPosition.staff = []
       return PositionsCollection.insert(newPosition)
    },
    'positions.addStaff': function(deptId, staffId) {
      return PositionsCollection.update({_id: deptId},
        {
          $inc: { counter: 1 },
          $push: { staff: staffId }
      })
    },
    'positions.delete':function(positionId) {
      return PositionsCollection.update({_id:positionId}, {$set:{
        active: false
      }})
    }
  })
}
