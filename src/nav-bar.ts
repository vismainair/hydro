import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import '@material/web/icon/icon.js';

import '@material/web/iconbutton/outlined-icon-button.js';

import '@material/web/radio/radio.js';

import './dialog-box.js';
import './table-box.js';

@customElement('nav-bar')
export class NavBar extends LitElement {
  @state()
  private isKeyboardDialogOpen = false;

  @state()
  private isSettingsDialogOpen = false;

  // Pass down the unique identification and text from the state tree

  // eslint-disable-next-line lit/no-native-attributes
  static styles = css`
    :host {
      border-bottom: 1px solid var(--background-color);
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      height: 10vh;
      width: 100%;
      display: block;
      margin: 0;
    }

    @keyframes glassmorphism {
      from {
        background-color: transparent;
        backdrop-filter: blur(0px);
      }
      to {
        background-color: oklch(0.5 0 0 / 0.5);
        backdrop-filter: blur(16px);
      }
    }

    nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      padding: 1rem;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      color: var(--text-color);
      border-bottom: 1px solid var(--text-color);
      animation: glassmorphism linear both;
      will-change: background-color, backdrop-filter;
      animation-timeline: scroll(root);
      animation-range: 0px 80px; /* Adjust length: fades in fully over the first 80px of scrolling */
      z-index: 1000;
    }
  `;

  private openKeyboardDialog() {
    this.isKeyboardDialogOpen = true;
  }

  private openSettingsDialog() {
    this.isSettingsDialogOpen = true;
  }

  private columns = [
    { key: 'action', label: 'Action' },
    { key: 'shortcut', label: 'Shortcut' },
  ];

  private data = [
    { action: 'Insert Argument Below', shortcut: 'Enter' },
    { action: 'Insert Response', shortcut: 'Ctrl + Enter or Cmd + Enter' },
    { action: 'Newline (Within Cell)', shortcut: 'Shift + Enter' },
    {
      action: 'Delete Cell',
      shortcut: 'Backspace or Delete (if the cell is empty)',
    },
  ];

  private createSibling() {
    this.dispatchEvent(
      new CustomEvent('add-sibling', {
        detail: { id: this.id },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    // Explicitly bind the value attribute to the reactive text property
    return html`
    <nav>
      <div id="controls">
        <md-outlined-icon-button tooltip="settings" @click=${this.openSettingsDialog}
        ><md-icon>settings</md-icon></md-outlined-icon-button
      >

      <md-outlined-icon-button @click=${this.openKeyboardDialog}
        ><md-icon>keyboard</md-icon></md-outlined-icon-button
      >
      </div>
      <div id="actions">

     <md-outlined-icon-button @click=${this.createSibling}>
        <md-icon>add_column_right</md-icon>
      </md-outlined-icon-button>
      <md-outlined-icon-button>
        <md-icon>add_row_below</md-icon>
      </md-outlined-icon-button>
      </div>
      </nav>

      <!-- Render and control the dialog box -->
      <dialog-box
        ?open=${this.isKeyboardDialogOpen}
        @dialog-close=${() => {
          this.isKeyboardDialogOpen = false;
        }}
      >
        <h2>Keyboard Shortcuts</h2>
        <table-box .columns=${this.columns} .data=${this.data}></table-box>
      </dialog-box>
      <dialog-box
        ?open=${this.isSettingsDialogOpen}
        @dialog-close=${() => {
          this.isSettingsDialogOpen = false;
        }}
      >
        <h2>Settings</h2>
        <h3>Color Mode</h3>
            <md-radio id="light" name="flavor" value="light"></md-radio>
            <label for="light">Light</label>
            <md-radio id="dark" name="flavor" value="dark"></md-radio>
            <label for="dark">Dark</label>
          </div>
      </dialog-box>

    `;
  }
}
