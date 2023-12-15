import React, {useEffect, useState} from 'react'
import Dice from './components/Dice'
import  D1  from './assets/images/D1.png'
import  D2 from './assets/images/D2.png'
import D3 from './assets/images/D3.png'
import D4 from './assets/images/D4.png'
import D5 from './assets/images/D5.png'
import D6 from './assets/images/D6.png'
import des from './assets/images/des.jpg'

function DicePage() {
  const imgD = [des ,D1, D2, D3, D4, D5, D6]
  
  return (
    <div>
      <Dice imgD={imgD}/>
    </div>
  );
}

export default DicePage
