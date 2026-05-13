import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ListItemComponent } from "../list-item/list-item.component";

@Component({
  selector: 'gif-list',
  imports: [ListItemComponent],
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {

  items = input.required<string[]>();


}
