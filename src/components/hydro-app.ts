/* eslint-disable class-methods-use-this */
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import './flow-sheet.js';
import './nav-bar.js';
import './dialog-box.js';
import './../models/debate-style.js';

@customElement('hydro-app')
export class HydroApp extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      font-family: var(--font-face);
      padding: 0;
      box-sizing: border-box;
      background-color: var(--background-color);
      color: var(--text-color);
      padding: 2rem;
    }

    nav-bar {
      height: 10vh;
    }
  `;

  render() {
    return html`
      <nav-bar></nav-bar>
      <flow-sheet></flow-sheet>
      </div>
    `;
  }
}
