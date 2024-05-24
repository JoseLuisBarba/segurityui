import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./dashboard/pages/login/login.component'),
        pathMatch: 'full'
    },
    {
        path: 'create-user',
        loadComponent: () => import('./dashboard/pages/userCreate/userCreate.component'),
        pathMatch: 'full'
    },
    {
        path: 'account-recovery',
        loadComponent: () => import('./dashboard/pages/recovery/recovery.component'),
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component'),
        children : [
            {
                path: 'reporte',
                title: 'Reporte',
                loadComponent: () => import('./dashboard/pages/report/report.component')
            },
            {
                path: 'productos',
                title: 'Mis Productos',
                loadComponent: () => import('./dashboard/pages/productos/productos.component')
            },
            {
                path: 'produccion',
                title: 'Produccion',
                loadComponent: () => import('./dashboard/pages/produccion/produccion.component')
            },
            {
                path: 'micuenta',
                title: 'Mi Cuenta',
                loadComponent: () => import('./dashboard/pages/me/me.component')
            },
            {
                path: 'personal',
                title: 'Personal',
                loadComponent: () => import('./dashboard/pages/personal/personal.component')
            },
            {
                path: 'user/:id',
                title: 'Users View',
                loadComponent: () => import('./dashboard/pages/user/user.component')
            },
            {
                path: 'users-list',
                title: 'Users List',
                loadComponent: () => import('./dashboard/pages/users/users.component')
            },
            {
                path: 'realtime-map',
                title: 'Realtime Map',
                loadComponent: () => import('./dashboard/pages/mapScrean/mapScreen.component')
            },
            {
                path: 'vehicles',
                title: 'Vehicles',
                loadComponent: () => import('./dashboard/pages/vehicles/vehicles.component')
            },
            /*
            {
                path: 'view-transition1',
                title: 'View Transition 1',
                loadComponent: () => import('./dashboard/pages/view-transition/view-transition1.component')
            },
            {
                path: 'view-transition2',
                title: 'View Transition 2',
                loadComponent: () => import('./dashboard/pages/view-transition/view-transition2.component')
            },
            */
            {
                path: '',
                redirectTo: 'control-flow',
                pathMatch: 'full'
            },
        ]
    }, {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    }, {
        path: '**',
        loadComponent: () => import('./dashboard/pages/notfound/notfound.component'),
        pathMatch: 'full'
    } 
];
