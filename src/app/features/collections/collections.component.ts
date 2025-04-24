import {
  Component,
  ComponentRef,
  CUSTOM_ELEMENTS_SCHEMA,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-collections',
  imports: [CardComponent],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
})
export class CollectionsComponent {
  private modalRef!: ComponentRef<ModalComponent>;
  @ViewChild('modalContainer', { read: ViewContainerRef, static: true })
  modalContainer!: ViewContainerRef;
  @ViewChild('formTemplate') formTemplate!: TemplateRef<any>;

  ngOnInit() {}

  openModal() {
    this.modalContainer.clear();
    this.modalRef = this.modalContainer.createComponent(ModalComponent);
    this.modalRef.instance.projectedContent = this.formTemplate;
    this.modalRef.instance.destroy.subscribe(() => this.closeModal());
  }

  closeModal() {
    this.modalRef.destroy();
  }
}
