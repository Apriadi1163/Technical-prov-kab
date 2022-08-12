import { Routes, Route} from "react-router-dom"
import Provinsi from "./page/Provinsi";
import AddProvinsi from "./page/AddProvinsi";
import AddKabupaten from "./page/AddKabupaten";
import DetailProvinsi from "./page/DetailProvinsi";
// import Kabupaten from "./page/Kabupaten";
import TableProvinsi from "./page/TableProvinsi";
import EditProvinsi from "./page/EditProvinsi";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Provinsi />} />
      <Route path="/add-provinsi" element={<AddProvinsi />} />
      <Route path="/add-kabupaten" element={<AddKabupaten />} />
      <Route path="/detail/:id" element={<DetailProvinsi />} />
      {/* <Route path="/detail-kabupaten" element={<Kabupaten />} /> */}
      <Route path="/table-provinsi" element={<TableProvinsi />} />
      <Route path="/edit-provinsi/:id" element={<EditProvinsi />} />
    </Routes>
  );
}

export default App;
