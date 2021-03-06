import { HomePage } from './pages/HomePage.jsx'
import { Favorites } from './pages/Favorites.jsx'


const routes = [
    {
        path: '/:city',
        component: <HomePage />,
    },
    {
        path: '/',
        component: <HomePage />,
        label: 'Home',
    },
    {
        path: 'favorites',
        component: <Favorites />,
        label: 'Favorites'
    },
   
]

export default routes;