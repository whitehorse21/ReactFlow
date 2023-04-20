import { sum, map, filter, uniqBy, reject } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { createProject, updateProject, deleteProject } from '../../graphql/mutations';
import { getProject, listProjects } from '../../graphql/queries';
import awsconfig from '../../aws-exports';

Amplify.configure(awsconfig);
// utils
// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  projects: [],
  project: null
};

const slice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET PROJECTS
    getProjectsSuccess(state, action) {
      state.isLoading = false;
      state.projects = action.payload;
    },

    // GET PROJECT
    getProjectSuccess(state, action) {
      state.isLoading = false;
      state.project = action.payload;
    },

    // DELETE PROJECT
    deleteProject(state, action) {
      state.products = reject(state.products, { id: action.payload });
    },

    //  SORT & FILTER PROJECTS
    sortByProjects(state, action) {
      state.sortBy = action.payload;
    },

    filterProjects(state, action) {
      state.filters.gender = action.payload.gender;
      state.filters.category = action.payload.category;
      state.filters.colors = action.payload.colors;
      state.filters.priceRange = action.payload.priceRange;
      state.filters.rating = action.payload.rating;
    },

    // CHECKOUT
    getCart(state, action) {
      const cart = action.payload;

      const subtotal = sum(cart.map((product) => product.price * product.quantity));
      const discount = cart.length === 0 ? 0 : state.checkout.discount;
      const shipping = cart.length === 0 ? 0 : state.checkout.shipping;
      const billing = cart.length === 0 ? null : state.checkout.billing;

      state.checkout.cart = cart;
      state.checkout.discount = discount;
      state.checkout.shipping = shipping;
      state.checkout.billing = billing;
      state.checkout.subtotal = subtotal;
      state.checkout.total = subtotal - discount;
    },

    addCart(state, action) {
      const product = action.payload;
      const isEmptyCart = state.checkout.cart.length === 0;

      if (isEmptyCart) {
        state.checkout.cart = [...state.checkout.cart, product];
      } else {
        state.checkout.cart = map(state.checkout.cart, (_product) => {
          const isExisted = _product.id === product.id;
          if (isExisted) {
            return {
              ..._product,
              quantity: _product.quantity + 1
            };
          }
          return _product;
        });
      }
      state.checkout.cart = uniqBy([...state.checkout.cart, product], 'id');
    },

    deleteCart(state, action) {
      const updateCart = filter(state.checkout.cart, (item) => item.id !== action.payload);

      state.checkout.cart = updateCart;
    },

    resetCart(state) {
      state.checkout.activeStep = 0;
      state.checkout.cart = [];
      state.checkout.total = 0;
      state.checkout.subtotal = 0;
      state.checkout.discount = 0;
      state.checkout.shipping = 0;
      state.checkout.billing = null;
    },

    onBackStep(state) {
      state.checkout.activeStep -= 1;
    },

    onNextStep(state) {
      state.checkout.activeStep += 1;
    },

    onGotoStep(state, action) {
      const goToStep = action.payload;
      state.checkout.activeStep = goToStep;
    },

    increaseQuantity(state, action) {
      const productId = action.payload;
      const updateCart = map(state.checkout.cart, (product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity + 1
          };
        }
        return product;
      });

      state.checkout.cart = updateCart;
    },

    decreaseQuantity(state, action) {
      const productId = action.payload;
      const updateCart = map(state.checkout.cart, (product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity - 1
          };
        }
        return product;
      });

      state.checkout.cart = updateCart;
    },

    createBilling(state, action) {
      state.checkout.billing = action.payload;
    },

    applyDiscount(state, action) {
      const discount = action.payload;
      state.checkout.discount = discount;
      state.checkout.total = state.checkout.subtotal - discount;
    },

    applyShipping(state, action) {
      const shipping = action.payload;
      state.checkout.shipping = shipping;
      state.checkout.total = state.checkout.subtotal - state.checkout.discount + shipping;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const {
  getCart,
  addCart,
  resetCart,
  onGotoStep,
  onBackStep,
  onNextStep,
  deleteCart,
  deleteProduct,
  createBilling,
  applyShipping,
  applyDiscount,
  filterProducts,
  sortByProducts,
  increaseQuantity,
  decreaseQuantity
} = slice.actions;

// ----------------------------------------------------------------------

export function getProjects() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await API.graphql(graphqlOperation(listProjects));
      dispatch(slice.actions.getProjectsSuccess(response.data.listProjects.items));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getAProject(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await API.graphql(graphqlOperation(getProject, { id }));
      dispatch(slice.actions.getProjectSuccess(response.data.getProject));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteAProject(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await API.graphql(graphqlOperation(deleteProject, { input: { id } }));
      const response = await API.graphql(graphqlOperation(listProjects));
      dispatch(slice.actions.getProjectsSuccess(response.data.listProjects.items));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function create(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const newData = { ...data, elements: JSON.stringify(data.elements) };
      await API.graphql(graphqlOperation(createProject, { input: newData }));
      const response = await API.graphql(graphqlOperation(listProjects));
      dispatch(slice.actions.getProjectsSuccess(response.data.listProjects.items));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
