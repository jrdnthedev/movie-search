import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { KeytrapDirective } from '../../directives/keytrap/keytrap.directive';

@Component({
  selector: 'app-modal',
  imports: [CommonModule, KeytrapDirective],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  @Output() destroy = new EventEmitter<void>();
  header = 'Modal Header';
  @Input() projectedContent!: TemplateRef<any>;
  closeModal() {
    this.destroy.emit();
  }
}
