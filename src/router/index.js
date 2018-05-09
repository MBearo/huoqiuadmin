import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ArticleList from '@/components/ArticleList'
import UserList from '@/components/UserList'
import NewArticle from '@/components/NewArticle'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      children:[{
        path:'articlelist',
        name: 'ArticleList',
        component:ArticleList
      },
      {
        path:'UserList',
        name: 'UserList',
        component:UserList
      },
      {
        path:'NewArticle',
        name: 'NewArticle',
        component:NewArticle
      }]
    }
  ]
})
