import {
  Component,
  ComponentRef,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  signal,
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
import { RouterLink } from '@angular/router';
import { catchError, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-collections',
  imports: [
    CardComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
  ],
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
  private collectionCount = signal(0);
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.collectionFormGroup = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });

    this.store
      .select(selectCollectionCount)
      .pipe(
        catchError((_, caught) => caught),
        takeUntil(this.destroy$)
      )
      .subscribe((count: number) => {
        this.collectionCount.set(count);
        this.isCollectionEmpty = count === 0;
      });
  }

  openModal() {
    this.modalContainer.clear();
    this.modalRef = this.modalContainer.createComponent(ModalComponent);
    this.modalRef.instance.projectedContent = this.formTemplate;
    this.modalRef.instance.destroy
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.closeModal());
  }

  closeModal() {
    this.modalRef.destroy();
  }

  createCollection(e: Event) {
    e.preventDefault();

    this.store.dispatch({
      type: '[Collections] Add Collection',
      collections: {
        list: [],
        title: this.collectionFormGroup.value.title,
        description: this.collectionFormGroup.value.description,
        id: this.collectionCount() + 1,
      },
    });
    this.collectionFormGroup.reset();
    this.closeModal();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
