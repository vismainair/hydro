import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '@material/web/icon/icon.js';

@customElement('dialog-box')
export class DialogBox extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;

  static styles = css`
    :host {
      display: block;
    }

    dialog {
      border: 2px solid var(--text-color);
      border-radius: 16px;
      padding: 2rem;
      background: rgba(255, 255, 255, 0.25);
      backdrop-filter: calc(var(--blur-amount) * 1.5);
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.15);
      max-width: 67vw;
      max-height: 67vh;
      min-width: 33vw;
      min-height: 33vh;
      overflow: auto;
      resize: both;
      color: var(--text-color);
      outline: none;

      /* 1. Closed/Initial state & transition setup */
      opacity: 0;
      transition:
        opacity var(--animation-duration) ease-in-out,
        transform var(--animation-duration) ease-in-out,
        display var(--animation-duration) allow-discrete,
        overlay var(--animation-duration) allow-discrete;
    }

    /* 2. Open state */
    dialog[open] {
      opacity: 1;
    }

    /* 3. Entry starting style */
    @starting-style {
      dialog[open] {
        opacity: 0;
      }
    }

    /* Backdrop styling & transition */
    dialog::backdrop {
      background-color: rgba(0, 0, 0, 0);
      transition:
        background-color var(--animation-duration) ease,
        backdrop-filter var(--animation-duration) ease,
        display var(--animation-duration) allow-discrete,
        overlay var(--animation-duration) allow-discrete;
    }

    dialog[open]::backdrop {
      background-color: rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(var(--blur-amount));
    }

    md-icon {
      position: absolute;
      top: 1rem;
      right: 1rem;
      cursor: pointer;
      font-size: 2rem;
      padding: 1rem;
    }
  `;

  // Watch the `open` property and control the native dialog's modal state
  updated(changedProperties: Map<string, never>) {
    if (changedProperties.has('open')) {
      const dialogEl = this.shadowRoot?.querySelector('dialog');
      if (dialogEl) {
        if (this.open && !dialogEl.open) {
          dialogEl.showModal();
        } else if (!this.open && dialogEl.open) {
          dialogEl.close();
        }
      }
    }
  }

  render() {
    return html`
      <dialog @close=${this.handleClose}>
        <md-icon @click=${this.close}>close</md-icon>
        <slot></slot>
      </dialog>
    `;
  }

  private close() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('dialog-close'));
  }

  private handleClose() {
    this.open = false;
  }
}
