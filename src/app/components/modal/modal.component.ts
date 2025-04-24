import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
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
