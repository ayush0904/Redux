/*
1 - Create a Store
2 - Declare the initial State and the reducer
3 - Define your actions and action creater
4 - Subscribe to the store
5 - Dispatch Actions to update the store
6 - Unsubscribe to the changes
*/
//import redux from 'redux'; // react application es6 import
const redux = require('redux')
const reduxLogger = require('redux-logger')

const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware
const logger = reduxLogger.createLogger()

// An action is an object with the type property

const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const ICECREAM_ORDERED = 'ICECREAM_ORDERED'
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED'


// Action Creator : Function that returns an action
// Use : If you want to change the name of an action in future, or any property
// you have to change it at only one place

function orderCake(qty = 1) {
  return {
    type: CAKE_ORDERED,
    payload: qty
  }
}
function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty
  }
}
function orderIceCream(qty = 1) {
  return {
    type: ICECREAM_ORDERED,
    payload: qty
  }
}
function restockIceCream(qty = 1) {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty
  }
}

// const initialState = {
//   numOfCakes: 10,
//   numOfIceCreams: 20
// }

const initialCakeState = {
  numOfCakes: 10
}

const initialIceCreamState = {
  numOfIceCreams: 20
}

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case CAKE_ORDERED:
//       return {
//         ...state,
//         numOfCakes: state.numOfCakes - 1
//       }
//     case CAKE_RESTOCKED:
//       return {
//         ...state,
//         numOfCakes: state.numOfCakes + action.payload
//       }
//     case ICECREAM_ORDERED:
//       return {
//         ...state,
//         numOfIceCreams: state.numOfIceCreams - 1
//       }
//     case ICECREAM_RESTOCKED:
//       return {
//         ...state,
//         numOfIceCreams: state.numOfIceCreams + action.payload
//       }
//     default:
//       return state
//   }
// }

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1
      }
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload
      }
    default:
      return state
  }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1
      }
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams + action.payload
      }
    case CAKE_ORDERED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer
})

const store = createStore(rootReducer, applyMiddleware(logger))
//const store = createStore(rootReducer)

console.log('Initial State ', store.getState())
const unsubscribe = store.subscribe(() => {
  console.log('Updated State ', store.getState())
})

// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())

const actions = bindActionCreators(
  { orderCake, restockCake, orderIceCream, restockIceCream },
  store.dispatch
)
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(3)
actions.orderIceCream()
actions.orderIceCream()
actions.restockIceCream(2)
unsubscribe()











