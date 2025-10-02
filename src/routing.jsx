import { createBrowserRouter} from 'react-router-dom'

import App from "./App.jsx"

import CreatePostPage from './page/CreatePostPage.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        children: [
            {
                path:'/',
                element: <App />
            },
            {
                path: '/create',
                element: <CreatePostPage />
            }
        ]
    }
])

export default router