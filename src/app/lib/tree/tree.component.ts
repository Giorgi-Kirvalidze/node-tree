import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {Tree} from "src/app/lib/shared/interface/tree.interface";
import {NodeOption} from "src/app/lib/shared/interface/node-option.interface";
import {TreeService} from "src/app/lib/shared/services/tree.service";
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit, OnDestroy {
  @Input() dataSource!: Tree | null;
  @Input() treeContainerClass = '';
  @Input() nodeOptions = [
    {icon: '', option: 'DELETE'},
    {icon: '', option: 'EDIT'},
    {icon: '', option: 'ADD'}
  ]
  @Output() nodeOptionSelect = new EventEmitter<NodeOption>();
  nodeOptionSelectSub: Subscription;

  constructor(private treeService: TreeService) {
    this.nodeOptionSelectSub = this.treeService.nodeOptionSelect$.subscribe(
      val => {
        if (val.action === 'DELETE') {
          this.dataSource = this.treeService.removeNodeFromTree(this.dataSource, val.node.id);
          if (!this.dataSource) {
            this.initFirstNode();
          }
          this.nodeOptionSelect.emit(val)
        } else if (val.action === 'ADD') {
          this.treeService.addNodeInTree(this.dataSource, val.node)
        } else {
          // console.log('EDIT')
        }
      }
    )
  }

  ngOnInit() {
    if (!this.dataSource) {
      this.initFirstNode();
    }
  }

  initFirstNode() {
    this.dataSource = {
      id: uuidv4(),
      name: '',
      position: '',
      parent: '',
      children: []
    };
  }

  ngOnDestroy(): void {
    this.nodeOptionSelectSub?.unsubscribe();
  }
}
