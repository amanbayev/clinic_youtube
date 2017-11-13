import { Mongo } from 'meteor/mongo'

export const ClientsCardCollection = new Mongo.Collection("ClientsCardCollection")

if ( Meteor.isServer ) {
  Meteor.publish("ClientsCardCollection", function(){
    return ClientsCardCollection.find()
  })

  ClientsCardCollection.allow({
    insert: ()=>{return false},
    update: ()=>{return false},
    remove: ()=>{return false}
  })

  ClientsCardCollection.deny({
    insert: ()=>{return true},
    update: ()=>{return true},
    remove: ()=>{return true}
  })

  Meteor.methods({
    'ClientsCard.insert':function(newCard){
       newCard.createdAt = new Date()
       newCard.createdBy = Meteor.userId()
       newCard.active = true
       return ClientsCardCollection.insert(newCard)
    },
    'ClientsCard.delete':function(cardId) {
      return ClientsCardCollection.update({_id:cardId}, {$set:{
        active: false
      }})
    }
  })
}
