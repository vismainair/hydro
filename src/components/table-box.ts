import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export interface ColumnConfig {
  key: string;
  label: string;
  align?: 'left' | 'right' | 'center';
}

@customElement('table-box')
export class TableBox extends LitElement {
  // Pass configuration schemas and data arrays as public reactive properties
  @property({ type: Array }) columns: ColumnConfig[] = [];

  @property({ type: Array }) data: Record<string, never>[] = [];

  static styles = css`
    :host {
      display: block;
      width: 100%;
      margin: 16px 0;
    }

    .table-wrapper {
      width: 100%;
      overflow-x: auto;
      border-radius: 6px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-family: system-ui, sans-serif;
      font-size: 14px;
      text-align: left;
    }

    th {
      background-color: rgba(150, 150, 150, 0.5);
      color: var(--text-color);
      font-weight: 600;
      padding: 12px 16px;
      border-bottom: 2px solid var(--text-color);
    }

    td {
      padding: 12px 16px;
      color: var(--text-color);
      border-bottom: 1px solid var(--text-color);
    }

    /* Utiltiy classes for basic text alignment */
    .align-left {
      text-align: left;
    }
    .align-right {
      text-align: right;
    }
    .align-center {
      text-align: center;
    }
  `;

  render() {
    // Gracefully handle empty states
    if (!this.data || this.data.length === 0) {
      return html`<div
        class="table-wrapper"
        style="padding: 16px; text-align: center;"
      >
        No data available.
      </div>`;
    }

    return html`
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              ${this.columns.map(
                col =>
                  html`<th class="align-${col.align || 'left'}">
                    ${col.label}
                  </th>`,
              )}
            </tr>
          </thead>
          <tbody>
            ${this.data.map(
              row => html`
                <tr>
                  ${this.columns.map(
                    col =>
                      html`<td class="align-${col.align || 'left'}">
                        ${row[col.key]}
                      </td>`,
                  )}
                </tr>
              `,
            )}
          </tbody>
        </table>
      </div>
    `;
  }
}
