import { Component } from '@angular/core';
import { CollectionsComponent } from '../collections/collections.component';

@Component({
  selector: 'app-dashboard',
  imports: [CollectionsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
