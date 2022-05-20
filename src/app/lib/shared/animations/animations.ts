import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

export const animationItem = [
  trigger('expandCollapse', [
    state(
      'expanded',
      style({
        transform: 'translateY(0)',
        opacity: 1
      })
    ),
    state(
      'collapsed',
      style({
        transform: 'translateY(-50px)',
        opacity: 0
      })
    ),
    transition('expanded => collapsed', [animate('0.2s')]),
    transition('collapsed => expanded', [animate('0.2s')])
  ])
];

