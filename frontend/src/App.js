import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import { Provider } from 'react-redux'
import store from './redux/store'
import { useEffect } from 'react'
import userActions from './redux/actions/userActions'
import AppRoutes from './routes'
import allUsersActions from './redux/actions/allUsers'
import postActions from './redux/actions/postActions'


const App = () => {
	/* reassign user data and isAuthenticated when a page is refrehsed, becuase when a page is refreshed all
	states returns to their initial state,so both user and isAuthenticated bbecomes null */
	useEffect(() => {
		store.dispatch(userActions.loadUser());
		store.dispatch(allUsersActions.loadUsers());
		store.dispatch(postActions.loadPosts())
	}, []);
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Navbar />
				<AppRoutes />
			</BrowserRouter>
		</Provider>
	)
}

export default App;
