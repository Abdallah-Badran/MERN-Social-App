import './app.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Users from './pages/users/Users'
import Signup from './pages/signUp/signUp'
import Signin from './pages/signIn/signIn'
import Profile from './pages/profile/profile'
import EditProfile from './pages/editUser/editUser'
import Navbar from './components/navbar/navbar'

const App = () => {
	return (
		<BrowserRouter>
			<Navbar></Navbar>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/users" element={<Users />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/signin" element={<Signin />} />
				<Route path="/user/:userId" element={<Profile />} />
				<Route path="/user/edit/:userId" element={<EditProfile />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App;
