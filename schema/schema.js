const graphql = require("graphql");
const FileDetails = require("../models/FileDetails");
const User = require("../models/User");
const ExpenseReport = require("../models/ExpenseReport");

//types declaration
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
  GraphQLFloat
} = graphql;

//Type declaration for "fileDetails" collection mongo
const FileDetailsType = new GraphQLObjectType({
  name: "FileDetails",
  fields: () => ({
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
    startDate: { type: GraphQLString },
    endDate: { type: GraphQLString },
    uploadTime: { type: GraphQLString },
    status: { type: GraphQLString },
    expenseReport: {
      type: new GraphQLList(ExpenseReportType),
      resolve(parent, args) {
        return ExpenseReport.find({ reportID: parent._id });
      }
    }
  })
});

//Type declaration for "user" collection mongo
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    displayName: { type: GraphQLString },
    contribution: { type: GraphQLFloat },
    expenses: {
      type: new GraphQLList(ExpenseReportType),
      resolve(parent, args) {
        return ExpenseReport.find({ userIds: { $in: parent._id } });
      }
    }
  })
});

//Type declaration for "expenseReport" collection mongo
const ExpenseReportType = new GraphQLObjectType({
  name: "ExpenseReport",
  fields: () => ({
    id: { type: GraphQLID },
    reportID: { type: GraphQLString },
    transDate: { type: GraphQLString },
    description: { type: GraphQLString },
    amount: { type: GraphQLString },
    userIds: { type: new GraphQLList(GraphQLString) },
    fileDetail: {
      type: FileDetailsType,
      resolve(parent, args) {
        //console.log(parent.reportID);
        return FileDetails.findById(parent.reportID);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        console.log(parent.userIds);
        return User.find({ _id: { $in: parent.userIds } });
      }
    }
  })
});

//Root queries
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    fileDetail: {
      type: FileDetailsType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        return FileDetails.findById(args._id);
      }
    },
    fileDetails: {
      type: new GraphQLList(FileDetailsType),
      resolve(parent, args) {
        return FileDetails.find({});
      }
    },
    user: {
      type: UserType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        return User.findById(args._id);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({});
      }
    },
    expenseRecord: {
      type: ExpenseReportType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return ExpenseReport.findById(args.id);
      }
    },
    expenseReport: {
      type: new GraphQLList(ExpenseReportType),
      resolve(parent, args) {
        return ExpenseReport.find({});
      }
    }
  }
});

//Mutations
const Mutation = new GraphQLObjectType({
  name: "MutationType",
  fields: () => ({
    addUserToExpenseRecord: {
      type: ExpenseReportType,
      args: {
        recordID: { type: GraphQLID },
        userID: { type: GraphQLString }
      },
      resolve(parent, args) {
        return ExpenseReport.findByIdAndUpdate(
          args.recordID,
          {
            $push: {
              userIds: args.userID
            }
          },
          { new: true }
        );
      }
    },
    removeUserFormExpenseReport: {
      type: ExpenseReportType,
      args: {
        recordID: { type: GraphQLID },
        userID: { type: GraphQLString }
      },
      resolve(parent, args) {
        return ExpenseReport.findByIdAndUpdate(
          args.recordID,
          {
            $pull: {
              userIds: args.userID
            }
          },
          { new: true }
        );
      }
    }
  })
});

//schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
