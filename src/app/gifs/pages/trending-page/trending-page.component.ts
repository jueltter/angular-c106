import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListComponent } from "../../components/list/list.component";

@Component({
  selector: 'app-trending-page',
  imports: [ListComponent],
  templateUrl: './trending-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TrendingPageComponent {}
