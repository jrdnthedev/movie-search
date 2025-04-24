import {
  Component,
  ComponentRef,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { ModalComponent } from '../../components/modal/modal.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import {
  selectAllCollections,
  selectCollectionCount,
} from '../../state/state.selectors';

@Component({
  selector: 'app-collections',
  imports: [CardComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
})
export class CollectionsComponent {
  private modalRef!: ComponentRef<ModalComponent>;
  @ViewChild('modalContainer', { read: ViewContainerRef, static: true })
  modalContainer!: ViewContainerRef;
  @ViewChild('formTemplate') formTemplate!: TemplateRef<HTMLElement>;
  private store = inject(Store);
  collectionFormGroup!: FormGroup;
  isCollectionEmpty = true;
  collections$ = this.store.select(selectAllCollections);

  ngOnInit() {
    this.collectionFormGroup = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  openModal() {
    this.modalContainer.clear();
    this.modalRef = this.modalContainer.createComponent(ModalComponent);
    this.modalRef.instance.projectedContent = this.formTemplate;
    this.modalRef.instance.destroy.subscribe(() => this.closeModal());
  }

  closeModal() {
    this.modalRef.destroy();
  }

  createCollection(e: Event) {
    e.preventDefault();
    let id = 0;
    this.store
      .select(selectCollectionCount)
      .subscribe((count: number) => (id = count + 1));
    this.store.dispatch({
      type: '[Collections] Add Collection',
      collections: {
        list: [],
        title: this.collectionFormGroup.value.title,
        description: this.collectionFormGroup.value.description,
        id: id,
      },
    });
    // this.collections$.subscribe((data) => {
    //   console.log('Collections', data);
    // });
    this.isCollectionEmpty = false;
    this.collectionFormGroup.reset();
    this.closeModal();
  }
}
