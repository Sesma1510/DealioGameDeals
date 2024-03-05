
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'
import './output.css';
import {NextUIProvider} from "@nextui-org/react";
import './components/fontawesome/fontawesome.tsx'

const root = ReactDOM.createRoot(document.getElementById('root')!)


 root.render(
    <NextUIProvider>
    <App />
    </NextUIProvider>
);
