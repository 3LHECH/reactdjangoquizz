import {Route, Routes } from 'react-router-dom'

import MainPage from '../layouts/mainPage/mainpage'
import Login from '../layouts/user/login'
import SignUp from '../layouts/user/signup'
import Profile from '../layouts/profile/profile'
import PrivateRoute from '../utils/PrivateRoute/PrivateRoute'
import QuizzList from '../layouts/quizz/quizzlist'
import QuestionList from '../layouts/question/questionList'
export default function Aroutres(){

    return(
        <div>
            <Routes >
            <Route  path='/' element={<MainPage/>}/>
            <Route  path='/login' element={<Login/>}/>
            <Route  path='/register' element={<SignUp/>}/>
            <Route path='/profile'  element={<PrivateRoute />}>
                <Route index element={<Profile />} />
            </Route>
            <Route path='/quizz'  element={<PrivateRoute />}>
                <Route index element={<QuizzList />} />
            </Route>
            <Route path='/question'  element={<PrivateRoute />}>
                <Route index element={<QuestionList />} />
            </Route>
            </Routes>
        </div>
    )

}