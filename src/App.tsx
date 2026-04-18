import Neighbourhood from "./components/neighbourhood";

function App() {
  const AUM = "ཨོཾ";
  const MANI = "མ་ཎི";
  const PADME = "པདྨེ";
  const HUM = "ཧཱུྂ";
  const MANTRA = `${AUM} ${MANI} ${PADME} ${HUM}`;

  return (
    <div className="app">
      <h1>☸ Alms Round ☸</h1>
      <h2>{MANTRA}</h2>
      <Neighbourhood />
    </div>
  );
}

export default App;
