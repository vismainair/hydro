// Imports
import { signal } from '@lit-labs/signals';

/**
 * Represents a single node in the flow tree.
 */
export interface FlowBox {
  id: string;
  text: string;
  children: FlowBox[];
}

/**
 * Creates a new FlowBox with a unique ID, optional text, and an empty children array.
 * @param text The text content for the new node.
 * @returns The newly created FlowBox.
 */
const newBox = (text = ''): FlowBox => ({
  id: crypto.randomUUID(),
  text,
  children: [],
});

/**
 * A reactive signal that holds the root of the flow tree.
 */
export const tree = signal<FlowBox[]>([newBox()]);

/**
 * Reusable Depth-First Search utility.
 * Traverses a node list, searches for a target ID, and executes a callback
 * passing the target node, its parent array, and its current index.
 * @param nodes - The list of nodes to traverse.
 * @param targetId - The UUID of the node to find.
 * @param callback - Function to execute when the target node is found.
 * @returns True if the target node was found and modified; otherwise, false.
 */
function findAndModify(
  nodes: FlowBox[], // nodes on the tree
  targetId: string, // A UUID

  /**
   * Callback function to execute when the target node is found.
   * Receives the found node, its parent array, and its index in that array.
   */
  callback: (box: FlowBox, parentList: FlowBox[], index: number) => void,
): boolean {
  for (let i = 0; i < nodes.length; i += 1) {
    const box = nodes[i]; // Current node being examined

    if (box.id === targetId) {
      callback(box, nodes, i); // tells us information about the box
      return true; // End there
    }

    if (findAndModify(box.children, targetId, callback)) {
      return true;
    }
  }

  return false;
}

/**
 * Updates the text content of a FlowBox identified by its UUID.
 * @param id - The cryptographic UUID of the box
 * @param text - The content of the box
 */
export function updateText(id: string, text: string): void {
  const root = tree.get(); // Get the current state of the tree using Signals

  findAndModify(root, id, box => {
    // eslint-disable-next-line no-param-reassign
    box.text = text;
  });

  tree.set([...root]);
}

/**
 * Creates a new child FlowBox under the specified parent node.
 * @param parentId - The cryptographic UUID of the parent element
 */
export function addChild(parentId: string): void {
  const root = tree.get();

  findAndModify(root, parentId, box => {
    box.children.push(newBox());
  });

  tree.set([...root]);
}

/**
 * Adds a new sibling FlowBox after the specified target node.
 * @param targetId - The cryptographic UUID of the target element
 */
export function addSibling(targetId: string): void {
  const root = tree.get();

  findAndModify(root, targetId, (_, parentList, index) => {
    parentList.splice(index + 1, 0, newBox());
  });

  tree.set([...root]);
}

/**
 * Removes a the box with the specified UUID from the flow tree.
 * If the root node is removed and no other nodes remain, a new root node is created.
 * @param id - The cryptographic UUID of the element to be removed
 */
export function removeBox(id: string): void {
  const root = tree.get();

  findAndModify(root, id, (_, parentList, index) => {
    parentList.splice(index, 1);
  });

  if (root.length === 0) root.push(newBox());
  tree.set([...root]);
}
