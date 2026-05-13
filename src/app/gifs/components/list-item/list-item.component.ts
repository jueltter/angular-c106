import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
  selector: 'gif-list-item',
  imports: [],
  templateUrl: './list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  gif = input.required<string>();

}
