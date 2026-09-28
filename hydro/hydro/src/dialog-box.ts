import { LitElement, html, css } from 'lit';
import { property, customElement, query } from 'lit/decorators.js';

@customElement('dialog-box')

export class DialogBox extends LitElement {

  static styles = css`
  
  :host {
  border: none;
  border-radius: 8px;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.75); /* Semi-transparent surface */
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  align-self: center;
  justify-self: center;
}

dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.5); /* Darkens backdrop slightly */
  backdrop-filter: blur(8px);            /* Blurs everything behind the dialog */
}
  
  `

  render() {
    return html`
      <slot></slot>
    `;
  }
}

