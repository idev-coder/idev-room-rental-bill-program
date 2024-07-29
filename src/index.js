import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import store from "./redux/store";

import './index.css';
import "./components/Frame/style.css";
import '@idev/icons/css/all.css'
import {
  dayjs,
} from '@idev/ui/date-pickers';
import 'dayjs/locale/th';
import isElectron from './lib/isElectron';
import axios from './lib/http';

if (isElectron()) {
  window.api.unit.findAll({}).then(unit => {
   console.log(unit);
    if (unit.length === 0) {
      window.api.unit.create({
        body: {
          id: "1",
          eUnit: "10",
          wUnit: "25"
        }
      })
    }
  }).catch((err) => {
    if (err) {
     console.log(err);
      window.api.unit.create({
        body: {
          id: "1",
          eUnit: "10",
          wUnit: "25"
        }
      })
    }
  })

  window.api.room.findAll({}).then(room => {
   console.log(room);
  }).catch((err) => {
    if (err) {
     console.log(err);

      window.api.room.create({
        body: {
          id: "1",
          name: "test"
        }
      }).then(room => {
        window.api.invoice.create({
          body: {
            date: dayjs(new Date()).format('YYYY-MM-DD'),
            table: [{
              id: 1,
              no: "1",
              description: {
                name: "ค่าเช่าห้อง",
                before: null,
                affter: null,
              },
              amount: "2,600.00"
            },
            {
              id: 2,
              no: "2",
              description: {
                name: "ค่าไฟฟ้า",
                before: "3230",
                affter: "3254",
              },
              amount: "240.00",
              unit: "10"
            },
            {
              id: 3,
              no: "3",
              description: {
                name: "ค่าน้ำประปา",
                before: "1957",
                affter: "1959",
              },
              amount: "50.00",
              unit: "25"
            },
            {
              id: 4,
              no: "4",
              description: {
                name: "ค่าโทรศัพท์",
                before: null,
                affter: null,
              },
              amount: null
            },
            {
              id: 5,
              no: "5",
              description: {
                name: "อื่นๆ",
                before: null,
                affter: null,
              },
              amount: "110.00"
            },
            {
              id: 6,
              no: null,
              description: {
                name: null,
                before: null,
                affter: null,
              },
              amount: null
            }],
            room: room.id,
            total: "3,000.00"
          }
        })
      })
    }
  })
} else {
  axios.post("/units/findAll", {}).then(({ data: unit }) => {
    if (unit.data.length === 0) {
      axios.post("/units/create", {
        body: {
          id: "1",
          eUnit: "10",
          wUnit: "25"
        }
      })
    }
  }).catch((err) => {
    if (err) {
      axios.post("/units/create", {
        body: {
          id: "1",
          eUnit: "10",
          wUnit: "25"
        }
      })
    }
  })

  axios.post("/rooms/findAll", {}).then((room) => { }).catch((err) => {
    if (err) {
      axios.post("/rooms/create", {
        body: {
          id: "1",
          name: "test"
        }
      }).then(({ data: room }) => {
        axios.post("/invoices/create", {
          body: {
            date: dayjs(new Date()).format('YYYY-MM-DD'),
            table: [{
              id: 1,
              no: "1",
              description: {
                name: "ค่าเช่าห้อง",
                before: null,
                affter: null,
              },
              amount: "2,600.00"
            },
            {
              id: 2,
              no: "2",
              description: {
                name: "ค่าไฟฟ้า",
                before: "3230",
                affter: "3254",
              },
              amount: "240.00",
              unit: "10"
            },
            {
              id: 3,
              no: "3",
              description: {
                name: "ค่าน้ำประปา",
                before: "1957",
                affter: "1959",
              },
              amount: "50.00",
              unit: "25"
            },
            {
              id: 4,
              no: "4",
              description: {
                name: "ค่าโทรศัพท์",
                before: null,
                affter: null,
              },
              amount: null
            },
            {
              id: 5,
              no: "5",
              description: {
                name: "อื่นๆ",
                before: null,
                affter: null,
              },
              amount: "110.00"
            },
            {
              id: 6,
              no: null,
              description: {
                name: null,
                before: null,
                affter: null,
              },
              amount: null
            }],
            room: room.id,
            total: "3,000.00"
          }
        })
      })
    }
  })
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(//console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
