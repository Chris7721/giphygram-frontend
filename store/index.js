/* eslint-disable no-empty-pattern */

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const multipart = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
export const state = () => ({
  pageLoaded: false, 
  authUser: false,
  token: false,
  linkCopied: false,
  actionText: "Action Performed",
  posts: [],
  searchPosts: [],
  singlePost: null,
  postsFetched: false,
  singlePostFetched: false,
  appReady: false,
  uploadedPost: false,
  searchSkip: 0,
  currentPage: 'app'
});
export const getters = {
  getAuthUser: state => state.authUser, 
  postArray: (state) => (payload) => {
    let keys = Object.keys(payload)
  let arr = []
  for(let i = 0; i < keys.length; i++){
     arr.push(payload[keys[i]]) 
  }
  return arr
  },
  isUserLoggedIn: state => state.token && state.authUser
};

export const mutations = {
    updatePage(state, pageName) {
      state.currentPage = pageName
    },
    set_user_info: function(state, payload) {
        state.authUser = payload;
      },
      set_token: function(state, payload) {
        state.token = payload;
      },
      set_posts: function(state, payload) {
        state.posts = payload;
      },
      set_search_posts: function(state, payload) {
        state.searchPosts = payload;
      },
      set_search_skip: function(state, payload) {
        state.searchSkip = payload;
      },
      append_post: function(state, payload) {
        state.posts.unshift(payload);
      },
      append_post_end: function(state, payload) {
        state.posts.push(...payload);
      },
      append_search_post_end: function(state, payload) {
        state.searchPosts.push(...payload);
      },
      set_single_post: function(state, payload) {
        state.singlePost = payload;
      },
      set_appLaunch: function(state, payload) {
        state.appReady = payload;
      },
      set_uploadedPost: function(state, payload) {
        state.uploadedPost = payload;
      },      
      set_postsFetched: function(state, payload) {
        state.postsFetched = payload;
      },
      set_singlePostsFetched: function(state, payload) {
        state.singlePostFetched = payload;
      },
  set_copied: function(state, payload) {
    state.linkCopied = payload;
  },
  set_actionText: function(state, text) {
    // alert(text)
    state.actionText = text
  },
  create_cookie(state, token) {
    var d = new Date();
    let expiration = new Date(
      Date.UTC(d.getFullYear() + 2, 1, 1)
    ).toUTCString();
    let cookie =
      encodeURI("g-u-a-t=") +
      encodeURI(token) +
      ";expires=" +
      expiration +
      "; path=/;";
    document.cookie = cookie;
  },
  addComment(state, comment){
    
    const position = state.posts.findIndex(el => el._id == comment.post_id)
    // console.log(position)
    state.posts[position].comments.unshift(comment)
    state.posts[position].commentsCount += 1
 },
 decrementCommentCount(state, {comment_id, post_id}){
  //  console.log(post_id)
  //  console.log("from decc", state.posts)
   const position = state.posts.findIndex(el => el._id == post_id)
  //  console.log("post index, ", position)
     const commentPosition = state.posts[position].comments.findIndex(el => el._id == comment_id)
    //  console.log("comment index, ", commentPosition)
    //  console.log(commentPosition)
    state.posts[position].comments.splice(commentPosition, 1)
    // state.singlePost.comments.splice(commentPosition, 1)
    state.posts[position].commentsCount -= 1
 },
 appendNewComments(state, {comment, post_id}){
  // console.log(post_id)
  const position = state.posts.findIndex(el => el._id == post_id)
  // console.log("the new  comments are: ", comment)
  state.posts[position].comments = [...state.posts[position].comments, ...comment]
  // state.singlePost.comments = [...state.singlePost.comments, ...comment]
  // console.log(state.posts)
},
updateLikes(state, {num, post_id}){
  // console.log(post_id)
  const position = state.posts.findIndex(el => el._id == post_id)
  // console.log("the found position yaay", position)
  state.posts[position].likesCount += num
  // console.log("the new  comments are: ", comment)
  // state.singlePost.likesCount += num
  if(num == -1){
    // const likePosition = state.posts[position].likes.findIndex(el => el.user_id == state.authUser._id)
    // state.posts[position].likes.splice(likePosition, 1)
    if(state.singlePost){
      if(state.singlePost._id == post_id){
        state.singlePost.isLiked = false
        state.singlePost.likesCount += num
      }
      
    }
    state.posts[position].isLiked = false
  }
  else if(num == 1){
    // state.posts[position].likes.push({user: state.authUser.name, user_id: state.authUser._id})
    if(state.singlePost){
      if(state.singlePost._id == post_id){
        state.singlePost.isLiked = true
        state.singlePost.likesCount += num
      }
      
    }
    state.posts[position].isLiked = true

  }
  // console.log(state.posts)
},
};

export const actions = {
  async nuxtServerInit({commit, dispatch}, {route, redirect, req, store, app}) {
    const employeeToken = app.$cookiz.get('g-u-a-t')
    commit('set_token', employeeToken)
    // console.log(employeeToken)
    try {
      const response = await this.$axios.get('/employee/me')
      commit('set_user_info', response.data)
      // redirect("/app")
    } catch (error) {
      // console.log('in here now')
    }
  },
  initializeApp: function({commit}) {
    setTimeout(()=>{
      commit("set_appLaunch", true)
    }, 0)
  },
  set_copied: function({commit}, payload) {
    commit("set_copied", payload)
    // state.linkCopied = payload;
    setTimeout(()=>{
      commit("set_copied", false)
    }, 1000)
  },
  login({commit, state}, {email, password}) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post("/auth/signin", {email, password})
        .then(resp => {
          commit("set_token", resp.data.data.token);
          commit("create_cookie", resp.data.data.token);
          commit("set_user_info", resp.data.data.employee);          
          
          // console.log(resp)
          this.$router.push("/app");
          resolve(resp);
        })
        .catch(err => {
          reject(err.response);
        });
    });
  },
  register({commit, state}, {name, email, password}) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post("/employees/admin", {name, email, password})
        .then(resp => {
          // console.log(resp.data)
          
          commit("set_token", resp.data.token);
          commit("create_cookie", resp.data.token);
          commit("set_user_info", resp.data.employee);
          // console.log(resp)
          this.$router.push("/app");
          resolve(resp);
        })
        .catch(err => {
          reject(err.response);
        });
    });
  },

  fetchPosts({commit, state, getters}, {limit, skip, from}){
    return new Promise((resolve, reject) => {
      //skip is always 0 onFirstLoad, so its better to do this only on first load
      //without this, when more posts are fetched, only 4 elements(loaders would be on display)
      //and this takes the scroll to the top, so this messes up the infinite scroll experience
      if(skip == 0){
        // console.log("The skip is 0")
        commit("set_postsFetched", false);
      }  
      if(from == 'search' && skip == 0 && state.searchPosts.length < 1) {
        commit("set_search_posts", []);
      }
    this.$axios.get(`/feed?skip=${skip}&limit=${limit}`).then(resp=>{
      if(from == 'search'){
        commit("append_search_post_end", resp.data);
      }
      else{
        commit("append_post_end", resp.data);
      }      
      // console.log(resp.data)
      if(skip == 0){
        commit("set_postsFetched", true);
      }      
      resolve(resp.data);
      // console.log(this.posts)
  }).catch(err =>{
    if(skip == 0){
      commit("set_postsFetched", true);
    }    
    reject(err.response)
      console.log(err)
  })
})
  },
  fetchSinglePost({commit, state, getters}, postId){
    // const post = state.posts.findIndex(el => el._id == postId)
    // console.log(post)
    commit("set_singlePostsFetched", false)
    // console.log({user_id: state.authUser._id})
    this.$axios
          .post(`/gifs/${postId}`, {user_id: state.authUser._id})
          .then(resp => {
            // console.log(resp.data);

            // if(post == -1){
              // console.log("lmaooo")
              commit("set_single_post", resp.data)
            // }
            // commit("set_single_post", {...resp.data, index: 1})
            commit("set_singlePostsFetched", true)
          })
          .catch(err => {
            console.log(err);
            commit("set_singlePostsFetched", true)
          });
  },
  uploadPost({commit, state}, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post("/gifs", payload, multipart)
        .then(resp => {
          commit("append_post", resp.data.data)
          // console.log("from store upload", resp.data.data)
          this.$router.push("/app");
          // commit("set_uploadedPost", true)
          resolve(resp);
        })
        .catch(err => {
          reject(err.response);
        });
    });
  },
  logout({commit, state}) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post("/logout")
        .then(resp => {
          commit("set_token", null);          
          this.$cookiz.remove('g-u-a-t')
          this.$router.push("/");
          resolve(resp);
        })
        .catch(err => {
          reject(err.response);
        });
    });
  },
};
