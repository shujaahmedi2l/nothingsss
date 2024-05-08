import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './sideBar.component.html',
  styleUrl: './sideBar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarComponent implements OnInit {

  ngOnInit(): void { }

}
