import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListItemComponent } from "../list-item/list-item.component";

@Component({
  selector: 'gif-list',
  imports: [ListItemComponent],
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {

  items = [1, 2, 3, 4, 5];


}
