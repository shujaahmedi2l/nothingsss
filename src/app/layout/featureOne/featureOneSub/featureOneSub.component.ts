import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-feature1-sub',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './featureOneSub.component.html',
  styleUrl: './featureOneSub.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureOneSubComponent implements OnInit {

  ngOnInit(): void { }

}
