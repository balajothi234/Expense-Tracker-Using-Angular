import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { Dashboard } from './components/dashboard/dashboard';
import { AddExpense } from './components/add-expense/add-expense';
import { Settings } from './components/settings/settings';

// 👉 Add a new "DashboardHome" component (your current dashboard content)
import { DashboardHome } from './components/dashboard-home/dashboard-home';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  {
    path: 'dashboard',component: Dashboard,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: DashboardHome }, 
      { path: 'settings', component: Settings },   
     { path: 'add-expense', component: AddExpense }
    ],
  },

 
];

// import { RedirectCommand, Routes } from '@angular/router';
// import { Login } from './components/login/login';
// import { Signup } from './components/signup/signup';
// import { Dashboard } from './components/dashboard/dashboard';
// import { AddExpense } from './components/add-expense/add-expense';
// import { Settings } from './components/settings/settings';

// export const routes: Routes = [
//     {path:'',redirectTo:'login',pathMatch:'full'},
//      {path:'login',component:Login},
//      {path:'signup',component:Signup},
//      {path:'dashboard',component:Dashboard},
//      {path:'add-expense',component:AddExpense},
//      {path:'settings',component:Settings}
// ];
