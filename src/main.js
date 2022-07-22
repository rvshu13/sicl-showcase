import './app.scss'
import App from './App.svelte'
import { makeServer } from './lib/server';

makeServer();

const app = new App({
  target: document.getElementById('app')
})

export default app
