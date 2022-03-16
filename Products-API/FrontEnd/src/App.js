import {
    BrowserRouter as Router,
    Routes,
    Route,
}from "react-router-dom";

import {Main} from "./Components/Main"
import {CreateUpdate} from "./Components/Create_Update"

function App() {
    return <>
       <Router>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/createandupdate" element={<CreateUpdate />} />
                <Route path="/createandupdate/:productID" element={<CreateUpdate />} />
            </Routes>
       </Router>
    </>

}

export default App;
