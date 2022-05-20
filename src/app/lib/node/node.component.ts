import {Component, OnInit, Input, AfterViewInit, ViewChildren, QueryList, ElementRef} from '@angular/core';
import {Tree} from "src/app/lib/shared/interface/tree.interface";
import {TreeService} from "src/app/lib/shared/services/tree.service";
import {animationItem} from "src/app/lib/shared/animations/animations";

@Component({
  selector: 'node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
  animations: [animationItem]
})

export class NodeComponent implements OnInit, AfterViewInit {
  @Input() dataSource!: Tree | null;
  @Input() nodeOptions: { icon: string; option: string }[] = [];
  isNodeOptionsVisible = false;
  isCollapsed = false;
  ExpandCollapseStyles = {};

  constructor(
    private treeService: TreeService
  ) {
  }

  ngOnInit() {
    console.log(this.dataSource, 'dataSource')
  }

  ngAfterViewInit() {
  }


  toggleChildren(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleAnimStart(): void {
    if (!this.isCollapsed) {
      this.ExpandCollapseStyles = {
        display: 'flex'
      };
    }
  }

  toggleAnimEnd(): void {
    if (this.isCollapsed) {
      this.ExpandCollapseStyles = {
        display: 'none'
      };
    }
  }

  onSelectNodeOption(index: string, action: string): void {
    if (this.dataSource) {
      const node = this.treeService.searchInTree(this.dataSource, index);
      if (node) {
        this.treeService.emitNodeOptionSelect({node, action});
      }
    }
  }

  toggleNodeOptionsVisibility(): void {
    this.isNodeOptionsVisible = !this.isNodeOptionsVisible;
  }

}
