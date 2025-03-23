import AppHeader from "../appHeader/AppHeader";

import {MainPage, ComicsPage, Page404, ComicPage} from "../pages";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

const App = () => {


    return (
        <BrowserRouter>
                <div className="app">
                    <AppHeader/>
                    <main>
                        <Routes>
                            <Route path='/' element={<MainPage/>}/>
                            <Route path='/comics' element={<ComicsPage/>}/>
                            <Route path='/comics/:comicId' element={<ComicPage/>}/>
                            <Route path='*' element={<Page404/>}/>
                        </Routes>
                    </main>
                </div>
        </BrowserRouter>
    )
}

export default App;