import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsDialogComponent } from './records-dialog.component';

describe('RecordsDialogComponent', () => {
  let component: RecordsDialogComponent;
  let fixture: ComponentFixture<RecordsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
