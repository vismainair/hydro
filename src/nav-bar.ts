import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import '@material/web/icon/icon.js';

@customElement('nav-bar')
export class NavBar extends LitElement {
  // Pass down the unique identification and text from the state tree
  // eslint-disable-next-line lit/no-native-attributes
  static styles = css`
    :host {
      border: 1px solid #ccc;
      background-color: rgba(180, 180, 180, 0.8);
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
    }
  `;

  render() {
    // Explicitly bind the value attribute to the reactive text property
    return html`
      <nav>
        <md-icon>keyboard</md-icon>
      </nav>
    `;
  }
}
