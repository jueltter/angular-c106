import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { GifsService } from '../../services/gifs.service';


interface MenuOption {
  label: string;
  subLabel: string;
  route: string;
  icon: string;
}


@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuOptionsComponent {

  gifsService = inject(GifsService);


  searchHistoryKeys = computed<MenuOption[]>(() => this.gifsService.searchHistoryKeys().map(
    key => ({
      label: key,
      subLabel: `Resultados para ${key}`,
      route: `/dashboard/history/${key}`,
      icon: 'fa-solid fa-clock-rotate-left'
    })


  ));

  menuOptions: MenuOption[] = [
    {
      label: 'Trending',
      subLabel: 'Gifs Populares',
      route: '/dashboard/trending',
      icon: 'fa-solid fa-chart-line'
    },
    {
      label: 'Buscador',
      subLabel: 'Buscar Gifs',
      route: '/dashboard/search',
      icon: 'fa-solid fa-magnifying-glass'
    }

  ];


}
