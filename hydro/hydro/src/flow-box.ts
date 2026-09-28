import { LitElement, html, css } from 'lit';
import { property, customElement, query } from 'lit/decorators.js';

@customElement('flow-box')

export class FlowBox extends LitElement {
  @query('.flow-box') 
  flowbox!: HTMLTextAreaElement;

  static styles = css`
  :host {
    display: block;
  }

  .flow-box {
    text-align: left;
    vertical-align: top;
    line-height: normal;
    overflow-y: hidden;
    resize: none;
    box-sizing: border-box;
    border-radius: 0.5em;
    padding: 1em;
    height: auto;
    margin: 0em;
    background-color: transparent;
    width: 100%;
    border-width: 0.5px;
  }
  `
  @property({ type: String })
  title = ''
  private handleInput(e: Event) {
    const textarea = e.target as HTMLTextAreaElement;
    
    // Reset height to auto first so it can shrink when text is deleted
    textarea.style.height = 'auto';
    
    // Set height to match the internal content scroll height
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  private isEmpty(): boolean {
    if (this.flowbox && this.flowbox.value.trim()) {
      return false
    } else {
      return true;
    }
  }
  private handleKeyDown(e: KeyboardEvent) {
    // check if enter & not shift
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // prevents the textarea from just making a new line
      
      if (e.ctrlKey || e.metaKey) {
        // Ctrl + Enter: add box to current row
        this.dispatchEvent(new CustomEvent('add-box-in-row', {
          bubbles: true,
          composed: true
        }));
      } else if (!e.shiftKey) {
        // Enter alone (no shirft): Add a new row below
        this.dispatchEvent(new CustomEvent('add-row', {
          bubbles: true,
          composed: true
        }));
      }
    }

    if (e.key === "Backspace" && this.isEmpty() === true) {
      e.preventDefault();

      this.dispatchEvent(new CustomEvent('remove-box', {
        bubbles: true,
        composed: true,
      }))
    }
  }

  render() {
    return html`
      <textarea class="flow-box" @input=${this.handleInput} @keydown=${this.handleKeyDown}>
      </textarea>
    `;
  }
}

