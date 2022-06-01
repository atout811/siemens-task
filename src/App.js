import { useState } from "react";
import "./App.css";
import CitiesList from "./component/citiesList/CitiesList";
import MainContainer from "./component/mainContainer/MainContainer";
import { useMediaQuery } from "react-responsive";

import { Drawer, Button } from "antd";

function App() {
  const [country, setCountry] = useState();
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const isBigScreen = useMediaQuery({ query: "(min-width: 1224px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  return (
    <div className="App">
      <div className="wrapper">
        {isBigScreen && (
          <>
            <MainContainer setCountry={setCountry} />
            <CitiesList country={country} />
            hey
          </>
        )}

        {isTabletOrMobile && (
          <>
            <MainContainer setCountry={setCountry} />
            <Button type="primary" onClick={showDrawer}>
              More Cities?
            </Button>
            <Drawer
              title="Basic Drawer"
              placement="right"
              onClose={onClose}
              visible={visible}
            >
              <CitiesList country={country} />
            </Drawer>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
