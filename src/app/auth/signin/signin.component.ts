import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SigninComponent implements OnInit {

  ngOnInit(): void { }

}
