import {Component} from '@angular/core';
import {Tree} from "./lib/shared/interface/tree.interface";
import {NodeOption} from "./lib/shared/interface/node-option.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dataSource: Tree | null = {
    id: 'a',
    name: "Lola Robinson",
    position: 'CEO',
    parent: '',
    children: [
      {
        id: 'aa',
        name: "Pascal",
        position: 'CTO',
        parent: 'a',
        children: [
          {
            id: 'aaa',
            name: "Gio Kirvalidze",
            position: 'Ukko Lead',
            parent: 'aa',
          },
          {
            id: 'aaaa',
            name: "Antoine Thiech",
            position: 'Tech Lead',
            parent: 'aa',
            children: [
              {
                id: 'aaaaa',
                name: "Frontend Dev 1", position: 'Random pos',
                parent: 'aaaa'
              },
              {id: 'aaaaaa', name: "Frontend Dev 2", position: 'Random pos', parent: 'aaaa'},
              {id: 'aaaaaaa', name: "Frontend Dev 3", position: 'Random pos', parent: 'aaaa'},
              {id: 'aaaaaaaa', name: "Backend Dev 1", position: 'Random pos', parent: 'aaaa'},
              {id: 'aaaaaaaaa', name: "Backend Dev 2", position: 'Random pos', parent: 'aaaa'}
            ]
          }
        ]
      },
      {
        id: 'bbb',
        name: "CFO",
        position: 'Random pos',
        parent: 'a',
        children: [
          {id: 'bbbb', name: "Frontend Dev 2", position: 'Random pos', parent: 'bbb'},
        ]
      }
    ]
}
    ;

    onNodeOptionSelect(val: NodeOption) {

    }
  }
