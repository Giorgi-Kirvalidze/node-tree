import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {NodeOption} from "src/app/lib/shared/interface/node-option.interface";
import {Tree} from "src/app/lib/shared/interface/tree.interface";
import { v4 as uuidv4 } from 'uuid';

@Injectable({providedIn: 'root'})
export class TreeService {
  private _nodeOptionSelect = new Subject<NodeOption>();
  public readonly nodeOptionSelect$: Observable<NodeOption> = this._nodeOptionSelect.asObservable();

  emitNodeOptionSelect({node, action}: NodeOption): void {
    this._nodeOptionSelect.next({node, action})
  }

  searchInTree(element: Tree | null, matchingId: string): Tree | null {
    if (element) {
      if (element.id == matchingId) {
        return element;
      } else if (element.children != null) {
        let i;
        let result = null;
        for (i = 0; result == null && i < element.children.length; i++) {
          result = this.searchInTree(element.children[i], matchingId);
        }
        return result;
      }
    }
    return null;
  }

  addNodeInTree(tree: Tree | null, node: Tree) {
    let newNode = {
      id: uuidv4(),
      name: '',
      position: '',
      children: [],
      parent: node.id
    };
    if (node.children) {
      node.children.push(newNode);
    } else {
      node['children'] = [newNode]
    }
  }

  removeNodeFromTree(tree: Tree | null, id: string) {
    if (tree) {
      if (tree.children != null) {
        let i;
        let result: Tree | null = null;
        for (i = 0; result == null && i < tree.children.length; i++) {
          result = this.searchInTree(tree.children[i], id);
          if (result) {
            if (result.children && result.parent) {
              const parentNode = this.searchInTree(tree, result.parent);
              if (parentNode && parentNode.children) {
                const indexToDelete = parentNode.children.findIndex(el => el.id === result?.id)
                parentNode.children?.splice(indexToDelete, 1);
                return tree;
              }
            } else {
              if (result.parent) {
                const parentNode = this.searchInTree(tree, result.parent);
                if (parentNode) {
                  const indexToDelete = Number(parentNode.children?.findIndex((n) => n.id === result?.id));
                  parentNode.children?.splice(indexToDelete, 1);
                }
                return tree;
              }
            }
          }
        }
      }
    }
    return null;
  }
}
