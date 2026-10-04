import { LitElement, html, css } from 'lit';
import { customElement, query, property } from 'lit/decorators.js';

@customElement('flow-box')
export class FlowBox extends LitElement {
  // Pass down the unique identification and text from the state tree
  // eslint-disable-next-line lit/no-native-attributes
  @property({ type: String }) id = '';

  @property({ type: String }) text = '';

  @query('.flow-box')
  flowbox!: HTMLTextAreaElement;

  static styles = css`
    :host {
      display: block;
      min-height: 2.5rem;
      width: 100%;
      margin: 0;
      padding: 0;
    }

    .flow-box {
      text-align: left;
      vertical-align: top;
      line-height: normal;
      overflow-y: hidden;
      resize: none;
      box-sizing: border-box;
      border-radius: 0.25em;
      padding: 1em;
      margin: 0em;
      width: 100%;
      background-color: transparent;
      border-width: 0.5px;
      border-style: solid;
      font-family: inherit;
      min-height: 1rem;
    }
  `;

  firstUpdated() {
    this.adjustHeight();
  }

  updated() {
    this.adjustHeight();
  }

  private adjustHeight() {
    if (this.flowbox) {
      this.flowbox.style.height = 'auto';
      this.flowbox.style.height = `${this.flowbox.scrollHeight}px`;
    }
  }

  private handleInput(e: Event) {
    const textarea = e.target as HTMLTextAreaElement;

    // Auto-expand/shrink textarea height mechanics
    this.adjustHeight();

    // Fire text changes back up to the state tree store
    this.dispatchEvent(
      new CustomEvent('update-text', {
        detail: { id: this.id, text: textarea.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private isEmpty(): boolean {
    return !(this.flowbox && this.flowbox.value.trim());
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();

      if (e.ctrlKey || e.metaKey) {
        // Ctrl + Enter: add a sibling node next to this box
        this.dispatchEvent(
          new CustomEvent('add-child', {
            detail: { id: this.id },
            bubbles: true,
            composed: true,
          }),
        );
      } else {
        // Enter alone: Add a child node down a generation
        this.dispatchEvent(
          new CustomEvent('add-sibling', {
            detail: { id: this.id },
            bubbles: true,
            composed: true,
          }),
        );
      }
    }

    if (e.key === 'Backspace' && this.isEmpty()) {
      e.preventDefault();

      this.dispatchEvent(
        new CustomEvent('remove-box', {
          detail: { id: this.id },
          bubbles: true,
          composed: true,
        }),
      );
    }
  }

  render() {
    // Explicitly bind the value attribute to the reactive text property
    return html`
      <textarea
        class="flow-box"
        .value=${this.text}
        @input=${this.handleInput}
        @keydown=${this.handleKeyDown}
      ></textarea>
    `;
  }
}
