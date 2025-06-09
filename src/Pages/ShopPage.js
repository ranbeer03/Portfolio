import {useState} from 'react';
import './ShopPage.css'; 
import ShopCards from "../Components/ShopCards";
import GmailTreeView from '../Components/SimpleTreeView';
import '../App.css'

const ShopPage = () => {

  const [activeButton, setActiveButton] = useState("medium");

  return (
  <div className="page">
    <div className="shop">
      <div style={{width: '20%'}}>
        <GmailTreeView />
      </div>
      <div style={{width: '80%'}}>
        <ShopCards activeSection={activeButton}/>
      </div>
    </div>
  </div>
  );
}

export default ShopPage;

