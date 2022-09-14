import "./App.css";
import Navbar from "./components/navbar/Navbar";
import AddNotes from "./components/notes/AddNotes";
import ViewNotes from "./components/notes/ViewNotes";

function App() {
  return (
    <div className="App">
      <Navbar />
      <AddNotes />
      <ViewNotes />
    </div>
  );
}

export default App;
