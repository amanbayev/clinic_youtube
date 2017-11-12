import { Mongo } from 'meteor/mongo'

export const DepartmentsCollection = new Mongo.Collection("DepartmentsCollection")

if ( Meteor.isServer ) {
  Meteor.publish("DepartmentsCollection", function(){
    return DepartmentsCollection.find()
  })

  DepartmentsCollection.allow({
    insert: ()=>{return false},
    update: ()=>{return false},
    remove: ()=>{return false}
  })

  DepartmentsCollection.deny({
    insert: ()=>{return true},
    update: ()=>{return true},
    remove: ()=>{return true}
  })

  Meteor.methods({
    'departments.insert':function(newDepartment){
       newDepartment.createdAt = new Date()
       newDepartment.createdBy = Meteor.userId()
       newDepartment.counter = 0
       newDepartment.active = true
       newDepartment.staff = []
       return DepartmentsCollection.insert(newDepartment)
    },
    'departments.addStaff': function(deptId, staffId) {
      return DepartmentsCollection.update({_id: deptId},
        {
          $inc: { counter: 1 },
          $push: { staff: staffId }
      })
    },
    'departments.delete':function(departmentId) {
      return DepartmentsCollection.update({_id:departmentId}, {$set:{
        active: false
      }})
    }
  })
}
