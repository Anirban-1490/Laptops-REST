import {
    BrowserRouter as Router,
    Routes,
    Route,
}from "react-router-dom";

import {Main} from "./Components/Main"
import {CreateUpdate} from "./Components/Create_Update"
import {DetailedView} from "./Components/detaild_view";

function App() {
    return <>
       <Router>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/createandupdate" element={<CreateUpdate />} />
                <Route path="/createandupdate/:productID" element={<CreateUpdate />} />
                <Route path="/product/:productID" element={<DetailedView />} />
            </Routes>
       </Router>
    </>

}

export default App;
