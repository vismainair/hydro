/* eslint-disable class-methods-use-this */
import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { SignalWatcher } from '@lit-labs/signals';
import {
  tree,
  updateText,
  addChild,
  addSibling,
  removeBox,
  FlowBox,
} from './../store/flow.store.js';
import './flow-box.js';
import './nav-bar.js';
import './dialog-box.js';

const numberColumns = 6;

@customElement('hydro-app')
export class HydroApp extends SignalWatcher(LitElement) {
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

    /* Root container for top-level nodes */
    .tree-root {
      display: flex;
      flex-direction: column;
      gap: 0;
      margin: 1rem;
      padding: 0;
      width: 100%;
    }

    /* Each node row: parent box on left, children column on right */
    .node-row {
      display: flex;
      flex-direction: row;
      align-items: stretch; /* Stretches parent cell to match children height */
      margin: 0;
      margin-bottom: 1rem;
      padding: 0;
      width: 100%;
    }

    /* Container for the individual node cell locked to exact column width */
    .node-cell {
      flex: 0 0 calc(100vw / ${numberColumns});
      width: calc(100vw / ${numberColumns});
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
    }

    /* Container stacking direct children vertically in the next columns */
    .node-children {
      display: flex;
      flex: 1; /* Takes up the remaining available column space */
      flex-direction: column;
      gap: 0;
      margin: 0;
      padding: 0;
    }

    flow-box {
      display: block;
      height: 100%;
      width: 100%;
      box-sizing: border-box;
    }
  `;

  /**
   * Recursively renders a node and its children sub-tree.
   */
  private renderNode(node: FlowBox): TemplateResult {
    const hasChildren =
      Array.isArray(node.children) && node.children.length > 0;

    return html`
      <div class="node-row">
        <!-- Parent Box -->
        <div class="node-cell">
          <flow-box .id=${node.id} .text=${node.text}></flow-box>
        </div>

        <!-- Children Column -->
        ${
          hasChildren
            ? html`
                <div class="node-children">
                  ${repeat(
                    node.children,
                    child => child.id,
                    child => this.renderNode(child),
                  )}
                </div>
              `
            : ''
        }
      </div>
    `;
  }

  private handleUpdateText = (e: CustomEvent<{ id: string; text: string }>) => {
    updateText(e.detail.id, e.detail.text);
  };

  private handleAddChild = (e: CustomEvent<{ id: string }>) => {
    addChild(e.detail.id);
  };

  private handleAddSibling = (e: CustomEvent<{ id: string }>) => {
    addSibling(e.detail.id);
  };

  private handleRemoveBox = (e: CustomEvent<{ id: string }>) => {
    removeBox(e.detail.id);
  };

  render() {
    const currentTree = tree.get();

    return html`
      <nav-bar></nav-bar>
      <div
        class="tree-root"
        @update-text=${this.handleUpdateText}
        @add-child=${this.handleAddChild}
        @add-sibling=${this.handleAddSibling}
        @remove-box=${this.handleRemoveBox}
      >
        ${repeat(
          currentTree,
          node => node.id,
          node => this.renderNode(node),
        )}
      </div>
    `;
  }
}
