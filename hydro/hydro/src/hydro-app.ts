import { LitElement, html, css } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import './flow-box.js';

@customElement('hydro-app')
export class HydroApp extends LitElement {
  @property({ type: String })
  title = '';

  static styles = css`
    :host {
      display: block;
      position: relative;
      min-height: 100vh;
      margin: 0px;
    }

    /* 1. Full-height background lanes for 8 columns */
    .column-lanes {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      pointer-events: none; /* Allows clicks to pass through to textareas */
      z-index: 0;
      margin: 0px;
    }

    .column-lane:nth-child(odd) {
      background-color: #eff6ff;
    }

    .column-lane:nth-child(even) {
      background-color: #fff6ee;
    }

    /* 2. Container for debate rows placed over the lanes */
    .rows-container {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .row {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      gap: 0;
      padding: 0;
      align-items: start;
    }
  `;

  @state()
  private rows: string[][] = [['']];

  private handleAddRow(rowIndex: number) {
    const newRows = [...this.rows];
    newRows.splice(rowIndex + 1, 0, ['']);
    this.rows = newRows;
  }

  private handleAddBoxInRow(rowIndex: number) {
    const newRows = [...this.rows];
    if (newRows[rowIndex].length < 8) {
      newRows[rowIndex] = [...newRows[rowIndex], ''];
      this.rows = newRows;
    }
  }

  private handleRemoveBox(rowIndex: number, colIndex: number) {
    const newRows = [...this.rows];
    newRows[rowIndex].splice(colIndex, 1);

    if (newRows[rowIndex].length === 0) {
      if (newRows.length > 1) {
        newRows.splice(rowIndex, 1);
      } else {
        newRows[0] = [''];
      }
    }

    this.rows = newRows;
  }

  render() {
    return html`
    <dialog-box>Hello World from a dialog</dialog-box>
      <!-- Full-height vertical column background lanes -->
      <div class="column-lanes">
        <div class="column-lane"></div>
        <div class="column-lane"></div>
        <div class="column-lane"></div>
        <div class="column-lane"></div>
        <div class="column-lane"></div>
        <div class="column-lane"></div>
        <div class="column-lane"></div>
        <div class="column-lane"></div>
      </div>

      <!-- Foreground interactive rows -->
      <div class="rows-container">
        ${this.rows.map((row, rIndex) => html`
          <div class="row">
            ${row.map((_, cIndex) => html`
              <flow-box
                style="grid-column: ${cIndex + 1}"
                col-index=${cIndex}
                @add-row=${() => this.handleAddRow(rIndex)}
                @add-box-in-row=${() => this.handleAddBoxInRow(rIndex)}
                @remove-box=${() => this.handleRemoveBox(rIndex, cIndex)}
              ></flow-box>
            `)}
          </div>
        `)}
      </div>
    `;
  }
}